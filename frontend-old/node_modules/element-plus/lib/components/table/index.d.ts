import { SFCWithInstall } from "../../utils/vue/typescript.js";
import { TableColumnCtx } from "./src/table-column/defaults.js";
import { CellCls, CellStyle, ColumnCls, ColumnStyle, Filter, RenderRowData, Sort, SummaryMethod, Table, TableConfigContext, TableEmits, TableProps, TableRefs, TableTooltipData, TreeNode } from "./src/table/defaults.js";
import _default from "./src/table.vue.js";
import _default$1 from "./src/table-column/index.vue.js";
import { ComponentInstance } from "vue";
import { ComponentExposed } from "vue-component-type-helpers";

//#region ../../packages/components/table/index.d.ts
declare const ElTable: SFCWithInstall<typeof _default> & {
  TableColumn: typeof _default$1;
};
declare const ElTableColumn: SFCWithInstall<typeof _default$1>;
type TableInstance = ComponentInstance<typeof _default> & ComponentExposed<typeof _default>;
type TableColumnInstance = ComponentInstance<typeof _default$1> & ComponentExposed<typeof _default$1>;
//#endregion
export { type CellCls, type CellStyle, type ColumnCls, type ColumnStyle, ElTable, ElTable as default, ElTableColumn, type Filter, type RenderRowData, type Sort, type SummaryMethod, type Table, type TableColumnCtx, TableColumnInstance, type TableConfigContext, type TableEmits, TableInstance, type TableProps, type TableRefs, type TableTooltipData, type TreeNode };