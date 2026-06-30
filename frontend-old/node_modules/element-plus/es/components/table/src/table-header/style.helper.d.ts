import { TableColumnCtx } from "../table-column/defaults.js";
import { TableHeaderProps } from "./index.js";
import { DefaultRow } from "../table/defaults.js";
import * as _$vue from "vue";

//#region ../../packages/components/table/src/table-header/style.helper.d.ts
declare function useStyle<T extends DefaultRow>(props: TableHeaderProps<T>): {
  getHeaderRowStyle: (rowIndex: number) => any;
  getHeaderRowClass: (rowIndex: number) => string;
  getHeaderCellStyle: (rowIndex: number, columnIndex: number, row: T, column: TableColumnCtx<T>) => _$vue.CSSProperties;
  getHeaderCellClass: (rowIndex: number, columnIndex: number, row: T, column: TableColumnCtx<T>) => string;
};
//#endregion
export { useStyle as default };