import { CheckboxProps } from "../checkbox.js";
import * as _$vue from "vue";
import { ComponentInternalInstance } from "vue";

//#region ../../packages/components/checkbox/src/composables/use-checkbox.d.ts
declare const useCheckbox: (props: CheckboxProps, slots: ComponentInternalInstance["slots"]) => {
  inputId: _$vue.Ref<string | undefined, string | undefined>;
  isLabeledByFormItem: _$vue.ComputedRef<boolean>;
  isChecked: _$vue.ComputedRef<boolean>;
  isDisabled: _$vue.ComputedRef<boolean>;
  isFocused: _$vue.Ref<boolean, boolean>;
  checkboxButtonSize: _$vue.ComputedRef<"" | "default" | "large" | "small">;
  checkboxSize: _$vue.ComputedRef<"" | "default" | "large" | "small">;
  hasOwnLabel: _$vue.ComputedRef<boolean>;
  model: _$vue.WritableComputedRef<any, unknown>;
  actualValue: _$vue.ComputedRef<string | number | boolean | object | undefined>;
  handleChange: (e: Event) => void;
  onClickRoot: (e: MouseEvent) => Promise<void>;
};
//#endregion
export { useCheckbox };