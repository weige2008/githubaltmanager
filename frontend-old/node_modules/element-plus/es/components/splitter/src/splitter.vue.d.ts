import { Layout } from "./type.js";
import { SplitterProps } from "./splitter.js";
import * as _$vue from "vue";

//#region ../../packages/components/splitter/src/splitter.vue.d.ts
declare var __VLS_1: {};
type __VLS_Slots = {} & {
  default?: (props: typeof __VLS_1) => any;
};
declare const __VLS_base: _$vue.DefineComponent<SplitterProps, {}, {}, {}, {}, _$vue.ComponentOptionsMixin, _$vue.ComponentOptionsMixin, {
  collapse: (index: number, type: "start" | "end", sizes: number[]) => void;
  resize: (index: number, sizes: number[]) => void;
  resizeStart: (index: number, sizes: number[]) => void;
  resizeEnd: (index: number, sizes: number[]) => void;
}, string, _$vue.PublicProps, Readonly<SplitterProps> & Readonly<{
  onCollapse?: ((index: number, type: "start" | "end", sizes: number[]) => any) | undefined;
  onResize?: ((index: number, sizes: number[]) => any) | undefined;
  onResizeStart?: ((index: number, sizes: number[]) => any) | undefined;
  onResizeEnd?: ((index: number, sizes: number[]) => any) | undefined;
}>, {
  layout: Layout;
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