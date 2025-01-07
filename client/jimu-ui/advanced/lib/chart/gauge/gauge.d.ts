/// <reference types="react" />
import { type ImmutableObject, React } from 'jimu-core';
import { type WebChartDataSources, type WebMapWebGaugeChart } from 'arcgis-charts-components';
import { type UnprivilegedChart } from '../utils';
import { type GaugeCoreProps } from './core';
export interface GaugeProps extends Omit<GaugeCoreProps, 'config'> {
    /**
   * Used by `@arcgis/charts-components` package, both mutable and immutable are supported.
   */
    webMapWebChart: WebMapWebGaugeChart | ImmutableObject<WebMapWebGaugeChart>;
    /**
     * Property representing the datasource. Can be Feature layer or vanilla POJOs.
     */
    dataSource?: WebChartDataSources;
}
export declare const Gauge: React.MemoExoticComponent<React.ForwardRefExoticComponent<GaugeProps & React.RefAttributes<UnprivilegedChart>>>;
