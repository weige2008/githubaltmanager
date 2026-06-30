import { EpPropFinalized } from "../../../utils/vue/props/types.js";
import { AnyColumn } from "./common.js";
import * as _$vue from "vue";
import { ExtractPropTypes, ExtractPublicPropTypes } from "vue";

//#region ../../packages/components/table-v2/src/header.d.ts
declare const tableV2HeaderProps: {
  readonly class: StringConstructor;
  readonly columns: {
    readonly type: _$vue.PropType<AnyColumn[]>;
    readonly required: true;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly fixedHeaderData: {
    readonly type: _$vue.PropType<any[]>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly headerData: {
    readonly type: _$vue.PropType<any[]>;
    readonly required: true;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly headerHeight: EpPropFinalized<(new (...args: any[]) => number | number[]) | (() => number | number[]) | (((new (...args: any[]) => number | number[]) | (() => number | number[])) | null)[], unknown, unknown, 50, boolean>;
  readonly rowWidth: {
    readonly type: _$vue.PropType<number>;
    readonly required: true;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly rowHeight: EpPropFinalized<NumberConstructor, unknown, unknown, 50, boolean>;
  readonly height: {
    readonly type: _$vue.PropType<number>;
    readonly required: true;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly width: {
    readonly type: _$vue.PropType<number>;
    readonly required: true;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
};
type TableV2HeaderProps = ExtractPropTypes<typeof tableV2HeaderProps>;
type TableV2HeaderPropsPublic = ExtractPublicPropTypes<typeof tableV2HeaderProps>;
//#endregion
export { TableV2HeaderProps, TableV2HeaderPropsPublic, tableV2HeaderProps };