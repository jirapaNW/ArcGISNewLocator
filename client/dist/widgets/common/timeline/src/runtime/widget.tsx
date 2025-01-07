/** @jsx jsx */
import {
  React, type AllWidgetProps, jsx, type DataSource, ReactResizeDetector, DataSourceStatus, utils, defaultMessages as jimuCoreMessages,
  type MapServiceDataSource, DataSourceManager, Immutable, DataSourceTypes, AllDataSourceTypes, css, hooks, getAppStore, type IMState, ReactRedux, TimezoneConfig
} from 'jimu-core'
import { type FeatureLayerDataSource, type JimuLayerView, type JimuMapView, loadArcGISJSAPIModules, MapViewManager } from 'jimu-arcgis'
import { Alert, WidgetPlaceholder, defaultMessages as jimuUIMessages } from 'jimu-ui'
import { type IMConfig, TimeDisplayStrategy } from '../config'
import TimeLine from './components/timeline'
import { getCalculatedTimeSettings, getInsideLayersFromWebmap, getTimeExtentByTzOffset, getTimeSettingsFromHonoredWebMap, isSingleLayer } from '../utils/utils'
import { type MapDataSourceImpl } from 'jimu-arcgis/arcgis-data-source'
import defaultMessages from './translations/default'
import { versionManager } from '../version-manager'
import TimelineDataSource from './components/timeline-ds'

const allDefaultMessages = Object.assign({}, defaultMessages, jimuCoreMessages, jimuUIMessages)

