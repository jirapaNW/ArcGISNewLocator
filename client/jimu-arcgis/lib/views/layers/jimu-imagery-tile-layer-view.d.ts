import { type IMDataSourceInfo, type ImageryTileLayerDataSource } from 'jimu-core';
import { JimuLayerView, type JimuLayerViewConstructorOptions } from './jimu-layer-view';
export interface JimuImageryTileLayerViewOptions extends JimuLayerViewConstructorOptions {
    layer: __esri.ImageryTileLayer;
}
export declare class JimuImageryTileLayerView extends JimuLayerView {
    layer: __esri.ImageryTileLayer;
    constructor(options: JimuImageryTileLayerViewOptions);
    protected onLayerDataSourceInfoChange(preDsInfo: IMDataSourceInfo, dsInfo: IMDataSourceInfo): void;
    getLayerDataSource(): ImageryTileLayerDataSource;
    createLayerDataSource(): Promise<ImageryTileLayerDataSource>;
}
