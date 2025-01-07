/** @jsx jsx */
import { type JimuMapView, JimuMapViewComponent, MapViewManager } from 'jimu-arcgis'
import {
  type AllWidgetProps,
  type DataRecordSet,
  type DataSource,
  type IMState,
  React,
  getAppStore,
  jsx,
  utils
} from 'jimu-core'
import { Alert, Button, ConfirmDialog, DataActionList, DataActionListStyle, Icon, Loading, Tooltip, WidgetPlaceholder } from 'jimu-ui'

import { Arrangement, type IMConfig, type TrackLinePoint, type TrackPoint, type TrackLine, type TracksWithLine, Types, TimeUnits } from '../config'
import { getStyle } from './style'
import defaultMessages from './translations/default'

import TrackLinePointOut from './data-source/trackline-point-output'
import TrackOut from './data-source/track-point-output'
import TrackLineOut from './data-source/trackline-output'

import { VisibleOutlined } from 'jimu-icons/outlined/application/visible'
import { TrashOutlined } from 'jimu-icons/outlined/editor/trash'
import { PauseOutlined } from 'jimu-icons/outlined/editor/pause'
import { PlayOutlined } from 'jimu-icons/outlined/editor/play'
import { TracePathOutlined } from 'jimu-icons/outlined/gis/trace-path'
import { PinEsriOutlined } from 'jimu-icons/outlined/gis/pin-esri'

import TrackView from './components/track'
import TrackLineView from './components/trackline'
import HighLightLocation from './components/highlight-location'
import { clearWatch, defaultOptions, getCurrentPosition, getOId, createLine, updateLine, watchPosition, checkGeolocationPermission } from './utils/common/geolocate'
import { InvisibleOutlined } from 'jimu-icons/outlined/application/invisible'
import { checkDatabaseExistence, clearStore, clearUselessDB, createDBAndStores, deleteDB, getDBName } from './utils/common/db'
import { getHighLightGraphicsLayerId, getLineGraphic, getPointGraphic, Operations, removeLayerFromJimuLayerViews, zoomToGraphics } from './data-source/utils'
import { DB_VERSION, DEFAULT_ACTIVATION, DEFAULT_ARRANGEMENT, HIGHLIGHT_LOCATION, MANUAL_PATHTRACING, SELECTED_FIELDS, SHOW_COMPASS_ORIENTATION, SHOW_LOCATION_ACCURACY, STORES, STREAMING, SYMBOL_COLOR, TIME_OUT, WATCH_LOCATION, USE_MAPWIDGET, ZOOM_SCALE } from '../constants'
import { isEmpty, formatNumberWithDecimals, calculateDistance, calculateTimeDifference } from './utils/common/util'

export interface WidgetProps extends AllWidgetProps<IMConfig> {
  mapWidgetId: string
}

export interface WidgetState {
  mapViewWidgetId: string
  jimuMapViews: { [viewId: string]: JimuMapView }
  jimuMapView: JimuMapView
  dataSourceWidgetId: string
  dataSourceLabel: string
  dataSources: DataSource[]
  trackSource: DataSource
  lineDataSource: DataSource
  activeTab: string
  isWarning: boolean
  showFromMap: boolean
  tracking: boolean
  track: TrackPoint
  tracks: TrackPoint[] // point list
  trackLines: TrackLine[] //line list
  trackLinePoints: TrackLinePoint[][] // line point list
  operRecords: TrackLinePoint[]
  trackLinePointsRecords: TrackLinePoint[]
  tracksWithLine: TracksWithLine
  points: TrackLinePoint[] // line tmp points
  tempTracksWithLine: TracksWithLine
  watchId: number
  loading: boolean
  operation: Operations
  clearRecordsConfirmOpen: boolean
  currentDataSourceId: string
  selectedPointIds: string[]
  selectedLineIds: string[]
  notFilterPointIds: number[]
  notFilterLineIds: number[]
  position: GeolocationCoordinates
  confirmType: string
  deleteLineArgs: { track: TrackLinePoint, line: TrackLine, type: string }
  deleteTrackArgs: { track: TrackPoint }
  isRendered: boolean
  dbReady: boolean
  graphicsLayerId: string
  highlightVisible: boolean
}

export default class Widget extends React.PureComponent<WidgetProps, WidgetState> {
  static mapExtraStateProps = (_state: IMState, ownProps: AllWidgetProps<IMConfig>) => {
    const mapWidgetId = ownProps.useMapWidgetIds && ownProps.useMapWidgetIds.length !== 0
      ? ownProps.useMapWidgetIds[0]
      : undefined
    return {
      mapWidgetId: mapWidgetId
    }
  }

