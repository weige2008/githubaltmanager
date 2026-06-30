import { WatcherPropsData } from "./index.js";
import { DefaultRow } from "../table/defaults.js";
import { Ref } from "vue";

//#region ../../packages/components/table/src/store/expand.d.ts
declare function useExpand<T extends DefaultRow>(watcherData: WatcherPropsData<T>): {
  updateExpandRows: () => void;
  toggleRowExpansion: (row: T, expanded?: boolean) => void;
  setExpandRowKeys: (rowKeys: (string | number)[]) => void;
  isRowExpanded: (row: T) => boolean;
  states: {
    expandRows: Ref<T[], T[]>;
    defaultExpandAll: Ref<boolean, boolean>;
  };
};
//#endregion
export { useExpand as default };