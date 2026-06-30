import { SwitchProps } from "./switch.js";
import * as _$vue from "vue";

//#region ../../packages/components/switch/src/switch.vue.d.ts
declare var __VLS_1: {}, __VLS_14: {}, __VLS_27: {}, __VLS_51: {}, __VLS_64: {}, __VLS_77: {};
type __VLS_Slots = {} & {
  inactive?: (props: typeof __VLS_1) => any;
} & {
  inactive?: (props: typeof __VLS_14) => any;
} & {
  active?: (props: typeof __VLS_27) => any;
} & {
  'active-action'?: (props: typeof __VLS_51) => any;
} & {
  'inactive-action'?: (props: typeof __VLS_64) => any;
} & {
  active?: (props: typeof __VLS_77) => any;
};
declare const __VLS_base: _$vue.DefineComponent<SwitchProps, {
  /**
   *  @description manual focus to the switch component
   **/
  focus: () => void;
  /**
   * @description whether Switch is checked
   */
  checked: _$vue.ComputedRef<boolean>;
}, {}, {}, {}, _$vue.ComponentOptionsMixin, _$vue.ComponentOptionsMixin, {
  "update:modelValue": (val: string | number | boolean) => void;
  change: (val: string | number | boolean) => void;
  input: (val: string | number | boolean) => void;
}, string, _$vue.PublicProps, Readonly<SwitchProps> & Readonly<{
  "onUpdate:modelValue"?: ((val: string | number | boolean) => any) | undefined;
  onChange?: ((val: string | number | boolean) => any) | undefined;
  onInput?: ((val: string | number | boolean) => any) | undefined;
}>, {
  name: string;
  width: string | number;
  disabled: boolean;
  modelValue: boolean | string | number;
  validateEvent: boolean;
  activeText: string;
  inactiveText: string;
  activeValue: boolean | string | number;
  inactiveValue: boolean | string | number;
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