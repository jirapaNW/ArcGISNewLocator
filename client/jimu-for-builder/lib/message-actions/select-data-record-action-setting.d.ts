/// <reference types="react" />
/** @jsx jsx */
import { React, type IMThemeVariables, ReactRedux } from 'jimu-core';
import { type IMConfig } from './type';
declare const _default: ReactRedux.ConnectedComponent<React.ForwardRefExoticComponent<Pick<any, string | number | symbol> & {
    theme?: IMThemeVariables;
}>, {
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
    actionId: string;
    widgetId: string;
    messageWidgetId: string;
    config?: IMConfig;
    messageType: import("jimu-core").MessageType;
    intl?: import("jimu-core").IntlShape;
    onSettingChange: import("jimu-core").ActionSettingChangeFunction;
    onDisableDoneBtn?: (isDisable: boolean) => void;
    context?: React.Context<ReactRedux.ReactReduxContextValue<any, import("redux").UnknownAction>>;
    store?: import("redux").Store<any, import("redux").UnknownAction, unknown>;
}>;
export default _default;
