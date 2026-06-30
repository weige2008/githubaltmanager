import { Option } from "./select.types.js";
import * as _$vue from "vue";

//#region ../../packages/components/select-v2/src/option-item.vue.d.ts
declare const _default: typeof __VLS_export;
declare const __VLS_export: _$vue.DefineComponent<_$vue.ExtractPropTypes<{
  readonly data: ArrayConstructor;
  readonly disabled: BooleanConstructor;
  readonly hovering: BooleanConstructor;
  readonly item: {
    readonly type: _$vue.PropType<Option>;
    readonly required: true;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly index: NumberConstructor;
  readonly style: ObjectConstructor;
  readonly selected: BooleanConstructor;
  readonly created: BooleanConstructor;
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
  contentId: _$vue.Ref<string, string>;
  mouseMoveEventName: string | null;
  hoverItem: () => void;
  handleMousedown: (event: MouseEvent) => void;
  selectOptionClick: () => void;
  getLabel: (option: Option) => any;
}, {}, {}, {}, _$vue.ComponentOptionsMixin, _$vue.ComponentOptionsMixin, {
  hover: (index?: number) => index is number;
  select: (val: Option, index?: number) => boolean;
}, string, _$vue.PublicProps, Readonly<_$vue.ExtractPropTypes<{
  readonly data: ArrayConstructor;
  readonly disabled: BooleanConstructor;
  readonly hovering: BooleanConstructor;
  readonly item: {
    readonly type: _$vue.PropType<Option>;
    readonly required: true;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly index: NumberConstructor;
  readonly style: ObjectConstructor;
  readonly selected: BooleanConstructor;
  readonly created: BooleanConstructor;
}>> & Readonly<{
  onSelect?: ((val: Option, index?: number | undefined) => any) | undefined;
  onHover?: ((index?: number | undefined) => any) | undefined;
}>, {
  readonly disabled: boolean;
  readonly created: boolean;
  readonly selected: boolean;
  readonly hovering: boolean;
}, {}, {}, {}, string, _$vue.ComponentProvideOptions, true, {}, any>;
//#endregion
export { _default as default };