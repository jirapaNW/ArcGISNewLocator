import { type ImmutableObject, type IMThemeVariables, type ThemeVariables, type ThemeManifest } from 'jimu-core';
import { type ThemeModule } from './type';
export declare function getBuilderThemeVariables(): IMThemeVariables;
/**
 * Get component variables from theme variables.
 * @param categoryName
 */
export declare function getComponentVariants(name: string): ImmutableObject<{
    [key: string]: any;
}>;
/**
 * Get components variables for navigation.
 * @returns
 */
export declare const getNavigationVariables: () => ImmutableObject<{
    [key: string]: {
        [key: string]: any;
    };
}>;
/**
 * Identify if a given string is a CSS variable.
 */
export declare const isCSSVariable: (variable: string) => boolean;
/**
 * Identify if a given string is a theme color path(e.g. sys.color.primary.main)
 */
export declare const isColorPath: (path: string) => boolean;
/**
 * Get value from a path to a theme color variable.
 * @param path - Path to the theme variable. There are two types of paths:
 * One is the path separated by dots,(e.g primary.200), the other is CSS variable(var(--primary-100))
 * @param variables - Target theme variables object used to get value from.
 * if undefined, the theme variables from the current app will be used.
 */
export declare const getThemeColorValue: (path: string, variables?: ImmutableObject<Partial<ThemeVariables>>) => string;
export declare const parseCssVariables: (variable: string, theme: IMThemeVariables) => string;
export declare const parseColorPath: (path: string, theme: IMThemeVariables) => string;
export declare const parseThemeCssVariableOrPath: (path: string, theme: IMThemeVariables) => string;
/**
 * Get value from a path to a theme color variable.
 * @param path - Path to the theme variable. There are two types of paths:
 * One is the path separated by dots,(e.g primary.200. sys.color.primary.main), the other is CSS variable(var(--primary-100), var(--ref-palette-primary-100))
 * @param variables - Target theme variables object used to get value from.
 * if undefined, the theme variables from the current app will be used.
 */
export declare const parseThemeColorPath: (path: string, variables?: IMThemeVariables) => string;
/**
 * Check whether a specific theme module is loaded.
 * @param uri
 */
export declare const isThemeLoaded: (uri?: string) => boolean;
/**
 * Get a specific theme module.
 * @param uri
 */
export declare const getThemeModule: (uri?: string, showWarning?: boolean) => ThemeModule;
/**
 * Get the theme module for theme2.
 * @param uri
 */
export declare const getTheme2Module: (showWarning?: boolean) => ThemeModule;
/**
 * Update the currently used theme module.
 * Note: for components and widgets, this method should only be called during testing.
 */
export declare const setThemeModule: (module: ThemeModule) => void;
/**
 * Get the override style function of the specific component.
 * @param name
 * @param uri
 */
export declare const getThemeStyle: (name: string, uri?: string) => import("./type").CompSlotStyle;
/**
 * Get the theme manifest.
 * @param uri
 */
export declare const getThemeManifest: (uri?: string, showWarning?: boolean) => ThemeManifest;
/**
 * Get the theme manifest for theme2.
 * @param uri
 */
export declare const getTheme2Manifest: (showWarning?: boolean) => ThemeManifest;
/**
 * Get the theme manifest for app themes.
 * @param uri
 */
export declare const getAppThemeManifest: (uri?: string, showWarning?: boolean) => ThemeManifest;
/**
 * Get the override style function of the specific component for theme2.
 * @param name
 * @param uri
 */
export declare const getTheme2Style: (name: string) => import("./type").CompSlotStyle | {
    [x: string]: import("jimu-theme").OverridesStyleRules<{
        [key: string]: any;
    }, IMThemeVariables>;
};
/**
 * Get the theme variable for the current iframe.
 */
export declare const getTheme: () => IMThemeVariables;
/**
 * Get the theme variable for another framework.
 * In the app-in-builder env, this variable points to the builder.
 * In the builder env, this variable points to the app.
 * In a single app env, this variable is null.
 */
export declare const getTheme2: () => IMThemeVariables;
export declare const useThemeLoaded: (uri: string) => boolean;
