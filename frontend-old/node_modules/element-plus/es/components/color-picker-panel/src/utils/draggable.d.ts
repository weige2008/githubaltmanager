//#region ../../packages/components/color-picker-panel/src/utils/draggable.d.ts
interface DraggableOptions {
  drag?: (event: MouseEvent | TouchEvent) => void;
  start?: (event: MouseEvent | TouchEvent) => void;
  end?: (event: MouseEvent | TouchEvent) => void;
}
declare function draggable(element: HTMLElement, options: DraggableOptions): void;
//#endregion
export { DraggableOptions, draggable };