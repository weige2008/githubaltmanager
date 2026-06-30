import { SkeletonProps } from "./skeleton.js";
import * as _$vue from "vue";

//#region ../../packages/components/skeleton/src/skeleton.vue.d.ts
declare var __VLS_1: {
    key: number;
  }, __VLS_13: {};
type __VLS_Slots = {} & {
  template?: (props: typeof __VLS_1) => any;
} & {
  default?: (props: typeof __VLS_13) => any;
};
declare const __VLS_base: _$vue.DefineComponent<SkeletonProps, {
  /** @description loading state */uiLoading: _$vue.Ref<boolean, boolean>;
}, {}, {}, {}, _$vue.ComponentOptionsMixin, _$vue.ComponentOptionsMixin, {}, string, _$vue.PublicProps, Readonly<SkeletonProps> & Readonly<{}>, {
  rows: number;
  loading: boolean;
  count: number;
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