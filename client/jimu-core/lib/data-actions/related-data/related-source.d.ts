import { jsx } from '@emotion/react';
import { type FeatureDataRecord, type FeatureLayerDataSource } from '../../data-sources/interfaces';
import { type UIComponents } from './index';
import { type RelatedInfo } from './related-list';
export interface RelatedSourceProps {
    dataSource: FeatureLayerDataSource;
    records: FeatureDataRecord[];
    relatedDataSource: FeatureLayerDataSource;
    onQueryEnd: (relatedInfo: RelatedInfo) => void;
    onSelect: (relatedInfo: RelatedInfo) => void;
    uiComponents: UIComponents;
}
export default function RelatedSource(props: RelatedSourceProps): jsx.JSX.Element;
