import { TableOverflowTooltipFormatter, TableOverflowTooltipOptions } from "../util.js";
import { Store } from "../store/index.js";
import { DefaultRow, Table, TableSortOrder } from "../table/defaults.js";
import { ComponentInternalInstance, PropType, Ref, VNode } from "vue";

//#region ../../packages/components/table/src/table-column/defaults.d.ts
type CI<T extends DefaultRow> = {
  column: TableColumnCtx<T>;
  $index: number;
  store: Store<T>;
  _self: any;
};
type Filters = {
  text: string;
  value: string;
}[];
type FilterMethods<T extends DefaultRow> = (value: string, row: T, column: TableColumnCtx<T>) => void;
type ValueOf<T> = T[keyof T];
type TableColumnCtx<T extends DefaultRow = DefaultRow> = {
  id: string;
  realWidth: number | null;
  type: string;
  label: string;
  className: string;
  labelClassName: string;
  property: string;
  prop: string;
  width?: string | number;
  minWidth: string | number;
  renderHeader: (data: CI<T>) => VNode;
  sortable: boolean | string;
  sortMethod: (a: T, b: T) => number;
  sortBy: string | ((row: T, index: number, array?: T[]) => string) | string[];
  resizable: boolean;
  columnKey: string;
  rawColumnKey: string;
  align: string;
  headerAlign: string;
  showOverflowTooltip?: boolean | TableOverflowTooltipOptions;
  tooltipFormatter?: TableOverflowTooltipFormatter<T>;
  fixed: boolean | string;
  formatter: (row: T, column: TableColumnCtx<T>, cellValue: any, index: number) => VNode | string;
  selectable: (row: T, index: number) => boolean;
  reserveSelection: boolean;
  filterMethod: FilterMethods<T>;
  filteredValue: string[];
  filters: Filters;
  filterPlacement: string;
  filterMultiple: boolean;
  filterClassName: string;
  index: number | ((index: number) => number);
  sortOrders: (TableSortOrder | null)[];
  renderCell: (data: any) => VNode | VNode[];
  colSpan: number;
  rowSpan: number;
  children?: TableColumnCtx<T>[];
  level: number;
  filterable: boolean | FilterMethods<T> | Filters;
  order: TableSortOrder | null;
  isColumnGroup: boolean;
  isSubColumn: boolean;
  columns: TableColumnCtx<T>[];
  getColumnIndex: () => number;
  no: number;
  filterOpened?: boolean;
  renderFilterIcon?: (scope: any) => VNode;
  renderExpand?: (scope: any) => VNode;
};
interface TableColumn<T extends DefaultRow> extends ComponentInternalInstance {
  vnode: {
    vParent: TableColumn<T> | Table<T>;
  } & VNode;
  vParent: TableColumn<T> | Table<T>;
  columnId: string;
  columnConfig: Ref<Partial<TableColumnCtx<T>>>;
}
interface TableColumnProps<T extends DefaultRow = DefaultRow> {
  /**
   * @description type of the column. If set to `selection`, the column will display checkbox. If set to `index`, the column will display index of the row (staring from 1). If set to `expand`, the column will display expand icon
   */
  type?: string;
  /**
   * @description column label
   */
  label?: string;
  /**
   * @description class name of cells in the column
   */
  className?: string;
  /**
   * @description class name of the label of this column
   */
  labelClassName?: string;
  /**
   * @description
   */
  property?: string;
  /**
   * @description field name. You can also use its alias: `property`
   */
  prop?: string;
  /**
   * @description column width
   */
  width?: string | number;
  /**
   * @description column minimum width. Columns with `width` has a fixed width, while columns with `min-width` has a width that is distributed in proportion
   */
  minWidth?: string | number;
  /**
   * @description render function for table header of this column
   */
  renderHeader?: TableColumnCtx<T>['renderHeader'];
  /**
   * @description whether column can be sorted. Remote sorting can be done by setting this attribute to 'custom' and listening to the `sort-change` event of Table
   */
  sortable?: boolean | string;
  /**
   * @description sorting method, works when `sortable` is `true`. Should return a number, just like Array.sort
   */
  sortMethod?: TableColumnCtx<T>['sortMethod'];
  /**
   * @description specify which property to sort by, works when `sortable` is `true` and `sort-method` is `undefined`. If set to an Array, the column will sequentially sort by the next property if the previous one is equal
   */
  sortBy?: TableColumnCtx<T>['sortBy'];
  /**
   * @description whether column width can be resized, works when `border` of `el-table` is `true`
   */
  resizable?: boolean;
  /**
   * @description column's key. If you need to use the filter-change event, you need this attribute to identify which column is being filtered
   */
  columnKey?: string;
  /**
   * @description alignment, the value should be 'left' \/ 'center' \/ 'right'
   */
  align?: string;
  /**
   * @description alignment of the table header. If omitted, the value of the above `align` attribute will be applied, the value should be 'left' \/ 'center' \/ 'right'
   */
  headerAlign?: string;
  /**
   * @description whether to hide extra content and show them in a tooltip when hovering on the cell
   */
  showOverflowTooltip?: TableColumnCtx<T>['showOverflowTooltip'];
  /**
   * @description function that formats cell tooltip content, works when `show-overflow-tooltip` is `true`
   */
  tooltipFormatter?: TableColumnCtx<T>['tooltipFormatter'];
  /**
   * @description whether column is fixed at left / right. Will be fixed at left if `true`
   */
  fixed?: boolean | string;
  /**
   * @description function that formats cell content
   */
  formatter?: TableColumnCtx<T>['formatter'];
  /**
   * @description function that determines if a certain row can be selected, works when `type` is 'selection'
   */
  selectable?: TableColumnCtx<T>['selectable'];
  /**
   * @description whether to reserve selection after data refreshing, works when `type` is 'selection'. Note that `row-key` is required for this to work
   */
  reserveSelection?: boolean;
  /**
   * @description data filtering method. If `filter-multiple` is on, this method will be called multiple times for each row, and a row will display if one of the calls returns `true`
   */
  filterMethod?: TableColumnCtx<T>['filterMethod'];
  /**
   * @description filter value for selected data, might be useful when table header is rendered with `render-header`
   */
  filteredValue?: TableColumnCtx<T>['filteredValue'];
  /**
   * @description an array of data filtering options. For each element in this array, `text` and `value` are required
   */
  filters?: TableColumnCtx<T>['filters'];
  /**
   * @description placement for the filter dropdown
   */
  filterPlacement?: string;
  /**
   * @description whether data filtering supports multiple options
   */
  filterMultiple?: boolean;
  /**
   * @description className for the filter dropdown
   */
  filterClassName?: string;
  /**
   * @description customize indices for each row, works on columns with `type=index`
   */
  index?: TableColumnCtx<T>['index'];
  /**
   * @description the order of the sorting strategies used when sorting the data, works when `sortable` is `true`. Accepts an array, as the user clicks on the header, the column is sorted in order of the elements in the array
   */
  sortOrders?: TableColumnCtx<T>['sortOrders'];
}
/**
 * @deprecated Removed after 3.0.0, Use `TableColumnProps` instead.
 */
