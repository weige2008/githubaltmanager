import { WatermarkProps } from "./watermark.js";
import * as _$vue from "vue";

//#region ../../packages/components/watermark/src/watermark.vue.d.ts
declare var __VLS_1: {};
type __VLS_Slots = {} & {
  default?: (props: typeof __VLS_1) => any;
};
declare const __VLS_base: _$vue.DefineComponent<WatermarkProps, {}, {}, {}, {}, _$vue.ComponentOptionsMixin, _$vue.ComponentOptionsMixin, {}, string, _$vue.PublicProps, Readonly<WatermarkProps> & Readonly<{}>, {
  content: string | string[];
  rotate: number;
  zIndex: number;
  gap: [number, number];
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