import { ComputedRef, Ref } from "vue";

//#region ../../packages/components/tabs/src/composables/use-tab-nav-touch.d.ts
interface Scrollable {
  next?: boolean;
  prev?: number;
}
interface UseTabNavTouchParams {
  scrollable: Ref<false | Scrollable>;
  navOffset: Ref<number>;
  navSize: ComputedRef<number>;
  navContainerSize: ComputedRef<number>;
  isHorizontal: ComputedRef<boolean>;
}
declare const useTabNavTouch: ({
  scrollable,
  navOffset,
  navSize,
  navContainerSize,
  isHorizontal
}: UseTabNavTouchParams) => {
  isTouchScrolling: Ref<boolean, boolean>;
  handleTouchStart: (event: TouchEvent) => void;
  handleTouchMove: (event: TouchEvent) => void;
  handleTouchEnd: () => void;
};
//#endregion
export { Scrollable, useTabNavTouch };