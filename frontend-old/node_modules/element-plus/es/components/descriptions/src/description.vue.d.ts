import { DescriptionProps } from "./description.js";
import * as _$vue from "vue";

//#region ../../packages/components/descriptions/src/description.vue.d.ts
declare var __VLS_1: {}, __VLS_3: {};
type __VLS_Slots = {} & {
  title?: (props: typeof __VLS_1) => any;
} & {
  extra?: (props: typeof __VLS_3) => any;
};
declare const __VLS_base: _$vue.DefineComponent<DescriptionProps, {}, {}, {}, {}, _$vue.ComponentOptionsMixin, _$vue.ComponentOptionsMixin, {}, string, _$vue.PublicProps, Readonly<DescriptionProps> & Readonly<{}>, {
  column: number;
  direction: "horizontal" | "vertical";
  title: string;
  extra: string;
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