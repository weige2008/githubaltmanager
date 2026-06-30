import { IconPropType } from "../../../utils/vue/icon.js";
import { PopperEffect } from "../../popper/src/popper.js";
import { InputTagProps } from "./input-tag.js";
import * as _$vue from "vue";

//#region ../../packages/components/input-tag/src/input-tag.vue.d.ts
declare var __VLS_1: {}, __VLS_15: {
    value: string;
    index: number;
  }, __VLS_41: {
    value: string;
    index: number;
  }, __VLS_43: {};
type __VLS_Slots = {} & {
  prefix?: (props: typeof __VLS_1) => any;
} & {
  tag?: (props: typeof __VLS_15) => any;
} & {
  tag?: (props: typeof __VLS_41) => any;
} & {
  suffix?: (props: typeof __VLS_43) => any;
};
declare const __VLS_base: _$vue.DefineComponent<InputTagProps, {
  focus: () => void;
  blur: () => void;
}, {}, {}, {}, _$vue.ComponentOptionsMixin, _$vue.ComponentOptionsMixin, {
  clear: () => void;
  focus: (evt: FocusEvent) => void;
  blur: (evt: FocusEvent) => void;
  "update:modelValue": (value?: string[] | undefined) => void;
  change: (value?: string[] | undefined) => void;
  input: (value: string) => void;
  "add-tag": (value: string | string[]) => void;
  "remove-tag": (value: string, index: number) => void;
  "drag-tag": (oldIndex: number, newIndex: number, value: string) => void;
}, string, _$vue.PublicProps, Readonly<InputTagProps> & Readonly<{
  onClear?: (() => any) | undefined;
  onFocus?: ((evt: FocusEvent) => any) | undefined;
  onBlur?: ((evt: FocusEvent) => any) | undefined;
  "onUpdate:modelValue"?: ((value?: string[] | undefined) => any) | undefined;
  onChange?: ((value?: string[] | undefined) => any) | undefined;
  onInput?: ((value: string) => any) | undefined;
  "onAdd-tag"?: ((value: string | string[]) => any) | undefined;
  "onRemove-tag"?: ((value: string, index: number) => any) | undefined;
  "onDrag-tag"?: ((oldIndex: number, newIndex: number, value: string) => any) | undefined;
}>, {
  id: string;
  disabled: boolean;
  effect: PopperEffect;
  clearIcon: IconPropType;
  saveOnBlur: boolean;
  tabindex: string | number;
  validateEvent: boolean;
  autocomplete: string;
  trigger: "Enter" | "Space";
  maxCollapseTags: number;
  tagType: "info" | "primary" | "success" | "warning" | "danger";
  tagEffect: "dark" | "light" | "plain";
  delimiter: string | RegExp;
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