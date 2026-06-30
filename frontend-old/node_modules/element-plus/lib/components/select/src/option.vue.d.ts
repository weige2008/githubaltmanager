import { EpPropMergeType } from "../../../utils/vue/props/types.js";
import { SelectContext } from "./type.js";
import * as _$vue from "vue";

//#region ../../packages/components/select/src/option.vue.d.ts
declare const _default: typeof __VLS_export;
declare const __VLS_export: _$vue.DefineComponent<_$vue.ExtractPropTypes<{
  value: {
    readonly type: _$vue.PropType<EpPropMergeType<(BooleanConstructor | StringConstructor | NumberConstructor | ObjectConstructor)[], unknown, unknown>>;
    readonly required: true;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  label: {
    readonly type: _$vue.PropType<EpPropMergeType<(StringConstructor | NumberConstructor)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  created: BooleanConstructor;
  disabled: BooleanConstructor;
}>, {
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
  id: _$vue.Ref<string, string>;
  containerKls: _$vue.ComputedRef<string[]>;
  currentLabel: _$vue.ComputedRef<boolean | EpPropMergeType<(StringConstructor | NumberConstructor)[], unknown, unknown>>;
  itemSelected: _$vue.ComputedRef<boolean>;
  isDisabled: _$vue.ComputedRef<boolean>;
  select: SelectContext;
  visible: _$vue.Ref<boolean, boolean>;
  hover: _$vue.Ref<boolean, boolean>;
  states: {
    index: number;
    groupDisabled: boolean;
    visible: boolean;
    hover: boolean;
  };
  mouseMoveEventName: "mousemove" | null;
  hoverItem: () => void;
  handleMousedown: (event: MouseEvent) => void;
  updateOption: (query: string) => void;
  selectOptionClick: () => void;
}, {}, {}, {}, _$vue.ComponentOptionsMixin, _$vue.ComponentOptionsMixin, {}, string, _$vue.PublicProps, Readonly<_$vue.ExtractPropTypes<{
  value: {
    readonly type: _$vue.PropType<EpPropMergeType<(BooleanConstructor | StringConstructor | NumberConstructor | ObjectConstructor)[], unknown, unknown>>;
    readonly required: true;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  label: {
    readonly type: _$vue.PropType<EpPropMergeType<(StringConstructor | NumberConstructor)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  created: BooleanConstructor;
  disabled: BooleanConstructor;
}>> & Readonly<{}>, {
  disabled: boolean;
  created: boolean;
}, {}, {}, {}, string, _$vue.ComponentProvideOptions, true, {}, any>;
//#endregion
export { _default as default };