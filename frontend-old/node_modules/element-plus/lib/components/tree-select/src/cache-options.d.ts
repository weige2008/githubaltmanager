import * as _$vue from "vue";
import { PropType } from "vue";

//#region ../../packages/components/tree-select/src/cache-options.d.ts
type CacheOption = {
  value: string | number | boolean | object;
  currentLabel: string | number;
  isDisabled: boolean;
};
declare const _default: _$vue.DefineComponent<_$vue.ExtractPropTypes<{
  data: {
    type: PropType<CacheOption[]>;
    default: () => never[];
  };
}>, () => undefined, {}, {}, {}, _$vue.ComponentOptionsMixin, _$vue.ComponentOptionsMixin, {}, string, _$vue.PublicProps, Readonly<_$vue.ExtractPropTypes<{
  data: {
    type: PropType<CacheOption[]>;
    default: () => never[];
  };
}>> & Readonly<{}>, {
  data: CacheOption[];
}, {}, {}, {}, string, _$vue.ComponentProvideOptions, true, {}, any>;
//#endregion
export { CacheOption, _default as default };