import { AnyColumns } from "../types.js";
import { CSSProperties } from "vue";

//#region ../../packages/components/table-v2/src/composables/utils.d.ts
declare const calcColumnStyle: (column: AnyColumns[number], fixedColumn: boolean, fixed: boolean) => CSSProperties;
//#endregion
export { calcColumnStyle };