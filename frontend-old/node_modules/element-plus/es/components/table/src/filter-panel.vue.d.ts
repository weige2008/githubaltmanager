import { SFCWithInstall } from "../../../utils/vue/typescript.js";
import { EpPropMergeType } from "../../../utils/vue/props/types.js";
import { Arrayable } from "../../../utils/typescript.js";
import { Translator } from "../../../hooks/use-locale/index.js";
import { PopperEffect, PopperInstance, roleTypes } from "../../popper/src/popper.js";
import { Options, Placement } from "../../popper/index.js";
import { TooltipContentInstance } from "../../tooltip/src/content.js";
import { TooltipTriggerType } from "../../tooltip/src/trigger.js";
import { TooltipInstance, UseTooltipProps } from "../../tooltip/src/tooltip.js";
import { CheckboxProps, CheckboxValueType } from "../../checkbox/src/checkbox.js";
import _default$1 from "../../checkbox/src/checkbox-button.vue.js";
import { CheckboxGroupProps, CheckboxGroupValueType } from "../../checkbox/src/checkbox-group.js";
import _default$2 from "../../checkbox/src/checkbox-group.vue.js";
import { Filters, TableColumnCtx } from "./table-column/defaults.js";
import { Store } from "./store/index.js";
import { DefaultRow } from "./table/defaults.js";
import { IconProps } from "../../icon/src/icon.js";
import { ScrollbarDirection, ScrollbarProps } from "../../scrollbar/src/scrollbar.js";
import * as _$vue from "vue";
import { PropType, WritableComputedRef } from "vue";

