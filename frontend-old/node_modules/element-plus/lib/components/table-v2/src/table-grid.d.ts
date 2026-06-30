import { EpPropFinalized, EpPropMergeType } from "../../../utils/vue/props/types.js";
import { Alignment, GridDefaultSlotParams, GridScrollOptions, ItemSize } from "../../virtual-list/src/types.js";
import { ResetAfterIndex } from "../../virtual-list/src/components/dynamic-size-grid.js";
import { KeyType } from "./types.js";
import { AnyColumn } from "./common.js";
import { TableV2GridProps, onRowRenderedParams } from "./grid.js";
import * as _$vue from "vue";
import { UnwrapRef } from "vue";
import * as _$vue_jsx_runtime0 from "vue/jsx-runtime";

//#region ../../packages/components/table-v2/src/table-grid.d.ts
declare const TableGrid: _$vue.DefineComponent<_$vue.ExtractPropTypes<{
  readonly columns: {
    readonly type: _$vue.PropType<AnyColumn[]>;
    readonly required: true;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly data: {
    readonly type: _$vue.PropType<any[]>;
    readonly required: true;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly fixedData: {
    readonly type: _$vue.PropType<any[]>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly estimatedRowHeight: {
    readonly default: undefined;
    readonly type: _$vue.PropType<number>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    readonly __epPropKey: true;
  };
  readonly width: {
    readonly type: _$vue.PropType<number>;
    readonly required: true;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly height: {
    readonly type: _$vue.PropType<number>;
    readonly required: true;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly headerWidth: {
    readonly type: _$vue.PropType<number>;
    readonly required: true;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly headerHeight: EpPropFinalized<(new (...args: any[]) => number | number[]) | (() => number | number[]) | (((new (...args: any[]) => number | number[]) | (() => number | number[])) | null)[], unknown, unknown, 50, boolean>;
  readonly bodyWidth: {
    readonly type: _$vue.PropType<number>;
    readonly required: true;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly rowHeight: {
    readonly type: _$vue.PropType<number>;
    readonly required: true;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly cache: EpPropFinalized<NumberConstructor, never, never, 2, false>;
  readonly useIsScrolling: BooleanConstructor;
  readonly scrollbarAlwaysOn: BooleanConstructor;
  readonly scrollbarStartGap: EpPropFinalized<NumberConstructor, unknown, unknown, 0, boolean>;
  readonly scrollbarEndGap: EpPropFinalized<NumberConstructor, unknown, unknown, 2, boolean>;
  readonly class: StringConstructor;
  readonly style: {
    readonly type: _$vue.PropType<_$vue.CSSProperties>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly containerStyle: {
    readonly type: _$vue.PropType<_$vue.CSSProperties>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly getRowHeight: {
    readonly type: _$vue.PropType<ItemSize>;
    readonly required: true;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly rowKey: EpPropFinalized<(new (...args: any[]) => string | number | symbol) | (() => KeyType) | (((new (...args: any[]) => string | number | symbol) | (() => KeyType)) | null)[], unknown, unknown, "id", boolean>;
  readonly onRowsRendered: {
    readonly type: _$vue.PropType<(params: onRowRenderedParams) => void>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly onScroll: {
    readonly type: _$vue.PropType<(...args: any[]) => void>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
}>, () => _$vue_jsx_runtime0.JSX.Element, {}, {}, {}, _$vue.ComponentOptionsMixin, _$vue.ComponentOptionsMixin, {}, string, _$vue.PublicProps, Readonly<_$vue.ExtractPropTypes<{
  readonly columns: {
    readonly type: _$vue.PropType<AnyColumn[]>;
    readonly required: true;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly data: {
    readonly type: _$vue.PropType<any[]>;
    readonly required: true;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly fixedData: {
    readonly type: _$vue.PropType<any[]>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly estimatedRowHeight: {
    readonly default: undefined;
    readonly type: _$vue.PropType<number>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    readonly __epPropKey: true;
  };
  readonly width: {
    readonly type: _$vue.PropType<number>;
    readonly required: true;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly height: {
    readonly type: _$vue.PropType<number>;
    readonly required: true;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly headerWidth: {
    readonly type: _$vue.PropType<number>;
    readonly required: true;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly headerHeight: EpPropFinalized<(new (...args: any[]) => number | number[]) | (() => number | number[]) | (((new (...args: any[]) => number | number[]) | (() => number | number[])) | null)[], unknown, unknown, 50, boolean>;
  readonly bodyWidth: {
    readonly type: _$vue.PropType<number>;
    readonly required: true;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly rowHeight: {
    readonly type: _$vue.PropType<number>;
    readonly required: true;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly cache: EpPropFinalized<NumberConstructor, never, never, 2, false>;
  readonly useIsScrolling: BooleanConstructor;
  readonly scrollbarAlwaysOn: BooleanConstructor;
  readonly scrollbarStartGap: EpPropFinalized<NumberConstructor, unknown, unknown, 0, boolean>;
  readonly scrollbarEndGap: EpPropFinalized<NumberConstructor, unknown, unknown, 2, boolean>;
  readonly class: StringConstructor;
  readonly style: {
    readonly type: _$vue.PropType<_$vue.CSSProperties>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly containerStyle: {
    readonly type: _$vue.PropType<_$vue.CSSProperties>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly getRowHeight: {
    readonly type: _$vue.PropType<ItemSize>;
    readonly required: true;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly rowKey: EpPropFinalized<(new (...args: any[]) => string | number | symbol) | (() => KeyType) | (((new (...args: any[]) => string | number | symbol) | (() => KeyType)) | null)[], unknown, unknown, "id", boolean>;
  readonly onRowsRendered: {
    readonly type: _$vue.PropType<(params: onRowRenderedParams) => void>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly onScroll: {
    readonly type: _$vue.PropType<(...args: any[]) => void>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
}>> & Readonly<{}>, {
  readonly headerHeight: EpPropMergeType<(new (...args: any[]) => number | number[]) | (() => number | number[]) | (((new (...args: any[]) => number | number[]) | (() => number | number[])) | null)[], unknown, unknown>;
  readonly estimatedRowHeight: number;
  readonly useIsScrolling: boolean;
  readonly scrollbarAlwaysOn: boolean;
  readonly scrollbarStartGap: number;
  readonly scrollbarEndGap: number;
  readonly rowKey: EpPropMergeType<(new (...args: any[]) => string | number | symbol) | (() => KeyType) | (((new (...args: any[]) => string | number | symbol) | (() => KeyType)) | null)[], unknown, unknown>;
  readonly cache: number;
}, {}, {}, {}, string, _$vue.ComponentProvideOptions, true, {}, any>;
type TableGridRowSlotParams = {
  columns: TableV2GridProps['columns'];
  rowData: any;
} & GridDefaultSlotParams;
type TableGridInstance = InstanceType<typeof TableGrid> & UnwrapRef<{
  forceUpdate: () => void;
  /**
   * @description fetch total height
   */
  totalHeight: number;
  /**
   * @description scrollTo a position
   * @param { number | ScrollToOptions } arg1
   * @param { number } arg2
   */
  scrollTo(leftOrOptions: number | GridScrollOptions, top?: number): void;
  /**
   * @description scroll vertically to position y
   */
  scrollToTop(scrollTop: number): void;
  /**
   * @description scroll to a given row
   * @params row {Number} which row to scroll to
   * @params @optional strategy {ScrollStrategy} use what strategy to scroll to
   */
  scrollToRow(row: number, strategy: Alignment): void;
  /**
   * @description reset rendered state after row index
   * @param { number } rowIndex
   * @param { boolean } forceUpdate
   */
  resetAfterRowIndex: ResetAfterIndex;
}>;
//#endregion
export { TableGridInstance, TableGridRowSlotParams, TableGrid as default };