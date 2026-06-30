import { CheckboxValueType } from "./checkbox.js";
import { CheckboxGroupProps, CheckboxGroupValueType } from "./checkbox-group.js";
import * as _$vue from "vue";

//#region ../../packages/components/checkbox/src/checkbox-group.vue.d.ts
declare var __VLS_8: {};
type __VLS_Slots = {} & {
  default?: (props: typeof __VLS_8) => any;
};
declare const __VLS_base: _$vue.DefineComponent<CheckboxGroupProps, {}, {}, {}, {}, _$vue.ComponentOptionsMixin, _$vue.ComponentOptionsMixin, {
  "update:modelValue": (val: CheckboxGroupValueType) => void;
  change: (val: CheckboxValueType[]) => void;
}, string, _$vue.PublicProps, Readonly<CheckboxGroupProps> & Readonly<{
  "onUpdate:modelValue"?: ((val: CheckboxGroupValueType) => any) | undefined;
  onChange?: ((val: CheckboxValueType[]) => any) | undefined;
}>, {
  type: "checkbox" | "button";
  props: {
    value?: string;
    label?: string;
    disabled?: string;
  };
  disabled: boolean;
  modelValue: CheckboxGroupValueType;
  validateEvent: boolean;
  tag: string;
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