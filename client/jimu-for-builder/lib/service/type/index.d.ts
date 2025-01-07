import type { IItem, IItemAdd } from '@esri/arcgis-rest-portal';
import { type AppConfig, type IMAppConfig } from 'jimu-core';
export declare const TYPE_KEYWORDS_OF_EXPRESS_APP = "ExpressExperienceApp";
export interface requestMethodProvider {
    requestMethodProvider: (restPortalRequestName: string, localRequestName?: string, appInfo?: AppInfo) => any;
}
export declare enum SearchType {
    AGOL = "AGOL",// Search AGOL app
    Portal = "Portal",// Search portal app
    Other = "Other"
}
export declare enum AppType {
    TemplateType = "Web Experience Template",
    ExperienceType = "Web Experience"
}
export declare enum PublishStatus {
    Published = "Published",
    Draft = "Draft",// Item is not published
    Changed = "Changed"
}
export interface AppInfo extends IItem {
    id: string;
    type: AppType;
    name?: string;
    text?: any;
    username?: string;
    thumbnail?: string;
    isLocalApp?: boolean;
    portalUrl?: string;
}
export interface ImportAppOption extends IItemAdd {
    appZip: any;
}
export interface SaveAsResponse {
    id: string;
    appConfig?: AppConfig;
    appInfo: AppInfo;
}
export interface TransfeAppResponse {
    id?: string;
    appConfig?: AppConfig;
    appInfo: AppInfo;
}
export interface TransferAppParams {
    folderId?: string;
    appInfo: AppInfo;
    appConfig?: IMAppConfig;
    transferDirectly?: boolean;
}
