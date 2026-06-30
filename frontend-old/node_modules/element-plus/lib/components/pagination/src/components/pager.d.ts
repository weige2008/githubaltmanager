import { EpPropFinalized } from "../../../../utils/vue/props/types.js";
import _default from "./pager.vue.js";
import * as _$vue from "vue";
import { ExtractPropTypes, ExtractPublicPropTypes } from "vue";

//#region ../../packages/components/pagination/src/components/pager.d.ts
declare const paginationPagerProps: {
  readonly currentPage: EpPropFinalized<NumberConstructor, unknown, unknown, 1, boolean>;
  readonly pageCount: {
    readonly type: _$vue.PropType<number>;
    readonly required: true;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly pagerCount: EpPropFinalized<NumberConstructor, unknown, unknown, 7, boolean>;
  readonly disabled: BooleanConstructor;
};
type PaginationPagerProps = ExtractPropTypes<typeof paginationPagerProps>;
type PaginationPagerPropsPublic = ExtractPublicPropTypes<typeof paginationPagerProps>;
type PagerInstance = InstanceType<typeof _default> & unknown;
//#endregion
export { PagerInstance, PaginationPagerProps, PaginationPagerPropsPublic, paginationPagerProps };