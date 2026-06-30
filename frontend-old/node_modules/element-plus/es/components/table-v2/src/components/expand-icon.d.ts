import { TableV2RowCellRenderParam } from "./row.js";
import { StyleValue } from "vue";
import * as _$vue_jsx_runtime0 from "vue/jsx-runtime";

//#region ../../packages/components/table-v2/src/components/expand-icon.d.ts
declare const ExpandIcon: {
  (props: TableV2RowCellRenderParam["expandIconProps"] & {
    class?: string | string[];
    style: StyleValue;
    ariaLabel?: string;
    size: number;
    expanded: boolean;
    expandable: boolean;
  }): _$vue_jsx_runtime0.JSX.Element;
  inheritAttrs: boolean;
};
type ExpandIconInstance = ReturnType<typeof ExpandIcon>;
//#endregion
export { ExpandIconInstance, ExpandIcon as default };