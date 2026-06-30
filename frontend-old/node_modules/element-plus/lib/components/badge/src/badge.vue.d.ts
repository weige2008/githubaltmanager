import { BadgeProps } from "./badge.js";
import * as _$vue from "vue";
import { StyleValue } from "vue";

//#region ../../packages/components/badge/src/badge.vue.d.ts
declare var __VLS_1: {}, __VLS_9: {
    value: string;
  };
type __VLS_Slots = {} & {
  default?: (props: typeof __VLS_1) => any;
} & {
  content?: (props: typeof __VLS_9) => any;
};
declare const __VLS_base: _$vue.DefineComponent<BadgeProps, {
  /** @description badge content */content: _$vue.ComputedRef<string>;
}, {}, {}, {}, _$vue.ComponentOptionsMixin, _$vue.ComponentOptionsMixin, {}, string, _$vue.PublicProps, Readonly<BadgeProps> & Readonly<{}>, {
  type: "primary" | "success" | "warning" | "info" | "danger";
  offset: [number, number];
  value: string | number;
  max: number;
  showZero: boolean;
  badgeStyle: string | false | _$vue.CSSProperties | StyleValue[] | null;
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