/// <reference types="react" />
/** @jsx jsx */
import { React } from 'jimu-core';
import type { Props as InlineSVGProps } from 'react-inlinesvg';
export type IconSize = 's' | 'm' | 'l';
/**
 * The SVG component props.
 */
export interface SVGProps extends Omit<InlineSVGProps, 'innerRef'> {
    /**
     * To provide a role for this component.
     * It is for accessibility purposes.
     */
    role?: React.AriaRole;
    /**
     * To provide a label for interactive components for accessibility purposes.
     */
    'aria-label'?: string;
    /**
     * Indicates whether the element is exposed to an accessibility API.
     * @default false
     */
    'aria-hidden'?: boolean | 'true' | 'false';
    /**
     * The title of the component.
     */
    title?: string;
    /**
     * The SVG file you want to load. It can be a require, URL or a string (base64 or url encoded).
     */
    src: string;
    /**
     * Whether it is in the RTL.
     * Note: The default value is read from `getAppStore().getState().appContext?.isRTL` and is provided for use in testing and storybook environments.
     * @ignore
     */
    isRTL?: boolean;
    /**
     * The src used for RTL. If provided, it will be displayed instead of srcf or RTL languages.
     * It will be determined as RTL from `getAppStore().getState().appContext?.isRTL`.
     */
    srcRTL?: string;
    /**
     * Defines the size, both width and height, of the icon.
     * @default m
     */
    size?: IconSize | number | string;
    /**
     * Flips the SVG automatically for RTL.
     * @default false
     */
    autoFlip?: boolean;
    /**
     * If set to `true`, the `stroke` and `fill` properties on the child elements will be replaced with `currentColor`, in order to make `color` property effective.
     * @default true
     */
    currentColor?: boolean;
    /**
     * A component to be shown while the SVG is loading.
     */
    loader?: React.ReactNode;
    /**
     * The fallback content in case of a fetch error or unsupported browser.
     */
    children?: React.ReactNode;
}
export type SVGComponentProps = Omit<SVGProps, 'src' | 'srcRTL'>;
export declare const PreIconSizesMapping: {
    s: number;
    m: number;
    l: number;
};
/**
 * The `SVG` component is designed for displaying SVG icons. Unlike the `Icon` component, it does not support formats other than SVG.
 *
 * ```ts
 * import { SVG } from 'jimu-ui'
 * ```
 */
export declare const SVG: React.MemoExoticComponent<React.ForwardRefExoticComponent<SVGProps & React.RefAttributes<SVGElement>>>;
/**
 * The Icon component props.
 */
export interface IconComponentProps extends Omit<SVGProps, 'src' | 'srcRTL' | 'size'> {
    /**
     * The icon resource. For example: `require('path.to.icon.svg')`
     */
    icon: any;
    /**
     * Defines the size, both width and height, of the icon.
     * If `size` is defined, `width` and `height` property will be ignored.
     * @default default
     */
    size?: IconSize | number | string;
    /**
     * Customizes the width of the icon.
     * @deprecated
     */
    width?: number | string;
    /**
     * Customizes the height of the icon.
     * @deprecated
     */
    height?: number | string;
    /**
     * Defines the class names added to the element.
     */
    className?: string;
    /**
     * Defines the inline CSS style properties.
     */
    style?: React.CSSProperties;
    /**
     * Defines the `fill` color of the icon.
     * Only effective when the icon is an svg element and the `fill` property on its children are unset or set to `currentColor`.
     */
    color?: string;
    /**
     * Rotates the icon by a given degree.
     */
    rotate?: number | string;
    /**
     * Flips the icon, horizontal or vertical.
     */
    flip?: 'horizontal' | 'vertical';
    /**
     * Extra options:
     * `currentColor`: if set to `true`, the `stroke` and `fill` properties on the child elements will be replaced with `currentColor`,
     * in order to make `color` property effective.
     * @deprecated
     * @ignore
     */
    options?: {
        currentColor?: boolean;
    };
    /**
     * Flips the icon automatically, if the locale is following right-to-left (RTL).
     */
    autoFlip?: boolean;
    /**
     * The title of the icon and aria-label.
     * If displayed as a image, the `title` is used as `alt`.
     */
    title?: string;
}
/**
 * The `Icon` component is designed for svg icons display, but also supports PNG, JPG, ICO.
 *
 * SVG icons are shown as inline SVG elements in the component, while icons in other formats can be loaded using data url.
 *
 * ```ts
 * import { Icon } from 'jimu-ui'
 * ```
 */
export declare const Icon: React.MemoExoticComponent<React.ForwardRefExoticComponent<IconComponentProps & React.RefAttributes<SVGElement>>>;
