import { DataSourceTypes, type OrientedImageryLayerDataSource } from '../interfaces';
import { AbstractArcGISQueriableDataSource } from '../base-classes/abstract-arcgis-queriable-data-source';
export declare class OrientImageryLayerDataSourceImpl extends AbstractArcGISQueriableDataSource implements OrientedImageryLayerDataSource {
    type: DataSourceTypes.OrientedImageryLayer;
    jsAPILayerQueryObjectIds(query: __esri.Query | __esri.QueryProperties, layer?: __esri.OrientedImageryLayer): Promise<number[]>;
    jsAPILayerQueryFeatures(query: __esri.Query | __esri.QueryProperties, layer?: __esri.OrientedImageryLayer): Promise<__esri.FeatureSet>;
    jsAPILayerQueryFeatureCount(query: __esri.Query | __esri.QueryProperties, layer?: __esri.OrientedImageryLayer): Promise<number>;
    get layer(): __esri.OrientedImageryLayer;
    set layer(l: __esri.OrientedImageryLayer);
    createJSAPILayerByDataSource(dataSource?: OrientImageryLayerDataSourceImpl, useDataSourceQueryParams?: boolean, throwError?: boolean): Promise<__esri.OrientedImageryLayer>;
    ready(): Promise<this>;
}
