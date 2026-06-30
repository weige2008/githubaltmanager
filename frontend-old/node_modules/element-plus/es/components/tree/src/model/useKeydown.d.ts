import TreeStore from "./tree-store.js";
import { Ref } from "vue";

//#region ../../packages/components/tree/src/model/useKeydown.d.ts
interface UseKeydownOption {
  el$: Ref<HTMLElement | null>;
}
declare function useKeydown({
  el$
}: UseKeydownOption, store: Ref<TreeStore>): void;
//#endregion
export { useKeydown };