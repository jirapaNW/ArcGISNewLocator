import {
  type FeatureLayerDataSource,
  type FeatureLayerQueryParams,
  type DataRecord,
  DataRecordSetChangeMessage,
  RecordSetChangeType,
  MessageManager,
  type ImmutableObject,
  JimuFieldType,
  loadArcGISJSAPIModules,
  DataSourceStatus,
  SessionManager
}
  from 'jimu-core'
import { type IMConfig, type NetworkItem, type RouteAndMeasureQuery, type GeometryToMeasureLocation, type MeasureToGeometryResponse, type ReferentQuery, type CoordinateQuery, type GeometryToMeasureResponse, SpatialReferenceFrom, SearchMeasuresType } from '../../config'
import { type IFieldInfo } from '@esri/arcgis-rest-feature-service'
import { measureFields, distanceField, stationField, networkObjectIdField } from '../../constants'
import { round } from 'lodash-es'
import { getPolylineMidPoint, ConvertUnits, isDefined, requestService, getDateWithTZOffset } from 'widgets/shared-code/lrs'
import { type JimuMapView } from 'jimu-arcgis'
import { getUniqueDates } from './utils'

/**
 * Finds the original record that was used to create the current record.
 * @param record The record created in search by route.
 * @param featureDS The original feature layer data source.
 * @param network The current network item.
 * @returns The original record.
 */
export async function getOriginalNetworkRecords (record: DataRecord, featureDS: FeatureLayerDataSource, network: ImmutableObject<NetworkItem>, jimuMapView: JimuMapView): Promise<DataRecord> {
  const routeId = record.getFieldValue(network.routeIdField.name)
  const whereClause = `${network.routeIdField.name} = '${routeId}'`

  // If the layer of the input dataSource is available, use the featureQuery over query. This is because
  // of an issue where the query results in pbf format results in incorrect geometry if an output
  // spatial reference is not specified.
  if (isDefined(featureDS && isDefined(featureDS.layer))) {
    const query = featureDS.layer.createQuery()
    query.spatialRelationship = 'intersects'
    query.outSpatialReference = jimuMapView.view.spatialReference
    query.returnGeometry = true
    query.outFields = ['*']
    query.returnM = true
    query.returnZ = true
    query.where = whereClause

    const originalOid = record.getFieldValue(networkObjectIdField.value)
    return featureDS.layer.queryFeatures(query).then((results) => {
      if (results.features?.length > 0) {
        const records = results.features.map((feature) => {
          return featureDS.buildRecord(feature)
        })
        return records.find((result) => {
          return result.getId() === originalOid
        })
      }
      return null
    }).catch((e: any) => {
      return null
    })
  } else {
    const featureQuery: FeatureLayerQueryParams = ({
      returnGeometry: true,
      returnM: true,
      returnZ: true,
      where: whereClause,
      spatialRel: 'esriSpatialRelIntersects'
    })

    const originalOid = record.getFieldValue(networkObjectIdField.value)
    return featureDS.query(featureQuery).then((results) => {
      if (results.records?.length > 0) {
        return results.records.find((result) => {
          return result.getId() === originalOid
        })
      }
      return null
    }).catch((e: any) => {
      return null
    })
  }
}

export async function queryRoutes (
  originDS: FeatureLayerDataSource,
  networkConfig: ImmutableObject<NetworkItem>,
  routeQuery: RouteAndMeasureQuery,
  jimuMapView: JimuMapView
): Promise<DataRecord[]> {
  const dataRecords: DataRecord[] = []

  let whereClause = ''
  if (routeQuery.routeId.length > 0) {
    whereClause = `LOWER(${networkConfig.routeIdField.jimuName}) LIKE LOWER('${routeQuery.routeId}')`
  } else if (routeQuery.routeName.length > 0) {
    whereClause = `LOWER(${networkConfig.routeNameField.jimuName}) LIKE LOWER('${routeQuery.routeName}')`
  } else {
    routeQuery.routeIdFields.forEach((item, index) => {
      if (item) {
        if (networkConfig.routeIdFields[index].field.type === JimuFieldType.Number) {
          if (whereClause.length > 0) {
            whereClause += ' AND '
          }
          whereClause += `${networkConfig.routeIdFields[index].field.name} LIKE ${routeQuery.routeIdFields[index]}`
        } else {
          if (item.length > 0) {
            if (whereClause.length > 0) {
              whereClause += ' AND '
            }
            whereClause += `LOWER(${networkConfig.routeIdFields[index].field.name}) LIKE LOWER('${routeQuery.routeIdFields[index]}')`
          }
        }
      }
    })
  }

  // If the layer of the input dataSource is available, use the featureQuery over query. This is because
  // of an issue where the query results in pbf format results in incorrect geometry if an output
  // spatial reference is not specified.
  if (isDefined(originDS && isDefined(originDS.layer))) {
    return await loadArcGISJSAPIModules(['esri/TimeExtent']).then(modules => {
      let TimeExtent: typeof __esri.TimeExtent = null
      TimeExtent = modules[0]

      const query = originDS.layer.createQuery()
      query.spatialRelationship = 'intersects'
      query.outSpatialReference = jimuMapView.view.spatialReference
      query.returnGeometry = true
      query.outFields = ['*']
      query.returnM = true
      query.returnZ = true
      query.where = whereClause
      query.orderByFields = []

      if (networkConfig.sortOptions?.length > 0) {
        Object.assign(query.orderByFields, {
          orderByFields: networkConfig.sortOptions.map(item => `${item.jimuFieldName} ${item.order}`)
        })
      }

      const queryParams = originDS.getCurrentQueryParams()
      if (queryParams?.time) {
        query.timeExtent = new TimeExtent({ start: queryParams.time[0], end: queryParams.time[1] })
      }

      return originDS.layer.queryFeatures(query).then((results) => {
        if (results.features?.length > 0) {
          return results.features.map((feature) => {
            return originDS.buildRecord(feature)
          })
        }
        return dataRecords
      }).catch((e: any) => {
        return dataRecords
      })
    })
  } else {
    const queryParams = originDS.getCurrentQueryParams()
    const featureQuery: FeatureLayerQueryParams = ({
      returnGeometry: true,
      returnM: true,
      returnZ: true,
      where: whereClause,
      time: queryParams?.time,
      outFields: ['*'],
      notAddFieldsToClient: true
    })

    if (networkConfig.sortOptions?.length > 0) {
      Object.assign(featureQuery, {
        orderByFields: networkConfig.sortOptions.map(item => `${item.jimuFieldName} ${item.order}`)
      })
    }

    return originDS.query(featureQuery).then((results) => {
      if (results.records?.length > 0) {
        return results.records
      }
      return dataRecords
    }).catch((e: any) => {
      return dataRecords
    })
  }
}

