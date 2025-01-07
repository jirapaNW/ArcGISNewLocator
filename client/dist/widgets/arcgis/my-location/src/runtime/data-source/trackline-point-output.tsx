import { type JimuMapView } from 'jimu-arcgis'
import { type DataSource, type DataSourceJson, type FeatureLayerDataSource, type ImmutableObject, type QueryParams, type UseDataSource, DataSourceComponent, DataSourceStatus, hooks, Immutable, type ImmutableArray, React } from 'jimu-core'
import { type TrackLinePoint } from '../../config'
import { getPointGraphic, Operations, removeLayerFromJimuLayerViews, syncToMap, updateToSource } from './utils'

interface OutputSourceManagerProps {
  widgetId: string
  dataSourceId: string
  jimuMapView: JimuMapView
  highlightLocation: boolean
  symbolColor: string
  records: TrackLinePoint[]
  operRecords: TrackLinePoint[]
  operation: Operations
  layerVisible: boolean
  onCreate?: (dataSourceJson: DataSourceJson) => void
  onFieldsChange?: (fields: string[]) => void
  onHandleSelection: (ids: string[], type: string) => void
  onHandleFilter?: (ids: number[], type: string) => void
}
const OutputSourceManager = (props: OutputSourceManagerProps) => {
  const {
    widgetId,
    dataSourceId,
    onCreate: propOnCreate,
    jimuMapView,
    layerVisible
  } = props

  const [dataSource, setDataSource] = React.useState<DataSource>(null)
  const [highlight, setHighlight] = React.useState<boolean>(props.highlightLocation)

  const onCreate = hooks.useLatest(propOnCreate)
  const rendererObject = {
    type: 'simple',
    symbol: {
      type: 'simple-marker',
      size: 10,
      color: props.symbolColor || '#007AC2',
      outline: null
    }
  }
  React.useEffect(() => {
    setSourceRecordsToOutputDs(dataSource as FeatureLayerDataSource, props.operation)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.records])

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
    setSourceRecordsToOutputDs(dataSource as FeatureLayerDataSource, Operations.CREATE)
    onCreate.current?.(dataSource)
  }

  const setSourceRecordsToOutputDs = async (dataSource: FeatureLayerDataSource, operation: Operations) => {
    if (!dataSource) return
    if (props.records.length === 0) {
      if (props.highlightLocation) {
        removeLayerFromJimuLayerViews(jimuMapView, dataSourceId)
      }
      return
    }
    const graphics = []
    props.records.forEach(async t => {
      const graphic = getPointGraphic(t)
      graphics.push(graphic)
    })
    await updateToSource(dataSource, graphics, 'point')
    if (props.highlightLocation) {
      const operGraphics = props.operRecords.map(t => {
        return getPointGraphic(t)
      })
      if (operation === Operations.DELETE || operation === Operations.UPDATE) {
        operation = Operations.DELETE
      }
      if (props.highlightLocation !== highlight) {
        syncToMap(Operations.CREATE, dataSourceId, jimuMapView, operGraphics, rendererObject, layerVisible)
        setHighlight(props.highlightLocation)
      } else {
        syncToMap(operation, dataSourceId, jimuMapView, operGraphics, rendererObject, layerVisible)
      }
    } else {
      removeLayerFromJimuLayerViews(jimuMapView, dataSourceId)
    }
    dataSource?.setStatus(DataSourceStatus.Unloaded)
    dataSource?.setCountStatus(DataSourceStatus.Unloaded)
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
