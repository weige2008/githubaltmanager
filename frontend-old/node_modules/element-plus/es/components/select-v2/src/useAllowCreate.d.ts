import { Option, SelectStates } from "./select.types.js";
import { SelectV2Props } from "./defaults.js";
//#region ../../packages/components/select-v2/src/useAllowCreate.d.ts
declare function useAllowCreate(props: SelectV2Props, states: SelectStates): {
  createNewOption: (query: string) => void;
  removeNewOption: (option: Option) => void;
  selectNewOption: (option: Option) => void;
  clearAllNewOption: () => void;
};
//#endregion
export { useAllowCreate };