  mvManager: MapViewManager = MapViewManager.getInstance()
  constructor (props) {
    super(props)
    this.state = {
      mapViewWidgetId: null,
      jimuMapViews: null,
      jimuMapView: null,
      dataSources: [],
      dataSourceWidgetId: null,
      dataSourceLabel: '',
      activeTab: 'track',
      isWarning: false,
      trackSource: null,
      lineDataSource: null,
      showFromMap: true,
      track: null,
      tracking: false,
      tracks: [],
      trackLines: [],
      trackLinePoints: [],
      operRecords: [],
      trackLinePointsRecords: [],
      tracksWithLine: null,
      points: [],
      tempTracksWithLine: null,
      watchId: null,
      loading: false,
      operation: Operations.CREATE,
      clearRecordsConfirmOpen: false,
      currentDataSourceId: null,
      selectedPointIds: [],
      selectedLineIds: [],
      notFilterPointIds: [],
      notFilterLineIds: [],
      position: null,
      confirmType: null,
      deleteLineArgs: { track: null, line: null, type: null },
      deleteTrackArgs: { track: null },
      isRendered: false,
      dbReady: false,
      graphicsLayerId: getHighLightGraphicsLayerId(this.props.id),
      highlightVisible: true
    }
  }

  trackLabel = this.props.intl.formatMessage({ id: '_widgetLabel', defaultMessage: defaultMessages._widgetLabel })

  clearDataSources (jimuMapView: JimuMapView) {
    if (jimuMapView) {
      this.state.dataSources.forEach(ds => {
        removeLayerFromJimuLayerViews(jimuMapView, ds.id)
      })
    }
    this.setState({
      tracks: [],
      track: null,
      trackLines: [],
      tracksWithLine: null,
      tempTracksWithLine: null,
      operRecords: [],
      points: [],
      trackLinePoints: [],
      trackLinePointsRecords: [],
      dataSources: []
    })
  }

  clearGraphicsLayer (jimuMapView: JimuMapView) {
    if (jimuMapView) {
      const layer = jimuMapView?.view?.map?.findLayerById(this.state.graphicsLayerId)
      if (layer) {
        jimuMapView.view.map.remove(layer)
      }
    }
    this.setState({ position: null })
  }

  handleHighlightVisible (visible: boolean) {
    this.setState({ highlightVisible: visible })
  }

  defaultActivate () {
    if (!window.jimuConfig.isInBuilder && !this.state.isRendered) {
      const { jimuMapView, dataSources, dbReady } = this.state
      if (jimuMapView && dataSources.length > 0 && dbReady) {
        const watchLocation = (this.props.config.watchLocation ?? WATCH_LOCATION)
        const defaultActivation = (this.props.config.defaultActivation ?? DEFAULT_ACTIVATION)
        if (defaultActivation) {
          if (!watchLocation) {
            this.getLocation()
          } else if (!this.state.tracking) {
            this.handleTracking()
          }
          this.setState({ isRendered: true })
        }
      }
    }
  }

  componentDidMount () {
    this.setState({ loading: true })
    clearUselessDB(this.props.manifest.name)
    this.createDB()
    window.addEventListener('beforeunload', this.clearStroes)
  }

  componentWillUnmount () {
    this.clearWidget()
    // Delete the widget need to clear the layer in map widget and the db for runtime.
    this.deleteDB()
    window.removeEventListener('beforeunload', this.clearStroes)
  }

  componentDidUpdate (prevProps: WidgetProps, prevState: WidgetState) {
    const { mapWidgetId } = this.props
    const { jimuMapView } = this.state
    // when change track mode clear all datas
    if (prevProps.config.watchLocation !== this.props.config.watchLocation) {
      this.clearWidget()
      this.clearStroes()
    }
    if (!this.state.isRendered) {
      this.defaultActivate()
    }
    // when change view clear prev view track sources
    if (prevState.jimuMapView !== jimuMapView) {
      if (prevState.jimuMapView) {
        this.clearDataSources(prevState.jimuMapView)
        this.clearGraphicsLayer(prevState.jimuMapView)
      }
    }
    // when change mapwidget clear all
    if (prevProps.mapWidgetId !== mapWidgetId) {
      this.clearDataSources(jimuMapView)
      this.clearGraphicsLayer(jimuMapView)
      if (!mapWidgetId) {
        this.setState({
          jimuMapView: null,
          jimuMapViews: null,
          dataSources: [],
          currentDataSourceId: null
        })
      }
    }
  }

  clearWidget () {
    const { jimuMapView } = this.state
    // remove highlight layer
    this.clearGraphicsLayer(jimuMapView)
    // remove all layers
    this.clearDataSources(jimuMapView)
    // stop tracking
    if (this.state.watchId) {
      clearWatch(this.state.watchId)
    }
    this.setState({
      tracking: false,
      watchId: null,
      position: null
    })
  }

  async createDB () {
    const dbName = getDBName(this.props.id, this.props.manifest.name)
    const exist = await checkDatabaseExistence(dbName)
    try {
      // clear data when refresh or close tab or close browser
      if (exist) {
        await deleteDB(dbName)
      }
      await createDBAndStores(DB_VERSION, dbName, STORES)
      this.setState({ dbReady: true })
    } catch (error) {
      this.setState({ dbReady: false })
    }
  }