export async function queryRoutesByGeometry (
  originDS: FeatureLayerDataSource,
  networkConfig: ImmutableObject<NetworkItem>,
  query: CoordinateQuery
): Promise<DataRecord[]> {
  const dataRecords: DataRecord[] = []
  let featureQuery: FeatureLayerQueryParams

  let Point: typeof __esri.Point = null
  let SpatialReference: typeof __esri.SpatialReference = null
  await loadArcGISJSAPIModules(['esri/geometry/Point', 'esri/geometry/SpatialReference']).then(modules => {
    [Point, SpatialReference] = modules
  }).then(() => {
    const point = new Point()
    point.x = query.xCoordinate
    point.y = query.yCoordinate

    if (query.zCoordinate) {
      point.z = query.zCoordinate
    } else {
      point.z = 0
    }

    if (networkConfig.defaultSpatialReferenceFrom === SpatialReferenceFrom.Map) {
      point.spatialReference = new SpatialReference({ wkid: 102100 })
    } else {
      point.spatialReference = new SpatialReference({ wkid: networkConfig.spatialReferenceInfo.wkid, wkt: networkConfig.spatialReferenceInfo.wkt })
    }

    let timeExtent = originDS.getTimeInfo()?.timeExtent ?? 0
    const queryParams = originDS.getCurrentQueryParams()
    if (queryParams?.time) {
      timeExtent = [queryParams.time[0], queryParams.time[1]]
    }

    featureQuery = ({
      returnGeometry: true,
      returnM: true,
      returnZ: true,
      geometry: (point as any).toJSON ? (point as any).toJSON() : point,
      geometryType: 'esriGeometryPoint',
      spatialRel: 'esriSpatialRelIntersects',
      time: timeExtent
    })

    if (networkConfig.sortOptions?.length > 0) {
      Object.assign(featureQuery, {
        orderByFields: networkConfig.sortOptions.map(item => `${item.jimuFieldName} ${item.order}`)
      })
    }
  })

  return originDS.query(featureQuery).then((results) => {
    if (results.records?.length > 0) {
      return results.records
    }
    return dataRecords
  }).catch((e: any) => {
    return dataRecords
  })
}

export async function queryRoutesByGeometryWithTolerance (
  originDS: FeatureLayerDataSource,
  networkConfig: ImmutableObject<NetworkItem>,
  query: CoordinateQuery
): Promise<DataRecord[]> {
  const dataRecords: DataRecord[] = []
  let featureQuery: FeatureLayerQueryParams

  let Point: typeof __esri.Point = null
  let SpatialReference: typeof __esri.SpatialReference = null
  await loadArcGISJSAPIModules(['esri/geometry/Point', 'esri/geometry/SpatialReference']).then(modules => {
    [Point, SpatialReference] = modules
  }).then(() => {
    const point = new Point()
    point.x = query.xCoordinate
    point.y = query.yCoordinate

    if (query.zCoordinate) {
      point.z = query.zCoordinate
    } else {
      point.z = 0
    }

    if (networkConfig.defaultSpatialReferenceFrom === SpatialReferenceFrom.Map) {
      point.spatialReference = new SpatialReference({ wkid: 102100 })
    } else {
      point.spatialReference = new SpatialReference({ wkid: networkConfig.spatialReferenceInfo.wkid, wkt: networkConfig.spatialReferenceInfo.wkt })
    }

    let timeExtent = originDS.getTimeInfo()?.timeExtent ?? 0
    const queryParams = originDS.getCurrentQueryParams()
    if (queryParams?.time) {
      timeExtent = [queryParams.time[0], queryParams.time[1]]
    }
    const dataSource: any = originDS.getOriginDataSources()[0]

    // Get tolerance by converting search radius from network's units of measure to XY units.
    const fromUnits = networkConfig.unitsOfMeasure
    let toUnits = 'esriMeters'
    if (dataSource?.layerDefinition?.hasGeometryProperties &&
      dataSource?.layerDefinition?.geometryProperties?.units) {
      toUnits = dataSource?.layerDefinition?.geometryProperties?.units // xy-tolerance units
    }
    const searchRadius = ConvertUnits(networkConfig.searchRadius, fromUnits, toUnits)
    featureQuery = ({
      returnGeometry: true,
      returnM: true,
      returnZ: true,
      geometry: (point as any).toJSON ? (point as any).toJSON() : point,
      geometryType: 'esriGeometryPoint',
      spatialRel: 'esriSpatialRelIntersects',
      distance: searchRadius,
      units: 'esriSRUnit_Meter',
      time: timeExtent,
      outFields: [networkConfig.routeIdFieldName],
      notAddFieldsToClient: true
    })

    if (networkConfig.sortOptions?.length > 0) {
      Object.assign(featureQuery, {
        orderByFields: networkConfig.sortOptions.map(item => `${item.jimuFieldName} ${item.order}`)
      })
    }
  })

  return originDS.query(featureQuery).then((results) => {
    if (results.records?.length > 0) {
      return results.records
    }
    return dataRecords
  }).catch((e: any) => {
    return dataRecords
  })
}

