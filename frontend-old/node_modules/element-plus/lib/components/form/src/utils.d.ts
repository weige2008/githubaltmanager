import { Arrayable } from "../../../utils/typescript.js";
import { FormItemContext } from "./types.js";
import { FormItemProp } from "./form-item.js";
import * as _$vue from "vue";

//#region ../../packages/components/form/src/utils.d.ts
declare function useFormLabelWidth(): {
  autoLabelWidth: _$vue.ComputedRef<string>;
  registerLabelWidth: (val: number, oldVal: number) => void;
  deregisterLabelWidth: (val: number) => void;
};
declare const filterFields: (fields: FormItemContext[], props: Arrayable<FormItemProp>) => FormItemContext[];
//#endregion
export { filterFields, useFormLabelWidth };