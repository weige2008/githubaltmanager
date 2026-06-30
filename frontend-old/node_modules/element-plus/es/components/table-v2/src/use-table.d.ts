import { Alignment } from "../../virtual-list/src/types.js";
import { Alignment as Alignment$1, AnyColumns, CellRenderer, ClassNameGetter, FixedDirection, HeaderCellRenderer, HeaderClassGetter, KeyType } from "./types.js";
import { onRowRenderedParams } from "./grid.js";
import { TableV2Props } from "./table.js";
import { TableGridInstance } from "./table-grid.js";
import { ScrollPos } from "./composables/use-scrollbar.js";
import { RowExpandParams, RowHeightChangedParams, RowHoverParams } from "./row.js";
import * as _$vue from "vue";

//#region ../../packages/components/table-v2/src/use-table.d.ts
declare function useTable(props: TableV2Props): {
  columns: _$vue.ComputedRef<{
    key: KeyType;
    align?: Alignment$1;
    class?: string | ClassNameGetter<any> | undefined;
    dataKey?: KeyType;
    fixed?: true | FixedDirection;
    flexGrow?: _$vue.CSSProperties["flexGrow"];
    flexShrink?: _$vue.CSSProperties["flexShrink"];
    title?: string;
    hidden?: boolean;
    headerClass?: string | HeaderClassGetter<any> | undefined;
    maxWidth?: number;
    minWidth?: number;
    style?: _$vue.CSSProperties;
    sortable?: boolean;
    width: number;
    cellRenderer?: CellRenderer<any> | undefined;
    headerCellRenderer?: HeaderCellRenderer<any> | undefined;
  }[]>;
  containerRef: _$vue.Ref<any, any>;
  mainTableRef: _$vue.Ref<TableGridInstance | undefined, TableGridInstance | undefined>;
  leftTableRef: _$vue.Ref<TableGridInstance | undefined, TableGridInstance | undefined>;
  rightTableRef: _$vue.Ref<TableGridInstance | undefined, TableGridInstance | undefined>;
  isDynamic: _$vue.ComputedRef<boolean>;
  isResetting: _$vue.ShallowRef<boolean, boolean>;
  isScrolling: _$vue.ShallowRef<boolean, boolean>;
  hasFixedColumns: _$vue.ComputedRef<number>;
  columnsStyles: _$vue.ComputedRef<Record<KeyType, _$vue.CSSProperties>>;
  columnsTotalWidth: _$vue.ComputedRef<number>;
  data: _$vue.ComputedRef<any[]>;
  expandedRowKeys: _$vue.Ref<KeyType[], KeyType[]>;
  depthMap: _$vue.Ref<Record<KeyType, number>, Record<KeyType, number>>;
  fixedColumnsOnLeft: _$vue.ComputedRef<{
    key: KeyType;
    align?: Alignment$1;
    class?: string | ClassNameGetter<any> | undefined;
    dataKey?: KeyType;
    fixed?: true | FixedDirection;
    flexGrow?: _$vue.CSSProperties["flexGrow"];
    flexShrink?: _$vue.CSSProperties["flexShrink"];
    title?: string;
    hidden?: boolean;
    headerClass?: string | HeaderClassGetter<any> | undefined;
    maxWidth?: number;
    minWidth?: number;
    style?: _$vue.CSSProperties;
    sortable?: boolean;
    width: number;
    cellRenderer?: CellRenderer<any> | undefined;
    headerCellRenderer?: HeaderCellRenderer<any> | undefined;
  }[]>;
  fixedColumnsOnRight: _$vue.ComputedRef<{
    key: KeyType;
    align?: Alignment$1;
    class?: string | ClassNameGetter<any> | undefined;
    dataKey?: KeyType;
    fixed?: true | FixedDirection;
    flexGrow?: _$vue.CSSProperties["flexGrow"];
    flexShrink?: _$vue.CSSProperties["flexShrink"];
    title?: string;
    hidden?: boolean;
    headerClass?: string | HeaderClassGetter<any> | undefined;
    maxWidth?: number;
    minWidth?: number;
    style?: _$vue.CSSProperties;
    sortable?: boolean;
    width: number;
    cellRenderer?: CellRenderer<any> | undefined;
    headerCellRenderer?: HeaderCellRenderer<any> | undefined;
  }[]>;
  mainColumns: _$vue.ComputedRef<AnyColumns>;
  bodyWidth: _$vue.ComputedRef<number>;
  emptyStyle: _$vue.ComputedRef<_$vue.CSSProperties>;
  rootStyle: _$vue.ComputedRef<_$vue.CSSProperties>;
  footerHeight: _$vue.ComputedRef<_$vue.CSSProperties>;
  mainTableHeight: _$vue.ComputedRef<number>;
  fixedTableHeight: _$vue.ComputedRef<number>;
  leftTableWidth: _$vue.ComputedRef<number>;
  rightTableWidth: _$vue.ComputedRef<number>;
  showEmpty: _$vue.ComputedRef<boolean>;
  getRowHeight: (rowIndex: number) => number;
  onColumnSorted: (e: MouseEvent) => void;
  onRowHovered: ({
    hovered,
    rowKey
  }: RowHoverParams) => void;
  onRowExpanded: ({
    expanded,
    rowData,
    rowIndex,
    rowKey
  }: RowExpandParams) => void;
  onRowsRendered: (params: onRowRenderedParams) => void;
  onRowHeightChange: ({
    rowKey,
    height,
    rowIndex
  }: RowHeightChangedParams, fixedDir: FixedDirection) => void;
  scrollTo: (params: ScrollPos) => void;
  scrollToLeft: (scrollLeft: number) => void;
  scrollToTop: (scrollTop: number) => void;
  scrollToRow: (row: number, strategy?: Alignment) => void;
  onScroll: (params: ScrollPos) => void;
  onVerticalScroll: ({
    scrollTop
  }: ScrollPos) => void;
};
type UseTableReturn = ReturnType<typeof useTable>;
//#endregion
export { UseTableReturn, useTable };