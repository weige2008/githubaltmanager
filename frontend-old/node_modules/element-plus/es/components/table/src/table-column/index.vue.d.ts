import { TableColumnCtx, TableColumnProps } from "./defaults.js";
import { DefaultRow } from "../table/defaults.js";
import * as _$vue from "vue";

//#region ../../packages/components/table/src/table-column/index.vue.d.ts
declare const __VLS_export: <T extends DefaultRow = DefaultRow>(__VLS_props: NonNullable<Awaited<typeof __VLS_setup>>["props"], __VLS_ctx?: __VLS_PrettifyLocal<Pick<NonNullable<Awaited<typeof __VLS_setup>>, "attrs" | "emit" | "slots">>, __VLS_exposed?: NonNullable<Awaited<typeof __VLS_setup>>["expose"], __VLS_setup?: Promise<{
  props: _$vue.PublicProps & __VLS_PrettifyLocal<TableColumnProps<T>> & (typeof globalThis extends {
    __VLS_PROPS_FALLBACK: infer P;
  } ? P : {});
  expose: (exposed: {}) => void;
  attrs: any;
  slots: {
    default?: (props: {
      row: T;
      column: TableColumnCtx<T>;
      $index: number;
    }) => any;
    header?: (props: {
      column: TableColumnCtx<T>;
      $index: number;
    }) => any;
    expand?: (props: {
      expanded: boolean;
      expandable: boolean;
    }) => any;
    'filter-icon'?: (props: {
      filterOpened: boolean;
    }) => any;
  };
  emit: {};
}>) => _$vue.VNode & {
  __ctx?: Awaited<typeof __VLS_setup>;
};
declare const _default: typeof __VLS_export;
type __VLS_PrettifyLocal<T> = (T extends any ? { [K in keyof T]: T[K] } : { [K in keyof T as K]: T[K] }) & {};
//#endregion
export { _default as default };