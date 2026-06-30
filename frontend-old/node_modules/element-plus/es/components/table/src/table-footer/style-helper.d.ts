import { TableColumnCtx } from "../table-column/defaults.js";
import { DefaultRow } from "../table/defaults.js";
import { TableFooter } from "./index.js";
import * as _$vue from "vue";

//#region ../../packages/components/table/src/table-footer/style-helper.d.ts
declare function useStyle<T extends DefaultRow>(props: TableFooter<T>): {
  getCellClasses: (columns: TableColumnCtx<T>[], cellIndex: number) => string[];
  getCellStyles: (column: TableColumnCtx<T>, cellIndex: number) => _$vue.CSSProperties | undefined;
  columns: _$vue.ComputedRef<TableColumnCtx<DefaultRow>[]>;
};
//#endregion
export { useStyle as default };