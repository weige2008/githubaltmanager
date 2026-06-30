import { UseNamespaceReturn } from "../../../hooks/use-namespace/index.js";
import { TourGap, TourMask } from "./types.js";
import { TourStepProps } from "./step.js";
import * as _$vue from "vue";
import { CSSProperties, Component, InjectionKey, Ref, SetupContext } from "vue";
import { Placement, Strategy, VirtualElement } from "@floating-ui/dom";

//#region ../../packages/components/tour/src/helper.d.ts
declare const useTarget: (target: Ref<string | HTMLElement | (() => HTMLElement | null) | null | undefined>, open: Ref<boolean>, gap: Ref<TourGap>, mergedMask: Ref<TourMask>, scrollIntoViewOptions: Ref<boolean | ScrollIntoViewOptions>) => {
  mergedPosInfo: _$vue.ComputedRef<{
    left: number;
    top: number;
    width: number;
    height: number;
    radius: number;
  } | null>;
  triggerTarget: _$vue.ComputedRef<HTMLElement | {
    getBoundingClientRect(): DOMRect;
  } | undefined>;
};
interface TourContext {
  currentStep: Ref<TourStepProps | undefined>;
  current: Ref<number>;
  total: Ref<number>;
  showClose: Ref<boolean>;
  closeIcon: Ref<string | Component | undefined>;
  mergedType: Ref<'default' | 'primary' | undefined>;
  ns: UseNamespaceReturn;
  slots: SetupContext['slots'];
  updateModelValue(modelValue: boolean): void;
  onClose(): void;
  onFinish(): void;
}
declare const tourKey: InjectionKey<TourContext>;
declare const useFloating: (referenceRef: Ref<HTMLElement | VirtualElement | null>, contentRef: Ref<HTMLElement | null>, arrowRef: Ref<HTMLElement | null>, placement: Ref<Placement | undefined>, strategy: Ref<Strategy>, offset: Ref<number>, zIndex: Ref<number>, showArrow: Ref<boolean>) => {
  update: () => Promise<void>;
  contentStyle: _$vue.ComputedRef<CSSProperties>;
  arrowStyle: _$vue.ComputedRef<CSSProperties>;
};
//#endregion
export { TourContext, tourKey, useFloating, useTarget };