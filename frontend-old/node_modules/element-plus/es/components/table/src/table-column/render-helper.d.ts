import { TableColumn, TableColumnCtx } from "./defaults.js";
import { DefaultRow, Table } from "../table/defaults.js";
import * as _$vue from "vue";
import { ComputedRef, RendererNode, Slots } from "vue";

//#region ../../packages/components/table/src/table-column/render-helper.d.ts
declare function useRender<T extends DefaultRow>(props: TableColumnCtx<T>, slots: Slots, owner: ComputedRef<Table<T>>): {
  columnId: _$vue.Ref<string, string>;
  realAlign: _$vue.Ref<string | null | undefined, string | null | undefined>;
  isSubColumn: _$vue.Ref<boolean, boolean>;
  realHeaderAlign: _$vue.Ref<string | null | undefined, string | null | undefined>;
  columnOrTableParent: ComputedRef<Table<T> | TableColumn<T>>;
  setColumnWidth: (column: TableColumnCtx<T>) => TableColumnCtx<T>;
  setColumnForcedProps: (column: TableColumnCtx<T>) => TableColumnCtx<T>;
  setColumnRenders: (column: TableColumnCtx<T>) => TableColumnCtx<T>;
  getPropsData: (...propsKey: string[][]) => Record<string, any>;
  getColumnElIndex: (children: T[], child: RendererNode | null) => number;
  updateColumnOrder: () => void;
};
//#endregion
export { useRender as default };