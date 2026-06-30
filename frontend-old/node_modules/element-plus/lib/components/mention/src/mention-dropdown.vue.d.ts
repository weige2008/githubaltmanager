import { MentionOption } from "./types.js";
import { MentionDropdownProps } from "./mention-dropdown.js";
import * as _$vue from "vue";

//#region ../../packages/components/mention/src/mention-dropdown.vue.d.ts
declare var __VLS_1: {}, __VLS_11: {
    item: MentionOption;
    index: number;
  }, __VLS_13: {}, __VLS_15: {};
type __VLS_Slots = {} & {
  header?: (props: typeof __VLS_1) => any;
} & {
  label?: (props: typeof __VLS_11) => any;
} & {
  loading?: (props: typeof __VLS_13) => any;
} & {
  footer?: (props: typeof __VLS_15) => any;
};
declare const __VLS_base: _$vue.DefineComponent<MentionDropdownProps, {
  hoveringIndex: _$vue.Ref<number, number>;
  navigateOptions: (direction: "next" | "prev") => void;
  selectHoverOption: () => void;
  hoverOption: _$vue.ComputedRef<MentionOption>;
}, {}, {}, {}, _$vue.ComponentOptionsMixin, _$vue.ComponentOptionsMixin, {
  select: (option: MentionOption) => void;
}, string, _$vue.PublicProps, Readonly<MentionDropdownProps> & Readonly<{
  onSelect?: ((option: MentionOption) => any) | undefined;
}>, {
  options: MentionOption[];
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