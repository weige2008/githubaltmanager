import { CheckboxProps } from "../checkbox.js";
import { CheckboxModel } from "./use-checkbox-model.js";
import * as _$vue from "vue";
import { ComponentInternalInstance } from "vue";

//#region ../../packages/components/checkbox/src/composables/use-checkbox-status.d.ts
declare const useCheckboxStatus: (props: CheckboxProps, slots: ComponentInternalInstance["slots"], {
  model
}: Pick<CheckboxModel, "model">) => {
  checkboxButtonSize: _$vue.ComputedRef<"" | "default" | "large" | "small">;
  isChecked: _$vue.ComputedRef<boolean>;
  isFocused: _$vue.Ref<boolean, boolean>;
  checkboxSize: _$vue.ComputedRef<"" | "default" | "large" | "small">;
  hasOwnLabel: _$vue.ComputedRef<boolean>;
  actualValue: _$vue.ComputedRef<string | number | boolean | object | undefined>;
};
type CheckboxStatus = ReturnType<typeof useCheckboxStatus>;
//#endregion
export { CheckboxStatus, useCheckboxStatus };