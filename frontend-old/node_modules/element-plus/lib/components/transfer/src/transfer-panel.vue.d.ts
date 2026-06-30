import { TransferDataItem, TransferKey } from "./transfer.js";
import { TransferPanelProps } from "./transfer-panel.js";
import * as _$vue from "vue";

//#region ../../packages/components/transfer/src/transfer-panel.vue.d.ts
declare const __VLS_export: <T extends TransferDataItem = TransferDataItem>(__VLS_props: NonNullable<Awaited<typeof __VLS_setup>>["props"], __VLS_ctx?: __VLS_PrettifyLocal<Pick<NonNullable<Awaited<typeof __VLS_setup>>, "attrs" | "emit" | "slots">>, __VLS_exposed?: NonNullable<Awaited<typeof __VLS_setup>>["expose"], __VLS_setup?: Promise<{
  props: _$vue.PublicProps & __VLS_PrettifyLocal<TransferPanelProps<T> & {
    "onChecked-change"?: ((value: TransferKey[], movedKeys?: TransferKey[] | undefined) => any) | undefined;
  }> & (typeof globalThis extends {
    __VLS_PROPS_FALLBACK: infer P;
  } ? P : {});
  expose: (exposed: _$vue.ShallowUnwrapRef<{
    /** @description filter keyword */query: _$vue.Ref<string, string>;
  }>) => void;
  attrs: any;
  slots: {
    empty?: (props: {}) => any;
  } & {
    default?: (props: {}) => any;
  };
  emit: (event: "checked-change", value: TransferKey[], movedKeys?: TransferKey[] | undefined) => void;
}>) => _$vue.VNode & {
  __ctx?: Awaited<typeof __VLS_setup>;
};
declare const _default: typeof __VLS_export;
type __VLS_PrettifyLocal<T> = (T extends any ? { [K in keyof T]: T[K] } : { [K in keyof T as K]: T[K] }) & {};
//#endregion
export { _default as default };