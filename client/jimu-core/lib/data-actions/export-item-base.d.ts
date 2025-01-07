import { AbstractDataAction, DataLevel } from '../base-data-action';
import { type DataRecordSet } from '../data-sources/interfaces';
import { type IItemAdd, type ICreateItemOptions, type ICreateItemResponse } from '@esri/arcgis-rest-portal';
import { type ArcGISIdentityManager } from '@esri/arcgis-rest-request';
import { type ILayerDefinition } from '@esri/arcgis-rest-feature-service';
export declare abstract class ExportToItemBase extends AbstractDataAction {
    isSupported(dataSets: DataRecordSet[], dataLevel: DataLevel): Promise<boolean>;
    isDataSetSupportExportItem(dataSet: DataRecordSet, dataLevel: DataLevel): Promise<boolean>;
    addItem(item: IItemAdd, auth: ArcGISIdentityManager, option?: Partial<ICreateItemOptions>, folderId?: string): Promise<ICreateItemResponse>;
    createItem(item: IItemAdd, folderId: string): Promise<string>;
    createServiceItem(dataSet: DataRecordSet, name: string, folderId: string): Promise<string>;
    getLayerForFeatureCollection(dataSet: DataRecordSet, dataLevel: DataLevel, featureUtils: any, widgetId: string, returnGeometry?: boolean): Promise<{
        popupInfo: import("@esri/arcgis-rest-feature-service").IPopupInfo;
        layerDefinition: ILayerDefinition;
        featureSet: any;
    }>;
    createFeatureCollectionItem(dataSets: DataRecordSet[], dataLevel: DataLevel, name: string, folderId: string, widgetId: string, returnGeometry?: boolean): Promise<string>;
    checkPrivilege(): Promise<boolean>;
    private checkRenderPrivilege;
    private getAllFeatureCollection;
    private query;
}
