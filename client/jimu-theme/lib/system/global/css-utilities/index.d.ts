/// <reference types="react" />
import { React } from 'jimu-core';
import { type Theme } from '../../create-theme';
interface CssUtilitiesProviderProps {
    theme?: Theme;
}
export declare const CssUtilitiesProvider: (props: CssUtilitiesProviderProps) => React.JSX.Element;
export declare const classesUtils: {
    colorsUtilities: (colors: import("jimu-theme").ColorScheme) => {
        [x: string]: any;
    };
    borderColorUtilities: (theme: Theme) => {
        [x: string]: any;
    };
    spacingUtilities: (spacing: import("jimu-theme").Spacing) => {};
    shadowUtilities: (inputShadows: import("jimu-theme").Shadow) => {};
    shapeUtilities: <T extends object>(shape: T) => {
        '.rounded-0': {
            borderRadius: string;
        };
        '.rounded-circle': {
            borderRadius: string;
        };
        '.rounded-pill': {
            borderRadius: string;
        };
    };
    typographyUtilities: <T_1 extends object>(typography: T_1) => {};
};
export {};
