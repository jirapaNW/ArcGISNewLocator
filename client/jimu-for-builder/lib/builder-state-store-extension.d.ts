import { type IMRuntimeInfos, type ImmutableObject, type LayoutInfo, type IMState, type extensionSpec } from 'jimu-core';
import { type ToolbarConfig } from 'jimu-layouts/layout-runtime';
import { type UnknownAction } from 'redux';
interface BuilderState {
    templateName: string;
    showChooseWidgetPopup: boolean;
    currentAppId: string;
    widgetsSettingRuntimeInfo?: IMRuntimeInfos;
    widgetsSettingClassStatus: ImmutableObject<{
        [widgetUri: string]: boolean;
    }>;
    widgetSettingI18nMessages: ImmutableObject<{
        [widgetName: string]: any;
    }>;
    refreshAppList: boolean;
    toolbarConfig?: ToolbarConfig;
    currentGuideId?: string;
    contentToDelete?: LayoutInfo;
}
type IMBuilderState = ImmutableObject<BuilderState>;
/**
 * To simplify the builder widgets communication, we store a shared state in store
 */
declare module 'jimu-core/lib/types/state' {
    interface State {
        builder?: IMBuilderState;
    }
}
declare module 'jimu-core' {
    interface State {
        builder?: IMBuilderState;
    }
}
declare enum ActionKeys {
    SelectTemplate = "SELECT_TEMPLATE",
    OpenChooseWidgetPopup = "OPEN_CHOOSE_WIDGET_POPUP",
    CloseChooseWidgetPopup = "CLOSE_CHOOSE_WIDGET_POPUP",
    WidgetSettingClassLoaded = "WIDGET_SETTING_CLASS_LOADED",
    WidgetsRemoved = "WIDGETS_REMOVED",
    WidgetsAdded = "WIDGETS_ADDED",
    ChangeCurrentApp = "CHANGE_CURRENT_APP",
    RefreshAppList = "REFRSH_APPLIST",
    SetLayoutTools = "SET_LAYOUT_TOOLS",
    StartGuide = "START_GUIDE",
    StopGuide = "STOP_GUIDE",
    WidgetSettingI18nMessageLoaded = "WIDGET_SETTING_I18N_MESSAGE_LOADED",
    ConfirmDeleteContentChanged = "CONFIRM_DELETE_CONTENT_CHANGED"
}
export interface SelectTemplateAction extends UnknownAction {
    type: ActionKeys.SelectTemplate;
    templateName: string;
}
export interface ShowChooseWidgetPopupAction extends UnknownAction {
    type: ActionKeys.OpenChooseWidgetPopup;
    layoutId: string;
    layoutItemId: string;
}
export interface CloseChooseWidgetPopupAction extends UnknownAction {
    type: ActionKeys.CloseChooseWidgetPopup;
}
export interface WidgetSettingClassLoadedAction extends UnknownAction {
    type: ActionKeys.WidgetSettingClassLoaded;
    wigetUri: string;
}
export interface WidgetsAddedAction extends UnknownAction {
    type: ActionKeys.WidgetsAdded;
    widgets: Array<{
        widgetId: string;
        widgetUri: string;
    }>;
}
export interface WidgetsRemovedAction extends UnknownAction {
    type: ActionKeys.WidgetsRemoved;
    widgetIds: string[];
}
export interface ChangeCurrentAppAction extends UnknownAction {
    type: ActionKeys.ChangeCurrentApp;
    appId: string;
}
export interface RefreshAppListAction extends UnknownAction {
    type: ActionKeys.RefreshAppList;
    isRefresh: boolean;
}
export interface SetLayoutToolsAction extends UnknownAction {
    type: ActionKeys.SetLayoutTools;
    tools: ToolbarConfig;
}
export interface StartGuideAction extends UnknownAction {
    type: ActionKeys.StartGuide;
    guideId: string;
}
export interface StopGuideAction extends UnknownAction {
    type: ActionKeys.StopGuide;
}
export interface WidgetSettingI18nMessageLoadedAction extends UnknownAction {
    type: ActionKeys.WidgetSettingI18nMessageLoaded;
    widgetName: string;
    i18nMessages: any;
}
export interface ConfirmDeleteContentChangedAction extends UnknownAction {
    type: ActionKeys.ConfirmDeleteContentChanged;
    itemToDelete: LayoutInfo;
}
type ActionTypes = SelectTemplateAction | ShowChooseWidgetPopupAction | CloseChooseWidgetPopupAction | WidgetSettingClassLoadedAction | WidgetsAddedAction | WidgetsRemovedAction | RefreshAppListAction | ChangeCurrentAppAction | SetLayoutToolsAction | StartGuideAction | StopGuideAction | WidgetSettingI18nMessageLoadedAction | ConfirmDeleteContentChangedAction;
export { ActionKeys as BuilderStateActionTypes };
declare const actions: {
    selectTemplate: (templateName: string) => SelectTemplateAction;
    refreshAppListAction: (isRefresh: boolean) => RefreshAppListAction;
    openChooseWidgetPopup: (layoutId: string, layoutItemId: string) => ShowChooseWidgetPopupAction;
    closeChooseWidgetPopup: () => CloseChooseWidgetPopupAction;
    widgetSettingClassLoaded: (wigetUri: string) => {
        type: ActionKeys;
        wigetUri: string;
    };
    widgetsAdded: (widgets: Array<{
        widgetId: string;
        widgetUri: string;
    }>) => {
        type: ActionKeys;
        widgets: {
            widgetId: string;
            widgetUri: string;
        }[];
    };
    widgetsRemoved: (widgetIds: string[]) => {
        type: ActionKeys;
        widgetIds: string[];
    };
    changeCurrentApp: (appId: string) => ChangeCurrentAppAction;
    setLayoutTools: (tools: ToolbarConfig) => SetLayoutToolsAction;
    startGuide: (guideId: string) => StartGuideAction;
    stopGuide: () => StopGuideAction;
    widgetSettingI18nMessageLoaded: (widgetName: string, i18nMessages: any) => WidgetSettingI18nMessageLoadedAction;
    confirmDeleteContentChanged: (itemToDelete: LayoutInfo) => ConfirmDeleteContentChangedAction;
};
export { actions as builderActions, ActionKeys as builderActionKeys };
export default class BuilderStateReduxStoreExtension implements extensionSpec.ReduxStoreExtension {
    id: string;
    getActions(): any[];
    getInitLocalState(): IMBuilderState;
    getReducer(): (builderState: IMBuilderState, action: ActionTypes, builderFullState: IMState) => IMBuilderState;
    getStoreKey(): string;
}
