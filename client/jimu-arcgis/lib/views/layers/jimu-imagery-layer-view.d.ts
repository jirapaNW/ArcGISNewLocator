import { type ImageryLayerDataSource } from 'jimu-core';
import { JimuFeatureLayerSceneLayerViewCommon, type JimuFeatureLayerSceneLayerViewCommonOptions } from './jimu-feature-layer-scene-layer-view-common';
/**
 * `JimuImageryLayerViewOptions` provides constructor options for `JimuImageryLayerView`.
 */
export interface JimuImageryLayerViewOptions extends JimuFeatureLayerSceneLayerViewCommonOptions {
    /**
     * The `layer` is the [ArcGIS Maps SDK for JavaScript `ImageryLayer`](https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-ImageryLayer.html).
     */
    layer: __esri.ImageryLayer;
}
/**
 * JimuImageryLayerView is the wrapper of [`ImageryLayer`](https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-ImageryLayer.html) and [`ImageryLayerView`](https://developers.arcgis.com/javascript/latest/api-reference/esri-views-layers-ImageryLayerView.html).
 */
export declare class JimuImageryLayerView extends JimuFeatureLayerSceneLayerViewCommon {
    /**
     * The `layer` is the [ArcGIS Maps SDK for JavaScript `ImageryLayer`](https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-ImageryLayer.html).
     */
    layer: __esri.ImageryLayer;
    /**
     * The `view` is the [ArcGIS Maps SDK for JavaScript `ImageryLayerView`](https://developers.arcgis.com/javascript/latest/api-reference/esri-views-layers-ImageryLayerView.html).
     */
    view: __esri.ImageryLayerView;
    getLayerDataSource(): ImageryLayerDataSource;
    createLayerDataSource(): Promise<ImageryLayerDataSource>;
}
