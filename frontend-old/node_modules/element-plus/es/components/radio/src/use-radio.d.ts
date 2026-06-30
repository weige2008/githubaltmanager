import { RadioEmits, RadioProps } from "./radio.js";
import { RadioButtonProps } from "./radio-button.js";
import { RadioGroupContext } from "./constants.js";
import * as _$vue from "vue";
import { SetupContext } from "vue";

//#region ../../packages/components/radio/src/use-radio.d.ts
declare const useRadio: (props: RadioProps | RadioButtonProps, emit?: SetupContext<RadioEmits>["emit"]) => {
  radioRef: _$vue.Ref<HTMLInputElement | undefined, HTMLInputElement | undefined>;
  isGroup: _$vue.ComputedRef<boolean>;
  radioGroup: RadioGroupContext | undefined;
  focus: _$vue.Ref<boolean, boolean>;
  size: _$vue.ComputedRef<"" | "default" | "large" | "small">;
  disabled: _$vue.ComputedRef<boolean>;
  tabIndex: _$vue.ComputedRef<0 | -1>;
  modelValue: _$vue.WritableComputedRef<string | number | boolean | undefined, string | number | boolean | undefined>;
  actualValue: _$vue.ComputedRef<string | number | boolean | undefined>;
};
//#endregion
export { useRadio };