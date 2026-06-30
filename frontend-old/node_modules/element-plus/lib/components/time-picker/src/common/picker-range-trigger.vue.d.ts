import { EpPropMergeType } from "../../../../utils/vue/props/types.js";
import { UserInput } from "./props.js";
import * as _$vue from "vue";

//#region ../../packages/components/time-picker/src/common/picker-range-trigger.vue.d.ts
declare var __VLS_1: {}, __VLS_3: {}, __VLS_5: {};
type __VLS_Slots = {} & {
  prefix?: (props: typeof __VLS_1) => any;
} & {
  'range-separator'?: (props: typeof __VLS_3) => any;
} & {
  suffix?: (props: typeof __VLS_5) => any;
};
declare const __VLS_base: _$vue.DefineComponent<_$vue.ExtractPropTypes<{
  readonly id: {
    readonly type: _$vue.PropType<string[]>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly name: {
    readonly type: _$vue.PropType<string[]>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly modelValue: {
    readonly type: _$vue.PropType<EpPropMergeType<(new (...args: any[]) => string | [string | null, string | null]) | (() => UserInput) | (((new (...args: any[]) => string | [string | null, string | null]) | (() => UserInput)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly startPlaceholder: StringConstructor;
  readonly endPlaceholder: StringConstructor;
  readonly disabled: BooleanConstructor;
}>, {
  focus: () => void;
  blur: () => void;
}, {}, {}, {}, _$vue.ComponentOptionsMixin, _$vue.ComponentOptionsMixin, {
  mouseenter: (...args: any[]) => void;
  mouseleave: (...args: any[]) => void;
  click: (...args: any[]) => void;
  touchstart: (...args: any[]) => void;
  focus: (...args: any[]) => void;
  blur: (...args: any[]) => void;
  startInput: (...args: any[]) => void;
  endInput: (...args: any[]) => void;
  startChange: (...args: any[]) => void;
  endChange: (...args: any[]) => void;
}, string, _$vue.PublicProps, Readonly<_$vue.ExtractPropTypes<{
  readonly id: {
    readonly type: _$vue.PropType<string[]>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly name: {
    readonly type: _$vue.PropType<string[]>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly modelValue: {
    readonly type: _$vue.PropType<EpPropMergeType<(new (...args: any[]) => string | [string | null, string | null]) | (() => UserInput) | (((new (...args: any[]) => string | [string | null, string | null]) | (() => UserInput)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly startPlaceholder: StringConstructor;
  readonly endPlaceholder: StringConstructor;
  readonly disabled: BooleanConstructor;
}>> & Readonly<{
  onMouseenter?: ((...args: any[]) => any) | undefined;
  onMouseleave?: ((...args: any[]) => any) | undefined;
  onClick?: ((...args: any[]) => any) | undefined;
  onTouchstart?: ((...args: any[]) => any) | undefined;
  onFocus?: ((...args: any[]) => any) | undefined;
  onBlur?: ((...args: any[]) => any) | undefined;
  onStartInput?: ((...args: any[]) => any) | undefined;
  onEndInput?: ((...args: any[]) => any) | undefined;
  onStartChange?: ((...args: any[]) => any) | undefined;
  onEndChange?: ((...args: any[]) => any) | undefined;
}>, {
  readonly disabled: boolean;
}, {}, {}, {}, string, _$vue.ComponentProvideOptions, true, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
type __VLS_WithSlots<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
export { _default as default };