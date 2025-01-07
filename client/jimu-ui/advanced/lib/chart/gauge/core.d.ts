/// <reference types="react" />
import { React } from 'jimu-core';
import { type ChartComponentEventCallbacks, type UnprivilegedChart } from '../utils';
export interface GaugeCoreProps extends Partial<HTMLArcgisChartsGaugeElement>, ChartComponentEventCallbacks {
}
export declare const GaugeCore: React.ForwardRefExoticComponent<GaugeCoreProps & React.RefAttributes<UnprivilegedChart>>;
