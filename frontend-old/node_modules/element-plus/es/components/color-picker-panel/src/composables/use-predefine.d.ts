import Color from "../utils/color.js";
import { PredefineProps } from "../props/predefine.js";
import * as _$vue from "vue";
import { Ref } from "vue";

//#region ../../packages/components/color-picker-panel/src/composables/use-predefine.d.ts
declare const usePredefine: (props: PredefineProps) => {
  rgbaColors: Ref<Color[], Color[]>;
  handleSelect: (index: number) => void;
};
declare const usePredefineDOM: (props: PredefineProps) => {
  rootKls: _$vue.ComputedRef<string[]>;
  colorsKls: _$vue.ComputedRef<string>;
  colorSelectorKls: (item: Color) => (string | {
    selected: boolean | undefined;
  })[];
};
//#endregion
export { usePredefine, usePredefineDOM };