declare const tableColumnProps: {
  /**
   * @description type of the column. If set to `selection`, the column will display checkbox. If set to `index`, the column will display index of the row (staring from 1). If set to `expand`, the column will display expand icon
   */
  type: {
    type: StringConstructor;
    default: string;
  };
  /**
   * @description column label
   */
  label: StringConstructor;
  /**
   * @description class name of cells in the column
   */
  className: StringConstructor;
  /**
   * @description class name of the label of this column
   */
  labelClassName: StringConstructor;
  /**
   * @description
   */
  property: StringConstructor;
  /**
   * @description field name. You can also use its alias: `property`
   */
  prop: StringConstructor;
  /**
   * @description column width
   */
  width: {
    type: (StringConstructor | NumberConstructor)[];
    default: string;
  };
  /**
   * @description column minimum width. Columns with `width` has a fixed width, while columns with `min-width` has a width that is distributed in proportion
   */
  minWidth: {
    type: (StringConstructor | NumberConstructor)[];
    default: string;
  };
  /**
   * @description render function for table header of this column
   */
  renderHeader: PropType<TableColumnCtx<any>["renderHeader"]>;
  /**
   * @description whether column can be sorted. Remote sorting can be done by setting this attribute to 'custom' and listening to the `sort-change` event of Table
   */
  sortable: {
    type: (BooleanConstructor | StringConstructor)[];
    default: boolean;
  };
  /**
   * @description sorting method, works when `sortable` is `true`. Should return a number, just like Array.sort
   */
  sortMethod: PropType<TableColumnCtx<any>["sortMethod"]>;
  /**
   * @description specify which property to sort by, works when `sortable` is `true` and `sort-method` is `undefined`. If set to an Array, the column will sequentially sort by the next property if the previous one is equal
   */
  sortBy: PropType<TableColumnCtx<any>["sortBy"]>;
  /**
   * @description whether column width can be resized, works when `border` of `el-table` is `true`
   */
  resizable: {
    type: BooleanConstructor;
    default: boolean;
  };
  /**
   * @description column's key. If you need to use the filter-change event, you need this attribute to identify which column is being filtered
   */
  columnKey: StringConstructor;
  /**
   * @description alignment, the value should be 'left' \/ 'center' \/ 'right'
   */
  align: StringConstructor;
  /**
   * @description alignment of the table header. If omitted, the value of the above `align` attribute will be applied, the value should be 'left' \/ 'center' \/ 'right'
   */
  headerAlign: StringConstructor;
  /**
   * @description whether to hide extra content and show them in a tooltip when hovering on the cell
   */
  showOverflowTooltip: {
    type: PropType<TableColumnCtx<any>["showOverflowTooltip"]>;
    default: undefined;
  };
  /**
   * @description function that formats cell tooltip content, works when `show-overflow-tooltip` is `true`
   */
  tooltipFormatter: PropType<TableColumnCtx<any>["tooltipFormatter"]>;
  /**
   * @description whether column is fixed at left / right. Will be fixed at left if `true`
   */
  fixed: (BooleanConstructor | StringConstructor)[];
  /**
   * @description function that formats cell content
   */
  formatter: PropType<TableColumnCtx<any>["formatter"]>;
  /**
   * @description function that determines if a certain row can be selected, works when `type` is 'selection'
   */
  selectable: PropType<TableColumnCtx<any>["selectable"]>;
  /**
   * @description whether to reserve selection after data refreshing, works when `type` is 'selection'. Note that `row-key` is required for this to work
   */
  reserveSelection: BooleanConstructor;
  /**
   * @description data filtering method. If `filter-multiple` is on, this method will be called multiple times for each row, and a row will display if one of the calls returns `true`
   */
  filterMethod: PropType<TableColumnCtx<any>["filterMethod"]>;
  /**
   * @description filter value for selected data, might be useful when table header is rendered with `render-header`
   */
  filteredValue: PropType<TableColumnCtx<any>["filteredValue"]>;
  /**
   * @description an array of data filtering options. For each element in this array, `text` and `value` are required
   */
  filters: PropType<TableColumnCtx<any>["filters"]>;
  /**
   * @description placement for the filter dropdown
   */
  filterPlacement: StringConstructor;
  /**
   * @description whether data filtering supports multiple options
   */
  filterMultiple: {
    type: BooleanConstructor;
    default: boolean;
  };
  /**
   * @description className for the filter dropdown
   */
  filterClassName: StringConstructor;
  /**
   * @description customize indices for each row, works on columns with `type=index`
   */
  index: PropType<TableColumnCtx<any>["index"]>;
  /**
   * @description the order of the sorting strategies used when sorting the data, works when `sortable` is `true`. Accepts an array, as the user clicks on the header, the column is sorted in order of the elements in the array
   */
  sortOrders: {
    type: PropType<TableColumnCtx<any>["sortOrders"]>;
    default: () => (string | null)[];
    validator: (val: TableColumnCtx<any>["sortOrders"]) => boolean;
  };
};
//#endregion
export { type FilterMethods, type Filters, type TableColumn, type TableColumnCtx, type TableColumnProps, type ValueOf, tableColumnProps as default, tableColumnProps };