export async function queryRoutesByClosestResults (
  originDS: FeatureLayerDataSource,
  networkConfig: ImmutableObject<NetworkItem>,
  outputDS: FeatureLayerDataSource,
  closestResults: any[],
  closestRouteIds: string[],
  resultWkid: number,
  widgetId: string,
  labelLayer?: __esri.FeatureLayer
): Promise<{ newRecords: any[] }> {
  const originDs: FeatureLayerDataSource = outputDS.getOriginDataSources()[0] as FeatureLayerDataSource
  const layerObject = await getLayerObject(originDs)
  const newDataRecords = []

  let whereClause = ''
  if (closestRouteIds.length > 0) {
    whereClause = networkConfig.routeIdField.jimuName + ' IN (\'' + closestRouteIds.join('\',\'') + '\')'
  } else {
    return { newRecords: newDataRecords }
  }

  let timeExtent = originDS.getTimeInfo()?.timeExtent ?? 0
  const queryParams = originDS.getCurrentQueryParams()
  if (queryParams?.time) {
    timeExtent = [queryParams.time[0], queryParams.time[1]]
  }

  const featureQuery: FeatureLayerQueryParams = ({
    returnGeometry: true,
    returnM: true,
    returnZ: true,
    where: whereClause,
    time: timeExtent,
    outFields: [networkConfig.routeIdField.jimuName],
    notAddFieldsToClient: true
  })

  if (networkConfig.sortOptions?.length > 0) {
    Object.assign(featureQuery, {
      orderByFields: networkConfig.sortOptions.map(item => `${item.jimuFieldName} ${item.order}`)
    })
  }

  return originDS.query(featureQuery).then(async (results) => {
    if (results.records?.length > 0) {
      const routeRecords = results.records

      let Point: typeof __esri.Point = null
      let SpatialReference: typeof __esri.SpatialReference = null
      let Graphic: typeof __esri.Graphic = null
      await loadArcGISJSAPIModules(['esri/geometry/Point', 'esri/geometry/SpatialReference', 'esri/Graphic']).then(modules => {
        [Point, SpatialReference, Graphic] = modules
      }).then(() => {
        closestResults.forEach((result) => {
          const routeIndex = routeRecords.findIndex(d => d.getFieldValue(networkConfig.routeIdField.jimuName) === result.routeId)
          if (routeIndex > -1) {
            const data = routeRecords[routeIndex].getData()
            data[measureFields.at(0).value] = round(result.measure, networkConfig.measurePrecision)
            data[distanceField.value] = round(result.distance, networkConfig.measurePrecision)
            data[networkObjectIdField.value] = routeRecords[routeIndex].getId()

            // Convert dates to time set it experience.
            const fromDt = data[networkConfig.fromDateFieldName]
            const toDt = data[networkConfig.toDateFieldName]
            if (toDt) {
              data[networkConfig.toDateFieldName] = getDateWithTZOffset(toDt, outputDS.getOriginDataSources()[0]).valueOf()
            }
            if (fromDt) {
              data[networkConfig.fromDateFieldName] = getDateWithTZOffset(fromDt, outputDS.getOriginDataSources()[0]).valueOf()
            }

            const spatialReference = new SpatialReference({ wkid: resultWkid })
            const geometry = new Point(result.geometry)
            geometry.spatialReference = spatialReference
            const feature = new Graphic({
              geometry: geometry,
              attributes: data
            })

            if (isDefined(labelLayer)) {
              labelLayer.applyEdits({
                addFeatures: [feature.clone()]
              })
            }
            const dataRecord = outputDS.buildRecord(feature)
            newDataRecords.push(dataRecord)
          }
        })
      })

      newDataRecords.forEach((record) => {
        const feature = (record).feature
        feature.sourceLayer = (layerObject as any).associatedLayer || layerObject
        feature.layer = feature.sourceLayer
      })
      outputDS.setSourceRecords(newDataRecords)
      outputDS.setStatus(DataSourceStatus.Unloaded)
      outputDS.setCountStatus(DataSourceStatus.Unloaded)
      publishMessage(outputDS, widgetId)

      return { newRecords: newDataRecords }
    }
    return { newRecords: newDataRecords }
  }).catch((e: any) => {
    return { newRecords: newDataRecords }
  })
}

