/// <reference types="react" />
/// <reference types="seamless-immutable" />
/** @jsx jsx */
import { React, ReactRedux, type LayoutTransformFunc, type IMLayoutJson } from 'jimu-core';
import { type LayoutProps, type StateToLayoutProps } from '../../types';
type FlexboxLayoutProps = LayoutProps & {
    widgetId: string;
};
declare class RowLayout extends React.PureComponent<FlexboxLayoutProps & StateToLayoutProps> {
    finalLayout: IMLayoutJson;
    layoutTransform: LayoutTransformFunc;
    numOfRows: number;
    handleDebounceResize: any;
    constructor(props: any);
    findExtension(): void;
    collectRowItems(): string[];
    transform(): void;
    createRow(): JSX.Element;
    onResize: (width: number, height: number) => void;
    render(): JSX.Element;
}
declare const _default: ReactRedux.ConnectedComponent<typeof RowLayout, {
    className?: string;
    style?: any;
    children?: React.ReactNode;
    ref?: React.LegacyRef<RowLayout>;
    key?: React.Key;
    visible?: boolean;
    layouts: import("seamless-immutable").ImmutableObjectMixin<import("jimu-core").SizeModeLayoutJson> & {
        readonly [x: string]: string;
    };
    widgetId: string;
    isInSection?: boolean;
    isInWidget?: boolean;
    isRepeat?: boolean;
    isPageItem?: boolean;
    itemDraggable?: boolean;
    itemResizable?: boolean;
    itemSelectable?: boolean;
    droppable?: boolean;
    showDefaultTools?: boolean;
    isItemAccepted?: (item: import("jimu-core").LayoutItemConstructorProps, isReplacePlaceholder: boolean) => boolean;
    onItemClick?: (e: any, widgetId: string) => void;
    ignoreMinHeight?: boolean;
    context?: React.Context<ReactRedux.ReactReduxContextValue<any, import("redux").UnknownAction>>;
    store?: import("redux").Store<any, import("redux").UnknownAction, unknown>;
}>;
export default _default;