  async deleteDB () {
    const dbName = getDBName(this.props.id, this.props.manifest.name)
    const exist = await checkDatabaseExistence(dbName)
    //  only delete the db not in appConfig
    const appWidgets = getAppStore().getState()?.appConfig?.widgets
    if (appWidgets !== undefined) {
      const isInAppConfig = Object.keys(appWidgets).includes(this.props.id)
      if (isInAppConfig) return
    }
    if (exist) {
      deleteDB(dbName)
    }
  }

  onTrackDataSourceCreated = (dataSource: DataSource) => {
    this.setState({ trackSource: dataSource })
    if (dataSource) {
      this.setState(prevState => ({
        dataSources: prevState.dataSources.concat(dataSource)
      }))
      this.setState({ currentDataSourceId: dataSource.id })
    }
  }

  onLineDataSourceCreated = (dataSource: DataSource) => {
    this.setState({ lineDataSource: dataSource })
    if (dataSource) {
      this.setState(prevState => ({
        dataSources: prevState.dataSources.concat(dataSource)
      }))
    }
  }

  onCreateDataSourceFailed = () => {
  }

  onLinesChanges = (lines: TrackLine[], tracks: TrackLinePoint[][], records: TrackLinePoint[]) => {
    this.setState({ trackLines: lines })
    this.setState({ trackLinePoints: tracks })
    this.setState({ trackLinePointsRecords: records })
  }

  onTracksChange = (tracks: TrackPoint[]) => {
    this.setState({ tracks: tracks })
  }

  handleTabsChange = (id: string) => {
    this.setState({ activeTab: id })
  }

  async getLocation () {
    this.setState({ loading: true })
    const hasPermission = await checkGeolocationPermission()
    if (!hasPermission) {
      this.handleWarning()
      this.setState({ loading: false })
      return
    }
    getCurrentPosition({ ...defaultOptions, timeout: (this.props.config.timeOut ?? TIME_OUT) * 1000 }).then((position: GeolocationPosition) => {
      const coords = position?.coords
      const lon = formatNumberWithDecimals(coords.longitude, 6)
      const lat = formatNumberWithDecimals(coords.latitude, 6)
      const transCoords: GeolocationCoordinates = {
        ...coords,
        accuracy: coords.accuracy,
        heading: coords.heading,
        longitude: lon,
        latitude: lat
      }
      const track: TrackPoint = {
        Time: Date.now(),
        Longitude: lon,
        Latitude: lat,
        Altitude: !isEmpty(coords.altitude) ? formatNumberWithDecimals(coords.altitude, 2) : null,
        Orientation: !isEmpty(coords.heading) ? formatNumberWithDecimals(coords.heading, 2) : null,
        Speed: !isEmpty(coords.speed) ? formatNumberWithDecimals(coords.speed, 2) : null,
        Accuracy: coords.accuracy ? formatNumberWithDecimals(coords.accuracy, 2) : null,
        ObjectID: getOId(STORES[0].storeName)
      }
      this.setState({ track: track, operation: Operations.ADD })
      this.setState({ position: this.props.config.highlightLocation ?? HIGHLIGHT_LOCATION ? transCoords : null })
      this.setState({ loading: false })
      zoomToGraphics(this.state.jimuMapView, [getPointGraphic(track)], this.props.config.zoomScale ?? ZOOM_SCALE)
    }).catch(() => {
      this.handleWarning()
      this.setState({ loading: false })
      this.setState({ position: null })
    })
  }

  handleTrackPath = () => {
    if (this.state.points.length === 0) {
      this.handleWarning()
      return
    }
    this.setState({
      tempTracksWithLine: null,
      tracksWithLine: null
    })
  }

  handleTracePathFinished = () => {
    if (this.state.tracking && this.state.points.length > 0) {
      // create new line from last finished
      const newTrack = this.state.points[this.state.points.length - 1]
      newTrack.ObjectID = getOId(STORES[1].storeName)
      newTrack.LineId = getOId(STORES[2].storeName)
      this.setState({ points: [newTrack] })
      this.updateTrackLine(newTrack, true)
    }
  }

  updateTrackLine (track: TrackLinePoint, isCreate: boolean) {
    let lines
    if (isCreate) {
      lines = createLine(track)
    } else {
      lines = updateLine(track, this.state.tempTracksWithLine)
    }
    this.setState({ })
    this.setState({
      operRecords: [track],
      tracksWithLine: lines,
      operation: Operations.ADD,
      tempTracksWithLine: lines
    })
    zoomToGraphics(this.state.jimuMapView, [getLineGraphic(lines.line, lines.tracks)], this.props.config.zoomScale ?? ZOOM_SCALE)
  }

