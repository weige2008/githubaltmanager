import { UseNamespaceReturn } from "../../../../hooks/use-namespace/index.js";
import { TableV2Props } from "../table.js";
import { TableV2HeaderRendererParams } from "../components/header.js";
import { FunctionalComponent } from "vue";

//#region ../../packages/components/table-v2/src/renderers/header.d.ts
type HeaderRendererProps = TableV2HeaderRendererParams & Pick<TableV2Props, 'headerClass' | 'headerProps'> & {
  ns: UseNamespaceReturn;
};
declare const HeaderRenderer: FunctionalComponent<HeaderRendererProps>;
//#endregion
export { HeaderRenderer as default };