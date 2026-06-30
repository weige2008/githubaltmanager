import { EpPropFinalized, EpPropMergeType } from "../../../../utils/vue/props/types.js";
import _default from "./sizes.vue.js";
import * as _$vue from "vue";
import { CSSProperties, ExtractPropTypes, ExtractPublicPropTypes } from "vue";

//#region ../../packages/components/pagination/src/components/sizes.d.ts
declare const paginationSizesProps: {
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
    readonly type: _$vue.PropType<EpPropMergeType<(new (...args: any[]) => string | CSSProperties) | (() => string | CSSProperties) | (((new (...args: any[]) => string | CSSProperties) | (() => string | CSSProperties)) | null)[], unknown, unknown>>;
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
};
type PaginationSizesProps = ExtractPropTypes<typeof paginationSizesProps>;
type PaginationSizesPropsPublic = ExtractPublicPropTypes<typeof paginationSizesProps>;
type SizesInstance = InstanceType<typeof _default> & unknown;
//#endregion
export { PaginationSizesProps, PaginationSizesPropsPublic, SizesInstance, paginationSizesProps };