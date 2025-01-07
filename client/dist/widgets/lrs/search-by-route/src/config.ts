import { type GeometryType, type IGeometry } from '@esri/arcgis-rest-feature-service'
import { type IMFieldSchema, type ImmutableArray, type UseDataSource, type OrderByOption } from 'jimu-core'
import { type ImmutableObject } from 'seamless-immutable'
import { type SearchMethod } from 'widgets/shared-code/lrs'

export enum Identifiers {
  RouteId = 'ROUTEID',
  RouteName = 'ROUTENAME',
  MultiField = 'MULTIFIELD'
}

export enum SpatialReferenceFrom {
  Map = 'MAP',
  Lrs = 'LRS'
}

export enum Coordinate {
  X = 'X',
  Y = 'Y',
  Z = 'Z'
}

export enum SearchMeasuresType {
  Single = 'SINGLE',
  Multiple = 'MULTIPLE',
  Range = 'RANGE'
}

export interface Locations {
  status: string
  routeId: string
  toRouteId: string
  geometryType: GeometryType
  geometry: IGeometry
}

export interface GeometryToMeasureResult {
  routeId: string
  measure: number
  distance: number
  geometryType: GeometryType
  geometry: IGeometry
}

export interface GeometryToMeasureLocation {
  status: string
  results: GeometryToMeasureResult[]
}

export interface GeometryToMeasureResponse {
  spatialReference: { wkid: number }
  locations: GeometryToMeasureLocation[]
}

export interface MeasureToGeometryResponse {
  spatialReference: { wkid: number }
  locations: Locations[]
}

export interface RouteAndMeasureQuery {
  routeId?: string
  routeName?: string
  routeIdFields?: any[]
  measure?: number
  station?: string
  fromMeasure?: number
  toMeasure?: number
  fromStation?: string
  toStation?: string
  measures?: number[]
  stations?: string[]
  isPoint?: boolean
  isMeasureToGeometryOperation?: boolean
  searchMeasureBy?: SearchMeasuresType
}

export interface CoordinateQuery {
  xCoordinate?: number
  yCoordinate?: number
  zCoordinate?: number
}

export interface ReferentQuery {
  layerId?: number
  objectId?: number[]
  offset?: number
  fromDate?: number
  objectIdFromDt?: any
}

export interface RouteIdFieldsSettings {
  field?: IMFieldSchema
  enabled?: boolean
}

export interface SpatialReferenceInfo {
  wkid: number
  wkt: string
}

export interface NetworkItem {
  id?: string
  name?: string
  configId?: string
  layerId?: string
  lrsNetworkId?: string
  outputLineDsId?: string
  outputPointDsId?: string
  networkUrl: string
  useRouteId?: boolean
  useRouteName?: boolean
  useMultiField?: boolean
  useMeasure?: boolean
  useCoordinate?: boolean
  useReferent?: boolean
  useDataSource?: UseDataSource
  defaultMethod?: SearchMethod
  enabledMethods?: SearchMethod[]
  defaultIdentifer?: Identifiers
  routeIdFieldName?: string
  routeNameFieldName?: string
  routeIdFieldNames?: string[]
  routeIdField?: IMFieldSchema
  routeNameField?: IMFieldSchema
  routeIdFields?: RouteIdFieldsSettings[]
  supportsLines?: boolean
  unitsOfMeasure?: string
  sortOptions?: OrderByOption[]
  resultDisplayFields?: string[]
  measurePrecision: number
  defaultSpatialReferenceFrom?: SpatialReferenceFrom
  searchRadius: number // in network's units of measure
  referent?: boolean
  type?: string
  layerFields?: any
  displayName?: string
  fromDateFieldName?: string
  toDateFieldName?: string
  searchSingle: boolean
  searchMultiple: boolean
  searchRange: boolean
  expandByDefault: boolean
  spatialReferenceInfo: SpatialReferenceInfo
}

export interface Style {
  color: string
  size: number
}

export interface ResultConfig {
  pageSize: number
  defaultReferentLayer?: ImmutableObject<NetworkItem>
  defaultOffsetUnit?: string
}

export interface Config {
  networkItems?: ImmutableArray<NetworkItem>
  highlightStyle?: Style
  labelStyle?: Style
  resultConfig?: ResultConfig
  defaultNetwork?: string
  hideMethod: boolean
  hideNetwork: boolean
}

export type IMConfig = ImmutableObject<Config>
