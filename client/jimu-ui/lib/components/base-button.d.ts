/// <reference types="react" />
import { React, type IMThemeVariables } from 'jimu-core';
import { type BrandFucntionColors, type CSSInterpolation } from 'jimu-theme';
import type { StandardComponentProps, ComponentSize } from './types';
export interface BaseButtonSlots {
    root: string;
    icon: string;
}
export type BaseButtonSlotKey = keyof BaseButtonSlots;
/**
 * The BaseButton component props.
 */
export interface BaseButtonProps extends StandardComponentProps {
    /**
     * The unique id added to the element.
     */
    id?: string | undefined;
    /**
     * The `tabIndex` added to the element.
     */
    tabIndex?: number | undefined;
    /**
     * Defines the role added to the element.
     */
    role?: React.AriaRole | undefined;
    /**
     * Defines the title added to the element.
     */
    title?: string | undefined;
    /**
     * The variant to use.
     */
    variant?: 'contained' | 'outlined' | 'text' | 'link';
    /**
     * Whether `outlined` is set as dotted line.
     */
    dashed?: boolean;
    /**
     * The color of the component. It supports both default(if not set) and theme colors.
     */
    color?: BrandFucntionColors;
    /**
     * The size of the component.
     */
    size?: ComponentSize;
    /**
     * If `true`, the button will span the full width of its parent.
     */
    block?: boolean;
    /**
     * Custom html element to be used as a button.
     *
     * @default button
     */
    tag?: React.ElementType;
    /**
     * Sets value for the native `type` property of the `<button>` element when `tag` property is `button`.
     */
    type?: 'submit' | 'reset' | 'button';
    /**
     * If `true`, the button will be displayed as an icon button with custom styles applied to make the
     * width and height equal.
     */
    icon?: boolean;
    /**
     * Fire callback when the button is clicked.
     */
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    /**
     * If `true`, the component will be disabled.
     */
    disabled?: boolean | undefined;
    /**
     * Defines the children of the element.
     */
    children?: React.ReactNode | undefined;
}
export declare const getBaseButtonStyles: (props: BaseButtonProps, theme: IMThemeVariables) => {
    root: CSSInterpolation;
    icon: {
        width: string;
        height: string;
        display: string;
        alignItems: string;
        justifyContent: string;
        color: string;
    };
};
/**
 * Note: Component is still under development, do not use it.
 *
 * The `BaseButton` component allows users to take actions, and make choices, with a single tap.
 *
 * ```ts
 * import { BaseButton } from 'jimu-ui'
 * ```
 */
export declare const BaseButton: React.ForwardRefExoticComponent<BaseButtonProps & React.RefAttributes<HTMLButtonElement>>;
