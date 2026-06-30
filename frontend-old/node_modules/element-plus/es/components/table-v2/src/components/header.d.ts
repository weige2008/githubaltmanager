import { EpPropFinalized, EpPropMergeType } from "../../../../utils/vue/props/types.js";
import { AnyColumn } from "../common.js";
import { TableV2HeaderProps } from "../header.js";
import { UseColumnsReturn } from "../composables/use-columns.js";
import * as _$vue from "vue";
import { CSSProperties, UnwrapRef } from "vue";
import * as _$vue_jsx_runtime0 from "vue/jsx-runtime";

//#region ../../packages/components/table-v2/src/components/header.d.ts
declare const TableV2Header: _$vue.DefineComponent<_$vue.ExtractPropTypes<{
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
}>, () => _$vue_jsx_runtime0.JSX.Element | undefined, {}, {}, {}, _$vue.ComponentOptionsMixin, _$vue.ComponentOptionsMixin, {}, string, _$vue.PublicProps, Readonly<_$vue.ExtractPropTypes<{
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
}>> & Readonly<{}>, {
  readonly headerHeight: EpPropMergeType<(new (...args: any[]) => number | number[]) | (() => number | number[]) | (((new (...args: any[]) => number | number[]) | (() => number | number[])) | null)[], unknown, unknown>;
  readonly rowHeight: number;
}, {}, {}, {}, string, _$vue.ComponentProvideOptions, true, {}, any>;
type TableV2HeaderInstance = InstanceType<typeof TableV2Header> & {
  /**
   * @description scroll to position based on the provided value
   */
  scrollToLeft: (left?: number) => void;
};
type TableV2HeaderRendererParams = {
  class: string;
  columns: TableV2HeaderProps['columns'];
  columnsStyles: UnwrapRef<UseColumnsReturn['columnsStyles']>;
  headerIndex: number;
  style: CSSProperties;
};
type TableV2HeaderRowRendererParams = {
  rowData: any;
  rowIndex: number;
} & Omit<TableV2HeaderRendererParams, 'headerIndex'>;
//#endregion
export { TableV2HeaderInstance, TableV2HeaderRendererParams, TableV2HeaderRowRendererParams, TableV2Header as default };