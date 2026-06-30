import { EpPropFinalized, EpPropMergeType } from "../../../../utils/vue/props/types.js";
import * as _$vue from "vue";

//#region ../../packages/components/pagination/src/components/sizes.vue.d.ts
declare const __VLS_export: _$vue.DefineComponent<_$vue.ExtractPropTypes<{
  readonly pageSize: {
    readonly type: _$vue.PropType<number>;
    readonly required: true;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly pageSizes: EpPropFinalized<(new (...args: any[]) => number[]) | (() => number[]) | (((new (...args: any[]) => number[]) | (() => number[])) | null)[], unknown, unknown, () => [10, 20, 30, 40, 50, 100], boolean>;
  readonly popperClass: {
    readonly type: _$vue.PropType<string>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly popperStyle: {
    readonly type: _$vue.PropType<EpPropMergeType<(new (...args: any[]) => string | _$vue.CSSProperties) | (() => string | _$vue.CSSProperties) | (((new (...args: any[]) => string | _$vue.CSSProperties) | (() => string | _$vue.CSSProperties)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly disabled: BooleanConstructor;
  readonly teleported: BooleanConstructor;
  readonly size: {
    readonly type: _$vue.PropType<EpPropMergeType<StringConstructor, "" | "default" | "large" | "small", unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly appendSizeTo: StringConstructor;
}>, {}, {}, {}, {}, _$vue.ComponentOptionsMixin, _$vue.ComponentOptionsMixin, {
  "page-size-change": (...args: any[]) => void;
}, string, _$vue.PublicProps, Readonly<_$vue.ExtractPropTypes<{
  readonly pageSize: {
    readonly type: _$vue.PropType<number>;
    readonly required: true;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly pageSizes: EpPropFinalized<(new (...args: any[]) => number[]) | (() => number[]) | (((new (...args: any[]) => number[]) | (() => number[])) | null)[], unknown, unknown, () => [10, 20, 30, 40, 50, 100], boolean>;
  readonly popperClass: {
    readonly type: _$vue.PropType<string>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly popperStyle: {
    readonly type: _$vue.PropType<EpPropMergeType<(new (...args: any[]) => string | _$vue.CSSProperties) | (() => string | _$vue.CSSProperties) | (((new (...args: any[]) => string | _$vue.CSSProperties) | (() => string | _$vue.CSSProperties)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly disabled: BooleanConstructor;
  readonly teleported: BooleanConstructor;
  readonly size: {
    readonly type: _$vue.PropType<EpPropMergeType<StringConstructor, "" | "default" | "large" | "small", unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly appendSizeTo: StringConstructor;
}>> & Readonly<{
  "onPage-size-change"?: ((...args: any[]) => any) | undefined;
}>, {
  readonly disabled: boolean;
  readonly teleported: boolean;
  readonly pageSizes: number[];
}, {}, {}, {}, string, _$vue.ComponentProvideOptions, true, {}, any>;
declare const _default: typeof __VLS_export;
//#endregion
export { _default as default };