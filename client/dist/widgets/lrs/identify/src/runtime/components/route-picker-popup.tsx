/** @jsx jsx */
import {
  type DataSource,
  React,
  hooks,
  jsx,
  type IntlShape
} from 'jimu-core'
import { type ControlPosition, FloatingPanel, type Size, Select, Label, Pagination, CollapsablePanel } from 'jimu-ui'
import { CalciteTable, CalciteTableHeader, CalciteTableRow } from 'calcite-components'
import { type TimeInfo, type IMConfig, type LocationInfo, type NetworkInfo } from '../../config'
import { type FeatureLayerDataSource, type JimuMapView } from 'jimu-arcgis'
import defaultMessage from '../translations/default'
import { type RouteInfo, getDateWithTZOffset, isDefined, formatMessage, getCalciteBasicTheme } from 'widgets/shared-code/lrs'
import type FeatureLayer from '@arcgis/core/layers/FeatureLayer'

export interface RoutePickerPopupProps {
  intl: IntlShape
  routeDetails: any
  eventDetails: any
  config: IMConfig
  jimuMapView: JimuMapView
  allDataSources: DataSource[]
  clearPickedGraphic: () => void
  onRouteInfoUpdated: (updatedRouteInfo: RouteInfo, flash?: boolean) => void
}

