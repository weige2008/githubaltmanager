import { EpPropFinalized, EpPropMergeType } from "../../../../utils/vue/props/types.js";
import { KeyType } from "../types.js";
import { AnyColumn } from "../common.js";
import { RowEventHandlers, RowExpandHandler, RowHeightChangeHandler, RowHoverHandler, TableV2RowProps } from "../row.js";
import * as _$vue from "vue";
import { CSSProperties, VNode } from "vue";
import * as _$vue_jsx_runtime0 from "vue/jsx-runtime";

//#region ../../packages/components/table-v2/src/components/row.d.ts
declare const TableV2Row: _$vue.DefineComponent<_$vue.ExtractPropTypes<{
  readonly class: StringConstructor;
  readonly columns: {
    readonly type: _$vue.PropType<AnyColumn[]>;
    readonly required: true;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly columnsStyles: {
    readonly type: _$vue.PropType<Record<KeyType, CSSProperties>>;
    readonly required: true;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly depth: NumberConstructor;
  readonly expandColumnKey: StringConstructor;
  readonly estimatedRowHeight: {
    readonly default: undefined;
    readonly type: _$vue.PropType<number>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    readonly __epPropKey: true;
  };
  readonly isScrolling: BooleanConstructor;
  readonly onRowExpand: {
    readonly type: _$vue.PropType<RowExpandHandler>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly onRowHover: {
    readonly type: _$vue.PropType<RowHoverHandler>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly onRowHeightChange: {
    readonly type: _$vue.PropType<RowHeightChangeHandler>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly rowData: {
    readonly type: _$vue.PropType<any>;
    readonly required: true;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly rowEventHandlers: {
    readonly type: _$vue.PropType<RowEventHandlers>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly rowIndex: {
    readonly type: _$vue.PropType<number>;
    readonly required: true;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly rowKey: EpPropFinalized<(new (...args: any[]) => string | number | symbol) | (() => KeyType) | (((new (...args: any[]) => string | number | symbol) | (() => KeyType)) | null)[], unknown, unknown, "id", boolean>;
  readonly style: {
    readonly type: _$vue.PropType<CSSProperties>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
}>, () => _$vue_jsx_runtime0.JSX.Element, {}, {}, {}, _$vue.ComponentOptionsMixin, _$vue.ComponentOptionsMixin, {}, string, _$vue.PublicProps, Readonly<_$vue.ExtractPropTypes<{
  readonly class: StringConstructor;
  readonly columns: {
    readonly type: _$vue.PropType<AnyColumn[]>;
    readonly required: true;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly columnsStyles: {
    readonly type: _$vue.PropType<Record<KeyType, CSSProperties>>;
    readonly required: true;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly depth: NumberConstructor;
  readonly expandColumnKey: StringConstructor;
  readonly estimatedRowHeight: {
    readonly default: undefined;
    readonly type: _$vue.PropType<number>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    readonly __epPropKey: true;
  };
  readonly isScrolling: BooleanConstructor;
  readonly onRowExpand: {
    readonly type: _$vue.PropType<RowExpandHandler>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly onRowHover: {
    readonly type: _$vue.PropType<RowHoverHandler>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly onRowHeightChange: {
    readonly type: _$vue.PropType<RowHeightChangeHandler>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly rowData: {
    readonly type: _$vue.PropType<any>;
    readonly required: true;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly rowEventHandlers: {
    readonly type: _$vue.PropType<RowEventHandlers>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly rowIndex: {
    readonly type: _$vue.PropType<number>;
    readonly required: true;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly rowKey: EpPropFinalized<(new (...args: any[]) => string | number | symbol) | (() => KeyType) | (((new (...args: any[]) => string | number | symbol) | (() => KeyType)) | null)[], unknown, unknown, "id", boolean>;
  readonly style: {
    readonly type: _$vue.PropType<CSSProperties>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
}>> & Readonly<{}>, {
  readonly estimatedRowHeight: number;
  readonly isScrolling: boolean;
  readonly rowKey: EpPropMergeType<(new (...args: any[]) => string | number | symbol) | (() => KeyType) | (((new (...args: any[]) => string | number | symbol) | (() => KeyType)) | null)[], unknown, unknown>;
}, {}, {}, {}, string, _$vue.ComponentProvideOptions, true, {}, any>;
type TableV2RowCellRenderParam = {
  column: TableV2RowProps['columns'][number];
  columns: TableV2RowProps['columns'];
  columnIndex: number;
  depth: number;
  style: CSSProperties;
  rowData: any;
  rowIndex: number;
  isScrolling: boolean;
  expandIconProps?: {
    rowData: any;
    rowIndex: number;
    onExpand: (expand: boolean) => void;
  };
};
type TableV2RowSlotProps = {
  cells: VNode[];
  columns: TableV2RowProps['columns'];
  depth: number;
  style: TableV2RowProps['style'];
  rowData: any;
  rowIndex: number;
  isScrolling: boolean;
};
//#endregion
export { TableV2RowCellRenderParam, TableV2RowSlotProps, TableV2Row as default };