  keepPoint (position: GeolocationPosition): boolean {
    if (this.state.points.length === 0) return true
    const preCoord = this.state.points[this.state.points.length - 1]
    const watchLocationSettings = this.props.config.watchLocationSettings ?? { manualPathTracing: MANUAL_PATHTRACING, streaming: { type: STREAMING.TYPE, unit: STREAMING.UNIT, interval: STREAMING.INTERVAL } }
    if (watchLocationSettings.streaming.type === Types.Distance) {
      const distance = calculateDistance(position.coords.longitude, position.coords.latitude, preCoord.Longitude, preCoord.Latitude, watchLocationSettings.streaming.unit)
      return distance > watchLocationSettings.streaming.interval
    } else if (watchLocationSettings.streaming.type === Types.Time) {
      if (watchLocationSettings.streaming.unit === TimeUnits.sec) {
        const time = calculateTimeDifference(Date.now(), preCoord.Time)
        return time > watchLocationSettings.streaming.interval
      }
    }
  }

  async handleTracking () {
    if (!this.state.tracking) {
      this.setState({ loading: true })
      const hasPermission = await checkGeolocationPermission()
      this.setState({ loading: false })
      if (!hasPermission) {
        this.handleWarning()
        return
      }
      // start watch and store the points in store
      const wId = watchPosition((position: GeolocationPosition) => {
        if (!this.keepPoint(position)) return
        const coords = position?.coords
        const lon = formatNumberWithDecimals(coords.longitude, 6)
        const lat = formatNumberWithDecimals(coords.latitude, 6)
        const transCoords: GeolocationCoordinates = {
          ...coords,
          accuracy: coords.accuracy,
          heading: coords.heading,
          longitude: lon,
          latitude: lat
        }
        const track: TrackLinePoint = {
          Time: Date.now(),
          Longitude: lon,
          Latitude: lat,
          Altitude: !isEmpty(coords.altitude) ? formatNumberWithDecimals(coords.altitude, 2) : null,
          Orientation: !isEmpty(coords.heading) ? formatNumberWithDecimals(coords.heading, 2) : null,
          Speed: !isEmpty(coords.speed) ? formatNumberWithDecimals(coords.speed, 2) : null,
          Accuracy: coords.accuracy ? formatNumberWithDecimals(coords.accuracy, 2) : null,
          ObjectID: getOId(STORES[1].storeName),
          LineId: null
        }
        if (this.state.tempTracksWithLine) {
          track.LineId = this.state.tempTracksWithLine.line.ObjectID
          this.updateTrackLine(track, false)
          this.setState({
            points: this.state.points.concat([track])
          })
        } else {
          track.LineId = getOId(STORES[2].storeName)
          this.updateTrackLine(track, true)
          this.setState({
            points: [track]
          })
        }
        zoomToGraphics(this.state.jimuMapView, [getPointGraphic(track)], this.props.config.zoomScale ?? ZOOM_SCALE)

        this.setState({ position: this.props.config.highlightLocation ?? HIGHLIGHT_LOCATION ? transCoords : null })
      }, () => {
        this.handleWarning()
      }, { ...defaultOptions, timeout: (this.props.config.timeOut ?? TIME_OUT) * 1000 })
      this.setState({ watchId: wId })
    } else {
      this.setState({
        tempTracksWithLine: null,
        tracksWithLine: null
      })
      // reset
      this.setState({ points: [] })
      // stop watch
      clearWatch(this.state.watchId)
      this.setState({ watchId: null })
      this.setState({ position: null })
    }
    this.setState({ tracking: !this.state.tracking })
  }

  handleTrackLayer () {
    // show or hide layer
    let dsIds = []
    if (!(this.props.config.watchLocation ?? WATCH_LOCATION)) {
      dsIds.push(this.props.outputDataSources?.[0])
    } else {
      dsIds = [this.props.outputDataSources?.[0], this.props.outputDataSources?.[1]]
    }
    if (this.state.jimuMapView) {
      dsIds.forEach(dataSourceId => {
        if (dataSourceId) {
          const layerView = this.state.jimuMapView.getJimuLayerViewByDataSourceId(dataSourceId)
          if (layerView) {
            layerView.layer.visible = !this.state.showFromMap
          }
        }
      })
    }
    this.handleHighlightVisible(!this.state.showFromMap)
    this.setState({ showFromMap: !this.state.showFromMap })
  }

  handleClear () {
    this.setState({ confirmType: 'clear', clearRecordsConfirmOpen: true })
  }

  clearStroes = async (): Promise<void> => {
    await clearStore(this.props.widgetId, this.props.manifest.name, 1).catch(error => {
      console.error('clear store error', error)
      return Promise.reject(error)
    })
    await clearStore(this.props.widgetId, this.props.manifest.name, 2).catch(error => {
      console.error('clear store error', error)
      return Promise.reject(error)
    })
    await clearStore(this.props.widgetId, this.props.manifest.name, 0).catch(error => {
      console.error('clear store error', error)
      return Promise.reject(error)
    })
    utils.setLocalStorage(STORES[0].storeName, '0')
    utils.setLocalStorage(STORES[1].storeName, '0')
    utils.setLocalStorage(STORES[2].storeName, '0')
    this.setState({ operation: Operations.CLEAR, position: null })
    return Promise.resolve()
  }

  handleDelete (args: { track: TrackPoint }) {
    const { track } = args
    if (this.state.tracks.length > 0 && this.state.tracks[0].ObjectID === track.ObjectID) {
      this.setState({ position: null })
    }
    this.setState({ operation: Operations.DELETE, track: track })
  }

