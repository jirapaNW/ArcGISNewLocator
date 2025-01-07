import type Graphic from 'esri/Graphic'
import { type JimuMapView } from 'jimu-arcgis'
import { type DataSource, type DataSourceJson, type FeatureLayerDataSource, type ImmutableObject, type QueryParams, type UseDataSource, DataSourceComponent, DataSourceStatus, hooks, Immutable, type ImmutableArray, indexedDBUtils, React } from 'jimu-core'
import { type IndexedDBCache } from 'jimu-core/lib/utils/indexed-db-utils'
import { type TrackLine, type TrackLinePoint, type TracksWithLine } from '../../config'
import { DB_VERSION, STORES } from '../../constants'
import { deleteObjectsByKeys, getDataByCursor, insertObjectsToStore, queryAndSortObjectStore } from '../utils/common/db'
import { getLineGraphic, Operations, removeLayerFromJimuLayerViews, syncToMap, updateToSource } from './utils'
import { useRef } from 'react'
interface OutputSourceManagerProps {
  widgetId: string
  widgetLabel: string
  dataSourceId: string
  jimuMapView: JimuMapView
  highlightLocation: boolean
  symbolColor: string
  tracksWithLine: TracksWithLine
  tempTracksWithLine: TracksWithLine
  operation: Operations
  layerVisible: boolean
  onCreate?: (dataSourceJson: DataSourceJson) => void
  onFieldsChange?: (fields: string[]) => void
  onLinesChanges?: (lines: TrackLine[], tracks: TrackLinePoint[][], records: TrackLinePoint[]) => void
  onHandleSelection: (ids: string[], type: string) => void
  handleTracePathFinished: () => void
  onHandleFilter?: (ids: number[], type: string) => void
}

