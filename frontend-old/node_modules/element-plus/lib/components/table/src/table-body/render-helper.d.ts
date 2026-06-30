import { DefaultRow } from "../table/defaults.js";
import { TableBodyProps } from "./defaults.js";
import * as _$vue from "vue";

//#region ../../packages/components/table/src/table-body/render-helper.d.ts
declare function useRender<T extends DefaultRow>(props: Partial<TableBodyProps<T>>): {
  wrappedRowRender: (row: T, $index: number) => _$vue.VNode<_$vue.RendererNode, _$vue.RendererElement, {
    [key: string]: any;
  }> | _$vue.VNode<_$vue.RendererNode, _$vue.RendererElement, {
    [key: string]: any;
  }>[] | _$vue.VNode<_$vue.RendererNode, _$vue.RendererElement, {
    [key: string]: any;
  }>[][];
  tooltipContent: _$vue.Ref<string, string>;
  tooltipTrigger: _$vue.Ref<_$vue.VNode<_$vue.RendererNode, _$vue.RendererElement, {
    [key: string]: any;
  }>, _$vue.VNode<_$vue.RendererNode, _$vue.RendererElement, {
    [key: string]: any;
  }>>;
};
//#endregion
export { useRender as default };