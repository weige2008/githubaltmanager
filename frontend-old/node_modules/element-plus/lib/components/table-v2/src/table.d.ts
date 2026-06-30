import { EpPropFinalized, EpPropMergeType } from "../../../utils/vue/props/types.js";
import { SortOrder } from "./constants.js";
import { Column, ColumnCommonParams, DataGetter, KeyType, RowCommonParams, SortBy, SortState } from "./types.js";
import { AnyColumn } from "./common.js";
import { onRowRenderedParams } from "./grid.js";
import { RowEventHandlers, RowExpandHandler } from "./row.js";
import * as _$vue from "vue";
import { CSSProperties, ExtractPropTypes, ExtractPublicPropTypes } from "vue";

//#region ../../packages/components/table-v2/src/table.d.ts
/**
 * Param types
 */
type ColumnSortParams<T> = {
  column: Column<T>;
  key: KeyType;
  order: SortOrder;
};
/**
 * Renderer/Getter types
 */
type ExtraCellPropGetter<T> = (params: ColumnCommonParams<T> & RowCommonParams & {
  cellData: T;
  rowData: any;
}) => any;
type ExtractHeaderPropGetter<T> = (params: {
  columns: Column<T>[];
  headerIndex: number;
}) => any;
type ExtractHeaderCellPropGetter<T> = (params: ColumnCommonParams<T> & {
  headerIndex: number;
}) => any;
type ExtractRowPropGetter<T> = (params: {
  columns: Column<T>[];
} & RowCommonParams) => any;
type HeaderClassNameGetter<T> = (params: {
  columns: Column<T>[];
  headerIndex: number;
}) => string;
type RowClassNameGetter<T> = (params: {
  columns: Column<T>[];
} & RowCommonParams) => string;
/**
 * Handler types
 */
type ColumnSortHandler<T> = (params: ColumnSortParams<T>) => void;
type ColumnResizeHandler<T> = (column: Column<T>, width: number) => void;
type ExpandedRowsChangeHandler = (expandedRowKeys: KeyType[]) => void;
declare const tableV2Props: {
  readonly cache: EpPropFinalized<NumberConstructor, never, never, 2, false>;
  readonly estimatedRowHeight: {
    readonly default: undefined;
    readonly type: _$vue.PropType<number>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    readonly __epPropKey: true;
  };
  readonly rowKey: EpPropFinalized<(new (...args: any[]) => string | number | symbol) | (() => KeyType) | (((new (...args: any[]) => string | number | symbol) | (() => KeyType)) | null)[], unknown, unknown, "id", boolean>;
  readonly headerClass: {
    readonly type: _$vue.PropType<EpPropMergeType<(new (...args: any[]) => string | HeaderClassNameGetter<any>) | (() => string | HeaderClassNameGetter<any>) | (((new (...args: any[]) => string | HeaderClassNameGetter<any>) | (() => string | HeaderClassNameGetter<any>)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly headerProps: {
    readonly type: _$vue.PropType<any>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly headerCellProps: {
    readonly type: _$vue.PropType<any>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly headerHeight: EpPropFinalized<(new (...args: any[]) => number | number[]) | (() => number | number[]) | (((new (...args: any[]) => number | number[]) | (() => number | number[])) | null)[], unknown, unknown, 50, boolean>;
  readonly footerHeight: EpPropFinalized<NumberConstructor, unknown, unknown, 0, boolean>;
  readonly rowClass: {
    readonly type: _$vue.PropType<EpPropMergeType<(new (...args: any[]) => string | RowClassNameGetter<any>) | (() => string | RowClassNameGetter<any>) | (((new (...args: any[]) => string | RowClassNameGetter<any>) | (() => string | RowClassNameGetter<any>)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly rowProps: {
    readonly type: _$vue.PropType<any>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly rowHeight: EpPropFinalized<NumberConstructor, unknown, unknown, 50, boolean>;
  readonly cellProps: {
    readonly type: _$vue.PropType<EpPropMergeType<(new (...args: any[]) => Record<string, any> | ExtraCellPropGetter<any>) | (() => Record<string, any> | ExtraCellPropGetter<any>) | (((new (...args: any[]) => Record<string, any> | ExtraCellPropGetter<any>) | (() => Record<string, any> | ExtraCellPropGetter<any>)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
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
  readonly dataGetter: {
    readonly type: _$vue.PropType<DataGetter<any>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly fixedData: {
    readonly type: _$vue.PropType<any[]>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly expandColumnKey: StringConstructor;
  readonly expandedRowKeys: EpPropFinalized<(new (...args: any[]) => KeyType[]) | (() => KeyType[]) | (((new (...args: any[]) => KeyType[]) | (() => KeyType[])) | null)[], unknown, unknown, () => never[], boolean>;
  readonly defaultExpandedRowKeys: EpPropFinalized<(new (...args: any[]) => KeyType[]) | (() => KeyType[]) | (((new (...args: any[]) => KeyType[]) | (() => KeyType[])) | null)[], unknown, unknown, () => never[], boolean>;
  readonly class: StringConstructor;
  readonly fixed: BooleanConstructor;
  readonly style: {
    readonly type: _$vue.PropType<CSSProperties>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
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
  readonly maxHeight: NumberConstructor;
  readonly useIsScrolling: BooleanConstructor;
  readonly indentSize: EpPropFinalized<NumberConstructor, unknown, unknown, 12, boolean>;
  readonly iconSize: EpPropFinalized<NumberConstructor, unknown, unknown, 12, boolean>;
  readonly hScrollbarSize: EpPropFinalized<NumberConstructor, unknown, unknown, 6, boolean>;
  readonly vScrollbarSize: EpPropFinalized<NumberConstructor, unknown, unknown, 6, boolean>;
  readonly scrollbarAlwaysOn: BooleanConstructor;
  readonly sortBy: EpPropFinalized<(new (...args: any[]) => SortBy) | (() => SortBy) | (((new (...args: any[]) => SortBy) | (() => SortBy)) | null)[], unknown, unknown, () => {
    key: KeyType;
    order: SortOrder;
  }, boolean>;
  readonly sortState: EpPropFinalized<(new (...args: any[]) => SortState) | (() => SortState) | (((new (...args: any[]) => SortState) | (() => SortState)) | null)[], unknown, unknown, undefined, boolean>;
  readonly onColumnSort: {
    readonly type: _$vue.PropType<ColumnSortHandler<any>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly onExpandedRowsChange: {
    readonly type: _$vue.PropType<ExpandedRowsChangeHandler>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly onEndReached: {
    readonly type: _$vue.PropType<(remainDistance: number) => void>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly onRowExpand: {
    readonly type: _$vue.PropType<RowExpandHandler>;
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
  readonly onRowsRendered: {
    readonly type: _$vue.PropType<(params: onRowRenderedParams) => void>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly rowEventHandlers: {
    readonly type: _$vue.PropType<RowEventHandlers>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
};
type TableV2Props = ExtractPropTypes<typeof tableV2Props>;
type TableV2PropsPublic = ExtractPublicPropTypes<typeof tableV2Props>;
//#endregion
export { ColumnResizeHandler, ColumnSortHandler, ColumnSortParams, ExpandedRowsChangeHandler, ExtraCellPropGetter, ExtractHeaderCellPropGetter, ExtractHeaderPropGetter, ExtractRowPropGetter, HeaderClassNameGetter, RowClassNameGetter, TableV2Props, TableV2PropsPublic, tableV2Props };