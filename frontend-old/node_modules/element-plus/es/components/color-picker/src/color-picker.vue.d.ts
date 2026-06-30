import Color from "../../color-picker-panel/src/utils/color.js";
import { ColorPickerProps } from "./color-picker.js";
import * as _$vue from "vue";

//#region ../../packages/components/color-picker/src/color-picker.vue.d.ts
declare function show(): void;
declare function hide(): void;
declare function focus(): void;
declare function blur(): void;
declare const __VLS_export: _$vue.DefineComponent<ColorPickerProps, {
  /**
   * @description current color object
   */
  color: Color;
  /**
   * @description manually show ColorPicker
   */
  show: typeof show;
  /**
   * @description manually hide ColorPicker
   */
  hide: typeof hide;
  /**
   * @description focus the input element
   */
  focus: typeof focus;
  /**
   * @description blur the input element
   */
  blur: typeof blur;
}, {}, {}, {}, _$vue.ComponentOptionsMixin, _$vue.ComponentOptionsMixin, {
  clear: () => void;
  focus: (evt: FocusEvent) => void;
  blur: (evt: FocusEvent) => void;
  "update:modelValue": (val: string | null) => void;
  change: (val: string | null) => void;
  activeChange: (val: string | null) => void;
}, string, _$vue.PublicProps, Readonly<ColorPickerProps> & Readonly<{
  onClear?: (() => any) | undefined;
  onFocus?: ((evt: FocusEvent) => any) | undefined;
  onBlur?: ((evt: FocusEvent) => any) | undefined;
  "onUpdate:modelValue"?: ((val: string | null) => any) | undefined;
  onChange?: ((val: string | null) => any) | undefined;
  onActiveChange?: ((val: string | null) => any) | undefined;
}>, {
  disabled: boolean;
  modelValue: string | null;
  popperStyle: string | false | _$vue.CSSProperties | _$vue.StyleValue[] | null;
  teleported: boolean;
  persistent: boolean;
  clearable: boolean;
  tabindex: string | number;
  validateEvent: boolean;
  valueOnClear: string | number | boolean | Function | null;
}, {}, {}, {}, string, _$vue.ComponentProvideOptions, false, {}, any>;
declare const _default: typeof __VLS_export;
//#endregion
export { _default as default };