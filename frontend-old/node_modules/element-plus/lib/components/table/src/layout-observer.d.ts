import TableLayout from "./table-layout.js";
import { DefaultRow, Table } from "./table/defaults.js";

//#region ../../packages/components/table/src/layout-observer.d.ts
declare function useLayoutObserver<T extends DefaultRow>(root: Table<T>): {
  tableLayout: TableLayout<T>;
  onColumnsChange: (layout: TableLayout<T>) => void;
  onScrollableChange: (layout: TableLayout<T>) => void;
};
//#endregion
export { useLayoutObserver as default };