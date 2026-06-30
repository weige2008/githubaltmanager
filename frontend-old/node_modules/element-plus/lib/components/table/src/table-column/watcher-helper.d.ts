import { TableColumnCtx } from "./defaults.js";
import { DefaultRow } from "../table/defaults.js";
import { ComputedRef } from "vue";

//#region ../../packages/components/table/src/table-column/watcher-helper.d.ts
declare function useWatcher<T extends DefaultRow>(owner: ComputedRef<any>, props_: Partial<TableColumnCtx<T>>): {
  registerComplexWatchers: () => void;
  registerNormalWatchers: () => void;
};
//#endregion
export { useWatcher as default };