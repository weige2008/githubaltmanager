import Color from "../utils/color.js";
import * as _$vue from "vue";
import { ExtractPublicPropTypes } from "vue";

//#region ../../packages/components/color-picker-panel/src/props/slider.d.ts
interface AlphaSliderProps {
  color: Color;
  vertical?: boolean;
  disabled?: boolean;
}
interface HueSliderProps extends AlphaSliderProps {}
/**
 * @deprecated Removed after 3.0.0, Use `AlphaSliderProps` instead.
 */
declare const alphaSliderProps: {
  readonly color: {
    readonly type: _$vue.PropType<Color>;
    readonly required: true;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly vertical: BooleanConstructor;
  readonly disabled: BooleanConstructor;
};
/**
 * @deprecated Removed after 3.0.0, Use `HueSliderProps` instead.
 */
declare const hueSliderProps: {
  readonly color: {
    readonly type: _$vue.PropType<Color>;
    readonly required: true;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly vertical: BooleanConstructor;
  readonly disabled: BooleanConstructor;
};
/**
 * @deprecated Removed after 3.0.0, Use `AlphaSliderProps` instead.
 */
type AlphaSliderPropsPublic = ExtractPublicPropTypes<typeof alphaSliderProps>;
//#endregion
export { AlphaSliderProps, AlphaSliderPropsPublic, HueSliderProps, alphaSliderProps, hueSliderProps };