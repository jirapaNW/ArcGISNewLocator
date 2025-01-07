/** @jsx jsx */
import {
  React,
  jsx,
  type ImmutableArray,
  type DataSource,
  type IntlShape
} from 'jimu-core'
import { type JimuMapView } from 'jimu-arcgis'
import type GraphicsLayer from 'esri/layers/GraphicsLayer'
import { DataSourceManager } from '../data-source/data-source-manager'
import { type LrsLayer, type IMConfig } from '../../config'
import { RoutePicker } from './route-picker'
import { colorGreen } from '../constants'
import { isDefined, type RouteInfo, getGeometryGraphic, getSimpleLineGraphic, getSimplePointGraphic } from 'widgets/shared-code/lrs'
import { RoutePickerPopup } from './route-picker-popup'

export interface IdentifyRouteProps {
  intl: IntlShape
  widgetId: string
  lrsLayers: ImmutableArray<LrsLayer>
  JimuMapView: JimuMapView
  defaultShowPp: boolean
  hoverGraphic: GraphicsLayer
  config: IMConfig
  onClearFlashGraphics: () => void
  onClearPickedGraphics: () => void
  onUpdateGraphics: (graphic: __esri.Graphic) => void
  flashSelectedGeometry: (graphic: __esri.Graphic) => void
}

export function IdentifyRoute (props: IdentifyRouteProps) {
  const {
    intl,
    lrsLayers,
    JimuMapView,
    defaultShowPp,
    hoverGraphic,
    config,
    onClearFlashGraphics,
    onClearPickedGraphics,
    onUpdateGraphics,
    flashSelectedGeometry
  } = props

  const [isDSReady, setIsDSReady] = React.useState<boolean>(false)
  const [allDataSources, setDataSources] = React.useState<DataSource[]>(null)
  const [routeDetails, setRouteDetals] = React.useState<any[]>(null)
  const [eventDetails, setEventDetails] = React.useState<any[]>(null)
  const [isRoutePickerActive, setIsRoutePickerActive] = React.useState<boolean>(false)
  const [showPp, setShowPp] = React.useState<boolean>(true)
  const eventDataRecords = []

  const handleDataSourcesReady = React.useCallback((value: boolean) => {
    setIsDSReady(value)
  }, [setIsDSReady])

  const handleSetDataSources = React.useCallback((ds: DataSource[]) => {
    setDataSources(ds)
  }, [setDataSources])

  // Update routeInfo state changes.
  const handleRouteInfoUpdate = async (newRouteInfo: RouteInfo, flash: boolean = false) => {
    const routeColor = config.highlightStyle.routeColor
    const routeWidth = config.highlightStyle.width
    if (isDefined(newRouteInfo.selectedPolyline) && flash) {
      flashSelectedGeometry(await getGeometryGraphic(await getSimpleLineGraphic(newRouteInfo.selectedPolyline), routeColor, routeWidth))
    }
    if (isDefined(newRouteInfo.selectedPoint)) {
      onUpdateGraphics(await getGeometryGraphic(await getSimplePointGraphic(newRouteInfo.selectedPoint), colorGreen))
    } else {
      onClearPickedGraphics()
    }
    JimuMapView.clearSelectedFeatures()
  }

  const handleRoutePickerChange = () => {
    const isPickerActive = !isRoutePickerActive
    setIsRoutePickerActive(isPickerActive)
    if (isPickerActive) {
      if (JimuMapView?.view?.popupEnabled) JimuMapView.view.popupEnabled = false
      onClearFlashGraphics()
      onClearPickedGraphics()
    } else {
      JimuMapView.view.popupEnabled = defaultShowPp
    }
  }

  const updateRouteDetails = (routeDetails) => {
    setRouteDetals(routeDetails)
  }

  const updateEventDetails = (eventDetails) => {
    setEventDetails(eventDetails)
  }

  const handleShowPp = (val) => {
    setShowPp(val)
  }

  return (
    <div>
      <DataSourceManager
        lrsLayers={lrsLayers}
        dataSourcesReady={handleDataSourcesReady}
        handleSetDataSources={handleSetDataSources}
      />
      <RoutePicker
        intl={intl}
        isReady={isDSReady}
        active={isRoutePickerActive}
        allDataSources={allDataSources}
        lrsLayers={lrsLayers}
        jimuMapView={JimuMapView}
        symbolColor={null}
        hoverGraphic={hoverGraphic}
        onActiveChange={handleRoutePickerChange}
        onRouteInfoUpdated={handleRouteInfoUpdate}
        clearPickedGraphic={onClearPickedGraphics}
        clearFlashGraphic={onClearFlashGraphics}
        setRouteDetails={updateRouteDetails}
        setEventDetails={updateEventDetails}
        eventDataRecords={eventDataRecords}
        config={config}
        handleShowPp={handleShowPp}
        />
      {routeDetails && routeDetails?.length > 0 && showPp && (<RoutePickerPopup
        intl={intl}
        allDataSources={allDataSources}
        routeDetails={routeDetails}
        eventDetails={eventDetails}
        jimuMapView={JimuMapView}
        onRouteInfoUpdated={handleRouteInfoUpdate}
        clearPickedGraphic={onClearPickedGraphics}
        config={config}
      />)}
  </div>
  )
}
