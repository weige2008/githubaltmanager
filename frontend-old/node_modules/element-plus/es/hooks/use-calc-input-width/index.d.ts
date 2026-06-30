import * as _$vue from "vue";

//#region ../../packages/hooks/use-calc-input-width/index.d.ts
declare function useCalcInputWidth(): {
  calculatorRef: _$vue.ShallowRef<HTMLElement | undefined, HTMLElement | undefined>;
  calculatorWidth: _$vue.Ref<number, number>;
  inputStyle: _$vue.ComputedRef<{
    minWidth: string;
  }>;
};
//#endregion
export { useCalcInputWidth };