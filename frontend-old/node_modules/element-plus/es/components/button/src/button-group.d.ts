import { EpPropFinalized, EpPropMergeType } from "../../../utils/vue/props/types.js";
import { ButtonProps } from "./button.js";
import * as _$vue from "vue";
import { ExtractPublicPropTypes } from "vue";

//#region ../../packages/components/button/src/button-group.d.ts
interface ButtonGroupProps {
  /**
   * @description control the size of buttons in this button-group
   */
  size?: ButtonProps['size'];
  /**
   * @description control the type of buttons in this button-group
   */
  type?: ButtonProps['type'];
  /**
   * @description display direction
   */
  direction?: 'horizontal' | 'vertical';
}
/**
 * @deprecated Removed after 3.0.0, Use `ButtonGroupProps` instead.
 */
declare const buttonGroupProps: {
  /**
   * @description control the size of buttons in this button-group
   */
  readonly size: {
    readonly type: _$vue.PropType<EpPropMergeType<StringConstructor, "" | "default" | "large" | "small", never>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  /**
   * @description control the type of buttons in this button-group
   */
  readonly type: EpPropFinalized<StringConstructor, "" | "default" | "text" | "info" | "primary" | "success" | "warning" | "danger", unknown, "", boolean>;
  /**
   * @description display direction
   */
  readonly direction: {
    readonly type: _$vue.PropType<"horizontal" | "vertical">;
    readonly values: readonly ["horizontal", "vertical"];
    readonly default: "horizontal";
  };
};
/**
 * @deprecated Removed after 3.0.0, Use `ButtonGroupProps` instead.
 */
type ButtonGroupPropsPublic = ExtractPublicPropTypes<typeof buttonGroupProps>;
//#endregion
export { ButtonGroupProps, ButtonGroupPropsPublic, buttonGroupProps };