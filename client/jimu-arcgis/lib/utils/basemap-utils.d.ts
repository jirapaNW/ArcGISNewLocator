export declare enum BasemapGroupType {
    EsriDefault = "ESRI_DEFAULT",
    EsriDefault3d = "ESRI_DEFAULT_3D",
    OrgDefault = "ORG_DEFAULT"
}
export declare function isBasemap3D(basemap: __esri.Basemap): boolean;
export declare function getOrgBasemaps(): Promise<__esri.Basemap[]>;
export interface BasemapItem {
    id: string;
    title: string;
    thumbnailUrl: string;
    type: string;
}
export declare function getBasemapGroup(portal: __esri.Portal, portalSelf: __esri.Portal['sourceJSON'], groupType?: BasemapGroupType): Promise<__esri.PortalGroup>;
export declare function getBasemapItemsByGroupId(portal: __esri.Portal, portalUrl: string, groupId: string, is3D?: boolean): Promise<BasemapItem[]>;
export declare const getLoadedBasemapList: (Basemap: typeof __esri.Basemap, basemapItems: BasemapItem[]) => Promise<__esri.Basemap[]>;
