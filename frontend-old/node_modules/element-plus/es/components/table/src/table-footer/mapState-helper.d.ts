import { TableColumnCtx } from "../table-column/defaults.js";
import { DefaultRow } from "../table/defaults.js";
import * as _$vue from "vue";

//#region ../../packages/components/table/src/table-footer/mapState-helper.d.ts
declare function useMapState(): {
  leftFixedLeafCount: _$vue.ComputedRef<number>;
  rightFixedLeafCount: _$vue.ComputedRef<number>;
  columnsCount: _$vue.ComputedRef<number>;
  leftFixedCount: _$vue.ComputedRef<number>;
  rightFixedCount: _$vue.ComputedRef<number>;
  columns: _$vue.ComputedRef<TableColumnCtx<DefaultRow>[]>;
};
//#endregion
export { useMapState as default };