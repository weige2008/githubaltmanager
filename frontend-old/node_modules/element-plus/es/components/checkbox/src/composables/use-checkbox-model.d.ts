import { CheckboxProps } from "../checkbox.js";
import * as _$vue from "vue";

//#region ../../packages/components/checkbox/src/composables/use-checkbox-model.d.ts
declare const useCheckboxModel: (props: CheckboxProps) => {
  model: _$vue.WritableComputedRef<any, unknown>;
  isGroup: _$vue.ComputedRef<boolean>;
  isLimitExceeded: _$vue.Ref<boolean, boolean>;
};
type CheckboxModel = ReturnType<typeof useCheckboxModel>;
//#endregion
export { CheckboxModel, useCheckboxModel };