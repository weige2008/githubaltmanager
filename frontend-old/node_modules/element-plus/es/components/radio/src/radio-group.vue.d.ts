import { RadioGroupProps, radioOptionProp } from "./radio-group.js";
import * as _$vue from "vue";

//#region ../../packages/components/radio/src/radio-group.vue.d.ts
declare var __VLS_1: {};
type __VLS_Slots = {} & {
  default?: (props: typeof __VLS_1) => any;
};
declare const __VLS_base: _$vue.DefineComponent<RadioGroupProps, {}, {}, {}, {}, _$vue.ComponentOptionsMixin, _$vue.ComponentOptionsMixin, {
  "update:modelValue": (val: string | number | boolean | undefined) => void;
  change: (val: string | number | boolean | undefined) => void;
}, string, _$vue.PublicProps, Readonly<RadioGroupProps> & Readonly<{
  "onUpdate:modelValue"?: ((val: string | number | boolean | undefined) => any) | undefined;
  onChange?: ((val: string | number | boolean | undefined) => any) | undefined;
}>, {
  type: "radio" | "button";
  props: radioOptionProp;
  name: string;
  fill: string;
  id: string;
  disabled: boolean;
  modelValue: string | number | boolean;
  validateEvent: boolean;
  textColor: string;
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