import { EpPropMergeType } from "../../utils/vue/props/types.js";
import { ComponentSize } from "../../constants/size.js";
import * as _$vue from "vue";
import { InjectionKey, Ref } from "vue";

//#region ../../packages/hooks/use-size/index.d.ts
declare const useSizeProp: {
  readonly type: _$vue.PropType<EpPropMergeType<StringConstructor, "" | "default" | "large" | "small", never>>;
  readonly required: false;
  readonly validator: ((val: unknown) => boolean) | undefined;
  __epPropKey: true;
};
declare const useSizeProps: {
  size: {
    readonly type: _$vue.PropType<EpPropMergeType<StringConstructor, "" | "default" | "large" | "small", never>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
};
interface SizeContext {
  size: Ref<ComponentSize>;
}
declare const SIZE_INJECTION_KEY: InjectionKey<SizeContext>;
declare const useGlobalSize: () => _$vue.ComputedRef<"" | "default" | "large" | "small">;
//#endregion
export { SIZE_INJECTION_KEY, SizeContext, useGlobalSize, useSizeProp, useSizeProps };