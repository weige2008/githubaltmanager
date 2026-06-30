import { CheckboxModel } from "./use-checkbox-model.js";
import { CheckboxStatus } from "./use-checkbox-status.js";
import * as _$vue from "vue";

//#region ../../packages/components/checkbox/src/composables/use-checkbox-disabled.d.ts
declare const useCheckboxDisabled: ({
  model,
  isChecked
}: Pick<CheckboxModel, "model"> & Pick<CheckboxStatus, "isChecked">) => {
  isDisabled: _$vue.ComputedRef<boolean>;
  isLimitDisabled: _$vue.ComputedRef<boolean>;
};
type CheckboxDisabled = ReturnType<typeof useCheckboxDisabled>;
//#endregion
export { CheckboxDisabled, useCheckboxDisabled };