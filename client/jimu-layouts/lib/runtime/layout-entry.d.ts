/// <reference types="react" />
/// <reference types="seamless-immutable" />
import { React, ReactRedux } from 'jimu-core';
import { type LayoutProps, type StateToLayoutProps } from '../types';
declare class LayoutEntry extends React.PureComponent<LayoutProps & StateToLayoutProps> {
    render(): React.JSX.Element;
}
declare const _default: ReactRedux.ConnectedComponent<typeof LayoutEntry, {
    className?: string;
    style?: any;
    children?: React.ReactNode;
    ref?: React.LegacyRef<LayoutEntry>;
    key?: React.Key;
    visible?: boolean;
    layouts: import("seamless-immutable").ImmutableObjectMixin<import("jimu-core").SizeModeLayoutJson> & {
        readonly [x: string]: string;
    };
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
