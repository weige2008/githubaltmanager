import { IconPropType } from "../../../utils/vue/icon.js";
import { SFCWithInstall } from "../../../utils/vue/typescript.js";
import { EpPropFinalized, EpPropMergeType } from "../../../utils/vue/props/types.js";
import { Arrayable } from "../../../utils/typescript.js";
import { Translator } from "../../../hooks/use-locale/index.js";
import { Measurable } from "../../popper/src/constants.js";
import { PopperEffect, PopperInstance, roleTypes } from "../../popper/src/popper.js";
import { Options, Placement } from "../../popper/index.js";
import { TooltipContentInstance } from "../../tooltip/src/content.js";
import { TooltipTriggerType } from "../../tooltip/src/trigger.js";
import { TooltipInstance, UseTooltipProps } from "../../tooltip/src/tooltip.js";
import { ButtonNativeType, ButtonProps, ButtonType } from "../../button/src/button.js";
import { ButtonGroupProps } from "../../button/src/button-group.js";
import _default$1 from "../../button/src/button-group.vue.js";
import { IconProps } from "../../icon/src/icon.js";
import { ScrollbarDirection, ScrollbarProps } from "../../scrollbar/src/scrollbar.js";
import * as _$vue from "vue";
import { CSSProperties } from "vue";

