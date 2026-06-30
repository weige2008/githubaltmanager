import { ButtonEmits, ButtonProps } from "./button.js";
import * as _$vue from "vue";
import { SetupContext } from "vue";

//#region ../../packages/components/button/src/use-button.d.ts
declare const useButton: (props: ButtonProps, emit: SetupContext<ButtonEmits>["emit"]) => {
  _disabled: _$vue.ComputedRef<boolean>;
  _size: _$vue.ComputedRef<"" | "default" | "large" | "small">;
  _type: _$vue.ComputedRef<"default" | "" | "text" | "info" | "primary" | "success" | "warning" | "danger">;
  _ref: _$vue.Ref<HTMLButtonElement | undefined, HTMLButtonElement | undefined>;
  _props: _$vue.ComputedRef<{
    ariaDisabled: boolean | undefined;
    disabled: boolean | undefined;
    autofocus: boolean | undefined;
    type: "button" | "reset" | "submit" | undefined;
  } | {
    ariaDisabled?: undefined;
    disabled?: undefined;
    autofocus?: undefined;
    type?: undefined;
  }>;
  _plain: _$vue.ComputedRef<boolean>;
  _round: _$vue.ComputedRef<boolean>;
  _text: _$vue.ComputedRef<boolean>;
  _dashed: _$vue.ComputedRef<boolean>;
  shouldAddSpace: _$vue.ComputedRef<boolean>;
  handleClick: (evt: MouseEvent) => void;
};
//#endregion
export { useButton };