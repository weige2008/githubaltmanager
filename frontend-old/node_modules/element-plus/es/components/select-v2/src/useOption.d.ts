import { OptionV2EmitFn, OptionV2Props } from "./defaults.js";

//#region ../../packages/components/select-v2/src/useOption.d.ts
declare function useOption(props: OptionV2Props, {
  emit
}: {
  emit: OptionV2EmitFn;
}): {
  hoverItem: () => void;
  selectOptionClick: () => void;
};
//#endregion
export { useOption };