import { TableColumnCtx } from "../table-column/defaults.js";
import { TableHeaderProps } from "./index.js";
import { DefaultRow } from "../table/defaults.js";
import * as _$vue from "vue";

//#region ../../packages/components/table/src/table-header/utils-helper.d.ts
declare const convertToRows: <T extends DefaultRow>(originColumns: TableColumnCtx<T>[]) => TableColumnCtx<T>[][];
declare function useUtils<T extends DefaultRow>(props: TableHeaderProps<T>): {
  isGroup: _$vue.ComputedRef<boolean>;
  toggleAllSelection: (event: Event) => void;
  columnRows: _$vue.ComputedRef<TableColumnCtx<T>[][]>;
};
//#endregion
export { convertToRows, useUtils as default };