export function RoutePickerPopup (props: RoutePickerPopupProps) {
  const { intl, config, routeDetails, eventDetails, jimuMapView, allDataSources, onRouteInfoUpdated, clearPickedGraphic } = props
  const routePickerSelection = React.useRef<LocationInfo>(null)
  const [showPp, setShowPopup] = React.useState(true)
  const [windowLocation, setWindowLocation] = React.useState<ControlPosition>({ x: 0, y: 0 })
  const [size, setSize] = React.useState<Size>({ width: 400, height: 500 })
  const [selectedNetwork, setSelectedNetwork] = React.useState<NetworkInfo>()
  const [selectedRoutes, setSelectedRoutes] = React.useState<LocationInfo[]>()
  const [selectedTimeInfo, setSelectedTimeInfo] = React.useState<TimeInfo>()
  const [selectedNetworkCount, setSelectedNetworkCount] = React.useState(0)
  const [routeCount, setSelectedRouteCount] = React.useState<number>(0)
  const route = selectedRoutes && selectedRoutes?.[routeCount]
  const lineEventToggle = config?.lineEventToggle
  const pointEventToggle = config?.pointEventToggle
  const getI18nMessage = hooks.useTranslation(defaultMessage)
  const offsetPx = 16

  React.useEffect(() => {
    let defaultNetwork = routeDetails.find((route) => config?.defaultNetworkLayer === route?.id)
    if (!defaultNetwork) defaultNetwork = routeDetails[0]

    let selectedRouteIndex = routeDetails.findIndex((route) => config?.defaultNetworkLayer === route?.id)
    if (selectedRouteIndex < 0) selectedRouteIndex = 0

    if (routeDetails && routeDetails.length > 0) {
      setShowPopup(true)
      routePickerSelection.current = defaultNetwork
      const mapPoint = jimuMapView?.view.toScreen(defaultNetwork.routes[0].selectedPoint)
      if (mapPoint) {
        const newLocation = windowLocation
        newLocation.x = mapPoint.x + offsetPx
        newLocation.y = mapPoint.y + offsetPx
        const info = _calculateAlignmentPosition(mapPoint.x, mapPoint.y, jimuMapView?.view)
        if (info) {
          newLocation.x = info.x + offsetPx
          newLocation.y = info.y + offsetPx
        }
        setWindowLocation(newLocation)
      }
    }
    setSelectedRouteCount(0)
    setSelectedNetwork(defaultNetwork)
    setSelectedNetworkCount(selectedRouteIndex)
    setSelectedRoutes(defaultNetwork?.routes)
    setSelectedTimeInfo(defaultNetwork?.routes?.[0]?.timeDependedInfo?.[0])
    onRouteInfoUpdated(defaultNetwork?.routes?.[0], true)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jimuMapView?.view, routeDetails])

  const _calculateAlignmentPosition = (
    x: number,
    y: number,
    view: any
  ): any => {
    if (!view) {
      return undefined
    }

    const popupWidth = size.width
    const popupHeight = size.height
    const isFullyVisible = x >= 0 && y >= 0 &&
        (x + popupWidth) <= window.innerWidth &&
        (y + popupHeight) <= window.innerHeight

    if (!isFullyVisible) {
      // Adjust x-coordinate if the popup is going beyond the right edge of the viewport
      if (x + popupWidth > window.innerWidth) {
        x = window.innerWidth - popupWidth
      }

      // Adjust y-coordinate if the popup is going beyond the bottom edge of the viewport
      if (y + popupHeight > window.innerHeight) {
        y = window.innerHeight - popupHeight
      }

      // Adjust x-coordinate if the popup is going beyond the left edge of the viewport
      if (x < 0) {
        x = 0
      }

      // Adjust y-coordinate if the popup is going beyond the top edge of the viewport
      if (y < 0) {
        y = 0
      }
      return { x: x, y: y }
    }
    return null
  }

  const handleNetworkChange = React.useCallback((event) => {
    const info = event?.target?.value
    const id = info?.id
    routeDetails?.forEach((routeInfo, index) => {
      if (routeInfo?.id === id) {
        setSelectedNetwork(info)
        setSelectedNetworkCount(index)
        setSelectedRoutes(routeInfo?.routes)
        setSelectedTimeInfo(routeInfo?.routes?.[0]?.timeDependedInfo?.[0])
        setSelectedRouteCount(0)
        onRouteInfoUpdated(routeInfo?.routes?.[0], true)
      }
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [routeDetails])

  const handleTimeChange = (event) => {
    const timeDependedInfo = event?.target?.value
    setSelectedTimeInfo(timeDependedInfo)
  }

  const handleSelectionCancel = () => {
    clearPickedGraphic()
    setShowPopup(false)
  }

  const handleDrag = React.useCallback((position: ControlPosition) => {
    setWindowLocation(position)
  }, [])

  const handleResize = React.useCallback((size: Size, position: ControlPosition) => {
    setSize(size)
    setWindowLocation(position)
  }, [])

  const getCodedValueLabel = (fieldName, value, fieldInfos) => {
    const fieldMatch = fieldInfos?.find(info => info.name === fieldName)
    if (isDefined(fieldMatch) && isDefined(fieldMatch.domain) && fieldMatch.domain.type === 'coded-value') {
      const codedVals = fieldMatch.domain.codedValues
      const match = codedVals.find(c => {
        if (typeof c.code === 'string' && typeof value === 'string') {
          return c.code.toLowerCase() === value.toLowerCase()
        } else {
          return c.code === value
        }
      })

      if (match) {
        return `${match.code} - ${match.name}`
      }
    }
  }

  const getAttributeValueTable = (attributes, fieldInfos, route) => {
    const routeIdFieldName = route?.routeIdFieldName
    const routeNameFieldName = route?.routeNameFieldName
    const excludeFields = [routeIdFieldName, routeNameFieldName]
    const configFields = selectedNetwork ? selectedNetwork.configFields : null
    const useFieldAlias = selectedNetwork ? selectedNetwork.useFieldAlias : null
    const tableRows = []
    if ((configFields?.length > 0) && attributes) {
      configFields.forEach((field) => {
        const enabled = field?.enabled
        let fieldName = field?.field?.name
        if (enabled && (!excludeFields.includes(fieldName))) {
          const codeValueLabel = getCodedValueLabel(fieldName, attributes[field?.field?.name], fieldInfos)
          if (useFieldAlias) fieldName = field?.field?.alias
          const fieldType = field?.field?.type
          let val
          if (!codeValueLabel) {
            val = attributes[field?.field?.name]
            if (fieldType?.toLowerCase() === 'date') {
              val = val ? getDateWithTZOffset(val, selectedNetwork.routes[routeCount].ds).toLocaleDateString() : null
            }
          } else val = codeValueLabel
          if (fieldName) tableRows.push({ name: fieldName, val: val })
        }
      })
    }
    return tableRows
  }

  const getDataSource = (layer: FeatureLayer) => {
    const match = allDataSources.find(ds => (ds as FeatureLayerDataSource)?.getLayerDefinition?.()?.id === layer?.layerId)
    return match
  }

  const sort = () => {
    eventDetails.sort((a, b) => {
      const attrA = a?.attributes
      const attrB = b?.attributes
      const dateA = attrA[a.fromDate]
      const dateB = attrB[b.fromDate]
      return dateA - dateB
    })
  }

  const getAttributeValueTableEvents = (type: string) => {
    const maxDate = 8640000000000000
    const minDate = -8640000000000000

    const tablesDiv = []
    const networkId = selectedNetwork?.id
    const networkFromDt = selectedTimeInfo?.fromDate !== null ? selectedTimeInfo?.fromDate : minDate
    const networkToDt = selectedTimeInfo?.toDate !== null ? selectedTimeInfo?.toDate : maxDate
    // sort the events on fromDate
    sort()
    eventDetails?.forEach((event) => {
      const fieldInfos = event?.fieldInfos
      const attributes = event?.attributes
      const fromDt = event?.fromDate
      const toDt = event?.toDate
      const eventRouteId = attributes[event?.routeIdFieldName]
      const fromDtEpoch = attributes[fromDt]
      const fromDate = fromDtEpoch ? getDateWithTZOffset(fromDtEpoch, selectedNetwork.routes[routeCount].ds).toLocaleDateString() : getI18nMessage('nullStr')
      const toDateEpoch = attributes[toDt]
      const toDate = toDateEpoch ? getDateWithTZOffset(toDateEpoch, selectedNetwork.routes[routeCount].ds).toLocaleDateString() : getI18nMessage('nullStr')
      let defaultAttributeSet = event?.defaultLineAttributeSet
      if (type === 'point') defaultAttributeSet = event?.defaultPointAttributeSet
      let isPassCheck = false

      if (event?.parentNetworkId === networkId) {
        // check if it is a spanning line event
        if (type === 'line' && selectedRoutes[routeCount]?.supportsLines && event?.canSpanRoutes) {
          const recordRouteIdName = selectedNetwork?.routes?.[routeCount]?.routeIdFieldName
          const eventRouteIdName = event.routeIdFieldName
          const eventToRouteIdName = event.toRouteIdFieldName
          const orderIdName = selectedNetwork?.routes?.[routeCount]?.lineOrderFieldName
          const records = selectedNetwork?.routes?.[routeCount]?.records?.records
          const networkOrderId = selectedTimeInfo?.attributes[orderIdName]
          const fromRoute = records.find(item => item.feature.attributes[recordRouteIdName] === event.attributes[eventRouteIdName])
          const toRoute = records.find(item => item.feature.attributes[recordRouteIdName] === event.attributes[eventToRouteIdName])
          if ((toRoute.feature.attributes[orderIdName] >= networkOrderId) && (networkOrderId >= (fromRoute.feature.attributes[orderIdName]))) {
            isPassCheck = true
          }
        } else {
          if ((event?.parentNetworkId === networkId) && (selectedRoutes[routeCount]?.routeId === eventRouteId)) {
            isPassCheck = true
          }
        }
      }

      // display event details for events on the selected route
      if (isPassCheck) {
        const validAttributeSet = event.attributeSets?.attributeSet.find(obj => obj.title === defaultAttributeSet)
        const layers = validAttributeSet?.layers

        layers?.forEach((layer) => {
          const tableRows = []
          const featureLayerDS = getDataSource(layer) as FeatureLayerDataSource
          if (!featureLayerDS) { /* if layer is removed don't use it */ } else {
            const featureLayer = featureLayerDS?.layer
            const featureLayerFields = featureLayer.fields
            const eventFromDt = attributes[fromDt] !== null ? attributes[fromDt] : minDate
            const eventToDt = attributes[toDt] !== null ? attributes[toDt] : maxDate
            if ((layer?.layerId === event.eventLayerId) && (
              // @ts-expect-error
              ((networkFromDt <= eventFromDt <= networkToDt) || (networkFromDt <= eventToDt <= networkToDt))
            )) {
              const fields = layer?.fields
              fields.forEach((field) => {
                const match = featureLayerFields.find(l => l.name === field.name)
                const fieldName = field?.name
                const fieldType = match?.type
                const codeValueLabel = getCodedValueLabel(fieldName, attributes[fieldName], fieldInfos)
                let val
                if (!codeValueLabel) {
                  val = attributes[fieldName]
                  if (fieldType?.toLowerCase() === 'date') val = val ? getDateWithTZOffset(val, selectedNetwork.routes[routeCount].ds).toLocaleDateString() : null
                } else val = codeValueLabel
                if (fieldType?.toLowerCase() === 'date') val = val ? getDateWithTZOffset(val, selectedNetwork.routes[routeCount].ds).toLocaleDateString() : null
                tableRows.push({ name: fieldName, val: val, layerName: layer?.layerName, fromDate: fromDate, toDate: toDate })
              })
              tablesDiv.push(createEventsTable(tableRows))
              tablesDiv.push(addPadding())
            }
          }
        })
      }
    })
    return tablesDiv
  }

  const addPadding = () => {
    return (
      <div style={{ paddingTop: '0.5rem' }}></div>
    )
  }

  const createEventsTable = (attributeVals) => {
    const fromDate = attributeVals?.[0]?.fromDate
    const toDate = attributeVals?.[0]?.toDate
    // to-do add string to translations
    const label = attributeVals?.[0]?.layerName + ' (' + fromDate + ' - ' + toDate + ')'
    const eventDetailsDiv = (
      <CollapsablePanel
        label={label}
        level={0}
        type="default"
    >
      <CalciteTable
        className='w-100 h-100'
        caption={getI18nMessage('routePicker')}
        bordered
        scale='s'
        layout='fixed'
      >
        <CalciteTableRow>
          <CalciteTableHeader heading={formatMessage(intl, 'attribute')}></CalciteTableHeader>
          <CalciteTableHeader heading={formatMessage(intl, 'value')}></CalciteTableHeader>
        </CalciteTableRow>
        {attributeVals?.map((val, index) => {
          return (<CalciteTableRow>
            <calcite-table-cell itemKey={index}>
            {val.name}
            </calcite-table-cell>
            <calcite-table-cell itemKey={index}>
            {val.val}
            </calcite-table-cell>
          </CalciteTableRow>)
        })}
      </CalciteTable>
    </CollapsablePanel>
    )
    return eventDetailsDiv
  }

  const getNextRouteDetails = (val) => {
    clearPickedGraphic()
    const count = val - 1
    setSelectedRouteCount(count)
    setSelectedTimeInfo(routeDetails[selectedNetworkCount]?.routes?.[count]?.timeDependedInfo?.[0])
    onRouteInfoUpdated(routeDetails[selectedNetworkCount]?.routes?.[count], true)
  }

  const renderTimeDropdown = () => {
    return (
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div style={{ width: '30%' }}>
          <Label>
            {getI18nMessage('dateStr')}
          </Label>
        </div>
        <div>
          {/*// @ts-expect-error */}
          <Select size='sm' value={selectedTimeInfo} onChange={(event) => { handleTimeChange(event) }}>
            {route?.timeDependedInfo?.map((info: any, i) =>
            //@ts-expect-error
              <Option key={i} title={info.fromDate}
                value={info} label={info.fromDate}>
                  <span>{info.fromDate ? getDateWithTZOffset(info.fromDate, selectedNetwork.routes[routeCount].ds).toLocaleDateString() : getI18nMessage('nullStr')}</span>
                  <span style={{ paddingLeft: '0.3rem', paddingRight: '0.3rem' }}>{getI18nMessage('toStr')}</span>
                  <span>{info.toDate ? getDateWithTZOffset(info.toDate, selectedNetwork.routes[routeCount].ds).toLocaleDateString() : getI18nMessage('nullStr')}</span>
              </Option>
            )}
          </Select>
        </div>
    </div>
    )
  }

  const renderAttrValTable = (attributeVals) => {
    return (
      <CalciteTable
        className='w-100 h-100'
        caption={getI18nMessage('routePicker')}
        bordered
        scale='s'
        layout='fixed'
      >
        <calcite-table-row slot='table-header'>
          <calcite-table-header heading={formatMessage(intl, 'attribute')}></calcite-table-header>
          <calcite-table-header heading={formatMessage(intl, 'value')}></calcite-table-header>
        </calcite-table-row>
        {attributeVals?.map((val, index) => {
          return (
            <CalciteTableRow key={index}>
              <calcite-table-cell itemKey={index}>
              {val.name}
              </calcite-table-cell>
              <calcite-table-cell itemKey={index}>
              {val.val}
              </calcite-table-cell>
            </CalciteTableRow>
          )
        })}
      </CalciteTable>
    )
  }

  const renderAttrValTableEvents = (type: string) => {
    return getAttributeValueTableEvents(type)
  }

  const renderSelectedMeasure = () => {
    const measures = selectedTimeInfo?.selectedMeasures
    const measureDiv = []
    for (let i = 1; i < measures.length; i++) {
      measureDiv.push(
        <div style={{ display: 'flex', flexDirection: 'row', paddingBottom: '0.5rem' }}>
          <div style={{ width: '30%' }}></div>
            <span>{measures[i]}</span>
            <span style={{ paddingLeft: '0.2rem' }}>{selectedRoutes[routeCount].measureUnit}</span>
          </div>
      )
    }
    return measureDiv
  }

  const renderRouteDetails = (route) => {
    const attributeVals = getAttributeValueTable(selectedTimeInfo?.attributes, route?.fieldInfos, route)
    const lineEvents = renderAttrValTableEvents('line')
    const pointEvents = renderAttrValTableEvents('point')

    const routeDetailsDiv = (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {route.routeId && (
            <div style={{ display: 'flex', flexDirection: 'row', paddingTop: '0.5rem' }}>
              <div style={{ width: '30%', flex: 'none' }}>
                <Label>
                {getI18nMessage('routeId')}
                </Label>
              </div>
              <div title={route.routeId} style = {{ width: 'fitContent', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {route.routeId}
              </div>
          </div>
          )}
          {route.routeName && (
            <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div style={{ width: '30%' }}>
              <Label>
              {getI18nMessage('routeName')}
              </Label>
            </div>
            <div>
              {route.routeName}
            </div>
          </div>
          )}
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div style={{ width: '30%' }}>
              <Label>
              {getI18nMessage('measureLabel')}
              </Label>
            </div>
            <div>
              <span>{selectedTimeInfo.selectedMeasures?.[0]}</span>
              <span style={{ paddingLeft: '0.2rem' }}>{selectedRoutes[routeCount].measureUnit}</span>
            </div>
          </div>
          {selectedTimeInfo.selectedMeasures?.length > 1 && (
            renderSelectedMeasure()
          )}
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div style={{ width: '30%' }}>
              <Label>
                {getI18nMessage('startMeasure')}
              </Label>
            </div>
            <div>
              <span>{selectedTimeInfo.fromMeasure}</span>
              <span style={{ paddingLeft: '0.2rem' }}>{selectedTimeInfo.measureUnit}</span>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div style={{ width: '30%' }}>
              <Label>
              {getI18nMessage('endMeasure')}
              </Label>
            </div>
            <div>
              <span> {selectedTimeInfo.toMeasure}</span>
              <span style={{ paddingLeft: '0.2rem' }}>{selectedTimeInfo.measureUnit}</span>
            </div>
          </div>
          {renderTimeDropdown()}
          {attributeVals && (attributeVals?.length > 0) && (
            <div style={{ paddingTop: '0.5rem' }}>
              {renderAttrValTable(attributeVals)}
            </div>
          )}
          {lineEventToggle && (lineEvents?.length > 0) && (
            <div style={{ paddingTop: '1.5rem' }}>
              {getI18nMessage('lineEvent')}
              {lineEvents}
            </div>
          )}
          {pointEventToggle && (pointEvents?.length > 0) && (
            <div style={{ paddingTop: '0.5rem' }}>
              {getI18nMessage('pointEvent')}
              {pointEvents}
            </div>
          )}
        </div>
    )
    return routeDetailsDiv
  }

  return (
    <div style={{ position: 'relative' }}>
    {showPp && routeDetails && routeDetails.length > 0 && <FloatingPanel
      headerTitle={getI18nMessage('identifyResults')}
      size={size}
      defaultPosition={windowLocation}
      position={windowLocation}
      disableActivateOverlay={false}
      dragBounds='body'
      onDrag={handleDrag}
      onResize={handleResize}
      onHeaderClose={handleSelectionCancel}
    >
      <div css={getCalciteBasicTheme()}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        padding: '10px',
        overflowY: 'scroll',
        height: 'inherit'
      }}>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div style={{ width: '30%' }}>
              <Label>
              {getI18nMessage('networkLabel')}
              </Label>
            </div>
            <div style={{ width: '50%' }}>
              {/*// @ts-expect-error */}
              <Select size='sm' value={selectedNetwork} onChange={handleNetworkChange}>
                {routeDetails.map((info: any, i) =>
                //@ts-expect-error
                  <Option key={i} title={info.layerName} value={info} label={info.layerName}>
                    {info.layerName}
                  </Option>
                )}
              </Select>
            </div>
          </div>
          {route && renderRouteDetails(route)}
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', paddingBottom: '0.5rem', paddingTop: '0.5rem' }}>
          <Pagination
            current={routeCount + 1}
            onChangePage={(val) => { getNextRouteDetails(val) }}
            simple
            size="sm"
            totalPage={selectedNetwork?.routes?.length}
          />
        </div>
      </div>
    </FloatingPanel>}
    </div>
  )
}
