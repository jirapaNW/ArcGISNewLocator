/// <reference types="react" />
import { React, ReactRedux, type IMAppConfig, type IMSelection } from 'jimu-core';
import { type GuideProps } from '../../core/guide';
import { type StepOnChangeCallBackProps } from '../../../types';
interface StateToProps {
    appConfig: IMAppConfig;
    widgetSelection: IMSelection;
}
export declare const _InsertWidgetGuide: (props: GuideProps & StateToProps) => React.JSX.Element;
export declare const InsertWidgetGuide: ReactRedux.ConnectedComponent<(props: GuideProps & StateToProps) => React.JSX.Element, {
    disabled?: boolean;
    className?: string;
    steps: import("../../../types").Steps;
    stepIndex?: number;
    run?: boolean;
    conditionalStepIndexes?: import("../../../types").ConditionalStepIndexes;
    onStepChange?: (data: StepOnChangeCallBackProps) => void;
    onActionClick?: (e: any, step: import("../../../types").Step, index: number) => void;
    widgetName?: string;
    widgetJson?: import("jimu-core").WidgetJson;
    isInjected?: boolean;
    context?: React.Context<ReactRedux.ReactReduxContextValue<any, import("redux").UnknownAction>>;
    store?: import("redux").Store<any, import("redux").UnknownAction, unknown>;
}>;
export {};
