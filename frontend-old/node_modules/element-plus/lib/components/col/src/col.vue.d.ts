import { ColProps, ColSize } from "./col.js";
import * as _$vue from "vue";

//#region ../../packages/components/col/src/col.vue.d.ts
declare var __VLS_8: {};
type __VLS_Slots = {} & {
  default?: (props: typeof __VLS_8) => any;
};
declare const __VLS_base: _$vue.DefineComponent<ColProps, {}, {}, {}, {}, _$vue.ComponentOptionsMixin, _$vue.ComponentOptionsMixin, {}, string, _$vue.PublicProps, Readonly<ColProps> & Readonly<{}>, {
  push: number;
  offset: number;
  tag: string;
  span: number;
  pull: number;
  xs: ColSize;
  sm: ColSize;
  md: ColSize;
  lg: ColSize;
  xl: ColSize;
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