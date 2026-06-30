import { InputInstance } from "../../input/src/instance.js";
import Color from "./utils/color.js";
import { ColorPickerPanelProps } from "./color-picker-panel.js";
import * as _$vue from "vue";

//#region ../../packages/components/color-picker-panel/src/color-picker-panel.vue.d.ts
declare function update(): void;
declare var __VLS_38: {};
type __VLS_Slots = {} & {
  footer?: (props: typeof __VLS_38) => any;
};
declare const __VLS_base: _$vue.DefineComponent<ColorPickerPanelProps, {
  /**
   * @description current color object
   */
  color: Color;
  /**
   * @description custom input ref
   */
  inputRef: _$vue.Ref<InputInstance | undefined, InputInstance | undefined>;
  /**
   * @description update sub components
   */
  update: typeof update;
}, {}, {}, {}, _$vue.ComponentOptionsMixin, _$vue.ComponentOptionsMixin, {
  "update:modelValue": (val: string | null) => void;
}, string, _$vue.PublicProps, Readonly<ColorPickerPanelProps> & Readonly<{
  "onUpdate:modelValue"?: ((val: string | null) => any) | undefined;
}>, {
  border: boolean;
  modelValue: string | null;
  validateEvent: boolean;
  showAlpha: boolean;
}, {}, {}, {}, string, _$vue.ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
type __VLS_WithSlots<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
export { _default as default };