export async function executeGeometryToMeasureWithTolerance (
  routeRecord: DataRecord,
  outputDS: FeatureLayerDataSource,
  networkItem: ImmutableObject<NetworkItem>,
  routeQuery: CoordinateQuery
): Promise<{ resultLocations: GeometryToMeasureLocation[], resultWkid: number }> {
  const dataSource: any = outputDS.getOriginDataSources()[0]
  const originDs: FeatureLayerDataSource = dataSource as FeatureLayerDataSource
  let gdbVersion = originDs.getGDBVersion()
  if (!gdbVersion) {
    gdbVersion = ''
  }
  // Get tolerance by converting search radius from network's units of measure to XY units.
  const fromUnits = networkItem.unitsOfMeasure
  let toUnits = networkItem.unitsOfMeasure
  if (dataSource?.layerDefinition?.hasGeometryProperties &&
    dataSource?.layerDefinition?.geometryProperties?.units) {
    toUnits = dataSource?.layerDefinition?.geometryProperties?.units // xy-tolerance units
  }
  const searchRadius = ConvertUnits(networkItem.searchRadius, fromUnits, toUnits)

  // Extract the route ids from the records and populate the REST request.
  const locations = []
  let Point: typeof __esri.Point = null
  let SpatialReference: typeof __esri.SpatialReference = null
  await loadArcGISJSAPIModules(['esri/geometry/Point', 'esri/geometry/SpatialReference']).then(modules => {
    [Point, SpatialReference] = modules
  }).then(() => {
    const point = new Point()
    point.x = routeQuery.xCoordinate
    point.y = routeQuery.yCoordinate

    if (routeQuery.zCoordinate) {
      point.z = routeQuery.zCoordinate
    } else {
      point.z = 0
    }
    if (networkItem.defaultSpatialReferenceFrom === SpatialReferenceFrom.Map) {
      point.spatialReference = new SpatialReference({ wkid: 102100 })
    } else {
      point.spatialReference = new SpatialReference({ wkid: networkItem.spatialReferenceInfo.wkid, wkt: networkItem.spatialReferenceInfo.wkt })
    }
    locations.push({
      routeId: routeRecord.getFieldValue(networkItem.routeIdFieldName),
      geometry: (point as any).toJSON ? (point as any).toJSON() : point
    })
  })

  const url = networkItem.networkUrl
  const token = await SessionManager.getInstance().getSessionByUrl(url).getToken(url)

  const params = {
    f: 'json',
    token: token,
    locations: locations,
    inSR: (networkItem.defaultSpatialReferenceFrom === SpatialReferenceFrom.Map) ? 102100 : null,
    gdbVersion: gdbVersion,
    tolerance: searchRadius,
    temporalViewDate: routeRecord.getFieldValue(networkItem.fromDateFieldName)
  }

  // Get LRS server endpoint.
  const REST = `${url}/geometryToMeasure`

  // Perform measure to geometry REST request.
  return requestService({ method: 'POST', url: REST, params: params })
    .then(async (results: GeometryToMeasureResponse) => {
      if (!results || !results.locations) {
        return { resultLocations: [], resultWkid: NaN }
      }
      return { resultLocations: results.locations, resultWkid: results.spatialReference.wkid }
    })
}

export async function executeGeometryToMeasure (
  widgetId: string,
  outputDS: FeatureLayerDataSource,
  networkItem: ImmutableObject<NetworkItem>,
  routeRecords: DataRecord[],
  routeQuery: CoordinateQuery,
  labelLayer?: __esri.FeatureLayer
): Promise<DataRecord[]> {
  // Get LRS server endpoint.
  const url = networkItem.networkUrl
  const REST = `${url}/geometryToMeasure`
  const token = await SessionManager.getInstance().getSessionByUrl(url).getToken(url)

  // Extract the route ids from the records and populate the REST request.
  const routeIds: string[] = []
  const location = []
  let Point: typeof __esri.Point = null
  await loadArcGISJSAPIModules(['esri/geometry/Point']).then(modules => {
    [Point] = modules
  }).then(() => {
    const point = new Point()
    point.x = routeQuery.xCoordinate
    point.y = routeQuery.yCoordinate

    if (routeQuery.zCoordinate) {
      point.z = routeQuery.zCoordinate
    } else {
      point.z = 0
    }

    routeRecords.forEach((record) => {
      const routeId = record.getFieldValue(networkItem.routeIdField.jimuName)
      routeIds.push(routeId)
      location.push({
        routeId: routeId,
        geometry: (point as any).toJSON ? (point as any).toJSON() : point
      })
    })
  })

  const originDs: FeatureLayerDataSource = outputDS.getOriginDataSources()[0] as FeatureLayerDataSource
  const layerObject = await getLayerObject(originDs)
  let gdbVersion = originDs.getGDBVersion()
  if (!gdbVersion) {
    gdbVersion = ''
  }

  const queryParams = originDs.getCurrentQueryParams()
  let tvd = null
  if (queryParams?.time) {
    tvd = queryParams?.time[0]
  }

  const params = {
    f: 'json',
    token: token,
    locations: location,
    inSR: (networkItem.defaultSpatialReferenceFrom === SpatialReferenceFrom.Map) ? 102100 : null,
    gdbVersion: gdbVersion,
    temporalViewDate: tvd
  }

  // Perform measure to geometry REST request.
  const newDataRecords = []
  return requestService({ method: 'POST', url: REST, params: params })
    .then(async (results: GeometryToMeasureResponse) => {
      if (!results || !results.locations) {
        return newDataRecords
      }

      let Point: typeof __esri.Point = null
      let SpatialReference: typeof __esri.SpatialReference = null
      let Graphic: typeof __esri.Graphic = null
      await loadArcGISJSAPIModules(['esri/geometry/Point', 'esri/geometry/SpatialReference', 'esri/Graphic']).then(modules => {
        [Point, SpatialReference, Graphic] = modules
      }).then(() => {
        const point = new Point()
        point.x = routeQuery.xCoordinate
        point.y = routeQuery.yCoordinate

        if (routeQuery.zCoordinate) {
          point.z = routeQuery.zCoordinate
        } else {
          point.z = 0
        }

        results.locations.forEach((location, index) => {
          if (location) {
            location.results.forEach((result, index) => {
              if (result) {
                const routeIndex = routeRecords.findIndex(d => d.getFieldValue(networkItem.routeIdField.jimuName) === result.routeId)
                const data = routeRecords[routeIndex].getData()
                data[measureFields.at(0).value] = round(result.measure, networkItem.measurePrecision)
                data[distanceField.value] = round(result.distance, networkItem.measurePrecision)
                data[networkObjectIdField.value] = routeRecords[routeIndex].getId()

                // Convert dates to time set it experience.
                const fromDt = data[networkItem.fromDateFieldName]
                const toDt = data[networkItem.toDateFieldName]
                if (toDt) {
                  data[networkItem.toDateFieldName] = getDateWithTZOffset(toDt, outputDS.getOriginDataSources()[0]).valueOf()
                }
                if (fromDt) {
                  data[networkItem.fromDateFieldName] = getDateWithTZOffset(fromDt, outputDS.getOriginDataSources()[0]).valueOf()
                }

                const spatialReference = new SpatialReference({ wkid: results.spatialReference.wkid })
                const geometry = new Point(result.geometry)
                geometry.spatialReference = spatialReference
                const feature = new Graphic({
                  geometry: geometry,
                  attributes: data
                })

                if (isDefined(labelLayer)) {
                  labelLayer.applyEdits({
                    addFeatures: [feature.clone()]
                  })
                }

                const dataRecord = outputDS.buildRecord(feature)
                newDataRecords.push(dataRecord)
              }
            })
          }
        })

        newDataRecords.forEach((record) => {
          const feature = (record).feature
          feature.sourceLayer = (layerObject as any).associatedLayer || layerObject
          feature.layer = feature.sourceLayer
        })

        outputDS.setSourceRecords(newDataRecords)
        outputDS.setStatus(DataSourceStatus.Unloaded)
        outputDS.setCountStatus(DataSourceStatus.Unloaded)
        publishMessage(outputDS, widgetId)
      })

      return newDataRecords
    })
}

