/** @jsx jsx */
import {
  React,
  type ImmutableObject,
  type DataSource,
  type CodedValue,
  type FeatureLayerDataSource,
  jsx,
  JimuFieldType,
  classNames,
  hooks,
  type IntlShape
} from 'jimu-core'
import { Label, NumericInput, Select } from 'jimu-ui'
import { Identifiers, type RouteAndMeasureQuery, type NetworkItem } from '../../config'
import { IntellisenseTextInput, formatMessage } from 'widgets/shared-code/lrs'
import defaultMessages from '../translations/default'

export interface RouteInputControlProps {
  intl: IntlShape
  reset: boolean
  widgetId: string
  networkItem?: ImmutableObject<NetworkItem>
  dataSource: DataSource
  isDataSourceReady: boolean
  routeAndMeasureRequest: RouteAndMeasureQuery
  onChange: (request: RouteAndMeasureQuery, index?: number) => void
  onAccept: (request: RouteAndMeasureQuery, isValid: boolean, index?: number) => void
}

export const RouteInputControl = React.memo((props: RouteInputControlProps) => {
  const { intl, reset, widgetId, networkItem, dataSource, isDataSourceReady, routeAndMeasureRequest, onChange, onAccept } = props
  const { routeIdField, routeNameField, routeIdFields } = networkItem
  const getI18nMessage = hooks.useTranslation(defaultMessages)

  const originDS = React.useMemo(() => {
    return dataSource
  }, [dataSource])

  const acceptIndexedRouteId = (value: string | number, index: number) => {
    updateFieldAndValidation(value, true, index)
  }

  const acceptIndexRouteIdCodedValue = (e, index: number) => {
    updateFieldAndValidation(e.target.value, true, index)
  }

  const handleRouteChange = (value: string, index?: number) => {
    updateField(value, index)
  }

  const handleRouteAccept = (value: string, isValid: boolean, index?: number) => {
    updateFieldAndValidation(value, isValid, index)
  }

  const updateFieldAndValidation = (value: string | number, isValid: boolean, index?: number) => {
    const request = routeAndMeasureRequest
    // Update request based on identifer being used for the network.
    if (networkItem.defaultIdentifer === Identifiers.RouteId && typeof value === 'string') {
      request.routeId = value
      onAccept(request, isValid)
    } else if (networkItem.defaultIdentifer === Identifiers.RouteName && typeof value === 'string') {
      request.routeName = value
      onAccept(request, isValid)
    } else {
      request.routeIdFields[index] = value
      onAccept(request, isValid, index)
    }
  }

  const updateField = (value: string | number, index?: number) => {
    const request = routeAndMeasureRequest
    // Updates the request based on current input.
    if (networkItem.defaultIdentifer === Identifiers.RouteId && typeof value === 'string') {
      request.routeId = value
      onChange(request)
    } else if (networkItem.defaultIdentifer === Identifiers.RouteName && typeof value === 'string') {
      request.routeName = value
      onChange(request)
    } else {
      request.routeIdFields[index] = value
      onChange(request, index)
    }
  }

  const codedValueDomains: { [index: number]: CodedValue[] } = React.useMemo(() => {
    // Check if any fields from routeIdFields is a domain field. If it is, store
    // the values to add the UI.
    const newValues: { [index: number]: CodedValue[] } = {}
    if (routeIdFields && routeIdFields.length > 1 && originDS) {
      routeIdFields.forEach((item, index) => {
        const codedValues = (originDS as FeatureLayerDataSource)?.getFieldCodedValueList(item.field.jimuName)
        if (codedValues) {
          newValues[index] = codedValues
        }
      })
    }
    return newValues
  }, [originDS, routeIdFields])

  return (
    <div className='route-input-control'>
      {networkItem.defaultIdentifer === Identifiers.RouteId && (
        <div className="search-by-measure-form__route-id-label px-3">
          <Label size="default" className='mb-0 w-100' centric style={{ fontWeight: 500 }}>
            {getI18nMessage('fieldNameRequired', { field: routeIdField.alias }) }
          </Label>
          <IntellisenseTextInput
            reset={reset}
            widgetId={widgetId}
            fieldName={networkItem.routeIdField.name}
            fieldType={networkItem.routeIdField.type}
            dataSource={dataSource}
            isDataSourceReady={isDataSourceReady}
            onChange={handleRouteChange}
            onAccept={handleRouteAccept}
          />
        </div>
      )}
      {networkItem.defaultIdentifer === Identifiers.RouteName && (
        <div className="search-by-measure-form__route-name-label px-3">
          <Label size="default" className='mb-0 w-100' centric style={{ fontWeight: 500 }}>
            {getI18nMessage('fieldNameRequired', { field: routeNameField.alias }) }
          </Label>
          <IntellisenseTextInput
            reset={reset}
            widgetId={widgetId}
            fieldName={networkItem.routeNameField.name}
            fieldType={networkItem.routeNameField.type}
            dataSource={dataSource}
            isDataSourceReady={isDataSourceReady}
            onChange={handleRouteChange}
            onAccept={handleRouteAccept}
          />
        </div>
      )}
      {networkItem.defaultIdentifer === Identifiers.MultiField && (
        routeIdFields.filter(item => item.enabled).map((item, index) => {
          return (
            <div key={index} className="search-by-measure-form__multi-field-id px-3">
              {codedValueDomains[index] && (
                <div className={classNames('search-by-measure-form__coded-domain-label', {
                  'pt-2': index > 0
                })}>
                  <Label size="default" className='mb-0 w-100' centric style={{ fontWeight: 500 }}>
                    { item.field.alias }
                  </Label>
                  <Select
                    aria-label={item.field.name}
                    size='sm'
                    style={{ width: '100%' }}
                    value={routeAndMeasureRequest?.routeIdFields?.[index]}
                    onChange={(value) => { acceptIndexRouteIdCodedValue(value, index) }}>
                    <option key={-1} value={''}>{formatMessage(intl, 'nullLabel')}</option>
                    {codedValueDomains[index].map((element, i) => {
                      return (
                        <option key={i} value={element.value}>{ `${element.value} - ${element.label}`}</option>
                      )
                    })
                    }
                    </Select>
                </div>
              )}
              {!codedValueDomains[index] && item.field.type === JimuFieldType.Number && (
                <div className={classNames('search-by-measure-form__numeric-label', {
                  'pt-2': index > 0
                })}>
                  <Label size="default" className='mb-0 w-100' centric style={{ fontWeight: 500 }}>
                    {item.field.alias}
                  </Label>
                  <NumericInput
                    value={routeAndMeasureRequest?.routeIdFields?.[index]}
                    aria-label={item.field.name}
                    size='sm'
                    style={{ width: '100%' }}
                    step={1}
                    disabled={!isDataSourceReady}
                    onAcceptValue={(value) => { acceptIndexedRouteId(value, index) }}/>
                </div>
              )}
              {!codedValueDomains[index] && item.field.type === JimuFieldType.String && (
                <div className={classNames('search-by-measure-form__text-label', {
                  'pt-2': index > 0
                })}>
                    <Label size="default" className='mb-0 w-100' centric style={{ fontWeight: 500 }}>
                      {item.field.alias}
                  </Label>
                  <IntellisenseTextInput
                    reset={reset}
                    widgetId={widgetId}
                    fieldName={item.field.name}
                    fieldType={item.field.type}
                    dataSource={dataSource}
                    isDataSourceReady={isDataSourceReady}
                    onChange={(value) => { handleRouteChange(value, index) }}
                    onAccept={(value, isValid) => { handleRouteAccept(value, isValid, index) }}
                  />
                </div>
              )}
            </div>
          )
        })
      )}
    </div>
  )
})