const TrackLineOutputSourceManager = (props: OutputSourceManagerProps) => {
  const {
    widgetId,
    widgetLabel,
    dataSourceId,
    onCreate: propOnCreate,
    onLinesChanges,
    jimuMapView,
    layerVisible
  } = props

  const [trackLineIndexedDb, setTrackLineIndexedDb] = React.useState<IndexedDBCache>(null)
  const [trackLinePointIndexedDb, setTrackLinePointIndexedDb] = React.useState<IndexedDBCache>(null)
  const [dataSource, setDataSource] = React.useState<DataSource>(null)

  const onCreate = hooks.useLatest(propOnCreate)
  const isFirstRender = useRef(true)
  const trackLinePrev = useRef(null)
  const rendererObject = {
    type: 'simple',
    symbol: {
      type: 'simple-line',
      color: props.symbolColor || '#007AC2',
      width: 2,
      style: 'solid'
    }
  }

  React.useEffect(() => {
    const addData = async (tracksWithLine: TracksWithLine) => {
      if (!tracksWithLine) return
      try {
        // add to tracklinepoint store
        await insertObjectsToStore(widgetId, widgetLabel, 1, tracksWithLine.tracks)
        await insertObjectsToStore(widgetId, widgetLabel, 2, [tracksWithLine.line])
        setSourceRecordsToOutputDs(dataSource as FeatureLayerDataSource, Operations.UPDATE, [])
      } catch (error) {
        console.error('Error adding data to IndexedDB:', error)
      }
    }
    const deleteData = async (tracksWithLine: TracksWithLine) => {
      if (!tracksWithLine) return
      try {
        await deleteObjectsByKeys(widgetId, widgetLabel, 1, tracksWithLine.tracks.map(t => t.ObjectID))
        await deleteObjectsByKeys(widgetId, widgetLabel, 2, [tracksWithLine.line.ObjectID])
        const gs = []
        const graphic = getLineGraphic(tracksWithLine.line, tracksWithLine.tracks)
        gs.push(graphic)
        setSourceRecordsToOutputDs(dataSource as FeatureLayerDataSource, Operations.DELETE, gs)
      } catch (error) {
        console.error('Error delete data to IndexedDB:', error)
      }
    }
    // add point or delete point
    const updateData = async (tracksWithLine: TracksWithLine) => {
      if (!tracksWithLine) return
      const delPoint = tracksWithLine.tracks[0]
      const otherPoints = tracksWithLine.tracks.slice(1)
      try {
        await deleteObjectsByKeys(widgetId, widgetLabel, 1, [delPoint.ObjectID])
        const gs = []
        if (tracksWithLine.line) {
          const graphic = getLineGraphic(tracksWithLine.line, otherPoints)
          gs.push(graphic)
        }
        setSourceRecordsToOutputDs(dataSource as FeatureLayerDataSource, Operations.UPDATE, gs)
      } catch (error) {
        console.error('Error delete data to IndexedDB:', error)
      }
    }
    if (!isFirstRender.current) {
      if (props.operation === Operations.ADD) {
        addData(props.tracksWithLine)
      } else if (props.operation === Operations.DELETE) {
        deleteData(props.tracksWithLine)
      } else if (props.operation === Operations.UPDATE) {
        updateData(props.tracksWithLine)
      } else if (props.operation === Operations.CLEAR) {
        setSourceRecordsToOutputDs(dataSource as FeatureLayerDataSource, Operations.CLEAR, [])
      }
    } else {
      isFirstRender.current = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.tracksWithLine, props.operation])

  React.useEffect(() => {
    setSourceRecordsToOutputDs(dataSource as FeatureLayerDataSource, Operations.REFRESH, [])
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.highlightLocation, props.jimuMapView])

  React.useEffect(() => {
    const rendererObject = {
      type: 'simple',
      symbol: {
        type: 'simple-line',
        color: props.symbolColor,
        width: 2,
        style: 'solid'
      }
    }
    if (jimuMapView) {
      const layerView = jimuMapView.getJimuLayerViewByDataSourceId(dataSourceId)
      if (layerView) {
        layerView.layer.renderer = rendererObject
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.symbolColor])

  React.useEffect(() => {
    if (props.tempTracksWithLine) {
      trackLinePrev.current = props.tempTracksWithLine
    } else {
      if (trackLinePrev.current) {
        const graphic = getLineGraphic(trackLinePrev.current.line, trackLinePrev.current.tracks)
        setSourceRecordsToOutputDs(dataSource as FeatureLayerDataSource, Operations.ADD, [graphic])
        trackLinePrev.current = null
        props.handleTracePathFinished()
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.tempTracksWithLine])

  const useDataSource: ImmutableObject<UseDataSource> = React.useMemo(() => {
    if (dataSourceId) {
      return Immutable({
        dataSourceId: dataSourceId,
        mainDataSourceId: dataSourceId
      })
    }
  }, [dataSourceId])

  const getDataFromDb = async () => {
    let trackLineDB = trackLineIndexedDb
    if (!trackLineDB || !trackLineDB.initialized()) {
      trackLineDB = new indexedDBUtils.IndexedDBCache(widgetId, widgetLabel, STORES[2].storeName, DB_VERSION, STORES[2].indexName, STORES[2].indexKey, STORES[2].keyPath)
      await trackLineDB.init().catch((error) => {
        console.error('Error getting data from IndexedDB:', error)
        return Promise.resolve(error)
      })
    }

    if (trackLineDB && trackLineDB.initialized()) {
      setTrackLineIndexedDb(trackLineDB)
      return await getDataByCursor(trackLineDB).catch(error => {
        console.error('Error getting data from IndexedDB:', error)
        return Promise.resolve(error)
      })
    } else {
      return Promise.resolve('Error getting data from IndexedDB')
    }
  }
  const getTracksByLineIdFromDb = async (lineid: number) => {
    let trackLinePointDB = trackLinePointIndexedDb
    if (!trackLinePointDB || !trackLinePointDB.initialized()) {
      trackLinePointDB = new indexedDBUtils.IndexedDBCache(widgetId, widgetLabel, STORES[1].storeName, DB_VERSION, STORES[1].indexName, STORES[1].indexKey, STORES[1].keyPath)
      await trackLinePointDB.init().catch((error) => {
        console.error('Error getting data from IndexedDB:', error)
        return Promise.resolve(error)
      })
    }

    if (trackLinePointDB && trackLinePointDB.initialized()) {
      setTrackLinePointIndexedDb(trackLinePointDB)
      return await queryAndSortObjectStore(trackLinePointDB, 'lineIdIndex', lineid, 'Time').catch(error => {
        console.error('Error getting data from IndexedDB:', error)
        return Promise.resolve(error)
      })
    } else {
      return Promise.resolve('Error getting data from IndexedDB')
    }
  }

  const handleCreated = (dataSource) => {
    setDataSource(dataSource)
    setSourceRecordsToOutputDs(dataSource, Operations.CREATE, [])
    onCreate.current?.(dataSource)
  }
  type ResultType = string | TrackLine[]
  type LineTrackResultType = string | TrackLinePoint[]

  const setSourceRecordsToOutputDs = async (dataSource: FeatureLayerDataSource, operate: Operations, operGraphics: Graphic[]) => {
    if (!dataSource) return
    if (operate === Operations.CLEAR) {
      onLinesChanges([], [], [])
      if (props.highlightLocation) {
        removeLayerFromJimuLayerViews(jimuMapView, dataSourceId)
      }
      return
    }
    // load data from db to sync to datasource
    const graphics = []
    let data: ResultType = []
    data = await getDataFromDb() as ResultType
    let trackLinePoints: TrackLinePoint[][] = []
    let trackLines: TrackLine[] = []
    if (typeof data === 'object') {
      trackLines = data
      if (trackLines.length > 0) {
        for (const t of data) {
          const tracks = await getTracksByLineIdFromDb(t.ObjectID) as LineTrackResultType
          if (typeof tracks === 'object') {
            trackLinePoints.push(tracks)
            const graphic = getLineGraphic(t, tracks)
            if (!(props.tempTracksWithLine && props.tempTracksWithLine.line && props.tempTracksWithLine.line.ObjectID === t.ObjectID)) {
              graphics.push(graphic)
            }
          } else {
            trackLinePoints = []
          }
        }
        const updateRecords = trackLinePoints.reduce((pre, curr) => pre.concat(curr))
        onLinesChanges(trackLines, trackLinePoints, updateRecords)
      } else {
        onLinesChanges([], [], [])
      }
    } else {
      onLinesChanges([], [], [])
    }
    if (graphics.length === 0) {
      if (props.highlightLocation) {
        removeLayerFromJimuLayerViews(jimuMapView, dataSourceId)
      }
      return
    }
    await updateToSource(dataSource, graphics, 'polyline')
    if (props.highlightLocation) {
      syncToMap(operate, dataSourceId, jimuMapView, operGraphics, rendererObject, layerVisible)
    } else {
      removeLayerFromJimuLayerViews(jimuMapView, dataSourceId)
    }
    dataSource?.setStatus(DataSourceStatus.Unloaded)
    dataSource?.setCountStatus(DataSourceStatus.Unloaded)
  }

  const handleSelectionChange = (selection: ImmutableArray<string>) => {
    if (selection) {
      props.onHandleSelection(Array.from(selection), 'line')
    }
  }

  const handleDataSourceStatusChange = (status: DataSourceStatus) => {
    if (status === DataSourceStatus.Loaded && dataSource) {
      const notFilterIds = dataSource.getRecords().map(record => record.getData().ObjectID)
      props.onHandleFilter(notFilterIds, 'line')
    }
  }

  return (
    <DataSourceComponent
      query={{
        where: '1=1',
        outFields: ['*'],
        returnGeometry: true
      } as QueryParams}
      queryCount
      widgetId={widgetId}
      useDataSource={useDataSource}
      onDataSourceCreated={handleCreated}
      onSelectionChange={handleSelectionChange}
      onDataSourceStatusChange={handleDataSourceStatusChange}
    >
    </DataSourceComponent>
  )
}

export default TrackLineOutputSourceManager
