import { Option } from "./select.types.js";
import { SelectV2Props } from "./defaults.js";
import * as _$vue from "vue";

//#region ../../packages/components/select-v2/src/useProps.d.ts
interface Props {
  label?: string;
  value?: string;
  disabled?: string;
  options?: string;
}
declare const defaultProps: Required<Props>;
declare function useProps(props: Pick<SelectV2Props, 'props'>): {
  aliasProps: _$vue.Ref<{
    label: string;
    value: string;
    disabled: string;
    options: string;
  }, {
    label: string;
    value: string;
    disabled: string;
    options: string;
  } | {
    label: string;
    value: string;
    disabled: string;
    options: string;
  }>;
  getLabel: (option: Option) => any;
  getValue: (option: Option) => any;
  getDisabled: (option: Option) => any;
  getOptions: (option: Option) => any;
};
//#endregion
export { Props, defaultProps, useProps };