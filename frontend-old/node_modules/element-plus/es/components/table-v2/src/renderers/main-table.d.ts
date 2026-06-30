import { TableV2GridProps } from "../grid.js";
import { TableGridInstance } from "../table-grid.js";
import { FunctionalComponent, Ref } from "vue";

//#region ../../packages/components/table-v2/src/renderers/main-table.d.ts
type MainTableRendererProps = TableV2GridProps & {
  mainTableRef: Ref<TableGridInstance | undefined>;
};
declare const MainTable: FunctionalComponent<MainTableRendererProps>;
//#endregion
export { MainTableRendererProps, MainTable as default };