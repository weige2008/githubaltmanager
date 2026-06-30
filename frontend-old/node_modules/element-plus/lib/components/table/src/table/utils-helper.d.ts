import { Store } from "../store/index.js";
import { DefaultRow } from "./defaults.js";

//#region ../../packages/components/table/src/table/utils-helper.d.ts
declare function useUtils<T extends DefaultRow>(store: Store<T>): {
  setCurrentRow: (row?: T) => void;
  getSelectionRows: () => T[];
  getHalfSelectionRows: () => T[];
  toggleRowSelection: (row: T, selected?: boolean, ignoreSelectable?: boolean) => void;
  clearSelection: () => void;
  clearFilter: (columnKeys?: string[] | string) => void;
  toggleAllSelection: () => void;
  toggleRowExpansion: (row: T, expanded?: boolean) => void;
  clearSort: () => void;
  sort: (prop: string, order: string) => void;
  updateKeyChildren: (key: string, data: T[]) => void;
};
//#endregion
export { useUtils as default };