import { type IMDataSourceSchema } from 'jimu-core';
import { type ArcGISQueriableDataSourceConstructorOptions, AbstractArcGISQueriableDataSource } from '../base-classes/abstract-arcgis-queriable-data-source';
import { DataSourceTypes } from '../interfaces';
import type { FeatureLayerDataSource, FeatureDataRecord, ArcGISQueryParams, IFeatureLayer, SceneLayerDataSource, ArcGISSelectOptions } from '../interfaces';
import type { WebMapWebChart } from 'arcgis-charts-components';
export interface FeatureLayerDataSourceConstructorOptions extends ArcGISQueriableDataSourceConstructorOptions {
    /**
     * If the feature layer data source is used by a scene layer data source to do query,
     * will save the scene layer data source to make it easy to find it.
     */
    associatedDataSource?: SceneLayerDataSource;
}
export declare class FeatureLayerDataSourceImpl extends AbstractArcGISQueriableDataSource implements FeatureLayerDataSource {
    type: DataSourceTypes.FeatureLayer;
    private relatedDataSources?;
    private _restLayer?;
    private associatedDataSource?;
    get isAssociatedFeatureLayer(): boolean;
    get isSqlCaseSensitive(): boolean;
    set isSqlCaseSensitive(isCaseSensitive: boolean);
    ready(): Promise<this>;
    jsAPILayerQueryObjectIds(query: __esri.Query | __esri.QueryProperties, layer?: __esri.FeatureLayer): Promise<number[]>;
    jsAPILayerQueryFeatures(query: __esri.Query | __esri.QueryProperties, layer?: __esri.FeatureLayer): Promise<__esri.FeatureSet>;
    jsAPILayerQueryFeatureCount(query: __esri.Query | __esri.QueryProperties, layer?: __esri.FeatureLayer): Promise<number>;
    get layer(): __esri.FeatureLayer;
    set layer(l: __esri.FeatureLayer);
    get restLayer(): IFeatureLayer;
    set restLayer(l: IFeatureLayer);
    setAssociatedDataSource(associatedDataSource: SceneLayerDataSource): void;
    getAssociatedDataSource(): SceneLayerDataSource;
    isInAppConfig(): boolean;
    createRestAPILayerByDataSource(): IFeatureLayer;
    getCharts(): WebMapWebChart[];
    fetchSchema(): Promise<IMDataSourceSchema>;
    protected fetchSchemaWithLayer(): Promise<IMDataSourceSchema>;
    createRelatedDataSources(): Promise<FeatureLayerDataSource[]>;
    getRelatedDataSources(): FeatureLayerDataSource[];
    queryRelatedRecords(relatedDs: FeatureLayerDataSource, ids: string[], params?: ArcGISQueryParams, ignoreFilter?: boolean): Promise<{
        objectId: number;
        relatedRecords: FeatureDataRecord[];
        count: number;
    }[]>;
    queryRelatedFieldValues(records: FeatureDataRecord[], relatedDs: FeatureLayerDataSource, relatedFieldName: string): Promise<any[]>;
    createJSAPILayerByDataSource(dataSource?: FeatureLayerDataSource, useDataSourceQueryParams?: boolean, throwError?: boolean): Promise<__esri.FeatureLayer>;
    protected changeUrl(options: ArcGISSelectOptions, derivedFromDataSource?: FeatureLayerDataSource): void;
    protected doAddRecordToServerSideSource(record: FeatureDataRecord): Promise<FeatureDataRecord>;
    protected doDeleteOneRecordFromServerSideSource(record: FeatureDataRecord): Promise<boolean>;
    protected doUpdateRecordsInServerSideSource(records: FeatureDataRecord[]): Promise<boolean>;
    private addRecordByLayer;
    private addRecordByUrl;
    private updateRecordsByLayer;
    private updateRecordsByUrl;
    private deleteOneRecordByLayer;
    private deleteOneRecordByUrl;
    afterUpdateRecords(records: FeatureDataRecord[]): void;
    afterUpdateRecord(record: FeatureDataRecord): void;
    afterAddRecord(record: FeatureDataRecord): void;
    afterDeleteRecordsByIds(ids: string[]): void;
    afterDeleteRecordById(id: string): void;
    private checkAndClearCacheNotAddVersion;
    private replaceSubLayerWithFeatureLayer;
}
