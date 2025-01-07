import { JimuLayerView, type JimuLayerViewConstructorOptions } from './jimu-layer-view';
export interface JimuBuildingGroupSublayerOptions extends JimuLayerViewConstructorOptions {
    layer: __esri.BuildingGroupSublayer;
}
export declare class JimuBuildingGroupSublayer extends JimuLayerView {
    layer: __esri.BuildingGroupSublayer;
    constructor(options: JimuBuildingGroupSublayerOptions);
    ready(): Promise<this>;
}
