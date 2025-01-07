import { type BuildingComponentSubLayerDataSource } from 'jimu-core';
import { JimuFeatureLayerSceneLayerViewCommon, type JimuFeatureLayerSceneLayerViewCommonOptions } from './jimu-feature-layer-scene-layer-view-common';
/**
 * `JimuBuildingComponentSublayerViewOptions` provides constructor options for `JimuBuildingComponentSublayerView`.
 */
export interface JimuBuildingComponentSublayerViewOptions extends JimuFeatureLayerSceneLayerViewCommonOptions {
    /**
     * The `layer` is the [ArcGIS Maps SDK for JavaScript `BuildingComponentSublayer`](https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-buildingSublayers-BuildingComponentSublayer.html).
     */
    layer: __esri.BuildingComponentSublayer;
}
/**
 * JimuBuildingComponentSublayerView is the wrapper of [`BuildingComponentSublayer`](https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-buildingSublayers-BuildingComponentSublayer.html) and [`BuildingComponentSublayerView`](https://developers.arcgis.com/javascript/latest/api-reference/esri-views-layers-BuildingComponentSublayerView.html).
 */
export declare class JimuBuildingComponentSublayerView extends JimuFeatureLayerSceneLayerViewCommon {
    /**
     * The `layer` is the [ArcGIS Maps SDK for JavaScript `BuildingComponentSublayer`](https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-buildingSublayers-BuildingComponentSublayer.html).
     */
    layer: __esri.BuildingComponentSublayer;
    /**
     * The `view` is the [ArcGIS Maps SDK for JavaScript `BuildingComponentSublayerView`](https://developers.arcgis.com/javascript/latest/api-reference/esri-views-layers-BuildingComponentSublayerView.html).
     */
    view: __esri.BuildingComponentSublayerView;
    getLayerDataSource(): BuildingComponentSubLayerDataSource;
    createLayerDataSource(): Promise<BuildingComponentSubLayerDataSource>;
}
