import { PopperContentEmits, PopperContentProps } from "../content.js";
import * as _$vue from "vue";
import { SetupContext } from "vue";

//#region ../../packages/components/popper/src/composables/use-focus-trap.d.ts
declare const usePopperContentFocusTrap: (props: PopperContentProps, emit: SetupContext<PopperContentEmits>["emit"]) => {
  focusStartRef: _$vue.Ref<HTMLElement | "first" | "container" | undefined, HTMLElement | "first" | "container" | undefined>;
  trapped: _$vue.Ref<boolean, boolean>;
  onFocusAfterReleased: (event: CustomEvent) => void;
  onFocusAfterTrapped: () => void;
  onFocusInTrap: (event: FocusEvent) => void;
  onFocusoutPrevented: (event: CustomEvent) => void;
  onReleaseRequested: () => void;
};
type UsePopperContentFocusTrapReturn = ReturnType<typeof usePopperContentFocusTrap>;
//#endregion
export { UsePopperContentFocusTrapReturn, usePopperContentFocusTrap };