import { LayoutDirection } from "../types.js";
import { ComputedRef } from "vue";

//#region ../../packages/components/virtual-list/src/hooks/use-wheel.d.ts
interface ListWheelState {
  atStartEdge: ComputedRef<boolean>;
  atEndEdge: ComputedRef<boolean>;
  layout: ComputedRef<LayoutDirection>;
}
type ListWheelHandler = (offset: number) => void;
declare const useWheel: ({
  atEndEdge,
  atStartEdge,
  layout
}: ListWheelState, onWheelDelta: ListWheelHandler) => {
  hasReachedEdge: (offset: number) => boolean;
  onWheel: (e: WheelEvent) => void;
};
//#endregion
export { useWheel as default };