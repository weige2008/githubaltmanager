import { EpPropFinalized, EpPropMergeType } from "../../../../utils/vue/props/types.js";
import _default from "./prev.vue.js";
import * as _$vue from "vue";
import { ExtractPropTypes, ExtractPublicPropTypes } from "vue";

//#region ../../packages/components/pagination/src/components/prev.d.ts
declare const paginationPrevProps: {
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
};
declare const paginationPrevEmits: {
  click: (evt: MouseEvent) => boolean;
};
type PaginationPrevProps = ExtractPropTypes<typeof paginationPrevProps>;
type PaginationPrevPropsPublic = ExtractPublicPropTypes<typeof paginationPrevProps>;
type PrevInstance = InstanceType<typeof _default> & unknown;
//#endregion
export { PaginationPrevProps, PaginationPrevPropsPublic, PrevInstance, paginationPrevEmits, paginationPrevProps };