export async function executeReferentToGeometryQuery (
  locations: ReferentQuery,
  networkItem: ImmutableObject<NetworkItem>,
  offsetUnit: string,
  gdbVersion: string,
  temporalViewDate?: number
) {
  const url = networkItem.networkUrl
  const token = await SessionManager.getInstance().getSessionByUrl(url).getToken(url)
  const params = {
    f: 'json',
    token: token,
    locations: locations,
    offsetUnit: offsetUnit
  }
  //@ts-expect-error
  if (gdbVersion) params.gdbVersion = gdbVersion
  //@ts-expect-error
  if (temporalViewDate) params.temporalViewDate = temporalViewDate
  const REST = `${url}/referentToGeometry`

  const response = await requestService({ method: 'POST', url: REST, params: params })
  return response
}

export function isEqual (obj1, obj2) {
  const keys1 = Object.keys(obj1)
  const keys2 = Object.keys(obj2)

  if (keys1.length !== keys2.length) {
    return false
  }

  return keys1.every(key => obj1[key] === obj2[key])
}

export async function executeReferentToGeometry (
  widgetId: string,
  originDS: FeatureLayerDataSource,
  locations: ReferentQuery,
  networkItem: ImmutableObject<NetworkItem>,
  referentItem: ImmutableObject<NetworkItem>,
  outputDS: FeatureLayerDataSource,
  count: number,
  objectIdFromDt: any[],
  config: IMConfig,
  labelLayer?: __esri.FeatureLayer
): Promise<DataRecord[]> {
  const routeIds = []
  const finalDataRecords = []
  const offsetUnit = config?.resultConfig?.defaultOffsetUnit

  let Point: typeof __esri.Point = null
  let SpatialReference: typeof __esri.SpatialReference = null
  let Graphic: typeof __esri.Graphic = null
  let gdbVersion = originDS.getGDBVersion()
  if (!gdbVersion) {
    gdbVersion = ''
  }

  return await loadArcGISJSAPIModules(['esri/geometry/Point', 'esri/geometry/SpatialReference', 'esri/Graphic']).then(modules => {
    [Point, SpatialReference, Graphic] = modules
  }).then(async () => {
    const response = await executeReferentToGeometryQuery(locations, networkItem, offsetUnit, gdbVersion, null)
    if (!response || !response?.locations || response?.locations.length === 0) return []
    response.locations.forEach((item) => {
      const results = item.results
      if (item?.status === 'esriLocatingMultipleLocation') {
        results.forEach((result) => {
          const routeId = result.routeId
          if (!routeIds.includes(routeId)) routeIds.push(routeId)
        })
      } else if (item?.status === 'esriLocatingOK') {
        const result = item.results[0]
        const routeId = result.routeId
        if (!routeIds.includes(routeId)) routeIds.push(routeId)
      }
    })
    if (!routeIds || (routeIds.length === 0)) return []

    const buildRecord = (data, geometry) => {
      const feature = new Graphic({
        geometry: geometry,
        attributes: data
      })
      const newRecord = outputDS.buildRecord(feature)
      finalDataRecords.push(newRecord)
      count++
    }

    const createDataRecords = async (locationItem, record: DataRecord,
      uniqueLocations) => {
      const layerDefinition = originDS.getLayerDefinition()
      const results = locationItem?.results
      const spatialReference = new SpatialReference({ wkid: response.spatialReference.wkid })
      if (locationItem?.status === 'esriLocatingMultipleLocation') {
        results.forEach((result, index) => {
          const data = record?.getData()
          if (!data) return
          // const includesObject = uniqueLocations.some(obj => JSON.stringify(obj) === JSON.stringify(result))
          if (result?.routeId !== data[networkItem.routeIdFieldName]) {
            // if the record already exists do not add it
          } else {
            uniqueLocations.push(result)
            let measure = result?.measure
            let geometry = null
            if (result?.geometryType === 'esriGeometryPoint') {
              geometry = new Point(result.geometry)
              geometry.spatialReference = response.spatialReference
            }
            if (measure < 0) measure = 0
            else measure = round(measure, networkItem.measurePrecision)
            data[measureFields.at(0).value] = measure
            data[layerDefinition.objectIdField] = count
            data[networkObjectIdField.value] = record.getId()

            const fromDt = data[networkItem.fromDateFieldName]
            const toDt = data[networkItem.toDateFieldName]

            if (fromDt || toDt) {
              const fromDate = isDefined(fromDt) ? getDateWithTZOffset(fromDt, outputDS.getOriginDataSources()[0]).valueOf() : null
              const toDate = isDefined(toDt) ? getDateWithTZOffset(toDt, outputDS.getOriginDataSources()[0]).valueOf() : null
              data[networkItem.fromDateFieldName] = fromDate
              data[networkItem.toDateFieldName] = toDate

              if (isDefined(labelLayer)) {
                const feature = new Graphic({
                  geometry: geometry,
                  attributes: data
                })

                labelLayer.applyEdits({
                  addFeatures: [feature.clone()]
                })
              }
              buildRecord(data, geometry)
            } else {
              if (isDefined(labelLayer)) {
                const feature = new Graphic({
                  geometry: geometry,
                  attributes: data
                })

                labelLayer.applyEdits({
                  addFeatures: [feature.clone()]
                })
              }
              buildRecord(data, geometry)
            }
          }
        })
      } else if (locationItem?.status === 'esriLocatingOK') {
        const result = locationItem.results[0]
        let measure = result.measure
        const data = record.getData()
        let geometry = null

        const includesObject = uniqueLocations.some(obj => JSON.stringify(obj) === JSON.stringify(result))
        if (includesObject || (result?.routeId !== data[networkItem.routeIdFieldName])) {
          // if the record already exists do not add it
        } else {
          uniqueLocations.push(result)
          if (result.geometryType === 'esriGeometryPoint') {
            geometry = new Point(result.geometry)
            geometry.spatialReference = spatialReference
          }
          if (measure < 0) measure = 0
          else measure = round(measure, networkItem.measurePrecision)
          data[measureFields.at(0).value] = measure
          data[layerDefinition.objectIdField] = count
          data[networkObjectIdField.value] = record.getId()

          const fromDt = data[networkItem.fromDateFieldName]
          const toDt = data[networkItem.toDateFieldName]
          if (fromDt || toDt) {
            const fromDate = isDefined(fromDt) ? getDateWithTZOffset(fromDt, outputDS.getOriginDataSources()[0]).valueOf() : null
            const toDate = isDefined(toDt) ? getDateWithTZOffset(toDt, outputDS.getOriginDataSources()[0]).valueOf() : null
            data[networkItem.fromDateFieldName] = fromDate
            data[networkItem.toDateFieldName] = toDate

            if (isDefined(labelLayer)) {
              const feature = new Graphic({
                geometry: geometry,
                attributes: data
              })

              labelLayer.applyEdits({
                addFeatures: [feature.clone()]
              })
            }
            buildRecord(data, geometry)
          } else {
            if (isDefined(labelLayer)) {
              const feature = new Graphic({
                geometry: geometry,
                attributes: data
              })

              labelLayer.applyEdits({
                addFeatures: [feature.clone()]
              })
            }
            buildRecord(data, geometry)
          }
        }
      }
    }

    const queryRoutes = async () => {
      const routeIdFieldName = networkItem?.routeIdFieldName
      const promises = []
      const records = []
      let whereClause = ''
      if (routeIds.length > 0) {
        whereClause = routeIdFieldName + ' IN (\'' + routeIds.join('\',\'') + '\')'
      }
      const featureQuery: FeatureLayerQueryParams = ({
        where: whereClause
      })
      const results = await originDS.query(featureQuery)
      if (results?.records?.length === 0) return []
      results.records.forEach(async (record) => {
        records.push(record)
        const recordFromDt = record.getData()[referentItem?.fromDateFieldName]
        //@ts-expect-error
        locations?.forEach((location) => {
          const objectId = location.objectId
          let fromDate = objectIdFromDt[objectId]
          // if eventLayers use fromDate from the objectIdFromDt dictionary; rest use route fromDate
          if (referentItem?.type !== 'eventLayers') fromDate = recordFromDt
          // to differentiate between duplicate route ids, we pass fromDate
          promises.push(executeReferentToGeometryQuery(locations, networkItem, offsetUnit, gdbVersion, fromDate))
        })
      })
      const response = await Promise.all(promises)
      const uniqueLocations = []
      response.forEach((response, index) => {
        const locationItems = response?.locations
        if (locationItems?.length > 0) {
          const record = records[index]
          locationItems?.forEach((location, index) => {
            // pass the record corresponding to the request to add the measure
            createDataRecords(location, record, uniqueLocations)
          })
        }
      })
    }

    await queryRoutes()
    outputDS.setSourceRecords(finalDataRecords)
    outputDS.setStatus(DataSourceStatus.Unloaded)
    outputDS.setCountStatus(DataSourceStatus.Unloaded)
    publishMessage(outputDS, widgetId)
    const layerObject = await getLayerObject(originDS)
    finalDataRecords.forEach((record) => {
      const feature = (record).feature
      feature.sourceLayer = (layerObject as any).associatedLayer || layerObject
      feature.layer = feature.sourceLayer
    })
    return finalDataRecords
  })
}

