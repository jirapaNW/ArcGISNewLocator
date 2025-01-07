import type Graphic from 'esri/Graphic'
import { type JimuMapView } from 'jimu-arcgis'
import { type DataSource, type DataSourceJson, type FeatureLayerDataSource, type ImmutableObject, type QueryParams, type UseDataSource, DataSourceComponent, DataSourceStatus, hooks, Immutable, type ImmutableArray, indexedDBUtils, React } from 'jimu-core'
import { type IndexedDBCache } from 'jimu-core/lib/utils/indexed-db-utils'
import { type TrackPoint } from '../../config'
import { DB_VERSION, STORES } from '../../constants'
import { deleteObjectsByKeys, getDataByCursor, insertObjectsToStore } from '../utils/common/db'
import { getPointGraphic, Operations, removeLayerFromJimuLayerViews, syncToMap, updateToSource } from './utils'
import { useRef } from 'react'

interface OutputSourceManagerProps {
  widgetId: string
  widgetLabel: string
  dataSourceId: string
  jimuMapView: JimuMapView
  highlightLocation: boolean
  symbolColor: string
  track: TrackPoint
  operation: Operations
  layerVisible: boolean
  onCreate?: (dataSourceJson: DataSourceJson) => void
  onFieldsChange?: (fields: string[]) => void
  onTracksChange?: (tracks: TrackPoint[]) => void
  onHandleSelection?: (ids: string[], type: string) => void
  onHandleFilter?: (ids: number[], type: string) => void

}

const OutputSourceManager = (props: OutputSourceManagerProps) => {
  const {
    widgetId,
    widgetLabel,
    dataSourceId,
    onCreate: propOnCreate,
    jimuMapView,
    onTracksChange,
    layerVisible
  } = props

  const isFirstRender = useRef(true)
  const rendererObject = {
    type: 'simple', // autocasts as new SimpleRenderer()
    symbol: {
      type: 'simple-marker', // autocasts as new SimpleMarkerSymbol()
      size: 10,
      color: props.symbolColor || '#007AC2',
      outline: null
    }
  }

  const [trackPointIndexedDb, setTrackPointIndexedDb] = React.useState<IndexedDBCache>(null)

  const [dataSource, setDataSource] = React.useState<DataSource>(null)

  const onCreate = hooks.useLatest(propOnCreate)

  type ResultType = string | TrackPoint[]

  const getDataFromDb = async () => {
    let trackPointDB = trackPointIndexedDb
    if (!trackPointDB || !trackPointDB.initialized()) {
      trackPointDB = new indexedDBUtils.IndexedDBCache(widgetId, widgetLabel, STORES[0].storeName, DB_VERSION, STORES[0].indexName, STORES[0].indexKey, STORES[0].keyPath)
      await trackPointDB.init().catch((error) => {
        console.error('Error getting data from IndexedDB:', error)
        return Promise.resolve(error)
      })
    }

    if (trackPointDB && trackPointDB.initialized()) {
      setTrackPointIndexedDb(trackPointDB)
      return await getDataByCursor(trackPointDB).catch(error => {
        console.error('Error getting data from IndexedDB:', error)
        return Promise.resolve(error)
      })
    } else {
      return Promise.resolve('Error getting data from IndexedDB')
    }
  }
  const setSourceRecordsToOutputDs = async (dataSource: FeatureLayerDataSource, operate: string, operGraphics: Graphic[]) => {
    if (!dataSource) return
    if (operate === Operations.CLEAR) {
      onTracksChange([])
      if (props.highlightLocation) {
        removeLayerFromJimuLayerViews(jimuMapView, dataSourceId)
      }
      return
    }
    // load data from db to sync to datasource
    const graphics = []
    let data: ResultType = []
    data = await getDataFromDb() as ResultType
    if (typeof data === 'object') {
      const tracks: TrackPoint[] = data
      tracks.forEach(async t => {
        const g = getPointGraphic(t)
        graphics.push(g)
      })
      onTracksChange(tracks)
    } else {
      onTracksChange([])
    }

    if (graphics.length === 0) {
      // remove layer if graphics is none
      if (props.highlightLocation) {
        removeLayerFromJimuLayerViews(jimuMapView, dataSourceId)
      }
      return
    }
    await updateToSource(dataSource, graphics, 'point')
    if (props.highlightLocation) {
      syncToMap(operate, dataSourceId, jimuMapView, operGraphics, rendererObject, layerVisible)
    } else {
      removeLayerFromJimuLayerViews(jimuMapView, dataSourceId)
    }
    dataSource?.setStatus(DataSourceStatus.Unloaded)
    dataSource?.setCountStatus(DataSourceStatus.Unloaded)
  }

  React.useEffect(() => {
    const addData = async (track: TrackPoint) => {
      try {
        // add to tracklinepoint store
        await insertObjectsToStore(widgetId, widgetLabel, 0, [track])
        const g = getPointGraphic(track)
        setSourceRecordsToOutputDs(dataSource as FeatureLayerDataSource, Operations.ADD, [g])
      } catch (error) {
        console.error('Error adding data to IndexedDB:', error)
      }
    }
    const deleteData = async (track: TrackPoint) => {
      try {
        await deleteObjectsByKeys(widgetId, widgetLabel, 0, [track.ObjectID])
        const g = getPointGraphic(track)
        setSourceRecordsToOutputDs(dataSource as FeatureLayerDataSource, Operations.DELETE, [g])
      } catch (error) {
        console.error('Error adding data to IndexedDB:', error)
      }
    }
    if (!isFirstRender.current) {
      if (props.operation === Operations.ADD) {
        addData(props.track)
      } else if (props.operation === Operations.DELETE) {
        deleteData(props.track)
      } else if (props.operation === Operations.CLEAR) {
        setSourceRecordsToOutputDs(dataSource as FeatureLayerDataSource, Operations.CLEAR, [])
      }
    } else {
      isFirstRender.current = false
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.track, props.operation])

  React.useEffect(() => {
    setSourceRecordsToOutputDs(dataSource as FeatureLayerDataSource, Operations.REFRESH, [])
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.highlightLocation, props.jimuMapView])

  React.useEffect(() => {
    const rendererObject = {
      type: 'simple', // autocasts as new SimpleRenderer()
      symbol: {
        type: 'simple-marker', // autocasts as new SimpleMarkerSymbol()
        size: 10,
        color: props.symbolColor,
        outline: null
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

  const useDataSource: ImmutableObject<UseDataSource> = React.useMemo(() => {
    if (dataSourceId) {
      return Immutable({
        dataSourceId: dataSourceId,
        mainDataSourceId: dataSourceId
      })
    }
  }, [dataSourceId])

  const handleCreated = (dataSource) => {
    setDataSource(dataSource)
    setSourceRecordsToOutputDs(dataSource, Operations.CREATE, [])
    onCreate.current?.(dataSource)
  }

  const handleSelectionChange = (selection: ImmutableArray<string>) => {
    if (selection) {
      props.onHandleSelection(Array.from(selection), 'point')
    }
  }

  const handleDataSourceStatusChange = (status: DataSourceStatus) => {
    if (status === DataSourceStatus.Loaded && dataSource) {
      const notFilterIds = dataSource.getRecords().map(record => record.getData().ObjectID)
      props.onHandleFilter(notFilterIds, 'point')
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

export default OutputSourceManager
