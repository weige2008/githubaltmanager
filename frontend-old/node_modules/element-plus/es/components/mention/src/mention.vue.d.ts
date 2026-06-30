import { InputInstance } from "../../input/src/instance.js";
import { TooltipInstance } from "../../tooltip/src/tooltip.js";
import { MentionOption } from "./types.js";
import { MentionProps } from "./mention.js";
import * as _$vue from "vue";

//#region ../../packages/components/mention/src/mention.vue.d.ts
declare const __VLS_export: <T extends MentionOption = MentionOption>(__VLS_props: NonNullable<Awaited<typeof __VLS_setup>>["props"], __VLS_ctx?: __VLS_PrettifyLocal<Pick<NonNullable<Awaited<typeof __VLS_setup>>, "attrs" | "emit" | "slots">>, __VLS_exposed?: NonNullable<Awaited<typeof __VLS_setup>>["expose"], __VLS_setup?: Promise<{
  props: _$vue.PublicProps & __VLS_PrettifyLocal<MentionProps<T> & {
    onFocus?: ((evt: FocusEvent) => any) | undefined;
    onBlur?: ((evt: FocusEvent) => any) | undefined;
    "onUpdate:modelValue"?: ((value: string) => any) | undefined;
    onInput?: ((value: string) => any) | undefined;
    onSearch?: ((pattern: string, prefix: string) => any) | undefined;
    onSelect?: ((option: MentionOption, prefix: string) => any) | undefined;
    "onWhole-remove"?: ((pattern: string, prefix: string) => any) | undefined;
  }> & (typeof globalThis extends {
    __VLS_PROPS_FALLBACK: infer P;
  } ? P : {});
  expose: (exposed: _$vue.ShallowUnwrapRef<{
    input: _$vue.Ref<InputInstance | undefined, InputInstance | undefined>;
    tooltip: _$vue.Ref<TooltipInstance | undefined, TooltipInstance | undefined>;
    dropdownVisible: _$vue.ComputedRef<boolean>;
  }>) => void;
  attrs: any;
  slots: Readonly<{
    [name: string]: _$vue.Slot<any> | undefined;
  }> & {
    prepend?: (props: {}) => any;
  } & {
    prefix?: (props: {}) => any;
  } & {
    suffix?: (props: {}) => any;
  } & {
    'password-icon'?: (props: {
      visible: boolean;
    }) => any;
  } & {
    append?: (props: {}) => any;
  } & {
    header?: () => any;
    footer?: () => any;
    loading?: () => any;
    label?: (props: {
      item: T & MentionOption;
      index: number;
    }) => any;
  };
  emit: ((event: "focus", evt: FocusEvent) => void) & ((event: "blur", evt: FocusEvent) => void) & ((event: "update:modelValue", value: string) => void) & ((event: "input", value: string) => void) & ((event: "search", pattern: string, prefix: string) => void) & ((event: "select", option: MentionOption, prefix: string) => void) & ((event: "whole-remove", pattern: string, prefix: string) => void);
}>) => _$vue.VNode & {
  __ctx?: Awaited<typeof __VLS_setup>;
};
declare const _default: typeof __VLS_export;
type __VLS_PrettifyLocal<T> = (T extends any ? { [K in keyof T]: T[K] } : { [K in keyof T as K]: T[K] }) & {};
//#endregion
export { _default as default };