export async function executeMeasureToGeometry (
  widgetId: string,
  outputDS: FeatureLayerDataSource,
  networkItem: ImmutableObject<NetworkItem>,
  routeRecords: DataRecord[],
  query: RouteAndMeasureQuery,
  labelLayer?: __esri.FeatureLayer
): Promise<DataRecord[]> {
  // If no measures were provided, return the route records with their measures populated.
  if (!query.isMeasureToGeometryOperation) {
    return updateRouteMeasures(widgetId, networkItem, routeRecords, outputDS, networkItem.measurePrecision, labelLayer)
  }

  // Get LRS server endpoint.
  const url = networkItem.networkUrl
  const REST = `${url}/measureToGeometry`
  const token = await SessionManager.getInstance().getSessionByUrl(url).getToken(url)

  const times: Date[] = []
  for (const record of routeRecords) {
    const fromDateEpoch = record.getData()[networkItem.fromDateFieldName]
    const fromDate = isDefined(fromDateEpoch) ? new Date(fromDateEpoch) : new Date(0)
    times.push(fromDate)
  }

  const originDs: FeatureLayerDataSource = outputDS.getOriginDataSources()[0] as FeatureLayerDataSource
  const layerObject = await getLayerObject(originDs)
  let gdbVersion = originDs.getGDBVersion()
  if (!gdbVersion) {
    gdbVersion = ''
  }

  const intervals = getUniqueDates(times)
  let index = 0
  const newDataRecords = []
  await Promise.all(intervals.map(async (interval) => {
  // Extract the route ids from the records and populate the REST request.
    const routeIds: string[] = []
    const location = []
    routeRecords.forEach((record) => {
      const fromDateEpoch = record.getData()[networkItem.fromDateFieldName]
      const fromDate = isDefined(fromDateEpoch) ? new Date(fromDateEpoch) : new Date(0)

      if (interval.valueOf() === fromDate.valueOf()) {
        const routeId = record.getFieldValue(networkItem.routeIdField.jimuName)
        routeIds.push(routeId)
        if (query.searchMeasureBy === SearchMeasuresType.Single) {
          location.push({
            routeId: routeId,
            measure: round(query.measure, networkItem.measurePrecision),
            station: query.station
          })
        } else if (query.searchMeasureBy === SearchMeasuresType.Multiple) {
          query.measures.forEach((m, index) => {
            location.push({
              routeId: routeId,
              measure: round(m, networkItem.measurePrecision),
              station: query.stations.at(index)
            })
          })
        } else {
          if (isNaN(query.toMeasure)) {
            location.push({
              routeId: routeId,
              measure: round(query.fromMeasure, networkItem.measurePrecision),
              station: query.fromStation
            })
          } else {
            location.push({
              routeId: routeId,
              fromMeasure: round(query.fromMeasure, networkItem.measurePrecision),
              toMeasure: round(query.toMeasure, networkItem.measurePrecision),
              fromStation: query.fromStation,
              toStation: query.toStation
            })
          }
        }
      }
    })

    const params = {
      f: 'json',
      token: token,
      locations: location,
      gdbVersion: gdbVersion,
      temporalViewDate: interval.valueOf()
    }

    // Perform measure to geometry REST request.
    await requestService({ method: 'POST', url: REST, params: params })
      .then(async (results: MeasureToGeometryResponse) => {
        if (!results || !results.locations) {
          return newDataRecords
        }

        let Point: typeof __esri.Point = null
        let Polyline: typeof __esri.Polyline = null
        let SpatialReference: typeof __esri.SpatialReference = null
        let Graphic: typeof __esri.Graphic = null
        await loadArcGISJSAPIModules(['esri/geometry/Point', 'esri/geometry/Polyline', 'esri/geometry/SpatialReference', 'esri/Graphic']).then(modules => {
          [Point, Polyline, SpatialReference, Graphic] = modules
        }).then(async () => {
          await Promise.all(results.locations.map(async (location, i) => {
            if (location && location.geometry) {
              const dataIndex = routeRecords.findIndex((record) => {
                return record.getFieldValue(networkItem.routeIdField.jimuName) === location.routeId &&
                  record.getFieldValue(networkItem.fromDateFieldName) === params.temporalViewDate
              })
              const data = routeRecords[dataIndex].clone(true).getData()
              const spatialReference = new SpatialReference({ wkid: results.spatialReference.wkid })
              if (location.geometryType === 'esriGeometryPoint') {
                const geometry = new Point(location.geometry)
                geometry.spatialReference = spatialReference
                data[measureFields.at(0).value] = round(geometry.m, networkItem.measurePrecision)
                data[networkObjectIdField.value] = routeRecords[dataIndex].getId()
                data.OBJECTID = index + 1
                index++

                const fromDt = data[networkItem.fromDateFieldName]
                const toDt = data[networkItem.toDateFieldName]
                if (toDt) {
                  data[networkItem.toDateFieldName] = getDateWithTZOffset(toDt, outputDS.getOriginDataSources()[0]).valueOf()
                }
                if (fromDt) {
                  data[networkItem.fromDateFieldName] = getDateWithTZOffset(fromDt, outputDS.getOriginDataSources()[0]).valueOf()
                }

                if (params.locations[i].station) {
                  data[stationField.at(0).value] = params.locations[i].station
                }

                const feature = new Graphic({
                  geometry: geometry,
                  attributes: data
                })

                if (isDefined(labelLayer)) {
                  await labelLayer.applyEdits({
                    addFeatures: [feature.clone()]
                  })
                }

                const dataRecord = outputDS.buildRecord(feature)
                newDataRecords.push(dataRecord)
              } else {
                const geometry = new Polyline(location.geometry)
                geometry.spatialReference = spatialReference

                if (geometry.paths?.length > 0) {
                  const firstPoint = geometry.getPoint(0, 0)
                  const lastIdx = geometry.paths[geometry.paths.length - 1].length - 1
                  const lastPoint = geometry.getPoint(geometry.paths.length - 1, lastIdx)
                  data[measureFields.at(0).value] = round(firstPoint.m, networkItem.measurePrecision)
                  data[measureFields.at(1).value] = round(lastPoint.m, networkItem.measurePrecision)
                  data[networkObjectIdField.value] = routeRecords[dataIndex].getId()
                  data.OBJECTID = index + 1
                  index++

                  const fromDt = data[networkItem.fromDateFieldName]
                  const toDt = data[networkItem.toDateFieldName]
                  if (toDt) {
                    data[networkItem.toDateFieldName] = getDateWithTZOffset(toDt, outputDS.getOriginDataSources()[0]).valueOf()
                  }
                  if (fromDt) {
                    data[networkItem.fromDateFieldName] = getDateWithTZOffset(fromDt, outputDS.getOriginDataSources()[0]).valueOf()
                  }

                  if (params.locations[i].fromStation) {
                    data[stationField.at(1).value] = params.locations[i].fromStation
                  }
                  if (params.locations[i].toStation) {
                    data[stationField.at(2).value] = params.locations[i].toStation
                  }
                }

                const feature = new Graphic({
                  geometry: geometry,
                  attributes: data
                })

                if (isDefined(labelLayer)) {
                  const midPoint = await getPolylineMidPoint(geometry)
                  const labelGraphic = new Graphic({
                    geometry: midPoint,
                    attributes: data
                  })

                  await labelLayer.applyEdits({
                    addFeatures: [labelGraphic.clone()]
                  })
                }

                const dataRecord = outputDS.buildRecord(feature)
                newDataRecords.push(dataRecord)
              }
            }
          }))
        })
      })
  }))

  newDataRecords.forEach((record) => {
    const feature = (record).feature
    feature.sourceLayer = (layerObject as any).associatedLayer || layerObject
    feature.layer = feature.sourceLayer
  })

  outputDS.setSourceRecords(newDataRecords)
  outputDS.setStatus(DataSourceStatus.Unloaded)
  outputDS.setCountStatus(DataSourceStatus.Unloaded)
  publishMessage(outputDS, widgetId)

  if (intervals.length > 1) {
    // If there were multiple timeslices, we lost the sort order. Query the output datasource to re-sort the records.
    const featureQuery: FeatureLayerQueryParams = ({
      returnGeometry: true,
      where: '1=1',
      outFields: ['*'],
      notAddFieldsToClient: true
    })

    if (networkItem.sortOptions?.length > 0) {
      Object.assign(featureQuery, {
        orderByFields: networkItem.sortOptions.map(item => `${item.jimuFieldName} ${item.order}`)
      })
    }

    return await outputDS.query(featureQuery).then((results) => {
      if (results.records?.length > 0) {
        return results.records
      }
      return newDataRecords
    }).catch((e: any) => {
      return newDataRecords
    })
  } else {
    return newDataRecords
  }
}

