import Color from "../utils/color.js";

//#region ../../packages/components/color-picker-panel/src/composables/use-common-color.d.ts
type CommonColorProps = {
  modelValue?: string | null;
  showAlpha: boolean;
  colorFormat?: string;
};
type CommonColorEmits = (event: 'update:modelValue', ...args: any[]) => void;
declare const useCommonColor: <P extends CommonColorProps, E extends CommonColorEmits>(props: P, emit: E) => {
  color: Color;
};
//#endregion
export { useCommonColor };