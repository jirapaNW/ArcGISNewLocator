import { type OrientedImageryLayerDataSource } from 'jimu-core';
import { JimuFeatureLayerSceneLayerViewCommon, type JimuFeatureLayerSceneLayerViewCommonOptions } from './jimu-feature-layer-scene-layer-view-common';
/**
 * `JimuOrientedImageryLayerViewOptions` provides information about the `JimuOrientedImageryLayerView`.
 */
export interface JimuOrientedImageryLayerViewOptions extends JimuFeatureLayerSceneLayerViewCommonOptions {
    /**
     * The `layer` is the [ArcGIS Maps SDK for JavaScript `OrientedImageryLayer`](https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-OrientedImageryLayer.html).
     */
    layer: __esri.OrientedImageryLayer;
}
/**
 * JimuOrientedImageryLayerView is the wrapper of [`OrientedImageryLayer`](https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-OrientedImageryLayer.html).
 */
export declare class JimuOrientedImageryLayerView extends JimuFeatureLayerSceneLayerViewCommon {
    /**
     * The `layer` is the [ArcGIS Maps SDK for JavaScript `OrientedImageryLayer`](https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-OrientedImageryLayer.html).
     */
    layer: __esri.OrientedImageryLayer;
    getLayerDataSource(): OrientedImageryLayerDataSource;
    createLayerDataSource(): Promise<OrientedImageryLayerDataSource>;
}
