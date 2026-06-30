import { Placement as Placement$1 } from "../../components/popper/index.js";
import * as _$vue from "vue";
import { Ref } from "vue";
import * as _$_popperjs_core0 from "@popperjs/core";
import { Instance, Modifier, Options, State, VirtualElement } from "@popperjs/core";

//#region ../../packages/hooks/use-popper/index.d.ts
type ElementType = HTMLElement | undefined;
type ReferenceElement = ElementType | VirtualElement;
type PartialOptions = Partial<Options>;
declare const usePopper: (referenceElementRef: Ref<ReferenceElement>, popperElementRef: Ref<ElementType>, opts?: Ref<PartialOptions> | PartialOptions) => {
  state: _$vue.ComputedRef<{
    elements?: {
      reference: Element | VirtualElement;
      popper: HTMLElement;
      arrow?: HTMLElement;
    } | undefined;
    options?: _$_popperjs_core0.OptionsGeneric<any> | undefined;
    placement?: Placement$1 | undefined;
    strategy?: _$_popperjs_core0.PositioningStrategy | undefined;
    orderedModifiers?: Modifier<any, any>[] | undefined;
    rects?: _$_popperjs_core0.StateRects | undefined;
    scrollParents?: {
      reference: Array<Element | _$_popperjs_core0.Window | _$_popperjs_core0.VisualViewport>;
      popper: Array<Element | _$_popperjs_core0.Window | _$_popperjs_core0.VisualViewport>;
    } | undefined;
    styles?: {
      [key: string]: Partial<CSSStyleDeclaration>;
    } | undefined;
    attributes?: {
      [key: string]: {
        [key: string]: string | boolean;
      };
    } | undefined;
    modifiersData?: {
      [key: string]: any;
      arrow?: {
        x?: number;
        y?: number;
        centerOffset: number;
      };
      hide?: {
        isReferenceHidden: boolean;
        hasPopperEscaped: boolean;
        referenceClippingOffsets: _$_popperjs_core0.SideObject;
        popperEscapeOffsets: _$_popperjs_core0.SideObject;
      };
      offset?: {
        left?: _$_popperjs_core0.Offsets | undefined;
        right?: _$_popperjs_core0.Offsets | undefined;
        auto?: _$_popperjs_core0.Offsets | undefined;
        top?: _$_popperjs_core0.Offsets | undefined;
        bottom?: _$_popperjs_core0.Offsets | undefined;
        "auto-start"?: _$_popperjs_core0.Offsets | undefined;
        "auto-end"?: _$_popperjs_core0.Offsets | undefined;
        "top-start"?: _$_popperjs_core0.Offsets | undefined;
        "top-end"?: _$_popperjs_core0.Offsets | undefined;
        "bottom-start"?: _$_popperjs_core0.Offsets | undefined;
        "bottom-end"?: _$_popperjs_core0.Offsets | undefined;
        "right-start"?: _$_popperjs_core0.Offsets | undefined;
        "right-end"?: _$_popperjs_core0.Offsets | undefined;
        "left-start"?: _$_popperjs_core0.Offsets | undefined;
        "left-end"?: _$_popperjs_core0.Offsets | undefined;
      };
      preventOverflow?: _$_popperjs_core0.Offsets;
      popperOffsets?: _$_popperjs_core0.Offsets;
    } | undefined;
    reset?: boolean | undefined;
  }>;
  styles: _$vue.ComputedRef<{
    [key: string]: Partial<CSSStyleDeclaration>;
  }>;
  attributes: _$vue.ComputedRef<{
    [key: string]: {
      [key: string]: string | boolean;
    };
  }>;
  update: () => Promise<Partial<State>> | undefined;
  forceUpdate: () => void | undefined;
  instanceRef: _$vue.ComputedRef<Instance | undefined>;
};
type UsePopperReturn = ReturnType<typeof usePopper>;
//#endregion
export { PartialOptions, UsePopperReturn, usePopper };