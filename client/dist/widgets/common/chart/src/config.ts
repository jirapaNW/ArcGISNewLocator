import { type StatisticDefinition, type FeatureLayerQueryParams, type ImmutableObject, type SqlExpression } from 'jimu-core'
import {
  type WebMapWebChart,
  type WebMapWebGaugeChart,
  type WebChartSeries as _WebChartSeries,
  type WebChartConfigFields,
  type WebChartGaugeAxis,
  type WebChartAxis
} from 'jimu-ui/advanced/chart'

export type WebChartSeries = Omit<_WebChartSeries, 'query'> & {
  query?: FeatureLayerQueryParams
  //add for custom added split-by series, will be removed at runtime
  deletable?: boolean
}

export type HistogramOverlaysType = 'mean' | 'median' | 'standardDeviation' | 'comparisonDistribution'

export const ConfigFields = {
  fillColor: '_fillColor'
}

export interface ColorMatches {
  [value: string]: {
    _fillColor: any
  }
}

export interface ChartDataSource {
  query: FeatureLayerQueryParams
  /**
   * Use series.slices instead for pie chart
   * @deprecated
   */
  colorMatch?: {
    configFields?: WebChartConfigFields
    colorMatches: ColorMatches
  }
}

interface WebChart extends Omit<WebMapWebChart, 'axes'>, Omit<WebMapWebGaugeChart, 'axes'> {
  axes?: [WebChartAxis, WebChartAxis?] | [WebChartGaugeAxis]
}

export interface ChartComponentProps {
  /**
    * When `true`, the series is hidden in the legend if it doesn't have data (i.e. empty). For eg. after applying a filter by attribute or geometry (as when using the filter by extent)
    * @default false
    */
  hideEmptySeriesInLegend?: boolean
}

export interface IWebChart extends Omit<WebChart, 'background' | 'series'> {
  dataSource: ChartDataSource
  background?: string
  series: WebChartSeries[]
}

export enum CategoryType {
  ByGroup = 'BYGROUP',
  ByField = 'BYFIELD'
}

export interface ChartTools {
  filter?: SqlExpression
  cursorEnable?: boolean
}

export type ChartType = 'column' | 'bar' | 'line' | 'area' | 'pie' | 'scatter' | 'histogram' | 'gauge'

export type TemplateType = 'bar' | 'stacked-bar' | 'stacked100-bar'
| 'column' | 'stacked-column' | 'stacked100-column'
| 'line' | 'smooth-line'
| 'area' | 'smooth-area'
| 'pie' | 'donut'
| 'scatter'
| 'histogram'
| 'gauge'

export interface Config {
  //It is only used when configuring the app template
  _templateType?: TemplateType
  template: string
  webChart: IWebChart
  tools?: ChartTools
  options?: ChartComponentProps
}

export type IMConfig = ImmutableObject<Config>

export type ChartStatisticType = Omit<StatisticDefinition['statisticType'], 'stddev' | 'var' | 'percentile_disc'> | 'no_aggregation'