export async function updateRouteMeasures (
  widgetId: string,
  networkItem: ImmutableObject<NetworkItem>,
  routeRecords: DataRecord[],
  outputDS: FeatureLayerDataSource,
  precision: number,
  labelLayer?: __esri.FeatureLayer
): Promise<DataRecord[]> {
  const newDataRecords = []

  const originDs: FeatureLayerDataSource = outputDS.getOriginDataSources()[0] as FeatureLayerDataSource
  const layerObject = await getLayerObject(originDs)

  let Polyline: typeof __esri.Polyline = null
  let Graphic: typeof __esri.Graphic = null
  return loadArcGISJSAPIModules(['esri/geometry/Polyline', 'esri/Graphic']).then(modules => {
    [Polyline, Graphic] = modules
  }).then(async () => {
    await Promise.all(routeRecords.map(async (record, index) => {
      const data = record.getData()
      const geometry = record.getGeometry()
      const polyline = new Polyline(geometry)
      const firstPoint = polyline.getPoint(0, 0)
      const lastIdx = polyline.paths[polyline.paths.length - 1].length - 1
      const lastPoint = polyline.getPoint(polyline.paths.length - 1, lastIdx)
      data[measureFields.at(0).value] = round(firstPoint.m, precision)
      data[measureFields.at(1).value] = round(lastPoint.m, precision)
      data[networkObjectIdField.value] = record.getId()
      data.OBJECTID = index + 1

      const fromDt = data[networkItem.fromDateFieldName]
      const toDt = data[networkItem.toDateFieldName]
      if (toDt) {
        data[networkItem.toDateFieldName] = getDateWithTZOffset(toDt, outputDS.getOriginDataSources()[0]).valueOf()
      }
      if (fromDt) {
        data[networkItem.fromDateFieldName] = getDateWithTZOffset(fromDt, outputDS.getOriginDataSources()[0]).valueOf()
      }

      const feature = new Graphic({
        geometry: polyline,
        attributes: data
      })

      if (isDefined(labelLayer)) {
        const midPoint = await getPolylineMidPoint(polyline)
        const labelGraphic = new Graphic({
          geometry: midPoint,
          attributes: data
        })

        await labelLayer.applyEdits({
          addFeatures: [labelGraphic.clone()]
        })
      }

      const dataRecord = outputDS.buildRecord(feature)
      newDataRecords.push(dataRecord)
    }))

    newDataRecords.forEach((record) => {
      const feature = (record).feature
      feature.sourceLayer = (layerObject as any).associatedLayer || layerObject
      feature.layer = feature.sourceLayer
    })

    outputDS.setSourceRecords(newDataRecords)
    outputDS.setStatus(DataSourceStatus.Unloaded)
    outputDS.setCountStatus(DataSourceStatus.Unloaded)
    publishMessage(outputDS, widgetId)

    return newDataRecords
  })
}

