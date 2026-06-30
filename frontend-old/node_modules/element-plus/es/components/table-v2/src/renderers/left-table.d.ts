import { TableV2GridProps } from "../grid.js";
import { TableGridInstance } from "../table-grid.js";
import { FunctionalComponent, Ref } from "vue";

//#region ../../packages/components/table-v2/src/renderers/left-table.d.ts
type LeftTableProps = TableV2GridProps & {
  leftTableRef: Ref<TableGridInstance | undefined>;
};
declare const LeftTable: FunctionalComponent<LeftTableProps>;
//#endregion
export { LeftTable as default };