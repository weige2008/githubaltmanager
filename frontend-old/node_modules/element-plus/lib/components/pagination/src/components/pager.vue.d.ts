import { EpPropFinalized } from "../../../../utils/vue/props/types.js";
import * as _$vue from "vue";

//#region ../../packages/components/pagination/src/components/pager.vue.d.ts
declare const __VLS_export: _$vue.DefineComponent<_$vue.ExtractPropTypes<{
  readonly currentPage: EpPropFinalized<NumberConstructor, unknown, unknown, 1, boolean>;
  readonly pageCount: {
    readonly type: _$vue.PropType<number>;
    readonly required: true;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly pagerCount: EpPropFinalized<NumberConstructor, unknown, unknown, 7, boolean>;
  readonly disabled: BooleanConstructor;
}>, {}, {}, {}, {}, _$vue.ComponentOptionsMixin, _$vue.ComponentOptionsMixin, {
  change: (...args: any[]) => void;
}, string, _$vue.PublicProps, Readonly<_$vue.ExtractPropTypes<{
  readonly currentPage: EpPropFinalized<NumberConstructor, unknown, unknown, 1, boolean>;
  readonly pageCount: {
    readonly type: _$vue.PropType<number>;
    readonly required: true;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly pagerCount: EpPropFinalized<NumberConstructor, unknown, unknown, 7, boolean>;
  readonly disabled: BooleanConstructor;
}>> & Readonly<{
  onChange?: ((...args: any[]) => any) | undefined;
}>, {
  readonly disabled: boolean;
  readonly currentPage: number;
  readonly pagerCount: number;
}, {}, {}, {}, string, _$vue.ComponentProvideOptions, true, {}, any>;
declare const _default: typeof __VLS_export;
//#endregion
export { _default as default };