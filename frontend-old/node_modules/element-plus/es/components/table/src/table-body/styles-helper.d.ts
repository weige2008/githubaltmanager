import { TableColumnCtx } from "../table-column/defaults.js";
import { DefaultRow } from "../table/defaults.js";
import { TableBodyProps } from "./defaults.js";
import * as _$vue from "vue";

//#region ../../packages/components/table/src/table-body/styles-helper.d.ts
declare function useStyles<T extends DefaultRow>(props: Partial<TableBodyProps<T>>): {
  getRowStyle: (row: T, rowIndex: number) => any;
  getRowClass: (row: T, rowIndex: number, displayIndex: number) => string[];
  getCellStyle: (rowIndex: number, columnIndex: number, row: T, column: TableColumnCtx<T>) => _$vue.CSSProperties;
  getCellClass: (rowIndex: number, columnIndex: number, row: T, column: TableColumnCtx<T>, offset: number) => string;
  getSpan: (row: T, column: TableColumnCtx<T>, rowIndex: number, columnIndex: number) => {
    rowspan: number;
    colspan: number;
  };
  getColspanRealWidth: (columns: TableColumnCtx<T>[], colspan: number, index: number) => number;
};
//#endregion
export { useStyles as default };