  handleConfirmOk = () => {
    switch (this.state.confirmType) {
      case 'point':
        this.handleDelete(this.state.deleteTrackArgs)
        break
      case 'line':
        this.onHandleLineDelete(this.state.deleteLineArgs)
        break
      case 'clear':
        this.clearStroes()
        break

      default:
        break
    }

    this.setState({ clearRecordsConfirmOpen: false })
  }

  handleConfirmClose = () => {
    this.setState({ clearRecordsConfirmOpen: false })
  }

  onHandleLineDelete (args: { track: TrackLinePoint, line: TrackLine, type: string }) {
    const { track, line, type } = args
    const tracksWithLine: TracksWithLine = { tracks: [], line: null }
    if (type === 'point') {
      const tracks: TrackLinePoint[] = this.state.trackLinePoints.find(m => m.some(n => n.ObjectID === track.ObjectID))

      if (tracks && tracks.length < 2) {
        // delete line and points
        tracksWithLine.tracks = tracks
        tracksWithLine.line = this.state.trackLines.find(line => line.ObjectID === track.LineId)
        this.setState({
          operRecords: tracksWithLine.tracks,
          operation: Operations.DELETE,
          tracksWithLine: tracksWithLine,
          trackLinePointsRecords: tracksWithLine.tracks
        })
        if (this.state.tempTracksWithLine && this.state.tempTracksWithLine.line && this.state.tempTracksWithLine.line.ObjectID === track.LineId) {
          this.setState({
            tempTracksWithLine: null,
            points: []
          })
        }
      } else {
        // get others
        const otherPoints = tracks.filter(point => point.ObjectID !== track.ObjectID)
        tracksWithLine.tracks = [track, ...otherPoints]
        tracksWithLine.line = this.state.trackLines.find(line => line.ObjectID === track.LineId)
        this.setState({
          operRecords: [track],
          operation: Operations.UPDATE,
          tracksWithLine: tracksWithLine,
          trackLinePointsRecords: tracksWithLine.tracks
        })
        if (this.state.tempTracksWithLine && this.state.tempTracksWithLine.line && this.state.tempTracksWithLine.line.ObjectID === track.LineId) {
          const tracks = this.state.tempTracksWithLine.tracks.filter(t => t.ObjectID !== track.ObjectID)
          this.setState({
            tempTracksWithLine: { ...this.state.tempTracksWithLine, tracks }
          })
        }
      }
    } else if (type === 'line') {
      tracksWithLine.tracks = this.state.trackLinePoints.find(m => m.some(n => n.LineId === line.ObjectID))
      tracksWithLine.line = line
      this.setState({
        operRecords: tracksWithLine.tracks,
        operation: Operations.DELETE,
        tracksWithLine: tracksWithLine,
        trackLinePointsRecords: tracksWithLine.tracks
      })
    }
  }

  handleSelection = (ids: string [], type: string) => {
    if (type === 'point') {
      this.setState({ selectedPointIds: ids })
    } else if (type === 'line') {
      this.setState({ selectedLineIds: ids })
    }
  }

  handleFilter = (ids: number [], type: string) => {
    if (type === 'point') {
      this.setState({ notFilterPointIds: ids })
    } else if (type === 'line') {
      this.setState({ notFilterLineIds: ids })
    }
  }

  handleWarning () {
    this.setState({ isWarning: true })
    setTimeout(() => {
      this.setState({ isWarning: false })
    }, 3000)
  }

  getActionDataSets () {
    if (this.state.dataSources && this.state.dataSources.length > 0) {
      const activeSources = this.state.dataSources.filter(d => d.id === this.state.currentDataSourceId)
      if (activeSources.length > 0) {
        const activeSource = activeSources[0]
        const rs = activeSource?.getSelectedRecords()
        const dataSets: DataRecordSet[] = [{
          dataSource: activeSource,
          records: rs,
          name: activeSource.getLabel(),
          type: 'selected'
        }]
        return dataSets
      }
    }
    return []
  }

  onActiveViewChange = async (activeJimuMapView: JimuMapView) => {
    if (!(activeJimuMapView && activeJimuMapView.view)) {
      return
    }
    await activeJimuMapView.whenAllJimuLayerViewLoaded().finally(() => {
      this.setState({ loading: false })
    })
    this.setState({ loading: false })
    this.setState({ jimuMapView: activeJimuMapView })
  }

