import { EpPropFinalized, EpPropMergeType } from "../../../../utils/vue/props/types.js";
import * as _$vue from "vue";

//#region ../../packages/components/pagination/src/components/prev.vue.d.ts
declare const __VLS_export: _$vue.DefineComponent<_$vue.ExtractPropTypes<{
  readonly disabled: BooleanConstructor;
  readonly currentPage: EpPropFinalized<NumberConstructor, unknown, unknown, 1, boolean>;
  readonly prevText: {
    readonly type: _$vue.PropType<string>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly prevIcon: {
    readonly type: _$vue.PropType<EpPropMergeType<(new (...args: any[]) => (string | _$vue.Component) & {}) | (() => string | _$vue.Component) | (((new (...args: any[]) => (string | _$vue.Component) & {}) | (() => string | _$vue.Component)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
}>, {}, {}, {}, {}, _$vue.ComponentOptionsMixin, _$vue.ComponentOptionsMixin, {
  click: (evt: MouseEvent) => void;
}, string, _$vue.PublicProps, Readonly<_$vue.ExtractPropTypes<{
  readonly disabled: BooleanConstructor;
  readonly currentPage: EpPropFinalized<NumberConstructor, unknown, unknown, 1, boolean>;
  readonly prevText: {
    readonly type: _$vue.PropType<string>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly prevIcon: {
    readonly type: _$vue.PropType<EpPropMergeType<(new (...args: any[]) => (string | _$vue.Component) & {}) | (() => string | _$vue.Component) | (((new (...args: any[]) => (string | _$vue.Component) & {}) | (() => string | _$vue.Component)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
}>> & Readonly<{
  onClick?: ((evt: MouseEvent) => any) | undefined;
}>, {
  readonly disabled: boolean;
  readonly currentPage: number;
}, {}, {}, {}, string, _$vue.ComponentProvideOptions, true, {}, any>;
declare const _default: typeof __VLS_export;
//#endregion
export { _default as default };