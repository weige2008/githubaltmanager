import { Translator } from "../../../../hooks/use-locale/index.js";
import { UseNamespaceReturn } from "../../../../hooks/use-namespace/index.js";
import { TableV2Props } from "../table.js";
import { TableV2RowCellRenderParam } from "../components/row.js";
import { UseTableReturn } from "../use-table.js";
import { FunctionalComponent, UnwrapNestedRefs } from "vue";

//#region ../../packages/components/table-v2/src/renderers/cell.d.ts
type CellRendererProps = TableV2RowCellRenderParam & Pick<TableV2Props, 'cellProps' | 'expandColumnKey' | 'indentSize' | 'iconSize' | 'rowKey'> & UnwrapNestedRefs<Pick<UseTableReturn, 'expandedRowKeys'>> & {
  ns: UseNamespaceReturn;
  t: Translator;
};
declare const CellRenderer: FunctionalComponent<CellRendererProps>;
//#endregion
export { CellRenderer as default };