import * as _$vue from "vue";
import { CSSProperties, PropType } from "vue";

//#region ../../packages/components/select-v2/src/group-item.vue.d.ts
declare const _default: typeof __VLS_export;
declare const __VLS_export: _$vue.DefineComponent<_$vue.ExtractPropTypes<{
  item: {
    type: ObjectConstructor;
    required: true;
  };
  style: {
    type: PropType<CSSProperties>;
  };
  height: NumberConstructor;
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
}, {}, {}, {}, _$vue.ComponentOptionsMixin, _$vue.ComponentOptionsMixin, {}, string, _$vue.PublicProps, Readonly<_$vue.ExtractPropTypes<{
  item: {
    type: ObjectConstructor;
    required: true;
  };
  style: {
    type: PropType<CSSProperties>;
  };
  height: NumberConstructor;
}>> & Readonly<{}>, {}, {}, {}, {}, string, _$vue.ComponentProvideOptions, true, {}, any>;
//#endregion
export { _default as default };