import { LocaleContext } from "../../../../hooks/use-locale/index.js";
import { ConfigProviderProps } from "../config-provider-props.js";
import { ConfigProviderContext } from "../constants.js";
import * as _$vue from "vue";
import { App, MaybeRef, Ref } from "vue";

//#region ../../packages/components/config-provider/src/hooks/use-global-config.d.ts
declare function useGlobalConfig<K extends keyof ConfigProviderContext, D extends ConfigProviderContext[K]>(key: K, defaultValue?: D): Ref<Exclude<ConfigProviderContext[K], undefined> | D>;
declare function useGlobalConfig(): Ref<ConfigProviderContext>;
declare function useGlobalComponentSettings(block: string, sizeFallback?: MaybeRef<ConfigProviderContext['size']>): {
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
  locale: LocaleContext;
  zIndex: {
    initialZIndex: _$vue.ComputedRef<number>;
    currentZIndex: _$vue.ComputedRef<number>;
    nextZIndex: () => number;
  };
  size: _$vue.ComputedRef<"default" | "" | "large" | "small">;
};
declare const provideGlobalConfig: (config: MaybeRef<ConfigProviderContext>, app?: App, global?: boolean) => _$vue.ComputedRef<Partial<ConfigProviderProps>> | undefined;
//#endregion
export { provideGlobalConfig, useGlobalComponentSettings, useGlobalConfig };