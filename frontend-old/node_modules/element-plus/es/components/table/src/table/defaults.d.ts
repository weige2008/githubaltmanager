import { EpPropMergeType } from "../../../../utils/vue/props/types.js";
import { ComponentSize } from "../../../../constants/size.js";
import { Nullable } from "../../../../utils/typescript.js";
import { TableOverflowTooltipFormatter, TableOverflowTooltipOptions } from "../util.js";
import { TableColumnCtx } from "../table-column/defaults.js";
import { Store } from "../store/index.js";
import TableLayout from "../table-layout.js";
import { CSSProperties, ComponentInternalInstance, PropType, Ref, StyleValue, VNode } from "vue";

//#region ../../packages/components/table/src/table/defaults.d.ts
type DefaultRow = Record<PropertyKey, any>;
interface TableRefs {
  tableWrapper: HTMLElement;
  headerWrapper: HTMLElement;
  footerWrapper: HTMLElement;
  fixedBodyWrapper: HTMLElement;
  rightFixedBodyWrapper: HTMLElement;
  bodyWrapper: HTMLElement;
  appendWrapper: HTMLElement;
  [key: string]: any;
}
interface TableState {
  isGroup: Ref<boolean>;
  resizeState: Ref<{
    width: any;
    height: any;
  }>;
  doLayout: () => void;
  debouncedUpdateLayout: () => void;
}
interface TreeProps {
  hasChildren?: string;
  children?: string;
  checkStrictly?: boolean;
}
type HoverState<T extends DefaultRow> = Nullable<{
  cell: HTMLElement;
  column: TableColumnCtx<T>;
  row: T;
}>;
type RIS<T extends DefaultRow> = {
  row: T;
  $index: number;
  store: Store<T>;
  expanded: boolean;
};
type RenderExpanded<T extends DefaultRow> = ({
  row,
  $index,
  store,
  expanded
}: RIS<T>) => VNode[] | undefined;
type SummaryMethod<T extends DefaultRow> = (data: {
  columns: TableColumnCtx<T>[];
  data: T[];
}) => (string | VNode)[];
interface Table<T extends DefaultRow = any> extends Omit<ComponentInternalInstance, 'emit'> {
  $ready: boolean;
  hoverState?: HoverState<T> | null;
  renderExpanded: RenderExpanded<T>;
  store: Store<T>;
  layout: TableLayout<T>;
  refs: TableRefs;
  tableId: string;
  state: TableState;
  emit: TableEmits<T>;
}
type ColumnCls<T> = string | ((data: {
  row: T;
  rowIndex: number;
}) => string);
type ColumnStyle<T> = CSSProperties | ((data: {
  row: T;
  rowIndex: number;
}) => CSSProperties);
type CellCls<T extends DefaultRow> = string | ((data: {
  row: T;
  rowIndex: number;
  column: TableColumnCtx<T>;
  columnIndex: number;
}) => string);
type CellStyle<T extends DefaultRow> = CSSProperties | ((data: {
  row: T;
  rowIndex: number;
  column: TableColumnCtx<T>;
  columnIndex: number;
}) => CSSProperties);
type Layout = 'fixed' | 'auto';
interface TableProps<T extends DefaultRow = DefaultRow> {
  /**
   * @description table data
   */
  data?: T[];
  /**
   * @description size of Table
   */
  size?: ComponentSize;
  width?: string | number;
  /**
   * @description table's height. By default it has an `auto` height. If its value is a number, the height is measured in pixels; if its value is a string, the value will be assigned to element's style.height, the height is affected by external styles
   */
  height?: string | number;
  /**
   * @description table's max-height. The legal value is a number or the height in px
   */
  maxHeight?: string | number;
  /**
   * @description whether width of column automatically fits its container
   */
  fit?: boolean;
  /**
   * @description whether Table is striped
   */
  stripe?: boolean;
  /**
   * @description whether Table has vertical border
   */
  border?: boolean;
  /**
   * @description key of row data, used for optimizing rendering. Required if `reserve-selection` is on or display tree data. When its type is String, multi-level access is supported, e.g. `user.info.id`, but `user.info[0].id` is not supported, in which case `Function` should be used
   */
  rowKey?: string | ((row: T) => string);
  context?: Table<T>;
  /**
   * @description whether Table header is visible
   */
  showHeader?: boolean;
  /**
   * @description whether to display a summary row
   */
  showSummary?: boolean;
  /**
   * @description displayed text for the first column of summary row
   */
  sumText?: string;
  /**
   * @description custom summary method
   */
  summaryMethod?: SummaryMethod<T>;
  /**
   * @description function that returns custom class names for a row, or a string assigning class names for every row
   */
  rowClassName?: ColumnCls<T>;
  /**
   * @description function that returns custom style for a row, or an object assigning custom style for every row
   */
  rowStyle?: ColumnStyle<T>;
  /**
   * @description function that returns custom class names for a cell, or a string assigning class names for every cell
   */
  cellClassName?: CellCls<T>;
  /**
   * @description function that returns custom style for a cell, or an object assigning custom style for every cell
   */
  cellStyle?: CellStyle<T>;
  /**
   * @description function that returns custom class names for a row in table header, or a string assigning class names for every row in table header
   */
  headerRowClassName?: ColumnCls<T>;
  /**
   * @description function that returns custom style for a row in table header, or an object assigning custom style for every row in table header
   */
  headerRowStyle?: ColumnStyle<T>;
  /**
   * @description function that returns custom class names for a cell in table header, or a string assigning class names for every cell in table header
   */
  headerCellClassName?: CellCls<T>;
  /**
   * @description function that returns custom style for a cell in table header, or an object assigning custom style for every cell in table header
   */
  headerCellStyle?: CellStyle<T>;
  /**
   * @description whether current row is highlighted
   */
  highlightCurrentRow?: boolean;
  /**
   * @description key of current row, a set only prop
   */
  currentRowKey?: string | number;
  /**
   * @description displayed text when data is empty. You can customize this area with `#empty`
   */
  emptyText?: string;
  /**
   * @description set expanded rows by this prop, prop's value is the keys of expand rows, you should set row-key before using this prop
   */
  expandRowKeys?: Array<string>;
  /**
   * @description whether expand all rows by default, works when the table has a column type="expand" or contains tree structure data
   */
  defaultExpandAll?: boolean;
  /**
   * @description enable expandable rows, works when the table has a column type="expand"
   */
  rowExpandable?: (row: T, index: number) => boolean;
  /**
   * @description set the default sort column and order. property `prop` is used to set default sort column, property `order` is used to set default sort order
   */
  defaultSort?: Sort;
  /**
   * @description the `effect` of the overflow tooltip
   */
  tooltipEffect?: string;
  /**
   * @description the options for the overflow tooltip, [see the following tooltip component](tooltip.html#attributes)
   */
  tooltipOptions?: TableOverflowTooltipOptions;
  /**
   * @description method that returns rowspan and colspan
   */
  spanMethod?: (data: {
    row: T;
    rowIndex: number;
    column: TableColumnCtx<T>;
    columnIndex: number;
  }) => number[] | {
    rowspan: number;
    colspan: number;
  } | undefined;
  /**
   * @description controls the behavior of master checkbox in multi-select tables when only some rows are selected (but not all). If true, all rows will be selected, else deselected
   */
  selectOnIndeterminate?: boolean;
  /**
   * @description horizontal indentation of tree data
   */
  indent?: number;
  /**
   * @description configuration for rendering nested data
   */
  treeProps?: TreeProps;
  /**
   * @description whether to lazy loading data
   */
  lazy?: boolean;
  /**
   * @description method for loading child row data, only works when `lazy` is true
   */
  load?: (row: T, treeNode: TreeNode, resolve: (data: T[]) => void) => void;
  className?: string;
  style?: StyleValue;
  /**
   * @description sets the algorithm used to lay out table cells, rows, and columns
   */
  tableLayout?: Layout;
  /**
   * @description always show scrollbar
   */
  scrollbarAlwaysOn?: boolean;
  /**
   * @description ensure main axis minimum-size doesn't follow the content
   */
  flexible?: boolean;
  /**
   * @description whether to hide extra content and show them in a tooltip when hovering on the cell.It will affect all the table columns
   */
  showOverflowTooltip?: boolean | TableOverflowTooltipOptions;
  /**
   * @description function that formats cell tooltip content, works when `show-overflow-tooltip` is `true`
   */
  tooltipFormatter?: TableOverflowTooltipFormatter<T>;
  appendFilterPanelTo?: string;
  scrollbarTabindex?: number | string;
  /**
   * @description whether to allow drag the last column
   */
  allowDragLastColumn?: boolean;
  /**
   * @description whether to preserve expanded row content in DOM when collapsed
   */
  preserveExpandedContent?: boolean;
  /**
   * @description whether to use native scrollbars
   */
  nativeScrollbar?: boolean;
}
type TableTooltipData<T extends DefaultRow> = Parameters<TableOverflowTooltipFormatter<T>>[0];
type TableSortOrder = 'ascending' | 'descending';
interface Sort {
  prop: string;
  order: TableSortOrder;
  init?: any;
  silent?: any;
}
interface Filter<T extends DefaultRow> {
  column: TableColumnCtx<T>;
  values: string[];
  silent: any;
}
interface TreeNode {
  expanded?: boolean;
  loading?: boolean;
  noLazyChildren?: boolean;
  indent?: number;
  level?: number;
  display?: boolean;
}
interface RenderRowData<T extends DefaultRow> {
  store: Store<T>;
  _self: Table<T>;
  column: TableColumnCtx<T>;
  row: T;
  $index: number;
  cellIndex: number;
  treeNode?: TreeNode;
  expanded: boolean;
}
interface TableConfigContext {
  showOverflowTooltip?: boolean | TableOverflowTooltipOptions;
  tooltipEffect?: string;
  tooltipOptions?: TableOverflowTooltipOptions;
  tooltipFormatter?: TableOverflowTooltipFormatter<any>;
}
interface TableEmits<T extends DefaultRow = DefaultRow> {
  (e: 'select', selection: T[], row: T): void;
  (e: 'select-all', selection: T[]): void;
  (e: 'selection-change', newSelection: T[]): void;
  (e: 'cell-mouse-enter' | 'cell-mouse-leave' | 'cell-dblclick', row: T, column: TableColumnCtx<T>, cell: HTMLTableCellElement, event: MouseEvent): void;
  (e: 'cell-contextmenu' | 'cell-click', row: T, column: TableColumnCtx<T>, cell: HTMLTableCellElement, event: PointerEvent): void;
  (e: 'row-dblclick', row: T, column: TableColumnCtx<T> | null, event: MouseEvent): void;
  (e: 'row-click' | 'row-contextmenu', row: T, column: TableColumnCtx<T> | null, event: PointerEvent): void;
  (e: 'header-click' | 'header-contextmenu', column: TableColumnCtx<T>, event: PointerEvent): void;
  (e: 'sort-change', data: {
    column: TableColumnCtx<T>;
    prop: string | null;
    order: TableSortOrder | null;
  }): void;
  (e: 'filter-change', newFilters: Record<string, string[]>): void;
  (e: 'current-change', currentRow: T | null, oldCurrentRow: T | null): void;
  (e: 'header-dragend', newWidth: number, oldWidth: number, column: TableColumnCtx<T>, event: MouseEvent): void;
  (e: 'expand-change', row: T, expandedRows: T[]): void;
  (e: 'expand-change', row: T, expanded: boolean): void;
  (e: 'scroll', data: {
    scrollLeft: number;
    scrollTop: number;
  }): void;
}
/**
 * @deprecated Removed after 3.0.0, Use `TableProps` instead.
 */