  render () {
    const icon = typeof (this.props.icon) === 'string' ? this.props.icon : this.props.icon.svg
    const watchLocation = (this.props.config.watchLocation ?? WATCH_LOCATION)
    const arrangement = this.props.config.arrangement ?? DEFAULT_ARRANGEMENT
    const manualPathTracing = (this.props.config.watchLocationSettings?.manualPathTracing) ?? MANUAL_PATHTRACING
    const watchLocationSettings = this.props.config.watchLocationSettings ?? { manualPathTracing: MANUAL_PATHTRACING, streaming: { type: STREAMING.TYPE, unit: STREAMING.UNIT, interval: STREAMING.INTERVAL } }
    const selectedFields = this.props.config.selectedFields?.asMutable() ?? SELECTED_FIELDS
    const symbolColor = this.props.config.highlightInfo?.symbolColor ?? SYMBOL_COLOR
    const highlightLocation = this.props.config.highlightLocation ?? HIGHLIGHT_LOCATION
    const showCompassOrientation = this.props.config.highlightInfo?.showCompassOrientation ?? SHOW_COMPASS_ORIENTATION
    const showLocationAccuracy = this.props.config.highlightInfo?.showLocationAccuracy ?? SHOW_LOCATION_ACCURACY
    const scale = this.props.config.zoomScale ?? ZOOM_SCALE
    const useMapWidget = this.props.useMapWidgetIds &&
      this.props.useMapWidgetIds[0]
    let highlightLocationContent = null
    let jimapViewContent = null
    if (this.props.useMapWidgetIds && this.props.useMapWidgetIds.length === 1) {
      jimapViewContent = <JimuMapViewComponent
        useMapWidgetId={this.props.useMapWidgetIds?.[0]}
        onActiveViewChange={this.onActiveViewChange }
        onViewsCreate={(views) => {
          this.setState({
            jimuMapViews: views
          })
        }}
      />
    }
    let showActionBtns = false
    if (watchLocation) {
      if (this.state.trackLines?.length > 0 || this.state.tracks?.length > 0) {
        showActionBtns = true
      }
    } else {
      if (this.state.tracks?.length > 0) {
        showActionBtns = true
      }
    }
    const enableDataAction = this.props.enableDataAction === undefined ? true : this.props.enableDataAction
    let content = null
    // must select a Map
    if ((this.props.config.useMapWidget ?? USE_MAPWIDGET) ? !useMapWidget : true) {
      const message = arrangement === Arrangement.Panel ? this.trackLabel : null
      content = (
        <div className={arrangement === Arrangement.Toolbar ? 'widget-track-panel' : 'widget-track'} >
          <WidgetPlaceholder icon={require('./assets/icon.svg')} message={message} widgetId={this.props.id} />
        </div>
      )
    } else {
      // trackOutputDatasource
      let trackDs = null
      let lineTrackDs = null
      let trackLineDs = null

      if (this.props.useMapWidgetIds && this.props.useMapWidgetIds.length === 1 && this.props.outputDataSources?.length > 0 && !watchLocation && this.state.jimuMapView) {
        trackDs = (<TrackOut widgetId={this.props.widgetId} widgetLabel={this.props.manifest.name} layerVisible={this.state.highlightVisible} highlightLocation={highlightLocation} symbolColor={symbolColor} track={this.state.track} operation={this.state.operation} onCreate={this.onTrackDataSourceCreated} onTracksChange={this.onTracksChange} onHandleSelection={this.handleSelection} onHandleFilter={this.handleFilter} dataSourceId={this.props.outputDataSources?.[0]} jimuMapView={this.state.jimuMapView} />)
      }
      if (this.props.useMapWidgetIds && this.props.useMapWidgetIds.length === 1 && this.props.outputDataSources?.length > 1 && watchLocation && this.state.jimuMapView) {
        lineTrackDs = (<TrackLinePointOut widgetId={this.props.widgetId} layerVisible={this.state.highlightVisible} highlightLocation={highlightLocation} symbolColor={symbolColor} records={this.state.trackLinePointsRecords} operRecords={this.state.operRecords} operation={this.state.operation} onCreate={this.onTrackDataSourceCreated} onHandleSelection={this.handleSelection} onHandleFilter={this.handleFilter} dataSourceId={this.props.outputDataSources?.[0]} jimuMapView={this.state.jimuMapView} />)
        trackLineDs = (<TrackLineOut widgetId={this.props.widgetId} widgetLabel={this.props.manifest.name} layerVisible={this.state.highlightVisible} highlightLocation={highlightLocation} symbolColor={symbolColor} tracksWithLine={this.state.tracksWithLine} tempTracksWithLine={this.state.tempTracksWithLine} operation={this.state.operation} onLinesChanges={this.onLinesChanges} onHandleFilter={this.handleFilter} onCreate={this.onLineDataSourceCreated} onHandleSelection={this.handleSelection} handleTracePathFinished={this.handleTracePathFinished} dataSourceId={this.props.outputDataSources?.[1]} jimuMapView={this.state.jimuMapView} />)
      }
      const warningMessage = watchLocation ? this.props.intl.formatMessage({ id: 'trackLineError', defaultMessage: defaultMessages.trackLineError }) : this.props.intl.formatMessage({ id: 'locationError', defaultMessage: defaultMessages.locationError })

      if (arrangement === Arrangement.Toolbar) {
        // bar style
        const visibleTitle = this.state.showFromMap ? this.props.intl.formatMessage({ id: 'hideOnMap', defaultMessage: defaultMessages.hideOnMap }) : this.props.intl.formatMessage({ id: 'showOnMap', defaultMessage: defaultMessages.showOnMap })
        const trackPathTitle = this.props.intl.formatMessage({ id: 'trackPath', defaultMessage: defaultMessages.trackPath })
        const btnTitle = this.state.tracking ? this.props.intl.formatMessage({ id: 'endTracking', defaultMessage: defaultMessages.endTracking }) : this.props.intl.formatMessage({ id: 'startTracking', defaultMessage: defaultMessages.startTracking })
        const pinTitle = this.props.intl.formatMessage({ id: 'gettLocation', defaultMessage: defaultMessages.gettLocation })

        content = (
            <div className='widget-track-panel p-2' >
              {trackDs}
              {lineTrackDs}
              {trackLineDs}
              {jimapViewContent}
              <div className='header-section'>
                {this.state.loading && <Loading type="SECONDARY" />}
                <div className='left'>
                  <Icon className='track-icon' icon={ icon} size="m" color={this.props.theme.sys.color.surface.paperText} />
                  <div className='track-name'>{this.props.label}</div>
                  {this.state.isWarning && <Alert
                  aria-live="polite"
                  buttonType='tertiary'
                  form="tooltip"
                  placement="bottom"
                  size="small"
                  type='warning'
                  withIcon
                  leaveDelay={700}
                >{warningMessage}</Alert>
                }
                </div>
                <div className='right'>
                  {manualPathTracing && this.state.tracking &&
                    <Tooltip title={trackPathTitle} placement='bottom'>
                      <Button className='ml-auto' icon size='sm' type='tertiary' onClick={() => { this.handleTrackPath() }} aria-label={visibleTitle}>
                        <TracePathOutlined />
                      </Button>
                    </Tooltip>
                  }
                  <Tooltip title={visibleTitle} placement='bottom'>
                    <Button className='ml-auto' icon size='sm' type='tertiary' onClick={() => { this.handleTrackLayer() }} aria-label={visibleTitle}>
                      {this.state.showFromMap && <VisibleOutlined />}
                      {!this.state.showFromMap && <InvisibleOutlined />}
                    </Button>
                  </Tooltip>
                  {showActionBtns && !this.state.tracking && <Tooltip title={this.props.intl.formatMessage({ id: 'clearResult', defaultMessage: defaultMessages.clearResult })} placement='bottom'>
                    <Button className='ml-auto' icon size='sm' type='tertiary' onClick={() => { this.handleClear() }} aria-label={this.props.intl.formatMessage({ id: 'clearResult', defaultMessage: defaultMessages.clearResult })}>
                      <TrashOutlined />
                    </Button>
                  </Tooltip>}
                  {showActionBtns && (<span className='tool-dividing-line'></span>)}
                  {!watchLocation &&
                    <Tooltip title={pinTitle} placement='bottom'>
                      <Button className='ml-auto' icon size='sm' type='tertiary' onClick={() => { this.getLocation() }} aria-label={visibleTitle}>
                        <PinEsriOutlined />
                      </Button>
                    </Tooltip>}
                  {watchLocation && !this.state.tracking &&
                    (<Tooltip title={btnTitle} placement='bottom'>
                      <Button className='ml-auto' icon size='sm' type='tertiary' onClick={() => { this.handleTracking() }} aria-label={visibleTitle}>
                        <PlayOutlined />
                      </Button>
                    </Tooltip>)}
                  {watchLocation && this.state.tracking && (<Tooltip title={btnTitle} placement='bottom'>
                    <Button className='ml-auto' icon size='sm' type='tertiary' onClick={() => { this.handleTracking() }} aria-label={visibleTitle}>
                      <PauseOutlined />
                    </Button>
                  </Tooltip>)}
                </div>

              </div>
            </div>
        )
      } else {
        // head
        let headerConten = null
        headerConten = (
          <div className='header-section'>
             <Alert
              className='warning-inaccessible'
              type='warning'
              open={this.state.isWarning}
              closable
              withIcon
              text={warningMessage}
              onClose={() => { this.setState({ isWarning: false }) }}
            />
            <div className='left'>
              <Icon className='track-icon' icon={ icon} size="m" color={this.props.theme.sys.color.surface.paperText} />
              <div className='track-name'>{this.props.label}</div>
            </div>
            {showActionBtns && <div className='right'>
              <Tooltip title={this.props.intl.formatMessage({ id: 'clearResult', defaultMessage: defaultMessages.clearResult })} placement='bottom'>
                  <span>
                    <Button className='ml-auto' icon size='sm' type='tertiary' disabled={this.state.tracking} onClick={() => { this.handleClear() }} aria-label={this.props.intl.formatMessage({ id: 'clearResult', defaultMessage: defaultMessages.clearResult })}>
                      <TrashOutlined />
                    </Button>
                  </span>
              </Tooltip>
              {enableDataAction && <span className='tool-dividing-line'></span>}

              {enableDataAction && <DataActionList
                  widgetId={this.props.id}
                  dataSets={this.getActionDataSets()}
                  listStyle={DataActionListStyle.Dropdown}
                  buttonType='tertiary'
                />
              }
            </div>
            }

          </div>
        )

        let trackContent = null
        let btnContent = null
        if (!watchLocation) {
          const btnTitle = this.props.intl.formatMessage({ id: 'gettLocation', defaultMessage: defaultMessages.gettLocation })
          btnContent = (
          <div className='btn-content'>
              <Tooltip title={btnTitle} placement='bottom'>
                <span>
                  <Button type='primary' className='btn' disabled={this.state.loading} aria-label={btnTitle} onClick={() => { this.getLocation() }}>{btnTitle}
                  {this.state.loading && <Loading type="SECONDARY" />}
                  </Button>
                </span>
              </Tooltip>
          </div>)
          trackContent = <TrackView theme={this.props.theme} dataSource={this.state.trackSource} mapViewId={this.props.useMapWidgetIds?.[0]} highlightLocation={highlightLocation} tracks={this.state.tracks} selectedFields={selectedFields} selectedIds={this.state.selectedPointIds} notFilterPointIds={this.state.notFilterPointIds} dataSourceId={this.props.outputDataSources?.[0]} jimuMapView={this.state.jimuMapView} geolocationOptions={watchLocationSettings} onHandleDelete={(track: TrackPoint) => { this.setState({ deleteTrackArgs: { track: track }, clearRecordsConfirmOpen: true, confirmType: 'point' }) }} handleHighlightVisible={(visible: boolean) => { this.handleHighlightVisible(visible) }} scale={scale} loading={this.state.loading} />
        } else {
          trackContent = <TrackLineView theme={this.props.theme} dataSourceId={this.props.outputDataSources?.[0]} dataSource={this.state.trackSource} lineDataSource={this.state.lineDataSource} highlightLocation={highlightLocation} lineDataSourceId={this.props.outputDataSources?.[1]} jimuMapView={this.state.jimuMapView} tracks={this.state.trackLinePoints} trackLines={this.state.trackLines} tempTracksWithLine={this.state.tempTracksWithLine} manualPathTracing={manualPathTracing} scale={scale} loading={this.state.loading} tracking={this.state.tracking} onHandleLineDelete={(track: TrackLinePoint, line: TrackLine, type: string) => { this.setState({ deleteLineArgs: { track: track, line: line, type: type }, clearRecordsConfirmOpen: true, confirmType: 'line' }) }} handleTracking={() => { this.handleTracking() }} handleTrackPath={() => { this.handleTrackPath() }} handleCurrentDataSource={(id: string) => { this.setState({ currentDataSourceId: id }) }} handleHighlightVisible={(visible: boolean) => { this.handleHighlightVisible(visible) }} selectedFields={selectedFields} selectedPointIds={this.state.selectedPointIds} selectedLineIds={this.state.selectedLineIds} notFilterPointIds={this.state.notFilterPointIds} notFilterLineIds={this.state.notFilterLineIds} />
          const btnTitle = this.state.tracking
            ? this.props.intl.formatMessage({ id: 'endTracking', defaultMessage: defaultMessages.endTracking })
            : this.props.intl.formatMessage({ id: 'startTracking', defaultMessage: defaultMessages.startTracking })
          btnContent =
          (<div className='btn-content'>
           <Tooltip title={btnTitle} placement='bottom'>
            <span>
              <Button type='primary' className='btn' disabled={this.state.loading} aria-label={btnTitle} onClick={() => { this.handleTracking() }}>{btnTitle}
                {this.state.loading && <Loading type="SECONDARY" />}
              </Button>
            </span>
           </Tooltip>
         </div>)
        }

        content = (
            <div className='widget-track  px-4 pt-2 pb-4'>
              {headerConten}
              {trackDs}
              {lineTrackDs}
              {trackLineDs}
              {trackContent}
              {btnContent}
              {jimapViewContent}
            </div>
        )
      }
    }
    highlightLocationContent = (<HighLightLocation jimuMapView={this.state.jimuMapView} graphicsLayerId={this.state.graphicsLayerId} highlightLocation={highlightLocation} position={this.state.position} showCompassOrientation={showCompassOrientation} showLocationAccuracy={showLocationAccuracy} watchLocation={watchLocation} layerVisible={this.state.highlightVisible} ></HighLightLocation>)

    return (
      <div css={getStyle(this.props.theme, getAppStore().getState()?.appContext?.isRTL, this.props.autoWidth, this.props.autoHeight)} className='jimu-widget'>
         {this.state.dbReady && content }
        {highlightLocationContent}
        {
          this.state.clearRecordsConfirmOpen &&
          <ConfirmDialog
            level='warning'
            title={this.props.intl.formatMessage({ id: 'clearRecordsConfirm', defaultMessage: defaultMessages.clearRecordsConfirm })}
            hasNotShowAgainOption={false}
            content={''}
            onConfirm={this.handleConfirmOk}
            onClose={this.handleConfirmClose}
          />
        }
      </div>
    )
  }
}
