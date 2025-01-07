import { type IntlShape } from 'jimu-core'
import { GetUnits, isDefined } from 'widgets/shared-code/lrs'
import { type FeatureLayerDataSource } from 'jimu-arcgis'
import { type ImmutableObject } from 'seamless-immutable'
import { Identifiers, type NetworkItem } from '../../config'
import { measureFields, distanceField, stationField } from '../../constants'

/**
 * Converts a station value (ie 100+00 or 100+000) to a numerical value. If
 * the value is not a valid station value, NaN is returned.
*/
export function convertStationToNumber (station: string): number {
  const stationFeetRegExp: RegExp = /^-?\d+\+\d{2}(\.\d+)?$/g
  const stationMeterRegExp: RegExp = /^-?\d+\+\d{3}(\.\d+)?$/g
  if (station != null && stationFeetRegExp.test(station)) {
    const isNegative = station.charAt(0) === '-'
    const valuesArray = station.split('+')
    let parsedValue = parseInt(valuesArray[0], 10) * 100
    if (isNaN(parsedValue)) {
      parsedValue = NaN
    } else if (valuesArray.length === 2) {
      if (isNegative) {
        parsedValue -= parseFloat(valuesArray[1])
      } else {
        parsedValue += parseFloat(valuesArray[1])
      }
    }
    return parsedValue
  } else if (station != null && stationMeterRegExp.test(station)) {
    const isNegative = station.charAt(0) === '-'
    const valuesArray = station.split('+')
    let parsedValue = parseInt(valuesArray[0], 10) * 1000
    if (isNaN(parsedValue)) {
      parsedValue = NaN
    } else if (valuesArray.length === 2) {
      if (isNegative) {
        parsedValue -= parseFloat(valuesArray[1])
      } else {
        parsedValue += parseFloat(valuesArray[1])
      }
    }
    return parsedValue
  }
  return NaN
}

/**
 * Returns the popup template for an individual record.
 */
export function getPopupTemplate (intl: IntlShape, record: __esri.Graphic, outputDS: FeatureLayerDataSource, networkItem: ImmutableObject<NetworkItem>) {
  const allFieldsSchema = outputDS.getSchema()
  const fields = allFieldsSchema?.fields ? Object.values(allFieldsSchema.fields).map(field => field.jimuName) : []
  const fieldsToDisplay = getNetworkFieldNamesForDisplay(networkItem, record)
  const resultTitle = `{${getNetworkTitleField(networkItem)}}`

  if (fields) {
    const fieldInfos = []
    fieldsToDisplay.forEach((fieldName) => {
      const fieldInfo = fields.find(fieldInfo => fieldInfo === fieldName)
      if (fieldInfo) {
        if (fieldName === distanceField.value) {
          // Add units to the Distance label.  For GCS, we show meters.  For PCS, we show units of XY tolerance.
          const dataSource: any = outputDS.getOriginDataSources()[0]
          const xyUnits = dataSource?.layerDefinition?.geometryProperties?.units
          const isGeographic = xyUnits === 'esriDecimalDegrees'
          fieldInfos.push({
            fieldName: fieldInfo,
            // i18n TODO: add string to resource file
            label: fieldInfo + (isGeographic ? ' (' + GetUnits('esriMeters', intl) + ')' : (isDefined(xyUnits) ? ' (' + GetUnits(xyUnits, intl) + ')' : ''))
          })
        } else {
          fieldInfos.push({
            fieldName: fieldInfo,
            label: fieldInfo
          })
        }
      }
    })
    return {
      fieldInfos,
      content: [{
        type: 'fields'
      }],
      title: resultTitle
    }
  } else {
    return null
  }
}

export function getToleranceInMapCoords (jimuMapView, pixelTolerance: number = 5): number {
  //calculate map coords represented per pixel
  const viewExtentWidth: number = jimuMapView.view.extent.width
  const viewWidth: number = jimuMapView.view.width
  const pixelWidth = viewExtentWidth / viewWidth
  //calculate map coords for tolerance in pixel
  return pixelTolerance * pixelWidth
}

/**
 * Gets the fields that will be displayed in the popup template. Excludes to measure, stations, and distance fields
 * if they are not populated.
 * */
