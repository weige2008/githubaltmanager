import { EpPropFinalized } from "../../../utils/vue/props/types.js";
import _default from "./divider.vue.js";
import { ExtractPublicPropTypes } from "vue";

//#region ../../packages/components/divider/src/divider.d.ts
type BorderStyle = CSSStyleDeclaration['borderStyle'];
interface DividerProps {
  /**
   * @description Set divider's direction
   */
  direction?: 'horizontal' | 'vertical';
  /**
   * @description The position of the customized content on the divider line
   */
  contentPosition?: 'left' | 'center' | 'right';
  /**
   * @description Set the style of divider
   */
  borderStyle?: BorderStyle;
}
/**
 * @deprecated Removed after 3.0.0, Use `DividerProps` instead.
 */
declare const dividerProps: {
  readonly direction: EpPropFinalized<StringConstructor, "horizontal" | "vertical", unknown, "horizontal", boolean>;
  readonly contentPosition: EpPropFinalized<StringConstructor, "left" | "center" | "right", unknown, "center", boolean>;
  readonly borderStyle: EpPropFinalized<(new (...args: any[]) => string) | (() => string) | (((new (...args: any[]) => string) | (() => string)) | null)[], unknown, unknown, "solid", boolean>;
};
/**
 * @deprecated Removed after 3.0.0, Use `DividerProps` instead.
 */
type DividerPropsPublic = ExtractPublicPropTypes<typeof dividerProps>;
type DividerInstance = InstanceType<typeof _default> & unknown;
//#endregion
export { BorderStyle, DividerInstance, DividerProps, DividerPropsPublic, dividerProps };