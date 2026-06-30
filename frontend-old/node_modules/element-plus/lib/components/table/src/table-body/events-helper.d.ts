import { TableOverflowTooltipOptions } from "../util.js";
import { DefaultRow } from "../table/defaults.js";
import { TableBodyProps } from "./defaults.js";
import * as _$vue from "vue";
import * as _$lodash_unified0 from "lodash-unified";

//#region ../../packages/components/table/src/table-body/events-helper.d.ts
declare function useEvents<T extends DefaultRow>(props: Partial<TableBodyProps<T>>): {
  handleDoubleClick: (event: MouseEvent, row: T) => void;
  handleClick: (event: PointerEvent, row: T) => void;
  handleContextMenu: (event: PointerEvent, row: T) => void;
  handleMouseEnter: _$lodash_unified0.DebouncedFunc<(index: number) => void>;
  handleMouseLeave: _$lodash_unified0.DebouncedFunc<() => void>;
  handleCellMouseEnter: (event: MouseEvent, row: T, tooltipOptions: TableOverflowTooltipOptions) => void;
  handleCellMouseLeave: (event: MouseEvent) => void;
  tooltipContent: _$vue.Ref<string, string>;
  tooltipTrigger: _$vue.Ref<_$vue.VNode<_$vue.RendererNode, _$vue.RendererElement, {
    [key: string]: any;
  }>, _$vue.VNode<_$vue.RendererNode, _$vue.RendererElement, {
    [key: string]: any;
  }>>;
};
//#endregion
export { useEvents as default };