import * as _$vue from "vue";
import { CSSProperties, Component, Slot } from "vue";
import { JSX } from "vue/jsx-runtime";

//#region ../../packages/components/table-v2/src/utils.d.ts
declare const sum: (listLike: number | number[]) => number;
declare const tryCall: <T>(fLike: T, params: T extends ((...args: infer K) => unknown) ? K : any, defaultRet?: {}) => any;
declare const enforceUnit: (style: CSSProperties) => CSSProperties;
declare const componentToSlot: <T extends object>(ComponentLike: JSX.Element | ((props: T) => Component<T>) | undefined) => ((props: T) => _$vue.VNode<_$vue.RendererNode, _$vue.RendererElement, {
  [key: string]: any;
}>) | Slot;
//#endregion
export { componentToSlot, enforceUnit, sum, tryCall };