const widgetIcon = require('../../icon.svg')
const WIDGET_HEIGHT = '156px'
type TimelineProps = AllWidgetProps<IMConfig>
const Widget = (props: TimelineProps) => {
  const {
    useDataSources, theme, id, config, intl, autoWidth, autoHeight
  } = props
  const {
    enablePlayControl, autoPlay, timeSettings, honorTimeSettings, dataSourceType,
    timeStyle, foregroundColor, backgroundColor, sliderColor
  } = config
  const { speed: _speed } = timeSettings || {}
  const [timeExtent, setTimeExtent] = React.useState(null)
  const [applied, setApplied] = React.useState(true)
  const [speed, setSpeed] = React.useState(_speed)

  // Used to store all layer useDss from widget dataSources
  const [layerUseDss, setLayerUseDss] = React.useState(null)

  const [reactiveUtils, setReactiveUtils]: [typeof __esri.reactiveUtils, any] = React.useState(null)
  const [dataSources, setDataSources] = React.useState(null)
  const [notReadyOutoutDs, setNotReadyOutoutDs] = React.useState([]) // for all not-ready output ds ids
  const [isDsUpdating, setDsUpdating] = React.useState(true)
  const [width, setWidth] = React.useState(null)
  const [timeSettingsForRuntime, setDataSourcesForRuntime] = React.useState(null)
  const widgetRef = React.useRef<HTMLDivElement>(null)
  const isTimezoneData = ReactRedux.useSelector((state: IMState) => state.appConfig.attributes?.timezone?.type === TimezoneConfig.Data)

  const mvManager = React.useMemo(() => MapViewManager.getInstance(), [])
  const dsManager = React.useMemo(() => DataSourceManager.getInstance(), [])

  // whether the dataSources equal to useDss.
  const areDssReady = React.useMemo((): boolean => {
    if (notReadyOutoutDs.length) {
      return false
    }
    const dsIds = Object.keys(dataSources || {}).sort()
    const useDsIds = (useDataSources || Immutable([])).map(ds => ds.dataSourceId).asMutable({ deep: true })
    const isEqual = utils.diffArrays(true, dsIds, useDsIds).isEqual
    return isEqual
  }, [dataSources, useDataSources, notReadyOutoutDs])

  React.useEffect(() => {
    setWidth(widgetRef.current?.clientWidth)
    loadArcGISJSAPIModules([
      'esri/core/reactiveUtils'
    ]).then(modules => {
      setReactiveUtils(modules[0])
    })

    return () => {
      onTimeChanged(null, null, true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  React.useEffect(() => {
    setDataSources(null)
    setLayerUseDss(null)
    setDataSourcesForRuntime(null)
  }, [dataSourceType])

  React.useEffect(() => {
    if (!isSingleLayer(dataSourceType)) {
      if (useDataSources?.length > 0) {
        const promises = []
        useDataSources.forEach(useDs => {
          // If it's a data source set, will wait until all child data sources are created.
          promises.push(dsManager.createDataSourceByUseDataSource(Immutable(useDs)).then(ds => ds.isDataSourceSet && !ds.areChildDataSourcesCreated() ? ds.childDataSourcesReady().then(() => ds) : ds))
        })
        Promise.all(promises).then(dataSources => { // maps, or mapServices
          const _dataSources = {}
          dataSources.forEach(ds => {
            _dataSources[ds.id] = ds
          })
          setDataSources(_dataSources)
        }).catch(err => {})
      }
    } else {
      setLayerUseDss(useDataSources)
    }
  }, [useDataSources, dsManager, dataSourceType, setLayerUseDss, setDataSources])

  React.useEffect(() => {
    // No need to update speed and settings when dss are not ready. For cases:
    // 1. all dataSources are not created from useDss when initializing.
    // 2. change ds from different type, like webmap map and feature layer. There are two states changed: honorTimeSettings is updated to false/true. dataSources are updated from new useDss.
    if (dataSources && reactiveUtils && areDssReady) {
      if (honorTimeSettings) {
        const settings = getTimeSettingsFromHonoredWebMap(dataSources, true)
        setSpeed(settings?.speed)
        setDataSourcesForRuntime(settings)
      } else {
        const _timeSettings = getCalculatedTimeSettings(timeSettings, dataSources, true)
        setSpeed(_speed)
        setDataSourcesForRuntime(_timeSettings)
      }
    }
  }, [dataSources, reactiveUtils, honorTimeSettings, _speed, timeSettings, areDssReady])

  /** Call it when timeline plays for each extent since mapViewIds could be updated.
   *  1. Map widgets are created or rendered after timeline is ready. (Runtime & Builder)
   *  2. Selected webMap, or WebMap including selected mapServices or layers are used/removed by map widgets. (Builder)
   */
  const watchDsUpdating = () => {
    let layerIds = []
    let mapDs = null
    const allMapViewIds = mvManager.getAllJimuMapViewIds()
    if (dataSourceType === AllDataSourceTypes.WebMap) {
      mapDs = dataSources[Object.keys(dataSources)[0]] as MapDataSourceImpl
      layerIds = mapDs.getAllChildDataSources().map(layerDs => layerDs.id)
    } else { // MapService, Feature layers
      layerIds = Object.keys(dataSources)
    }

    const requests = []
    layerIds.forEach(layerId => {
      const rootDs = mapDs || dataSources[layerId]?.getRootDataSource()
      if (rootDs?.type === AllDataSourceTypes.WebMap) {
        const mapViewIds = allMapViewIds.filter(id => mvManager.getJimuMapViewById(id).dataSourceId === rootDs.id)
        mapViewIds.forEach(mapViewId => {
          const mapView = mvManager.getJimuMapViewById(mapViewId)
          const layerView = getLayerViewByLayerId(mapView, layerId)
          layerView?.view && requests.push(reactiveUtils.whenOnce(
            () => !layerView.view.updating
          ))
        })
      }
    })

    Promise.all(requests).then((result) => {
      setDsUpdating(false)
    })
  }

  const getLayerViewByLayerId = (mapView: JimuMapView, layerId: string): JimuLayerView => {
    let layerView = null
    Object.keys(mapView.jimuLayerViews).forEach(vid => {
      if (mapView.jimuLayerViews[vid].layerDataSourceId === layerId) {
        layerView = mapView.jimuLayerViews[vid]
      }
    })
    return layerView
  }

  const onTimeChanged = hooks.useEventCallback((startTime: number, endTime: number, unmount = false) => {
    if (!dataSources) {
      return
    }

    const queryParams = { time: unmount ? null : [startTime, endTime] } as any
    if (!unmount) {
      // remove offset of ds.tz and local tz.
      const times = getTimeExtentByTzOffset(startTime, endTime)
      queryParams.time = [times.startTime, times.endTime]
    }

    if (!unmount) {
      watchDsUpdating()
    }
    if (dataSourceType === AllDataSourceTypes.WebMap) {
      const layers = getInsideLayersFromWebmap(dataSources, config.timeSettings?.layerList)
      Object.keys(layers).forEach(lyId => {
        updateLayerQueryParams(layers[lyId], queryParams, id)
      })
    } else {
      Object.keys(dataSources).forEach(dsId => {
        dataSources[dsId] && updateLayerQueryParams(dataSources[dsId], queryParams, id)
      })
    }
  })

  React.useEffect(() => {
    if (timeExtent) {
      onTimeChanged(timeExtent[0], timeExtent[1], !applied)
    }
  }, [timeExtent, applied, onTimeChanged])

  const updateLayerQueryParams = (layerDs, queryParams, id) => {
    if (layerDs.type === DataSourceTypes.MapService) {
      layerDs = layerDs as MapServiceDataSource
      if (layerDs.supportTime?.()) {
        queryParams = getTimeOffsetedQueryParams(layerDs, queryParams)
        layerDs.changeTimeExtent?.(queryParams.time, id)
      }
    } else if (isSingleLayer(layerDs.type)) {
      layerDs = layerDs as FeatureLayerDataSource
      if (layerDs.supportTime?.()) {
        queryParams = getTimeOffsetedQueryParams(layerDs, queryParams)
        layerDs.updateQueryParams?.(queryParams, id)
      }
    }
  }

  const getTimeOffsetedQueryParams = (layerDs, queryParams) => {
    const exportOptions = layerDs.getTimeInfo().exportOptions || {}
    const { TimeOffset: offset = 0, timeOffsetUnits } = exportOptions
    if (queryParams?.time && offset !== 0) {
      let startTime = queryParams.time[0]
      let endTime = queryParams.time[1]
      const startDate = new Date(startTime)
      const endDate = new Date(endTime)
      switch (timeOffsetUnits) {
        case 'esriTimeUnitsCenturies':
        case 'esriTimeUnitsDecades':
        case 'esriTimeUnitsYears':
          const offsetedYear = timeOffsetUnits === 'esriTimeUnitsCenturies' ? 100 : timeOffsetUnits === 'esriTimeUnitsDecades' ? 10 : 1
          startTime = startDate.setFullYear(startDate.getFullYear() - offset * offsetedYear)
          endTime = endDate.setFullYear(endDate.getFullYear() - offset * offsetedYear)
          break
        case 'esriTimeUnitsMonths':
          startTime = startDate.setMonth(startDate.getMonth() - offset)
          endTime = endDate.setMonth(endDate.getMonth() - offset)
          break
        case 'esriTimeUnitsWeeks':
        case 'esriTimeUnitsDays':
          const offsetedDay = timeOffsetUnits === 'esriTimeUnitsWeeks' ? 7 : 1
          startTime = startDate.setDate(startDate.getDate() - offset * offsetedDay)
          endTime = endDate.setDate(endDate.getDate() - offset * offsetedDay)
          break
        case 'esriTimeUnitsHours':
          startTime = startDate.setHours(startDate.getHours() - offset)
          endTime = endDate.setHours(endDate.getHours() - offset)
          break
        case 'esriTimeUnitsMinutes':
          startTime = startDate.setMinutes(startDate.getMinutes() - offset)
          endTime = endDate.setMinutes(endDate.getMinutes() - offset)
          break
        case 'esriTimeUnitsSeconds':
          startTime = startDate.setSeconds(startDate.getSeconds() - offset)
          endTime = endDate.setSeconds(endDate.getSeconds() - offset)
          break
        case 'esriTimeUnitsMilliseconds':
          startTime = startDate.setMilliseconds(startDate.getMilliseconds() - offset)
          endTime = endDate.setMilliseconds(endDate.getMilliseconds() - offset)
          break
        default:
          break
      }
      queryParams.time = [startTime, endTime]
    }
    return queryParams
  }

  const onResize = (width) => {
    if (autoWidth) { // get bbox.width from layout for autoWidth
      const { layoutId, layoutItemId } = props
      const runtimeState = getAppStore().getState()
      const layoutItem = runtimeState?.appConfig?.layouts?.[layoutId]?.content?.[layoutItemId]
      if (!layoutItem) {
        return
      }
      const w = layoutItem.bbox.width
      if (w.includes('px')) {
        width = w
      } else {
        const selector = `div.layout[data-layoutid=${layoutId}]`
        const parentElement = document.querySelector(selector)
        const { clientWidth = 480 } = parentElement || {}
        width = clientWidth * parseInt(w.split('%')[0]) / 100
      }
    }
    setWidth(width)
  }

  // All dss are created with error.
  const areAllDataSourcesCreatedError = React.useMemo(() => {
    if (dataSources === null) {
      return false
    }
    return Object.keys(dataSources).filter(dsId => dataSources[dsId] === null).length === Object.keys(dataSources).length
  }, [dataSources])

  // Some output dss are not ready.
  const areSomeOutputDataSourcesNotReady = notReadyOutoutDs.length > 0

  // handle ouput ds is ready or not.
  const onIsDataSourceNotReady = (dataSourceId: string, dataSourceStatus) => {
    if (
      !isSingleLayer(dataSourceType) ||
      !dataSources ||
      !dataSources[dataSourceId] ||
      !dataSources[dataSourceId].getDataSourceJson().isOutputFromWidget
    ) {
      return
    }
    updateNotReadyOutoutDs(dataSourceId, dataSourceStatus)
  }

  // handle ds is created successful or failed.
  const onCreateDataSourceCreatedOrFailed = (dataSourceId: string, dataSource: DataSource) => {
    if (!isSingleLayer(dataSourceType)) { // todo: remove?
      return
    }
    setDataSources(dataSources => {
      // ouput ds specific
      const ds = dataSource || dataSources?.[dataSourceId]
      if (ds?.getDataSourceJson().isOutputFromWidget) {
        updateNotReadyOutoutDs(dataSourceId, dataSource ? ds.getInfo().status : DataSourceStatus.Unloaded)
      }
      // current ds
      const newDataSources = Object.assign({}, dataSources)
      if (dataSources?.[dataSourceId] && !dataSource) { // current ds is removed
        delete newDataSources[dataSourceId]
      } else {
        newDataSources[dataSourceId] = dataSource // dataSource is null when it's created failed.
      }
      return newDataSources
    })
  }

  const updateNotReadyOutoutDs = (dataSourceId: string, dataSourceStatus) => {
    setNotReadyOutoutDs(notReadyOutoutDs => {
      let newOutputDss = []
      if (dataSourceStatus === DataSourceStatus.NotReady) {
        newOutputDss = notReadyOutoutDs.includes(dataSourceId) ? notReadyOutoutDs : notReadyOutoutDs.concat(dataSourceId)
      } else {
        newOutputDss = notReadyOutoutDs.includes(dataSourceId) ? notReadyOutoutDs.filter(ds => ds !== dataSourceId) : notReadyOutoutDs
      }
      return newOutputDss
    })
  }

  const getWarningPlaceholder = () => {
    let warningType = ''
    if (areAllDataSourcesCreatedError) { // all dss are created error
      warningType = 'dataSourceCreateError'
    } else if (areSomeOutputDataSourcesNotReady) { // some ouput dss are not ready
      warningType = 'outputDatasAreNotGenerated'
    } else if (noTimelineFromHonoredMap) { // no timeline from honored map
      warningType = 'noTlFromHonoredMapWarning'
    } else if (isTimezoneData) { // timezone is set data
      warningType = 'timezoneWarning'
    } else { // invalid time span
      warningType = 'invalidTimeSpanWarning'
    }

    return <div className='placeholder-container w-100 h-100 position-relative'>
      <WidgetPlaceholder
        icon={widgetIcon} widgetId={id}
        css={css`height: ${autoHeight ? WIDGET_HEIGHT : '100%'};`}
        message={formatMessage('_widgetLabel')}
      />
      <Alert
        form='tooltip' size='small' type='warning' withIcon={true} className='position-absolute'
        style={{ bottom: 10, right: 10 }}
        text = {formatMessage(warningType)}
      />
    </div>
  }

  const formatMessage = (id) => {
    return intl.formatMessage({ id: id, defaultMessage: allDefaultMessages[id] })
  }

  const noTimelineFromHonoredMap = dataSources && dataSourceType === AllDataSourceTypes.WebMap && reactiveUtils && timeSettingsForRuntime === null
  const isDateExtentError = timeSettingsForRuntime?.startTime?.value > timeSettingsForRuntime?.endTime?.value
  const isDsLoading = () => {
    return dataSources ? Object.keys(dataSources).filter(dsId => dataSources[dsId]?.getInfo().status === DataSourceStatus.Loading).length > 0 : false
  }

  const showWarning = areAllDataSourcesCreatedError || areSomeOutputDataSourcesNotReady || noTimelineFromHonoredMap || isDateExtentError || isTimezoneData

  if (
    !useDataSources ||
    useDataSources.length === 0 ||
    (!areSomeOutputDataSourcesNotReady && timeSettingsForRuntime && timeSettingsForRuntime?.startTime?.value === timeSettingsForRuntime?.endTime?.value)
  ) {
    return <WidgetPlaceholder
      icon={widgetIcon} widgetId={id}
      css={css`height: ${autoHeight ? WIDGET_HEIGHT : '100%'};`}
      message={formatMessage('_widgetLabel')}
    />
  } else {
    return <React.Fragment>
      {
        layerUseDss?.length > 0 && layerUseDss?.map((useDs) => {
          return (
            <TimelineDataSource
              key={useDs.dataSourceId}
              useDataSource={useDs}
              onIsDataSourceNotReady={onIsDataSourceNotReady}
              onCreateDataSourceCreatedOrFailed={onCreateDataSourceCreatedOrFailed}
            />
          )
        })
      }
      {
        showWarning
          ? getWarningPlaceholder()
          : <div
            className='timeline-widget'
            css={css`
              width: ${autoWidth ? width + 'px' : 'unset'};
              height: ${autoHeight && !dataSources ? WIDGET_HEIGHT : 'unset'};
              background: ${backgroundColor || theme.ref.palette.white};
            `}
            ref={el => (widgetRef.current = el)}>
            <ReactResizeDetector handleWidth onResize={onResize} />
            {
              dataSources === null || !areDssReady
                ? <div className='jimu-secondary-loading' css={css`position: 'absolute';left: '50%';top: '50%';`} />
                : timeSettingsForRuntime && width >= 0 && <TimeLine
                  theme={theme}
                  width={width}
                  updating={isDsLoading() || isDsUpdating}
                  startTime={timeSettingsForRuntime.startTime?.value}
                  endTime={timeSettingsForRuntime.endTime?.value}
                  accuracy={timeSettingsForRuntime.accuracy}
                  stepLength={timeSettingsForRuntime.stepLength}
                  dividedCount={timeSettingsForRuntime.dividedCount}
                  cumulatively={timeSettingsForRuntime.timeDisplayStrategy === TimeDisplayStrategy.cumulatively}
                  timeStyle={timeStyle}
                  foregroundColor={foregroundColor}
                  backgroundColor={backgroundColor}
                  sliderColor={sliderColor}
                  enablePlayControl={enablePlayControl}
                  speed={speed}
                  autoPlay={autoPlay}
                  applied={applied}
                  onTimeChanged={(sTime, eTime) => { setTimeExtent([sTime, eTime]) }}
                  onApplyStateChanged={applied => { setApplied(applied) }}
                />
            }
          </div>
      }
    </React.Fragment>
  }
}
Widget.versionManager = versionManager

export default Widget
