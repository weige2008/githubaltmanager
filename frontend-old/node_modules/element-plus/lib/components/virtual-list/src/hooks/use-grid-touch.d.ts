import { GridScrollOptions, GridStates } from "../types.js";
import { ComputedRef, Ref } from "vue";

//#region ../../packages/components/virtual-list/src/hooks/use-grid-touch.d.ts
declare const useGridTouch: (windowRef: Ref<HTMLElement | undefined>, states: Ref<GridStates>, scrollTo: (scrollOptions: GridScrollOptions) => void, estimatedTotalWidth: ComputedRef<number>, estimatedTotalHeight: ComputedRef<number>, parsedWidth: ComputedRef<number>, parsedHeight: ComputedRef<number>) => {
  touchStartX: Ref<number, number>;
  touchStartY: Ref<number, number>;
  handleTouchStart: (event: TouchEvent) => void;
  handleTouchMove: (event: TouchEvent) => void;
};
//#endregion
export { useGridTouch };