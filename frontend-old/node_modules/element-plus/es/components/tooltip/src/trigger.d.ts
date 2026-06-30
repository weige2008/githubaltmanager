import { EpPropFinalized } from "../../../utils/vue/props/types.js";
import { Arrayable } from "../../../utils/typescript.js";
import { Measurable } from "../../popper/src/constants.js";
import { PopperTriggerProps } from "../../popper/src/trigger.js";
import * as _$vue from "vue";
import { ExtractPublicPropTypes } from "vue";

//#region ../../packages/components/tooltip/src/trigger.d.ts
type TooltipTriggerType = 'hover' | 'focus' | 'click' | 'contextmenu';
interface UseTooltipTriggerProps extends PopperTriggerProps {
  /**
   * @description whether Tooltip is disabled
   */
  disabled?: boolean;
  /**
   * @description How should the tooltip be triggered (to show), not valid in controlled mode
   */
  trigger?: Arrayable<TooltipTriggerType>;
  /**
   * @description When you click the mouse to focus on the trigger element, you can define a set of keyboard codes to control the display of tooltip through the keyboard, not valid in controlled mode
   */
  triggerKeys?: string[];
  /**
   * @description when triggering tooltips through hover, whether to focus the trigger element, which improves accessibility
   */
  focusOnTarget?: boolean;
}
declare const useTooltipTriggerPropsDefaults: {
  readonly trigger: "hover";
  readonly triggerKeys: () => string[];
};
/**
 * @deprecated Removed after 3.0.0, Use `UseTooltipTriggerProps` instead.
 */
declare const useTooltipTriggerProps: {
  readonly disabled: BooleanConstructor;
  readonly trigger: EpPropFinalized<(new (...args: any[]) => "click" | "focus" | "hover" | "contextmenu" | TooltipTriggerType[]) | (() => Arrayable<TooltipTriggerType>) | (((new (...args: any[]) => "click" | "focus" | "hover" | "contextmenu" | TooltipTriggerType[]) | (() => Arrayable<TooltipTriggerType>)) | null)[], unknown, unknown, "hover", boolean>;
  readonly triggerKeys: EpPropFinalized<(new (...args: any[]) => string[]) | (() => string[]) | (((new (...args: any[]) => string[]) | (() => string[])) | null)[], unknown, unknown, () => string[], boolean>;
  readonly focusOnTarget: BooleanConstructor;
  readonly virtualRef: {
    readonly type: _$vue.PropType<Measurable>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly virtualTriggering: BooleanConstructor;
  readonly onMouseenter: {
    readonly type: _$vue.PropType<(e: MouseEvent) => void>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly onMouseleave: {
    readonly type: _$vue.PropType<(e: MouseEvent) => void>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly onClick: {
    readonly type: _$vue.PropType<(e: PointerEvent) => void>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly onKeydown: {
    readonly type: _$vue.PropType<(e: KeyboardEvent) => void>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly onFocus: {
    readonly type: _$vue.PropType<(e: FocusEvent) => void>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly onBlur: {
    readonly type: _$vue.PropType<(e: FocusEvent) => void>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly onContextmenu: {
    readonly type: _$vue.PropType<(e: PointerEvent) => void>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly id: StringConstructor;
  readonly open: BooleanConstructor;
};
/**
 * @deprecated Removed after 3.0.0, Use `UseTooltipTriggerProps` instead.
 */
type ElTooltipTriggerProps = UseTooltipTriggerProps;
/**
 * @deprecated Removed after 3.0.0, Use `UseTooltipTriggerProps` instead.
 */
type ElTooltipTriggerPropsPublic = ExtractPublicPropTypes<typeof useTooltipTriggerProps>;
//#endregion
export { ElTooltipTriggerProps, ElTooltipTriggerPropsPublic, TooltipTriggerType, UseTooltipTriggerProps, useTooltipTriggerProps, useTooltipTriggerPropsDefaults };