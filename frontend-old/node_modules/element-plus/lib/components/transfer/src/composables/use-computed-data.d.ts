import { TransferDataItem, TransferProps } from "../transfer.js";
import * as _$vue from "vue";

//#region ../../packages/components/transfer/src/composables/use-computed-data.d.ts
declare const useComputedData: <T extends TransferDataItem = TransferDataItem>(props: Required<Omit<TransferProps<T>, "filterPlaceholder" | "filterMethod" | "renderContent">>) => {
  sourceData: _$vue.ComputedRef<T[]>;
  targetData: _$vue.ComputedRef<T[]>;
};
//#endregion
export { useComputedData };