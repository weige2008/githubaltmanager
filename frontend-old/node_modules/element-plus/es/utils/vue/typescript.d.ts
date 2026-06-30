import { AllowedComponentProps, AppContext, Component, EmitsOptions, ObjectPlugin, SetupContext, VNodeProps } from "vue";
import { ComponentEmit, ComponentProps } from "vue-component-type-helpers";

//#region ../../packages/utils/vue/typescript.d.ts
type NativeType = null | undefined | number | string | boolean | symbol | Function;
/**
 * Reference from https://github.com/vuejs/core/blob/main/packages/runtime-core/src/apiSetupHelpers.ts#L338-L340
 */
type InferDefaults<T> = { [K in keyof T as string extends K ? never : K]?: InferDefault<T[K]> };
type InferDefault<T> = (() => T & {}) | (T extends NativeType ? T : never);
type ExtractEventNames<T> = ComponentEmit<T> extends ((event: string, ...args: any[]) => any) ? never : keyof { [K in keyof ComponentProps<T> as K extends `on${infer Event}` ? ComponentEmit<T> extends ((event: Uncapitalize<Event>, ...args: any[]) => any) ? K : never : never]: unknown };
type ExcludedProps<T> = ExtractEventNames<T> | keyof VNodeProps | keyof AllowedComponentProps;
type SFCWithInstall<T> = T & ObjectPlugin & SFCWithPropsDefaultsSetter<T>;
type SFCInstallWithContext<T> = SFCWithInstall<T> & {
  _context: AppContext | null;
};
type SFCWithPropsDefaultsSetter<T> = T extends Component ? {
  setPropsDefaults: (defaults: InferDefaults<{ [K in keyof ComponentProps<T> as K extends ExcludedProps<T> ? never : K]?: ComponentProps<T>[K] }>) => void;
} : unknown;
type EmitFn<E extends EmitsOptions> = SetupContext<E>['emit'];
//#endregion
export { EmitFn, SFCInstallWithContext, SFCWithInstall, SFCWithPropsDefaultsSetter };