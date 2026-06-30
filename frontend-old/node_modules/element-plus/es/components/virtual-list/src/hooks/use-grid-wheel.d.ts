import { ComputedRef } from "vue";

//#region ../../packages/components/virtual-list/src/hooks/use-grid-wheel.d.ts
interface GridWheelState {
  atXStartEdge: ComputedRef<boolean>;
  atXEndEdge: ComputedRef<boolean>;
  atYStartEdge: ComputedRef<boolean>;
  atYEndEdge: ComputedRef<boolean>;
}
type GridWheelHandler = (x: number, y: number) => void;
declare const useGridWheel: ({
  atXEndEdge,
  atXStartEdge,
  atYEndEdge,
  atYStartEdge
}: GridWheelState, onWheelDelta: GridWheelHandler) => {
  hasReachedEdge: (x: number, y: number) => boolean;
  onWheel: (e: WheelEvent) => void;
};
//#endregion
export { useGridWheel };