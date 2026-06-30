import { ComponentSize } from "../../../constants/size.js";
import { AriaProps } from "../../../hooks/use-aria/index.js";
import { InputHTMLAttributes, VNode } from "vue";

//#region ../../packages/components/input-otp/src/input-otp.d.ts
interface InputOtpProps extends Pick<AriaProps, 'ariaLabel'> {
  /**
   * @description The value of the OTP fields.
   *
   * Since numbers must not have leading zeros, `modelValue` is allowed to be a number only during initialization.
   *
   * @default undefined
   */
  modelValue?: string | number;
  /**
   * @description The OTP fields length
   * @default 6
   */
  length?: number;
  /**
   * @description Custom validator function
   * @default () => true
   */
  validator?: (char: string, index: number) => boolean;
  /**
   * @description Native input mode for virtual keyboards
   */
  inputmode?: InputHTMLAttributes['inputmode'];
  /**
   * @description The type of the OTP fields
   * @default 'outlined'
   */
  type?: 'outlined' | 'filled' | 'underlined';
  /**
   * @description The size of the OTP fields
   * @default 'default'
   */
  size?: ComponentSize;
  /**
   * @description Whether to enable password mode
   */
  mask?: boolean;
  /**
   * @description Whether the OTP fields are disabled
   * @default undefined
   */
  disabled?: boolean;
  /**
   * @description Same as `readonly` in native input
   */
  readonly?: boolean;
  /**
   * @description Same as `id` in native input
   */
  id?: string;
  /**
   * @description Whether to trigger form validation
   */
  validateEvent?: boolean;
  /**
   * @description The separator between OTP fields
   */
  separator?: string | VNode | ((index: number) => string | VNode);
}
declare const inputOtpEmits: {
  "update:modelValue": (value: string) => boolean;
  change: (value: string) => boolean;
  finish: (value: string) => boolean;
  focus: (eve: FocusEvent) => boolean;
  blur: (eve: FocusEvent) => boolean;
};
type InputOtpEmits = typeof inputOtpEmits;
//#endregion
export { InputOtpEmits, InputOtpProps, inputOtpEmits };