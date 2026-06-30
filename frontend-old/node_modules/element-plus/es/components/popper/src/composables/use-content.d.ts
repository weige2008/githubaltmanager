import { PopperContentProps } from "../content.js";
import { Placement as Placement$1 } from "../../index.js";
import * as _$vue from "vue";
import * as _$_popperjs_core0 from "@popperjs/core";
import { Modifier } from "@popperjs/core";

//#region ../../packages/components/popper/src/composables/use-content.d.ts
declare const usePopperContent: (props: PopperContentProps) => {
  attributes: _$vue.ComputedRef<{
    [key: string]: {
      [key: string]: string | boolean;
    };
  }>;
  arrowRef: _$vue.Ref<HTMLElement | undefined, HTMLElement | undefined>;
  contentRef: _$vue.Ref<HTMLElement | undefined, HTMLElement | undefined>;
  instanceRef: _$vue.ComputedRef<_$_popperjs_core0.Instance | undefined>;
  state: _$vue.ComputedRef<{
    elements?: {
      reference: Element | _$_popperjs_core0.VirtualElement;
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
  role: _$vue.ComputedRef<string>;
  forceUpdate: () => void | undefined;
  update: () => Promise<Partial<_$_popperjs_core0.State>> | undefined;
};
type UsePopperContentReturn = ReturnType<typeof usePopperContent>;
//#endregion
export { UsePopperContentReturn, usePopperContent };