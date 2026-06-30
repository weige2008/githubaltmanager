import { WatcherPropsData } from "./index.js";
import { DefaultRow } from "../table/defaults.js";
import { Ref } from "vue";

//#region ../../packages/components/table/src/store/current.d.ts
declare function useCurrent<T extends DefaultRow>(watcherData: WatcherPropsData<T>): {
  setCurrentRowKey: (key: string) => void;
  restoreCurrentRowKey: () => void;
  setCurrentRowByKey: (key: string) => void;
  updateCurrentRow: (_currentRow: T) => void;
  updateCurrentRowData: () => void;
  states: {
    _currentRowKey: Ref<string | null, string | null>;
    currentRow: Ref<T | null, T | null>;
  };
};
//#endregion
export { useCurrent as default };