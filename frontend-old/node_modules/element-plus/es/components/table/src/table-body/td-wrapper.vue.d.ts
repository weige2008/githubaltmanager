import * as _$vue from "vue";

//#region ../../packages/components/table/src/table-body/td-wrapper.vue.d.ts
declare var __VLS_1: {};
type __VLS_Slots = {} & {
  default?: (props: typeof __VLS_1) => any;
};
declare const __VLS_base: _$vue.DefineComponent<_$vue.ExtractPropTypes<{
  colspan: {
    type: NumberConstructor;
    default: number;
  };
  rowspan: {
    type: NumberConstructor;
    default: number;
  };
}>, {}, {}, {}, {}, _$vue.ComponentOptionsMixin, _$vue.ComponentOptionsMixin, {}, string, _$vue.PublicProps, Readonly<_$vue.ExtractPropTypes<{
  colspan: {
    type: NumberConstructor;
    default: number;
  };
  rowspan: {
    type: NumberConstructor;
    default: number;
  };
}>> & Readonly<{}>, {
  rowspan: number;
  colspan: number;
}, {}, {}, {}, string, _$vue.ComponentProvideOptions, true, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
type __VLS_WithSlots<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
export { _default as default };