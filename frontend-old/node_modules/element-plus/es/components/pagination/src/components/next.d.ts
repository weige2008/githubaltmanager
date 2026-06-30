import { EpPropFinalized, EpPropMergeType } from "../../../../utils/vue/props/types.js";
import _default from "./next.vue.js";
import * as _$vue from "vue";
import { ExtractPropTypes, ExtractPublicPropTypes } from "vue";

//#region ../../packages/components/pagination/src/components/next.d.ts
declare const paginationNextProps: {
  readonly disabled: BooleanConstructor;
  readonly currentPage: EpPropFinalized<NumberConstructor, unknown, unknown, 1, boolean>;
  readonly pageCount: EpPropFinalized<NumberConstructor, unknown, unknown, 50, boolean>;
  readonly nextText: {
    readonly type: _$vue.PropType<string>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly nextIcon: {
    readonly type: _$vue.PropType<EpPropMergeType<(new (...args: any[]) => (string | _$vue.Component) & {}) | (() => string | _$vue.Component) | (((new (...args: any[]) => (string | _$vue.Component) & {}) | (() => string | _$vue.Component)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
};
type PaginationNextProps = ExtractPropTypes<typeof paginationNextProps>;
type PaginationNextPropsPublic = ExtractPublicPropTypes<typeof paginationNextProps>;
type NextInstance = InstanceType<typeof _default> & unknown;
//#endregion
export { NextInstance, PaginationNextProps, PaginationNextPropsPublic, paginationNextProps };