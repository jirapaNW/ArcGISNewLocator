import type { GeometryType } from '@esri/arcgis-rest-feature-service';
import { DataSourceTypes, type ImageryLayerDataSource } from '../interfaces';
import { AbstractArcGISQueriableDataSource } from '../base-classes/abstract-arcgis-queriable-data-source';
export declare class ImageryLayerDataSourceImpl extends AbstractArcGISQueriableDataSource implements ImageryLayerDataSource {
    type: DataSourceTypes.ImageryLayer;
    jsAPILayerQueryObjectIds(query: __esri.Query | __esri.QueryProperties, layer?: __esri.ImageryLayer): Promise<number[]>;
    jsAPILayerQueryFeatures(query: __esri.Query | __esri.QueryProperties, layer?: __esri.ImageryLayer): Promise<__esri.FeatureSet>;
    jsAPILayerQueryFeatureCount(query: __esri.Query | __esri.QueryProperties, layer?: __esri.ImageryLayer): Promise<number>;
    getGeometryType(): GeometryType;
    get layer(): __esri.ImageryLayer;
    set layer(l: __esri.ImageryLayer);
    createJSAPILayerByDataSource(dataSource?: ImageryLayerDataSource, useDataSourceQueryParams?: boolean, throwError?: boolean): Promise<__esri.ImageryLayer>;
    ready(): Promise<this>;
}
