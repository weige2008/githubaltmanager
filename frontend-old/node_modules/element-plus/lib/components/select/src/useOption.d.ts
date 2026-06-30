import { EpPropMergeType } from "../../../utils/vue/props/types.js";
import { OptionProps, OptionStates, SelectContext } from "./type.js";
import * as _$vue from "vue";

//#region ../../packages/components/select/src/useOption.d.ts
declare function useOption(props: OptionProps, states: OptionStates): {
  select: SelectContext;
  currentLabel: _$vue.ComputedRef<boolean | EpPropMergeType<(StringConstructor | NumberConstructor)[], unknown, unknown>>;
  currentValue: _$vue.ComputedRef<true | Record<string, any> | EpPropMergeType<(StringConstructor | NumberConstructor)[], unknown, unknown>>;
  itemSelected: _$vue.ComputedRef<boolean>;
  isDisabled: _$vue.ComputedRef<boolean>;
  hoverItem: () => void;
  updateOption: (query: string) => void;
};
//#endregion
export { useOption };