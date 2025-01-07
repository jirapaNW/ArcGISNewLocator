import createStyled, { shouldForwardProp } from './create-styled';
export declare const rootShouldForwardProp: (prop: any) => boolean;
export declare const slotShouldForwardProp: typeof shouldForwardProp;
declare const styled: import("./create-styled").CreatedStyled<import("jimu-theme").Theme>;
export { createStyled, shouldForwardProp };
export default styled;
