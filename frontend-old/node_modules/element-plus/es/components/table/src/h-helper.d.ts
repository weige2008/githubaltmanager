import { TableColumnCtx } from "./table-column/defaults.js";
import { DefaultRow } from "./table/defaults.js";
import * as _$vue from "vue";

//#region ../../packages/components/table/src/h-helper.d.ts
type Props = {
  tableLayout: 'fixed' | 'auto';
  columns?: TableColumnCtx<DefaultRow>[];
};
declare function hColgroup(props: Props): _$vue.VNode<_$vue.RendererNode, _$vue.RendererElement, {
  [key: string]: any;
}>;
declare namespace hColgroup {
  var props: string[];
}
//#endregion
export { hColgroup };