declare const tableProps: {
  /**
   * @description table data
   */
  data: {
    type: PropType<any[]>;
    default: () => never[];
  };
  /**
   * @description size of Table
   */
  size: {
    readonly type: PropType<EpPropMergeType<StringConstructor, "" | "default" | "large" | "small", never>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  width: (StringConstructor | NumberConstructor)[];
  /**
   * @description table's height. By default it has an `auto` height. If its value is a number, the height is measured in pixels; if its value is a string, the value will be assigned to element's style.height, the height is affected by external styles
   */
  height: (StringConstructor | NumberConstructor)[];
  /**
   * @description table's max-height. The legal value is a number or the height in px
   */
  maxHeight: (StringConstructor | NumberConstructor)[];
  /**
   * @description whether width of column automatically fits its container
   */
  fit: {
    type: BooleanConstructor;
    default: boolean;
  };
  /**
   * @description whether Table is striped
   */
  stripe: BooleanConstructor;
  /**
   * @description whether Table has vertical border
   */
  border: BooleanConstructor;
  /**
   * @description key of row data, used for optimizing rendering. Required if `reserve-selection` is on or display tree data. When its type is String, multi-level access is supported, e.g. `user.info.id`, but `user.info[0].id` is not supported, in which case `Function` should be used
   */
  rowKey: PropType<TableProps<any>["rowKey"]>;
  /**
   * @description whether Table header is visible
   */
  showHeader: {
    type: BooleanConstructor;
    default: boolean;
  };
  /**
   * @description whether to display a summary row
   */
  showSummary: BooleanConstructor;
  /**
   * @description displayed text for the first column of summary row
   */
  sumText: StringConstructor;
  /**
   * @description custom summary method
   */
  summaryMethod: PropType<TableProps<any>["summaryMethod"]>;
  /**
   * @description function that returns custom class names for a row, or a string assigning class names for every row
   */
  rowClassName: PropType<TableProps<any>["rowClassName"]>;
  /**
   * @description function that returns custom style for a row, or an object assigning custom style for every row
   */
  rowStyle: PropType<TableProps<any>["rowStyle"]>;
  /**
   * @description function that returns custom class names for a cell, or a string assigning class names for every cell
   */
  cellClassName: PropType<TableProps<any>["cellClassName"]>;
  /**
   * @description function that returns custom style for a cell, or an object assigning custom style for every cell
   */
  cellStyle: PropType<TableProps<any>["cellStyle"]>;
  /**
   * @description function that returns custom class names for a row in table header, or a string assigning class names for every row in table header
   */
  headerRowClassName: PropType<TableProps<any>["headerRowClassName"]>;
  /**
   * @description function that returns custom style for a row in table header, or an object assigning custom style for every row in table header
   */
  headerRowStyle: PropType<TableProps<any>["headerRowStyle"]>;
  /**
   * @description function that returns custom class names for a cell in table header, or a string assigning class names for every cell in table header
   */
  headerCellClassName: PropType<TableProps<any>["headerCellClassName"]>;
  /**
   * @description function that returns custom style for a cell in table header, or an object assigning custom style for every cell in table header
   */
  headerCellStyle: PropType<TableProps<any>["headerCellStyle"]>;
  /**
   * @description whether current row is highlighted
   */
  highlightCurrentRow: BooleanConstructor;
  /**
   * @description key of current row, a set only prop
   */
  currentRowKey: (StringConstructor | NumberConstructor)[];
  /**
   * @description displayed text when data is empty. You can customize this area with `#empty`
   */
  emptyText: StringConstructor;
  /**
   * @description set expanded rows by this prop, prop's value is the keys of expand rows, you should set row-key before using this prop
   */
  expandRowKeys: PropType<TableProps<any>["expandRowKeys"]>;
  /**
   * @description whether expand all rows by default, works when the table has a column type="expand" or contains tree structure data
   */
  defaultExpandAll: BooleanConstructor;
  /**
   * @description enable expandable rows, works when the table has a column type="expand"
   */
  rowExpandable: {
    type: PropType<TableProps<any>["rowExpandable"]>;
  };
  /**
   * @description set the default sort column and order. property `prop` is used to set default sort column, property `order` is used to set default sort order
   */
  defaultSort: PropType<TableProps<any>["defaultSort"]>;
  /**
   * @description the `effect` of the overflow tooltip
   */
  tooltipEffect: StringConstructor;
  /**
   * @description the options for the overflow tooltip, [see the following tooltip component](tooltip.html#attributes)
   */
  tooltipOptions: PropType<TableProps<any>["tooltipOptions"]>;
  /**
   * @description method that returns rowspan and colspan
   */
  spanMethod: PropType<TableProps<any>["spanMethod"]>;
  /**
   * @description controls the behavior of master checkbox in multi-select tables when only some rows are selected (but not all). If true, all rows will be selected, else deselected
   */
  selectOnIndeterminate: {
    type: BooleanConstructor;
    default: boolean;
  };
  /**
   * @description horizontal indentation of tree data
   */
  indent: {
    type: NumberConstructor;
    default: number;
  };
  /**
   * @description configuration for rendering nested data
   */
  treeProps: {
    type: PropType<TableProps<any>["treeProps"]>;
    default: () => {
      hasChildren: string;
      children: string;
      checkStrictly: boolean;
    };
  };
  /**
   * @description whether to lazy loading data
   */
  lazy: BooleanConstructor;
  /**
   * @description method for loading child row data, only works when `lazy` is true
   */
  load: PropType<TableProps<any>["load"]>;
  style: {
    type: PropType<TableProps<any>["style"]>;
    default: () => {};
  };
  className: {
    type: StringConstructor;
    default: string;
  };
  /**
   * @description sets the algorithm used to lay out table cells, rows, and columns
   */
  tableLayout: {
    type: PropType<Layout>;
    default: string;
  };
  /**
   * @description always show scrollbar
   */
  scrollbarAlwaysOn: BooleanConstructor;
  /**
   * @description ensure main axis minimum-size doesn't follow the content
   */
  flexible: BooleanConstructor;
  /**
   * @description whether to hide extra content and show them in a tooltip when hovering on the cell.It will affect all the table columns
   */
  showOverflowTooltip: {
    type: PropType<TableProps<any>["showOverflowTooltip"]>;
    default: undefined;
  };
  /**
   * @description function that formats cell tooltip content, works when `show-overflow-tooltip` is `true`
   */
  tooltipFormatter: PropType<TableProps<any>["tooltipFormatter"]>;
  appendFilterPanelTo: StringConstructor;
  scrollbarTabindex: {
    type: (StringConstructor | NumberConstructor)[];
    default: undefined;
  };
  /**
   * @description whether to allow drag the last column
   */
  allowDragLastColumn: {
    type: BooleanConstructor;
    default: boolean;
  };
  /**
   * @description whether to preserve expanded row content in DOM when collapsed
   */
  preserveExpandedContent: BooleanConstructor;
  /**
   * @description whether to use native scrollbars
   */
  nativeScrollbar: BooleanConstructor;
};
//#endregion
export { type CellCls, type CellStyle, type ColumnCls, type ColumnStyle, type DefaultRow, type Filter, type RenderExpanded, type RenderRowData, type Sort, type SummaryMethod, type Table, type TableColumnCtx, type TableConfigContext, type TableEmits, type TableProps, type TableRefs, type TableSortOrder, type TableTooltipData, type TreeNode, type TreeProps, tableProps as default, tableProps };