//#region ../../packages/components/dropdown/src/dropdown.vue.d.ts
declare const _default: typeof __VLS_export;
declare const __VLS_export: _$vue.DefineComponent<_$vue.ExtractPropTypes<{
  readonly trigger: {
    readonly type: _$vue.PropType<Arrayable<"click" | "hover" | "contextmenu">>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    readonly __epPropKey: true;
    readonly default: "hover";
  };
  readonly triggerKeys: EpPropFinalized<(new (...args: any[]) => string[]) | (() => string[]) | (((new (...args: any[]) => string[]) | (() => string[])) | null)[], unknown, unknown, () => string[], boolean>;
  readonly virtualTriggering: BooleanConstructor;
  readonly virtualRef: {
    readonly type: _$vue.PropType<Measurable>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly effect: {
    readonly default: "light";
    readonly type: _$vue.PropType<EpPropMergeType<(new (...args: any[]) => string) | (() => PopperEffect) | (((new (...args: any[]) => string) | (() => PopperEffect)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    readonly __epPropKey: true;
  };
  readonly type: {
    readonly type: _$vue.PropType<EpPropMergeType<(new (...args: any[]) => "" | "default" | "text" | "info" | "primary" | "success" | "warning" | "danger") | (() => "" | "default" | "text" | "info" | "primary" | "success" | "warning" | "danger") | (((new (...args: any[]) => "" | "default" | "text" | "info" | "primary" | "success" | "warning" | "danger") | (() => "" | "default" | "text" | "info" | "primary" | "success" | "warning" | "danger")) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly placement: EpPropFinalized<(new (...args: any[]) => "left" | "right" | "auto" | "top" | "bottom" | "auto-start" | "auto-end" | "top-start" | "top-end" | "bottom-start" | "bottom-end" | "right-start" | "right-end" | "left-start" | "left-end") | (() => Placement) | (((new (...args: any[]) => "left" | "right" | "auto" | "top" | "bottom" | "auto-start" | "auto-end" | "top-start" | "top-end" | "bottom-start" | "bottom-end" | "right-start" | "right-end" | "left-start" | "left-end") | (() => Placement)) | null)[], unknown, unknown, "bottom", boolean>;
  readonly popperOptions: EpPropFinalized<(new (...args: any[]) => Partial<Options>) | (() => Partial<Options>) | (((new (...args: any[]) => Partial<Options>) | (() => Partial<Options>)) | null)[], unknown, unknown, () => {}, boolean>;
  readonly id: StringConstructor;
  readonly size: EpPropFinalized<StringConstructor, unknown, unknown, "", boolean>;
  readonly splitButton: BooleanConstructor;
  readonly hideOnClick: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  readonly loop: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  readonly showArrow: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  readonly showTimeout: EpPropFinalized<NumberConstructor, unknown, unknown, 150, boolean>;
  readonly hideTimeout: EpPropFinalized<NumberConstructor, unknown, unknown, 150, boolean>;
  readonly tabindex: EpPropFinalized<(new (...args: any[]) => string | number) | (() => string | number) | (((new (...args: any[]) => string | number) | (() => string | number)) | null)[], unknown, unknown, 0, boolean>;
  readonly maxHeight: EpPropFinalized<(new (...args: any[]) => string | number) | (() => string | number) | (((new (...args: any[]) => string | number) | (() => string | number)) | null)[], unknown, unknown, "", boolean>;
  readonly popperClass: {
    readonly type: _$vue.PropType<EpPropMergeType<(new (...args: any[]) => string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | /*elided*/any)[])[])[])[])[])[])[])[])[])[])[]) | (() => string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | /*elided*/any)[])[])[])[])[])[])[])[])[])[])[]) | (((new (...args: any[]) => string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | /*elided*/any)[])[])[])[])[])[])[])[])[])[])[]) | (() => string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | /*elided*/any)[])[])[])[])[])[])[])[])[])[])[])) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly popperStyle: EpPropFinalized<(new (...args: any[]) => string | false | CSSProperties | _$vue.StyleValue[]) | (() => _$vue.StyleValue) | (((new (...args: any[]) => string | false | CSSProperties | _$vue.StyleValue[]) | (() => _$vue.StyleValue)) | null)[], unknown, unknown, undefined, boolean>;
  readonly disabled: BooleanConstructor;
  readonly role: EpPropFinalized<StringConstructor, "listbox" | "grid" | "menu" | "tooltip" | "dialog" | "group" | "navigation" | "tree", unknown, "menu", boolean>;
  readonly buttonProps: {
    readonly type: _$vue.PropType<Partial<ButtonProps>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly teleported: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  readonly appendTo: {
    readonly type: _$vue.PropType<EpPropMergeType<(new (...args: any[]) => string | HTMLElement) | (() => string | HTMLElement) | (((new (...args: any[]) => string | HTMLElement) | (() => string | HTMLElement)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly persistent: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
}>, {
  t: Translator;
  ns: {
    namespace: _$vue.ComputedRef<string>;
    b: (blockSuffix?: string) => string;
    e: (element?: string) => string;
    m: (modifier?: string) => string;
    be: (blockSuffix?: string, element?: string) => string;
    em: (element?: string, modifier?: string) => string;
    bm: (blockSuffix?: string, modifier?: string) => string;
    bem: (blockSuffix?: string, element?: string, modifier?: string) => string;
    is: {
      (name: string, state: boolean | undefined): string;
      (name: string): string;
    };
    cssVar: (object: Record<string, string>) => Record<string, string>;
    cssVarName: (name: string) => string;
    cssVarBlock: (object: Record<string, string>) => Record<string, string>;
    cssVarBlockName: (name: string) => string;
  };
  scrollbar: _$vue.Ref<null, null>;
  wrapStyle: _$vue.ComputedRef<CSSProperties>;
  dropdownTriggerKls: _$vue.ComputedRef<string[]>;
  dropdownSize: _$vue.ComputedRef<"" | "default" | "large" | "small">;
  triggerId: _$vue.ComputedRef<string>;
  currentTabId: _$vue.Ref<string | null, string | null>;
  handleCurrentTabIdChange: (id: string) => void;
  handlerMainButtonClick: (event: MouseEvent) => void;
  handleClose: () => void;
  handleOpen: () => void;
  handleBeforeShowTooltip: () => void;
  handleShowTooltip: (event?: Event) => void;
  handleBeforeHideTooltip: () => void;
  popperRef: _$vue.Ref<TooltipInstance | undefined, TooltipInstance | undefined>;
  contentRef: _$vue.Ref<HTMLElement | undefined, HTMLElement | undefined>;
  triggeringElementRef: _$vue.Ref<any, any>;
  referenceElementRef: _$vue.Ref<any, any>;
}, {}, {}, {}, _$vue.ComponentOptionsMixin, _$vue.ComponentOptionsMixin, ("click" | "visible-change" | "command")[], "click" | "visible-change" | "command", _$vue.PublicProps, Readonly<_$vue.ExtractPropTypes<{
  readonly trigger: {
    readonly type: _$vue.PropType<Arrayable<"click" | "hover" | "contextmenu">>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    readonly __epPropKey: true;
    readonly default: "hover";
  };
  readonly triggerKeys: EpPropFinalized<(new (...args: any[]) => string[]) | (() => string[]) | (((new (...args: any[]) => string[]) | (() => string[])) | null)[], unknown, unknown, () => string[], boolean>;
  readonly virtualTriggering: BooleanConstructor;
  readonly virtualRef: {
    readonly type: _$vue.PropType<Measurable>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly effect: {
    readonly default: "light";
    readonly type: _$vue.PropType<EpPropMergeType<(new (...args: any[]) => string) | (() => PopperEffect) | (((new (...args: any[]) => string) | (() => PopperEffect)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    readonly __epPropKey: true;
  };
  readonly type: {
    readonly type: _$vue.PropType<EpPropMergeType<(new (...args: any[]) => "" | "default" | "text" | "info" | "primary" | "success" | "warning" | "danger") | (() => "" | "default" | "text" | "info" | "primary" | "success" | "warning" | "danger") | (((new (...args: any[]) => "" | "default" | "text" | "info" | "primary" | "success" | "warning" | "danger") | (() => "" | "default" | "text" | "info" | "primary" | "success" | "warning" | "danger")) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly placement: EpPropFinalized<(new (...args: any[]) => "left" | "right" | "auto" | "top" | "bottom" | "auto-start" | "auto-end" | "top-start" | "top-end" | "bottom-start" | "bottom-end" | "right-start" | "right-end" | "left-start" | "left-end") | (() => Placement) | (((new (...args: any[]) => "left" | "right" | "auto" | "top" | "bottom" | "auto-start" | "auto-end" | "top-start" | "top-end" | "bottom-start" | "bottom-end" | "right-start" | "right-end" | "left-start" | "left-end") | (() => Placement)) | null)[], unknown, unknown, "bottom", boolean>;
  readonly popperOptions: EpPropFinalized<(new (...args: any[]) => Partial<Options>) | (() => Partial<Options>) | (((new (...args: any[]) => Partial<Options>) | (() => Partial<Options>)) | null)[], unknown, unknown, () => {}, boolean>;
  readonly id: StringConstructor;
  readonly size: EpPropFinalized<StringConstructor, unknown, unknown, "", boolean>;
  readonly splitButton: BooleanConstructor;
  readonly hideOnClick: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  readonly loop: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  readonly showArrow: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  readonly showTimeout: EpPropFinalized<NumberConstructor, unknown, unknown, 150, boolean>;
  readonly hideTimeout: EpPropFinalized<NumberConstructor, unknown, unknown, 150, boolean>;
  readonly tabindex: EpPropFinalized<(new (...args: any[]) => string | number) | (() => string | number) | (((new (...args: any[]) => string | number) | (() => string | number)) | null)[], unknown, unknown, 0, boolean>;
  readonly maxHeight: EpPropFinalized<(new (...args: any[]) => string | number) | (() => string | number) | (((new (...args: any[]) => string | number) | (() => string | number)) | null)[], unknown, unknown, "", boolean>;
  readonly popperClass: {
    readonly type: _$vue.PropType<EpPropMergeType<(new (...args: any[]) => string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | /*elided*/any)[])[])[])[])[])[])[])[])[])[])[]) | (() => string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | /*elided*/any)[])[])[])[])[])[])[])[])[])[])[]) | (((new (...args: any[]) => string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | /*elided*/any)[])[])[])[])[])[])[])[])[])[])[]) | (() => string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | /*elided*/any)[])[])[])[])[])[])[])[])[])[])[])) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly popperStyle: EpPropFinalized<(new (...args: any[]) => string | false | CSSProperties | _$vue.StyleValue[]) | (() => _$vue.StyleValue) | (((new (...args: any[]) => string | false | CSSProperties | _$vue.StyleValue[]) | (() => _$vue.StyleValue)) | null)[], unknown, unknown, undefined, boolean>;
  readonly disabled: BooleanConstructor;
  readonly role: EpPropFinalized<StringConstructor, "listbox" | "grid" | "menu" | "tooltip" | "dialog" | "group" | "navigation" | "tree", unknown, "menu", boolean>;
  readonly buttonProps: {
    readonly type: _$vue.PropType<Partial<ButtonProps>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly teleported: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  readonly appendTo: {
    readonly type: _$vue.PropType<EpPropMergeType<(new (...args: any[]) => string | HTMLElement) | (() => string | HTMLElement) | (((new (...args: any[]) => string | HTMLElement) | (() => string | HTMLElement)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly persistent: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
}>> & Readonly<{
  onClick?: ((...args: any[]) => any) | undefined;
  "onVisible-change"?: ((...args: any[]) => any) | undefined;
  onCommand?: ((...args: any[]) => any) | undefined;
}>, {
  readonly role: EpPropMergeType<StringConstructor, "listbox" | "grid" | "menu" | "tooltip" | "dialog" | "group" | "navigation" | "tree", unknown>;
  readonly maxHeight: EpPropMergeType<(new (...args: any[]) => string | number) | (() => string | number) | (((new (...args: any[]) => string | number) | (() => string | number)) | null)[], unknown, unknown>;
  readonly size: string;
  readonly disabled: boolean;
  readonly placement: EpPropMergeType<(new (...args: any[]) => "left" | "right" | "auto" | "top" | "bottom" | "auto-start" | "auto-end" | "top-start" | "top-end" | "bottom-start" | "bottom-end" | "right-start" | "right-end" | "left-start" | "left-end") | (() => Placement) | (((new (...args: any[]) => "left" | "right" | "auto" | "top" | "bottom" | "auto-start" | "auto-end" | "top-start" | "top-end" | "bottom-start" | "bottom-end" | "right-start" | "right-end" | "left-start" | "left-end") | (() => Placement)) | null)[], unknown, unknown>;
  readonly popperOptions: Partial<Options>;
  readonly effect: EpPropMergeType<(new (...args: any[]) => string) | (() => PopperEffect) | (((new (...args: any[]) => string) | (() => PopperEffect)) | null)[], unknown, unknown>;
  readonly popperStyle: _$vue.StyleValue;
  readonly loop: EpPropMergeType<BooleanConstructor, unknown, unknown>;
  readonly virtualTriggering: boolean;
  readonly teleported: EpPropMergeType<BooleanConstructor, unknown, unknown>;
  readonly persistent: EpPropMergeType<BooleanConstructor, unknown, unknown>;
  readonly tabindex: EpPropMergeType<(new (...args: any[]) => string | number) | (() => string | number) | (((new (...args: any[]) => string | number) | (() => string | number)) | null)[], unknown, unknown>;
  readonly showArrow: EpPropMergeType<BooleanConstructor, unknown, unknown>;
  readonly trigger: Arrayable<"click" | "hover" | "contextmenu">;
  readonly triggerKeys: string[];
  readonly hideOnClick: EpPropMergeType<BooleanConstructor, unknown, unknown>;
  readonly showTimeout: number;
  readonly hideTimeout: number;
  readonly splitButton: boolean;
}, {}, {
  ElButton: {
    new (...args: any[]): _$vue.CreateComponentPublicInstanceWithMixins<Readonly<ButtonProps> & Readonly<{
      onClick?: ((evt: MouseEvent) => any) | undefined;
    }>, {
      ref: _$vue.Ref<HTMLButtonElement | undefined, HTMLButtonElement | undefined>;
      size: _$vue.ComputedRef<"" | "default" | "large" | "small">;
      type: _$vue.ComputedRef<"default" | "" | "text" | "info" | "primary" | "success" | "warning" | "danger">;
      disabled: _$vue.ComputedRef<boolean>;
      shouldAddSpace: _$vue.ComputedRef<boolean>;
    }, {}, {}, {}, _$vue.ComponentOptionsMixin, _$vue.ComponentOptionsMixin, {
      click: (evt: MouseEvent) => void;
    }, _$vue.PublicProps, {
      type: ButtonType;
      text: boolean;
      round: boolean;
      dashed: boolean;
      disabled: boolean;
      nativeType: ButtonNativeType;
      loadingIcon: IconPropType;
      plain: boolean;
      autoInsertSpace: boolean;
      tag: string | _$vue.Component;
    }, false, {}, {}, _$vue.GlobalComponents, _$vue.GlobalDirectives, string, {}, any, _$vue.ComponentProvideOptions, {
      P: {};
      B: {};
      D: {};
      C: {};
      M: {};
      Defaults: {};
    }, Readonly<ButtonProps> & Readonly<{
      onClick?: ((evt: MouseEvent) => any) | undefined;
    }>, {
      ref: _$vue.Ref<HTMLButtonElement | undefined, HTMLButtonElement | undefined>;
      size: _$vue.ComputedRef<"" | "default" | "large" | "small">;
      type: _$vue.ComputedRef<"default" | "" | "text" | "info" | "primary" | "success" | "warning" | "danger">;
      disabled: _$vue.ComputedRef<boolean>;
      shouldAddSpace: _$vue.ComputedRef<boolean>;
    }, {}, {}, {}, {
      type: ButtonType;
      text: boolean;
      round: boolean;
      dashed: boolean;
      disabled: boolean;
      nativeType: ButtonNativeType;
      loadingIcon: IconPropType;
      plain: boolean;
      autoInsertSpace: boolean;
      tag: string | _$vue.Component;
    }>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
  } & _$vue.ComponentOptionsBase<Readonly<ButtonProps> & Readonly<{
    onClick?: ((evt: MouseEvent) => any) | undefined;
  }>, {
    ref: _$vue.Ref<HTMLButtonElement | undefined, HTMLButtonElement | undefined>;
    size: _$vue.ComputedRef<"" | "default" | "large" | "small">;
    type: _$vue.ComputedRef<"default" | "" | "text" | "info" | "primary" | "success" | "warning" | "danger">;
    disabled: _$vue.ComputedRef<boolean>;
    shouldAddSpace: _$vue.ComputedRef<boolean>;
  }, {}, {}, {}, _$vue.ComponentOptionsMixin, _$vue.ComponentOptionsMixin, {
    click: (evt: MouseEvent) => void;
  }, string, {
    type: ButtonType;
    text: boolean;
    round: boolean;
    dashed: boolean;
    disabled: boolean;
    nativeType: ButtonNativeType;
    loadingIcon: IconPropType;
    plain: boolean;
    autoInsertSpace: boolean;
    tag: string | _$vue.Component;
  }, {}, string, {}, _$vue.GlobalComponents, _$vue.GlobalDirectives, string, _$vue.ComponentProvideOptions> & _$vue.VNodeProps & _$vue.AllowedComponentProps & _$vue.ComponentCustomProps & (new () => {
    $slots: {
      loading?: (props: {}) => any;
    } & {
      icon?: (props: {}) => any;
    } & {
      default?: (props: {}) => any;
    };
  }) & _$vue.ObjectPlugin & {
    setPropsDefaults: (defaults: {
      readonly size?: "" | "default" | "large" | "small" | (() => "" | "default" | "large" | "small") | undefined;
      readonly disabled?: boolean | (() => boolean) | undefined;
      readonly type?: "" | "default" | "text" | "info" | "primary" | "success" | "warning" | "danger" | (() => "" | "default" | "text" | "info" | "primary" | "success" | "warning" | "danger") | undefined;
      readonly icon?: string | _$vue.FunctionalComponent<any, {}, any, {}> | {
        new (...args: any[]): any;
        __isFragment?: never;
        __isTeleport?: never;
        __isSuspense?: never;
      } | (() => (IconPropType | undefined) & {}) | undefined;
      readonly nativeType?: "button" | "reset" | "submit" | (() => "button" | "reset" | "submit") | undefined;
      readonly loading?: boolean | (() => boolean) | undefined;
      readonly loadingIcon?: string | _$vue.FunctionalComponent<any, {}, any, {}> | {
        new (...args: any[]): any;
        __isFragment?: never;
        __isTeleport?: never;
        __isSuspense?: never;
      } | (() => (IconPropType | undefined) & {}) | undefined;
      readonly plain?: boolean | (() => boolean) | undefined;
      readonly text?: boolean | (() => boolean) | undefined;
      readonly link?: boolean | (() => boolean) | undefined;
      readonly bg?: boolean | (() => boolean) | undefined;
      readonly autofocus?: boolean | (() => boolean) | undefined;
      readonly round?: boolean | (() => boolean) | undefined;
      readonly circle?: boolean | (() => boolean) | undefined;
      readonly dashed?: boolean | (() => boolean) | undefined;
      readonly color?: string | (() => string) | undefined;
      readonly dark?: boolean | (() => boolean) | undefined;
      readonly autoInsertSpace?: boolean | (() => boolean) | undefined;
      readonly tag?: string | _$vue.FunctionalComponent<any, {}, any, {}> | {
        new (...args: any[]): any;
        __isFragment?: never;
        __isTeleport?: never;
        __isSuspense?: never;
      } | (() => (string | _$vue.Component | undefined) & {}) | undefined;
    }) => void;
  } & {
    ButtonGroup: typeof _default$1;
  };
  ElButtonGroup: {
    new (...args: any[]): _$vue.CreateComponentPublicInstanceWithMixins<Readonly<ButtonGroupProps> & Readonly<{}>, {}, {}, {}, {}, _$vue.ComponentOptionsMixin, _$vue.ComponentOptionsMixin, {}, _$vue.PublicProps, {
      type: "" | "default" | "text" | "info" | "primary" | "success" | "warning" | "danger";
      direction: "horizontal" | "vertical";
    }, false, {}, {}, _$vue.GlobalComponents, _$vue.GlobalDirectives, string, {}, any, _$vue.ComponentProvideOptions, {
      P: {};
      B: {};
      D: {};
      C: {};
      M: {};
      Defaults: {};
    }, Readonly<ButtonGroupProps> & Readonly<{}>, {}, {}, {}, {}, {
      type: "" | "default" | "text" | "info" | "primary" | "success" | "warning" | "danger";
      direction: "horizontal" | "vertical";
    }>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
  } & _$vue.ComponentOptionsBase<Readonly<ButtonGroupProps> & Readonly<{}>, {}, {}, {}, {}, _$vue.ComponentOptionsMixin, _$vue.ComponentOptionsMixin, {}, string, {
    type: "" | "default" | "text" | "info" | "primary" | "success" | "warning" | "danger";
    direction: "horizontal" | "vertical";
  }, {}, string, {}, _$vue.GlobalComponents, _$vue.GlobalDirectives, string, _$vue.ComponentProvideOptions> & _$vue.VNodeProps & _$vue.AllowedComponentProps & _$vue.ComponentCustomProps & (new () => {
    $slots: {
      default?: (props: {}) => any;
    };
  });
  ElScrollbar: SFCWithInstall<{
    new (...args: any[]): _$vue.CreateComponentPublicInstanceWithMixins<Readonly<ScrollbarProps> & Readonly<{
      onScroll?: ((args_0: {
        scrollTop: number;
        scrollLeft: number;
      }) => any) | undefined;
      "onEnd-reached"?: ((direction: ScrollbarDirection) => any) | undefined;
    }>, {
      wrapRef: _$vue.Ref<HTMLDivElement | undefined, HTMLDivElement | undefined>;
      update: () => void;
      scrollTo: {
        (xCord: number, yCord?: number): void;
        (options: ScrollToOptions): void;
      };
      setScrollTop: (value: number) => void;
      setScrollLeft: (value: number) => void;
      handleScroll: () => void;
    }, {}, {}, {}, _$vue.ComponentOptionsMixin, _$vue.ComponentOptionsMixin, {
      scroll: (args_0: {
        scrollTop: number;
        scrollLeft: number;
      }) => void;
      "end-reached": (direction: ScrollbarDirection) => void;
    }, _$vue.PublicProps, {
      height: number | string;
      maxHeight: number | string;
      tabindex: number | string;
      tag: keyof HTMLElementTagNameMap | (string & {});
      distance: number;
      wrapStyle: string | false | CSSProperties | _$vue.StyleValue[] | null;
      wrapClass: string | string[];
      viewClass: string | string[];
      viewStyle: string | false | CSSProperties | _$vue.StyleValue[] | null;
      minSize: number;
    }, false, {}, {}, _$vue.GlobalComponents, _$vue.GlobalDirectives, string, {}, any, _$vue.ComponentProvideOptions, {
      P: {};
      B: {};
      D: {};
      C: {};
      M: {};
      Defaults: {};
    }, Readonly<ScrollbarProps> & Readonly<{
      onScroll?: ((args_0: {
        scrollTop: number;
        scrollLeft: number;
      }) => any) | undefined;
      "onEnd-reached"?: ((direction: ScrollbarDirection) => any) | undefined;
    }>, {
      wrapRef: _$vue.Ref<HTMLDivElement | undefined, HTMLDivElement | undefined>;
      update: () => void;
      scrollTo: {
        (xCord: number, yCord?: number): void;
        (options: ScrollToOptions): void;
      };
      setScrollTop: (value: number) => void;
      setScrollLeft: (value: number) => void;
      handleScroll: () => void;
    }, {}, {}, {}, {
      height: number | string;
      maxHeight: number | string;
      tabindex: number | string;
      tag: keyof HTMLElementTagNameMap | (string & {});
      distance: number;
      wrapStyle: string | false | CSSProperties | _$vue.StyleValue[] | null;
      wrapClass: string | string[];
      viewClass: string | string[];
      viewStyle: string | false | CSSProperties | _$vue.StyleValue[] | null;
      minSize: number;
    }>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
  } & _$vue.ComponentOptionsBase<Readonly<ScrollbarProps> & Readonly<{
    onScroll?: ((args_0: {
      scrollTop: number;
      scrollLeft: number;
    }) => any) | undefined;
    "onEnd-reached"?: ((direction: ScrollbarDirection) => any) | undefined;
  }>, {
    wrapRef: _$vue.Ref<HTMLDivElement | undefined, HTMLDivElement | undefined>;
    update: () => void;
    scrollTo: {
      (xCord: number, yCord?: number): void;
      (options: ScrollToOptions): void;
    };
    setScrollTop: (value: number) => void;
    setScrollLeft: (value: number) => void;
    handleScroll: () => void;
  }, {}, {}, {}, _$vue.ComponentOptionsMixin, _$vue.ComponentOptionsMixin, {
    scroll: (args_0: {
      scrollTop: number;
      scrollLeft: number;
    }) => void;
    "end-reached": (direction: ScrollbarDirection) => void;
  }, string, {
    height: number | string;
    maxHeight: number | string;
    tabindex: number | string;
    tag: keyof HTMLElementTagNameMap | (string & {});
    distance: number;
    wrapStyle: string | false | CSSProperties | _$vue.StyleValue[] | null;
    wrapClass: string | string[];
    viewClass: string | string[];
    viewStyle: string | false | CSSProperties | _$vue.StyleValue[] | null;
    minSize: number;
  }, {}, string, {}, _$vue.GlobalComponents, _$vue.GlobalDirectives, string, _$vue.ComponentProvideOptions> & _$vue.VNodeProps & _$vue.AllowedComponentProps & _$vue.ComponentCustomProps & (new () => {
    $slots: {
      default?: (props: {}) => any;
    };
  })>;
  ElTooltip: SFCWithInstall<{
    new (...args: any[]): _$vue.CreateComponentPublicInstanceWithMixins<Readonly<UseTooltipProps> & Readonly<{
      onHide?: ((...args: any[]) => any) | undefined;
      onShow?: ((...args: any[]) => any) | undefined;
      onOpen?: ((...args: any[]) => any) | undefined;
      "onUpdate:visible"?: ((...args: any[]) => any) | undefined;
      "onBefore-show"?: ((...args: any[]) => any) | undefined;
      "onBefore-hide"?: ((...args: any[]) => any) | undefined;
      onClose?: ((...args: any[]) => any) | undefined;
    }>, {
      popperRef: _$vue.Ref<PopperInstance | undefined, PopperInstance | undefined>;
      contentRef: _$vue.Ref<TooltipContentInstance | undefined, TooltipContentInstance | undefined>;
      isFocusInsideContent: (event?: FocusEvent) => boolean | undefined;
      updatePopper: () => void;
      onOpen: (event?: Event, delay?: number) => void;
      onClose: (event?: Event, delay?: number) => void;
      hide: (event?: Event) => void;
    }, {}, {}, {}, _$vue.ComponentOptionsMixin, _$vue.ComponentOptionsMixin, {
      hide: (...args: any[]) => void;
      show: (...args: any[]) => void;
      open: (...args: any[]) => void;
      "update:visible": (...args: any[]) => void;
      "before-show": (...args: any[]) => void;
      "before-hide": (...args: any[]) => void;
      close: (...args: any[]) => void;
    }, _$vue.PublicProps, {
      style: string | false | CSSProperties | _$vue.StyleValue[] | null;
      role: typeof roleTypes[number];
      visible: boolean | null;
      content: string;
      offset: number;
      showAfter: number;
      hideAfter: number;
      autoClose: number;
      boundariesPadding: number;
      gpuAcceleration: boolean;
      placement: Placement;
      popperOptions: Partial<Options>;
      strategy: "fixed" | "absolute";
      arrowOffset: number;
      effect: PopperEffect;
      enterable: boolean;
      popperStyle: string | false | CSSProperties | _$vue.StyleValue[] | null;
      stopPopperMouseEvent: boolean;
      loop: boolean;
      pure: boolean;
      focusOnShow: boolean;
      trapping: boolean;
      virtualTriggering: boolean;
      teleported: boolean;
      showArrow: boolean;
      trigger: Arrayable<TooltipTriggerType>;
      triggerKeys: string[];
    }, false, {}, {}, _$vue.GlobalComponents, _$vue.GlobalDirectives, string, {}, any, _$vue.ComponentProvideOptions, {
      P: {};
      B: {};
      D: {};
      C: {};
      M: {};
      Defaults: {};
    }, Readonly<UseTooltipProps> & Readonly<{
      onHide?: ((...args: any[]) => any) | undefined;
      onShow?: ((...args: any[]) => any) | undefined;
      onOpen?: ((...args: any[]) => any) | undefined;
      "onUpdate:visible"?: ((...args: any[]) => any) | undefined;
      "onBefore-show"?: ((...args: any[]) => any) | undefined;
      "onBefore-hide"?: ((...args: any[]) => any) | undefined;
      onClose?: ((...args: any[]) => any) | undefined;
    }>, {
      popperRef: _$vue.Ref<PopperInstance | undefined, PopperInstance | undefined>;
      contentRef: _$vue.Ref<TooltipContentInstance | undefined, TooltipContentInstance | undefined>;
      isFocusInsideContent: (event?: FocusEvent) => boolean | undefined;
      updatePopper: () => void;
      onOpen: (event?: Event, delay?: number) => void;
      onClose: (event?: Event, delay?: number) => void;
      hide: (event?: Event) => void;
    }, {}, {}, {}, {
      style: string | false | CSSProperties | _$vue.StyleValue[] | null;
      role: typeof roleTypes[number];
      visible: boolean | null;
      content: string;
      offset: number;
      showAfter: number;
      hideAfter: number;
      autoClose: number;
      boundariesPadding: number;
      gpuAcceleration: boolean;
      placement: Placement;
      popperOptions: Partial<Options>;
      strategy: "fixed" | "absolute";
      arrowOffset: number;
      effect: PopperEffect;
      enterable: boolean;
      popperStyle: string | false | CSSProperties | _$vue.StyleValue[] | null;
      stopPopperMouseEvent: boolean;
      loop: boolean;
      pure: boolean;
      focusOnShow: boolean;
      trapping: boolean;
      virtualTriggering: boolean;
      teleported: boolean;
      showArrow: boolean;
      trigger: Arrayable<TooltipTriggerType>;
      triggerKeys: string[];
    }>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
  } & _$vue.ComponentOptionsBase<Readonly<UseTooltipProps> & Readonly<{
    onHide?: ((...args: any[]) => any) | undefined;
    onShow?: ((...args: any[]) => any) | undefined;
    onOpen?: ((...args: any[]) => any) | undefined;
    "onUpdate:visible"?: ((...args: any[]) => any) | undefined;
    "onBefore-show"?: ((...args: any[]) => any) | undefined;
    "onBefore-hide"?: ((...args: any[]) => any) | undefined;
    onClose?: ((...args: any[]) => any) | undefined;
  }>, {
    popperRef: _$vue.Ref<PopperInstance | undefined, PopperInstance | undefined>;
    contentRef: _$vue.Ref<TooltipContentInstance | undefined, TooltipContentInstance | undefined>;
    isFocusInsideContent: (event?: FocusEvent) => boolean | undefined;
    updatePopper: () => void;
    onOpen: (event?: Event, delay?: number) => void;
    onClose: (event?: Event, delay?: number) => void;
    hide: (event?: Event) => void;
  }, {}, {}, {}, _$vue.ComponentOptionsMixin, _$vue.ComponentOptionsMixin, {
    hide: (...args: any[]) => void;
    show: (...args: any[]) => void;
    open: (...args: any[]) => void;
    "update:visible": (...args: any[]) => void;
    "before-show": (...args: any[]) => void;
    "before-hide": (...args: any[]) => void;
    close: (...args: any[]) => void;
  }, string, {
    style: string | false | CSSProperties | _$vue.StyleValue[] | null;
    role: typeof roleTypes[number];
    visible: boolean | null;
    content: string;
    offset: number;
    showAfter: number;
    hideAfter: number;
    autoClose: number;
    boundariesPadding: number;
    gpuAcceleration: boolean;
    placement: Placement;
    popperOptions: Partial<Options>;
    strategy: "fixed" | "absolute";
    arrowOffset: number;
    effect: PopperEffect;
    enterable: boolean;
    popperStyle: string | false | CSSProperties | _$vue.StyleValue[] | null;
    stopPopperMouseEvent: boolean;
    loop: boolean;
    pure: boolean;
    focusOnShow: boolean;
    trapping: boolean;
    virtualTriggering: boolean;
    teleported: boolean;
    showArrow: boolean;
    trigger: Arrayable<TooltipTriggerType>;
    triggerKeys: string[];
  }, {}, string, {}, _$vue.GlobalComponents, _$vue.GlobalDirectives, string, _$vue.ComponentProvideOptions> & _$vue.VNodeProps & _$vue.AllowedComponentProps & _$vue.ComponentCustomProps & (new () => {
    $slots: {
      default?: (props: {}) => any;
    } & {
      content?: (props: {}) => any;
    };
  })>;
  ElRovingFocusGroup: _$vue.DefineComponent<{}, {}, {}, {}, {}, _$vue.ComponentOptionsMixin, _$vue.ComponentOptionsMixin, {}, string, _$vue.PublicProps, Readonly<{}> & Readonly<{}>, {}, {}, {
    ElFocusGroupCollection: {
      new (...args: any[]): _$vue.CreateComponentPublicInstanceWithMixins<Readonly<{}> & Readonly<{}>, {}, {}, {}, {}, _$vue.ComponentOptionsMixin, _$vue.ComponentOptionsMixin, {}, _$vue.PublicProps, {}, true, {}, {}, _$vue.GlobalComponents, _$vue.GlobalDirectives, string, {}, any, _$vue.ComponentProvideOptions, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
      }, Readonly<{}> & Readonly<{}>, {}, {}, {}, {}, {}>;
      __isFragment?: never;
      __isTeleport?: never;
      __isSuspense?: never;
    } & _$vue.ComponentOptionsBase<Readonly<{}> & Readonly<{}>, {}, {}, {}, {}, _$vue.ComponentOptionsMixin, _$vue.ComponentOptionsMixin, {}, string, {}, {}, string, {}, _$vue.GlobalComponents, _$vue.GlobalDirectives, string, _$vue.ComponentProvideOptions> & _$vue.VNodeProps & _$vue.AllowedComponentProps & _$vue.ComponentCustomProps & {
      name: string;
      setup(): void;
    };
    ElRovingFocusGroupImpl: _$vue.DefineComponent<_$vue.ExtractPropTypes<{
      style: EpPropFinalized<(new (...args: any[]) => string | false | CSSProperties | _$vue.StyleValue[]) | (() => _$vue.StyleValue) | (((new (...args: any[]) => string | false | CSSProperties | _$vue.StyleValue[]) | (() => _$vue.StyleValue)) | null)[], unknown, unknown, undefined, boolean>;
      currentTabId: {
        readonly type: _$vue.PropType<EpPropMergeType<(new (...args: any[]) => string) | (() => string | null) | (((new (...args: any[]) => string) | (() => string | null)) | null)[], unknown, unknown>>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
      };
      defaultCurrentTabId: StringConstructor;
      loop: BooleanConstructor;
      dir: EpPropFinalized<StringConstructor, string, unknown, string, boolean>;
      orientation: {
        readonly type: _$vue.PropType<EpPropMergeType<(new (...args: any[]) => "horizontal" | "vertical") | (() => "horizontal" | "vertical" | undefined) | (((new (...args: any[]) => "horizontal" | "vertical") | (() => "horizontal" | "vertical" | undefined)) | null)[], unknown, unknown>>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
      };
      onBlur: FunctionConstructor;
      onFocus: FunctionConstructor;
      onMousedown: FunctionConstructor;
    }>, void, {}, {}, {}, _$vue.ComponentOptionsMixin, _$vue.ComponentOptionsMixin, ("currentTabIdChange" | "entryFocus")[], "currentTabIdChange" | "entryFocus", _$vue.PublicProps, Readonly<_$vue.ExtractPropTypes<{
      style: EpPropFinalized<(new (...args: any[]) => string | false | CSSProperties | _$vue.StyleValue[]) | (() => _$vue.StyleValue) | (((new (...args: any[]) => string | false | CSSProperties | _$vue.StyleValue[]) | (() => _$vue.StyleValue)) | null)[], unknown, unknown, undefined, boolean>;
      currentTabId: {
        readonly type: _$vue.PropType<EpPropMergeType<(new (...args: any[]) => string) | (() => string | null) | (((new (...args: any[]) => string) | (() => string | null)) | null)[], unknown, unknown>>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
      };
      defaultCurrentTabId: StringConstructor;
      loop: BooleanConstructor;
      dir: EpPropFinalized<StringConstructor, string, unknown, string, boolean>;
      orientation: {
        readonly type: _$vue.PropType<EpPropMergeType<(new (...args: any[]) => "horizontal" | "vertical") | (() => "horizontal" | "vertical" | undefined) | (((new (...args: any[]) => "horizontal" | "vertical") | (() => "horizontal" | "vertical" | undefined)) | null)[], unknown, unknown>>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
      };
      onBlur: FunctionConstructor;
      onFocus: FunctionConstructor;
      onMousedown: FunctionConstructor;
    }>> & Readonly<{
      onCurrentTabIdChange?: ((...args: any[]) => any) | undefined;
      onEntryFocus?: ((...args: any[]) => any) | undefined;
    }>, {
      style: _$vue.StyleValue;
      loop: boolean;
      dir: string;
    }, {}, {}, {}, string, _$vue.ComponentProvideOptions, true, {}, any>;
  }, {}, string, _$vue.ComponentProvideOptions, true, {}, any>;
  ElOnlyChild: _$vue.DefineComponent<{}, () => _$vue.VNode<_$vue.RendererNode, _$vue.RendererElement, {
    [key: string]: any;
  }> | null, {}, {}, {}, _$vue.ComponentOptionsMixin, _$vue.ComponentOptionsMixin, {}, string, _$vue.PublicProps, Readonly<{}> & Readonly<{}>, {}, {}, {}, {}, string, _$vue.ComponentProvideOptions, true, {}, any>;
  ElIcon: SFCWithInstall<{
    new (...args: any[]): _$vue.CreateComponentPublicInstanceWithMixins<Readonly<IconProps> & Readonly<{}>, {}, {}, {}, {}, _$vue.ComponentOptionsMixin, _$vue.ComponentOptionsMixin, {}, _$vue.PublicProps, {}, false, {}, {}, _$vue.GlobalComponents, _$vue.GlobalDirectives, string, {}, any, _$vue.ComponentProvideOptions, {
      P: {};
      B: {};
      D: {};
      C: {};
      M: {};
      Defaults: {};
    }, Readonly<IconProps> & Readonly<{}>, {}, {}, {}, {}, {}>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
  } & _$vue.ComponentOptionsBase<Readonly<IconProps> & Readonly<{}>, {}, {}, {}, {}, _$vue.ComponentOptionsMixin, _$vue.ComponentOptionsMixin, {}, string, {}, {}, string, {}, _$vue.GlobalComponents, _$vue.GlobalDirectives, string, _$vue.ComponentProvideOptions> & _$vue.VNodeProps & _$vue.AllowedComponentProps & _$vue.ComponentCustomProps & (new () => {
    $slots: {
      default?: (props: {}) => any;
    };
  })>;
  ArrowDown: _$vue.DefineComponent<{}, void, {}, {}, {}, _$vue.ComponentOptionsMixin, _$vue.ComponentOptionsMixin, {}, string, _$vue.PublicProps, Readonly<{}>, {}, {}, {}, {}, string, _$vue.ComponentProvideOptions, true, {}, any>;
}, {}, string, _$vue.ComponentProvideOptions, true, {}, any>;
//#endregion
export { _default as default };