function getNetworkFieldNamesForDisplay (networkItem: ImmutableObject<NetworkItem>, record: __esri.Graphic): string[] {
  const fieldNames: string[] = []

  // There will always be a routeId.
  fieldNames.push(networkItem.routeIdField.jimuName)

  // Include network name if configured.
  if (networkItem.useRouteName) {
    fieldNames.push(networkItem.routeNameField.jimuName)
  }

  // If multi field configuration is selected, display each field.
  if (networkItem.defaultIdentifer === Identifiers.MultiField) {
    networkItem.routeIdFields.forEach((item) => {
      fieldNames.push(item.field.jimuName)
    })
  }

  const toMeasure = record.attributes[measureFields.at(1).value]
  const station = record.attributes[stationField.at(0).value]
  const fromStation = record.attributes[stationField.at(1).value]
  const toStation = record.attributes[stationField.at(2).value]
  const distance = record.attributes[distanceField.value]

  // Include from and to measures.
  fieldNames.push(measureFields.at(0).value)
  if (!isNaN(toMeasure) && toMeasure !== null && toMeasure !== undefined) {
    fieldNames.push(measureFields.at(1).value)
  }

  // Include station and distance fields.
  if (station !== null && station !== undefined) {
    fieldNames.push(stationField.at(0).value)
  }
  if (fromStation !== null && fromStation !== undefined) {
    fieldNames.push(stationField.at(1).value)
  }
  if (toStation !== null && toStation !== undefined) {
    fieldNames.push(stationField.at(2).value)
  }
  if (distance !== null && distance !== undefined) {
    fieldNames.push(distanceField.value)
  }

  // Include the date fields.
  if (networkItem.fromDateFieldName) {
    fieldNames.push(networkItem.fromDateFieldName)
  }
  if (networkItem.toDateFieldName) {
    fieldNames.push(networkItem.toDateFieldName)
  }
  return fieldNames
}

function getNetworkTitleField (networkItem: ImmutableObject<NetworkItem>): string {
  // Use route name field as the display if configured.
  if (networkItem.defaultIdentifer === Identifiers.RouteName) {
    return networkItem.routeNameField.jimuName
  }

  // All other cases use route id.
  return networkItem.routeIdField.jimuName
}

/**
 * Creates the label expression used for the label layer.
 */
export function createLableExpression (networkItem: ImmutableObject<NetworkItem>, isPoint: boolean): string {
  let expression = ''
  if (isPoint) {
    if (networkItem.useRouteName) {
      expression = `'${networkItem.routeNameField.alias}: ' + $feature.${networkItem.routeNameField.name} + textformatting.NewLine + 
                    '${measureFields.at(0).label}: ' + $feature.Measure`
    } else {
      expression = `'${networkItem.routeIdField.alias}: ' + $feature.${networkItem.routeIdField.name} + textformatting.NewLine + 
                    '${measureFields.at(0).label}: ' + $feature.Measure`
    }
  } else {
    if (networkItem.useRouteName) {
      expression = `'${networkItem.routeNameField.alias}: ' + $feature.${networkItem.routeNameField.name} + textformatting.NewLine +
                    '${measureFields.at(0).label}: ' + $feature.Measure + textformatting.NewLine +
                    '${measureFields.at(1).label}: ' + $feature.ToMeasure`
    } else {
      expression = `'${networkItem.routeIdField.alias}: ' + $feature.${networkItem.routeIdField.name} + textformatting.NewLine +
                    '${measureFields.at(0).label}: ' + $feature.Measure + textformatting.NewLine +
                    '${measureFields.at(1).label}: ' + $feature.ToMeasure`
    }
  }
  return expression
}

/**
 * Returns a set of unique dates in sorted order.
 */
export function getUniqueDates (dates: Date[]): Date[] {
  const uniqueTimesSet = new Set<number>()
  dates.forEach((interval) => {
    if (interval.valueOf() === 0) {
      return
    }

    if (!uniqueTimesSet.has(interval.valueOf())) {
      uniqueTimesSet.add(interval.valueOf())
    }
  })

  const allTimeAsDates = Array.from(uniqueTimesSet).map((date) => new Date(date))
  return Array.from(allTimeAsDates).sort((a, b) => a.getTime() - b.getTime())
}
