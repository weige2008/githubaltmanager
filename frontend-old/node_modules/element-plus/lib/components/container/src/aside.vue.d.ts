import * as _$vue from "vue";

//#region ../../packages/components/container/src/aside.vue.d.ts
interface AsideProps {
  /**
   * @description width of the side section
   */
  width?: string | null;
}
declare var __VLS_1: {};
type __VLS_Slots = {} & {
  default?: (props: typeof __VLS_1) => any;
};
declare const __VLS_base: _$vue.DefineComponent<AsideProps, {}, {}, {}, {}, _$vue.ComponentOptionsMixin, _$vue.ComponentOptionsMixin, {}, string, _$vue.PublicProps, Readonly<AsideProps> & Readonly<{}>, {
  width: string | null;
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