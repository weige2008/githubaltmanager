import { CheckboxValueType } from "../../../checkbox/src/checkbox.js";
import { TransferDataItem } from "../transfer.js";
import { TransferPanelEmits, TransferPanelProps, TransferPanelState } from "../transfer-panel.js";
import * as _$vue from "vue";
import { SetupContext } from "vue";

//#region ../../packages/components/transfer/src/composables/use-check.d.ts
declare const useCheck: <T extends TransferDataItem = TransferDataItem>(props: Required<Pick<TransferPanelProps<T>, "data" | "format" | "defaultChecked" | "props">> & {
  filterMethod: TransferPanelProps<T>["filterMethod"];
}, panelState: TransferPanelState, emit: SetupContext<TransferPanelEmits>["emit"]) => {
  filteredData: _$vue.ComputedRef<T[]>;
  checkableData: _$vue.ComputedRef<T[]>;
  checkedSummary: _$vue.ComputedRef<string>;
  isIndeterminate: _$vue.ComputedRef<boolean>;
  updateAllChecked: () => void;
  handleAllCheckedChange: (value: CheckboxValueType) => void;
};
//#endregion
export { useCheck };