async function getLayerObject (dataSource: FeatureLayerDataSource) {
  if (dataSource?.layer) {
    await dataSource.layer.load()
    return dataSource.layer
  } else {
    const layerObject = await dataSource.createJSAPILayerByDataSource()
    await layerObject.load()
    return layerObject
  }
}

function publishMessage (outputDS: FeatureLayerDataSource, widgetId: string) {
  if (!outputDS) { return }
  const originDs: FeatureLayerDataSource = outputDS.getOriginDataSources()[0] as FeatureLayerDataSource
  const popupInfo = originDs.getPopupInfo()
  const layerDefinition = originDs.getLayerDefinition()
  const getDefaultFieldInfos = () =>
    [
      { fieldName: layerDefinition?.objectIdField ?? 'objectid', label: 'OBJECTID', tooltip: '', visible: true }
    ] as IFieldInfo[]
  const fieldInfos = ((fieldInfos) => (fieldInfos.length ? fieldInfos : getDefaultFieldInfos()))(
    (popupInfo?.fieldInfos || []).filter((i) => i.visible)
  )

  const dataRecordSetChangeMessage = new DataRecordSetChangeMessage(widgetId, RecordSetChangeType.CreateUpdate, [{
    records: outputDS.getRecords(),
    fields: fieldInfos.map((fieldInfo) => fieldInfo.fieldName),
    dataSource: outputDS,
    name: outputDS.id
  }])

  MessageManager.getInstance().publishMessage(dataRecordSetChangeMessage)
}
