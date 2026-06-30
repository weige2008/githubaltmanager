import { EmitFn } from "../../../../utils/vue/typescript.js";
import { TableColumnCtx } from "../table-column/defaults.js";
import { TableHeaderProps } from "./index.js";
import { DefaultRow, TableSortOrder } from "../table/defaults.js";

//#region ../../packages/components/table/src/table-header/event-helper.d.ts
declare function useEvent<T extends DefaultRow>(props: TableHeaderProps<T>, emit: EmitFn<string[]>): {
  handleHeaderClick: (event: PointerEvent, column: TableColumnCtx<T>) => void;
  handleHeaderContextMenu: (event: PointerEvent, column: TableColumnCtx<T>) => void;
  handleMouseDown: (event: MouseEvent, column: TableColumnCtx<T>) => void;
  handleMouseMove: (event: MouseEvent, column: TableColumnCtx<T>) => void;
  handleMouseOut: () => void;
  handleSortClick: (event: Event, column: TableColumnCtx<T>, givenOrder?: TableSortOrder | boolean) => void;
  handleFilterClick: (event: Event) => void;
};
//#endregion
export { useEvent as default };