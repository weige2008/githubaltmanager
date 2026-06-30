import { UseNamespaceReturn } from "../../../hooks/use-namespace/index.js";
import { InjectionKey, Ref } from "vue";

//#region ../../packages/components/table-v2/src/tokens.d.ts
type TableV2Context = {
  isScrolling: Ref<boolean>;
  isResetting: Ref<boolean>;
  ns: UseNamespaceReturn;
};
declare const TableV2InjectionKey: InjectionKey<TableV2Context>;
declare const TABLE_V2_GRID_INJECTION_KEY = "tableV2GridScrollLeft";
//#endregion
export { TABLE_V2_GRID_INJECTION_KEY, TableV2Context, TableV2InjectionKey };