import { UseNamespaceReturn } from "../../../../hooks/use-namespace/index.js";
import { TableV2Props } from "../table.js";
import { TableGridRowSlotParams } from "../table-grid.js";
import { UseTableReturn } from "../use-table.js";
import { ComponentInternalInstance, FunctionalComponent, UnwrapNestedRefs } from "vue";

//#region ../../packages/components/table-v2/src/renderers/row.d.ts
type RowRendererProps = TableGridRowSlotParams & Pick<TableV2Props, 'expandColumnKey' | 'estimatedRowHeight' | 'rowProps' | 'rowClass' | 'rowKey' | 'rowEventHandlers'> & UnwrapNestedRefs<Pick<UseTableReturn, 'depthMap' | 'expandedRowKeys' | 'hasFixedColumns' | 'onRowHovered' | 'onRowExpanded' | 'columnsStyles'>> & {
  ns: UseNamespaceReturn;
  tableInstance?: ComponentInternalInstance;
};
declare const RowRenderer: FunctionalComponent<RowRendererProps>;
//#endregion
export { RowRenderer as default };