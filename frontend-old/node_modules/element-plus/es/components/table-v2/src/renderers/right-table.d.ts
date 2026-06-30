import { TableV2GridProps } from "../grid.js";
import { TableGridInstance } from "../table-grid.js";
import { FunctionalComponent, Ref } from "vue";

//#region ../../packages/components/table-v2/src/renderers/right-table.d.ts
type RightTableProps = TableV2GridProps & {
  rightTableRef: Ref<TableGridInstance | undefined>;
};
declare const RightTable: FunctionalComponent<RightTableProps>;
//#endregion
export { RightTable as default };