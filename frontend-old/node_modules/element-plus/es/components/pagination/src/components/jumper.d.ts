import { EpPropMergeType } from "../../../../utils/vue/props/types.js";
import _default from "./jumper.vue.js";
import * as _$vue from "vue";
import { ExtractPropTypes, ExtractPublicPropTypes } from "vue";

//#region ../../packages/components/pagination/src/components/jumper.d.ts
declare const paginationJumperProps: {
  readonly size: {
    readonly type: _$vue.PropType<EpPropMergeType<StringConstructor, "" | "default" | "large" | "small", unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
};
type PaginationJumperProps = ExtractPropTypes<typeof paginationJumperProps>;
type PaginationJumperPropsPublic = ExtractPublicPropTypes<typeof paginationJumperProps>;
type PaginationJumperInstance = InstanceType<typeof _default> & unknown;
//#endregion
export { PaginationJumperInstance, PaginationJumperProps, PaginationJumperPropsPublic, paginationJumperProps };