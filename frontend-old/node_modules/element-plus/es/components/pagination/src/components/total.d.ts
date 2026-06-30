import { EpPropFinalized } from "../../../../utils/vue/props/types.js";
import _default from "./total.vue.js";
import { ExtractPropTypes, ExtractPublicPropTypes } from "vue";

//#region ../../packages/components/pagination/src/components/total.d.ts
declare const paginationTotalProps: {
  readonly total: EpPropFinalized<NumberConstructor, unknown, unknown, 1000, boolean>;
};
type PaginationTotalProps = ExtractPropTypes<typeof paginationTotalProps>;
type PaginationTotalPropsPublic = ExtractPublicPropTypes<typeof paginationTotalProps>;
type TotalInstance = InstanceType<typeof _default> & unknown;
//#endregion
export { PaginationTotalProps, PaginationTotalPropsPublic, TotalInstance, paginationTotalProps };