//#region ../../packages/components/table/src/filter-panel.vue.d.ts
declare const _default: typeof __VLS_export;
declare const __VLS_export: _$vue.DefineComponent<_$vue.ExtractPropTypes<{
  placement: {
    type: PropType<Placement>;
    default: string;
  };
  store: {
    type: PropType<Store<DefaultRow>>;
  };
  column: {
    type: PropType<TableColumnCtx<DefaultRow>>;
  };
  upDataColumn: {
    type: FunctionConstructor;
  };
  appendTo: {
    readonly type: PropType<EpPropMergeType<(new (...args: any[]) => string | HTMLElement) | (() => string | HTMLElement) | (((new (...args: any[]) => string | HTMLElement) | (() => string | HTMLElement)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
}>, {
  multiple: _$vue.ComputedRef<boolean>;
  filterClassName: _$vue.ComputedRef<string>;
  filteredValue: WritableComputedRef<string[], string[]>;
  filterValue: WritableComputedRef<string, string | null | undefined>;
  filters: _$vue.ComputedRef<Filters | undefined>;
  handleConfirm: () => void;
  handleReset: () => void;
  handleSelect: (_filterValue: string | null, index: number) => void;
  isPropAbsent: (prop: unknown) => prop is null | undefined;
  isActive: (filter: {
    value: string;
    text: string;
  }) => boolean;
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
  tooltipRef: _$vue.Ref<TooltipInstance | null, TooltipInstance | null>;
  rootRef: _$vue.Ref<HTMLElement | null, HTMLElement | null>;
  checkedIndex: _$vue.Ref<number, number>;
  handleShowTooltip: () => void;
  handleHideTooltip: () => void;
  handleKeydown: (event: KeyboardEvent) => void;
}, {}, {}, {}, _$vue.ComponentOptionsMixin, _$vue.ComponentOptionsMixin, {}, string, _$vue.PublicProps, Readonly<_$vue.ExtractPropTypes<{
  placement: {
    type: PropType<Placement>;
    default: string;
  };
  store: {
    type: PropType<Store<DefaultRow>>;
  };
  column: {
    type: PropType<TableColumnCtx<DefaultRow>>;
  };
  upDataColumn: {
    type: FunctionConstructor;
  };
  appendTo: {
    readonly type: PropType<EpPropMergeType<(new (...args: any[]) => string | HTMLElement) | (() => string | HTMLElement) | (((new (...args: any[]) => string | HTMLElement) | (() => string | HTMLElement)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
}>> & Readonly<{}>, {
  placement: Placement;
}, {}, {
  ElCheckbox: {
    new (...args: any[]): _$vue.CreateComponentPublicInstanceWithMixins<Readonly<CheckboxProps> & Readonly<{
      "onUpdate:modelValue"?: ((val: CheckboxValueType) => any) | undefined;
      onChange?: ((val: CheckboxValueType) => any) | undefined;
    }>, {}, {}, {}, {}, _$vue.ComponentOptionsMixin, _$vue.ComponentOptionsMixin, {
      "update:modelValue": (val: CheckboxValueType) => void;
      change: (val: CheckboxValueType) => void;
    }, _$vue.PublicProps, {
      name: string;
      id: string;
      disabled: boolean;
      modelValue: number | string | boolean;
      validateEvent: boolean;
      value: string | boolean | number | object;
      label: string | boolean | number | object;
      trueValue: string | number;
      falseValue: string | number;
      trueLabel: string | number;
      falseLabel: string | number;
    }, false, {}, {}, _$vue.GlobalComponents, _$vue.GlobalDirectives, string, {}, any, _$vue.ComponentProvideOptions, {
      P: {};
      B: {};
      D: {};
      C: {};
      M: {};
      Defaults: {};
    }, Readonly<CheckboxProps> & Readonly<{
      "onUpdate:modelValue"?: ((val: CheckboxValueType) => any) | undefined;
      onChange?: ((val: CheckboxValueType) => any) | undefined;
    }>, {}, {}, {}, {}, {
      name: string;
      id: string;
      disabled: boolean;
      modelValue: number | string | boolean;
      validateEvent: boolean;
      value: string | boolean | number | object;
      label: string | boolean | number | object;
      trueValue: string | number;
      falseValue: string | number;
      trueLabel: string | number;
      falseLabel: string | number;
    }>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
  } & _$vue.ComponentOptionsBase<Readonly<CheckboxProps> & Readonly<{
    "onUpdate:modelValue"?: ((val: CheckboxValueType) => any) | undefined;
    onChange?: ((val: CheckboxValueType) => any) | undefined;
  }>, {}, {}, {}, {}, _$vue.ComponentOptionsMixin, _$vue.ComponentOptionsMixin, {
    "update:modelValue": (val: CheckboxValueType) => void;
    change: (val: CheckboxValueType) => void;
  }, string, {
    name: string;
    id: string;
    disabled: boolean;
    modelValue: number | string | boolean;
    validateEvent: boolean;
    value: string | boolean | number | object;
    label: string | boolean | number | object;
    trueValue: string | number;
    falseValue: string | number;
    trueLabel: string | number;
    falseLabel: string | number;
  }, {}, string, {}, _$vue.GlobalComponents, _$vue.GlobalDirectives, string, _$vue.ComponentProvideOptions> & _$vue.VNodeProps & _$vue.AllowedComponentProps & _$vue.ComponentCustomProps & (new () => {
    $slots: {
      default?: (props: {}) => any;
    };
  }) & _$vue.ObjectPlugin & {
    setPropsDefaults: (defaults: {
      readonly modelValue?: string | number | boolean | (() => string | number | boolean) | undefined;
      readonly label?: string | number | boolean | (() => string | number | boolean | object) | undefined;
      readonly value?: string | number | boolean | (() => string | number | boolean | object) | undefined;
      readonly indeterminate?: boolean | (() => boolean) | undefined;
      readonly disabled?: boolean | (() => boolean) | undefined;
      readonly checked?: boolean | (() => boolean) | undefined;
      readonly name?: string | (() => string) | undefined;
      readonly trueValue?: string | number | (() => string | number) | undefined;
      readonly falseValue?: string | number | (() => string | number) | undefined;
      readonly trueLabel?: string | number | (() => string | number) | undefined;
      readonly falseLabel?: string | number | (() => string | number) | undefined;
      readonly id?: string | (() => string) | undefined;
      readonly border?: boolean | (() => boolean) | undefined;
      readonly size?: "" | "default" | "large" | "small" | (() => "" | "default" | "large" | "small") | undefined;
      readonly tabindex?: string | number | (() => string | number) | undefined;
      readonly validateEvent?: boolean | (() => boolean) | undefined;
      readonly ariaLabel?: string | (() => string) | undefined;
      readonly ariaControls?: string | (() => string) | undefined;
    }) => void;
  } & {
    CheckboxButton: typeof _default$1;
    CheckboxGroup: typeof _default$2;
  };
  ElCheckboxGroup: SFCWithInstall<{
    new (...args: any[]): _$vue.CreateComponentPublicInstanceWithMixins<Readonly<CheckboxGroupProps> & Readonly<{
      "onUpdate:modelValue"?: ((val: CheckboxGroupValueType) => any) | undefined;
      onChange?: ((val: CheckboxValueType[]) => any) | undefined;
    }>, {}, {}, {}, {}, _$vue.ComponentOptionsMixin, _$vue.ComponentOptionsMixin, {
      "update:modelValue": (val: CheckboxGroupValueType) => void;
      change: (val: CheckboxValueType[]) => void;
    }, _$vue.PublicProps, {
      type: "checkbox" | "button";
      props: {
        value?: string;
        label?: string;
        disabled?: string;
      };
      disabled: boolean;
      modelValue: CheckboxGroupValueType;
      validateEvent: boolean;
      tag: string;
    }, false, {}, {}, _$vue.GlobalComponents, _$vue.GlobalDirectives, string, {}, any, _$vue.ComponentProvideOptions, {
      P: {};
      B: {};
      D: {};
      C: {};
      M: {};
      Defaults: {};
    }, Readonly<CheckboxGroupProps> & Readonly<{
      "onUpdate:modelValue"?: ((val: CheckboxGroupValueType) => any) | undefined;
      onChange?: ((val: CheckboxValueType[]) => any) | undefined;
    }>, {}, {}, {}, {}, {
      type: "checkbox" | "button";
      props: {
        value?: string;
        label?: string;
        disabled?: string;
      };
      disabled: boolean;
      modelValue: CheckboxGroupValueType;
      validateEvent: boolean;
      tag: string;
    }>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
  } & _$vue.ComponentOptionsBase<Readonly<CheckboxGroupProps> & Readonly<{
    "onUpdate:modelValue"?: ((val: CheckboxGroupValueType) => any) | undefined;
    onChange?: ((val: CheckboxValueType[]) => any) | undefined;
  }>, {}, {}, {}, {}, _$vue.ComponentOptionsMixin, _$vue.ComponentOptionsMixin, {
    "update:modelValue": (val: CheckboxGroupValueType) => void;
    change: (val: CheckboxValueType[]) => void;
  }, string, {
    type: "checkbox" | "button";
    props: {
      value?: string;
      label?: string;
      disabled?: string;
    };
    disabled: boolean;
    modelValue: CheckboxGroupValueType;
    validateEvent: boolean;
    tag: string;
  }, {}, string, {}, _$vue.GlobalComponents, _$vue.GlobalDirectives, string, _$vue.ComponentProvideOptions> & _$vue.VNodeProps & _$vue.AllowedComponentProps & _$vue.ComponentCustomProps & (new () => {
    $slots: {
      default?: (props: {}) => any;
    };
  })>;
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
      wrapStyle: string | false | _$vue.CSSProperties | _$vue.StyleValue[] | null;
      wrapClass: string | string[];
      viewClass: string | string[];
      viewStyle: string | false | _$vue.CSSProperties | _$vue.StyleValue[] | null;
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
      wrapStyle: string | false | _$vue.CSSProperties | _$vue.StyleValue[] | null;
      wrapClass: string | string[];
      viewClass: string | string[];
      viewStyle: string | false | _$vue.CSSProperties | _$vue.StyleValue[] | null;
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
    wrapStyle: string | false | _$vue.CSSProperties | _$vue.StyleValue[] | null;
    wrapClass: string | string[];
    viewClass: string | string[];
    viewStyle: string | false | _$vue.CSSProperties | _$vue.StyleValue[] | null;
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
      style: string | false | _$vue.CSSProperties | _$vue.StyleValue[] | null;
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
      popperStyle: string | false | _$vue.CSSProperties | _$vue.StyleValue[] | null;
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
      style: string | false | _$vue.CSSProperties | _$vue.StyleValue[] | null;
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
      popperStyle: string | false | _$vue.CSSProperties | _$vue.StyleValue[] | null;
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
    style: string | false | _$vue.CSSProperties | _$vue.StyleValue[] | null;
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
    popperStyle: string | false | _$vue.CSSProperties | _$vue.StyleValue[] | null;
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
  ArrowUp: _$vue.DefineComponent<{}, void, {}, {}, {}, _$vue.ComponentOptionsMixin, _$vue.ComponentOptionsMixin, {}, string, _$vue.PublicProps, Readonly<{}>, {}, {}, {}, {}, string, _$vue.ComponentProvideOptions, true, {}, any>;
}, {}, string, _$vue.ComponentProvideOptions, true, {}, any>;
//#endregion
export { _default as default };