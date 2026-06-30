import { IconPropType } from "../../../utils/vue/icon.js";
import { InputAutoSize, InputModelModifiers, InputProps, InputType } from "./input.js";
import * as _$vue from "vue";
import { StyleValue } from "vue";

//#region ../../packages/components/input/src/input.vue.d.ts
declare var __VLS_1: {}, __VLS_3: {}, __VLS_30: {}, __VLS_53: {
    visible: boolean;
  }, __VLS_71: {};
type __VLS_Slots = {} & {
  prepend?: (props: typeof __VLS_1) => any;
} & {
  prefix?: (props: typeof __VLS_3) => any;
} & {
  suffix?: (props: typeof __VLS_30) => any;
} & {
  'password-icon'?: (props: typeof __VLS_53) => any;
} & {
  append?: (props: typeof __VLS_71) => any;
};
declare const __VLS_base: _$vue.DefineComponent<InputProps, {
  /** @description HTML input element */input: _$vue.ShallowRef<HTMLInputElement | undefined, HTMLInputElement | undefined>; /** @description HTML textarea element */
  textarea: _$vue.ShallowRef<HTMLTextAreaElement | undefined, HTMLTextAreaElement | undefined>; /** @description HTML element, input or textarea */
  ref: _$vue.ComputedRef<HTMLInputElement | HTMLTextAreaElement | undefined>; /** @description style of textarea. */
  textareaStyle: _$vue.ComputedRef<StyleValue>; /** @description from props (used on unit test) */
  autosize: _$vue.Ref<InputAutoSize | undefined, InputAutoSize | undefined>; /** @description is input composing */
  isComposing: _$vue.Ref<boolean, boolean>; /** @description whether the password is visible */
  passwordVisible: _$vue.Ref<boolean, boolean>; /** @description HTML input element native method */
  focus: () => void | undefined; /** @description HTML input element native method */
  blur: () => void | undefined; /** @description HTML input element native method */
  select: () => void; /** @description clear input value */
  clear: (evt?: MouseEvent) => void; /** @description resize textarea. */
  resizeTextarea: () => void;
}, {}, {}, {}, _$vue.ComponentOptionsMixin, _$vue.ComponentOptionsMixin, {
  clear: (evt: MouseEvent | undefined) => void;
  mouseenter: (evt: MouseEvent) => void;
  mouseleave: (evt: MouseEvent) => void;
  focus: (evt: FocusEvent) => void;
  blur: (evt: FocusEvent) => void;
  "update:modelValue": (value: string) => void;
  change: (value: string, evt?: Event | undefined) => void;
  keydown: (evt: Event | KeyboardEvent) => void;
  input: (value: string) => void;
  compositionstart: (evt: CompositionEvent) => void;
  compositionupdate: (evt: CompositionEvent) => void;
  compositionend: (evt: CompositionEvent) => void;
}, string, _$vue.PublicProps, Readonly<InputProps> & Readonly<{
  onClear?: ((evt: MouseEvent | undefined) => any) | undefined;
  onMouseenter?: ((evt: MouseEvent) => any) | undefined;
  onMouseleave?: ((evt: MouseEvent) => any) | undefined;
  onFocus?: ((evt: FocusEvent) => any) | undefined;
  onBlur?: ((evt: FocusEvent) => any) | undefined;
  "onUpdate:modelValue"?: ((value: string) => any) | undefined;
  onChange?: ((value: string, evt?: Event | undefined) => any) | undefined;
  onKeydown?: ((evt: Event | KeyboardEvent) => any) | undefined;
  onInput?: ((value: string) => any) | undefined;
  onCompositionstart?: ((evt: CompositionEvent) => any) | undefined;
  onCompositionupdate?: ((evt: CompositionEvent) => any) | undefined;
  onCompositionend?: ((evt: CompositionEvent) => any) | undefined;
}>, {
  type: InputType;
  disabled: boolean;
  modelValue: string | number | null;
  clearIcon: IconPropType;
  tabindex: string | number;
  validateEvent: boolean;
  modelModifiers: InputModelModifiers;
  autocomplete: string;
  wordLimitPosition: "inside" | "outside";
  inputStyle: string | false | _$vue.CSSProperties | StyleValue[] | null;
  rows: number;
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