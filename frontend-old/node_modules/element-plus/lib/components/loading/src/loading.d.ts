import { LoadingOptionsResolved, LoadingParentElement } from "./types.js";
import * as _$vue from "vue";
import { AppContext, VNode } from "vue";

//#region ../../packages/components/loading/src/loading.d.ts
declare function createLoadingComponent(options: LoadingOptionsResolved, appContext: AppContext | null): {
  setText: (text: string | VNode | VNode[]) => void;
  removeElLoadingChild: () => void;
  close: () => void;
  handleAfterLeave: () => void;
  vm: _$vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, _$vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string, {}, {}, {}, string, _$vue.ComponentProvideOptions>, {}, {}, "", {}, any>;
  $el: HTMLElement;
  originalPosition: _$vue.Ref<string, string>;
  originalOverflow: _$vue.Ref<string, string>;
  visible: _$vue.Ref<boolean, boolean>;
  parent: _$vue.Ref<LoadingParentElement, LoadingParentElement>;
  background: _$vue.Ref<string, string>;
  svg: _$vue.Ref<string, string>;
  svgViewBox: _$vue.Ref<string, string>;
  spinner: _$vue.Ref<string | boolean, string | boolean>;
  text: _$vue.Ref<string | VNode<_$vue.RendererNode, _$vue.RendererElement, {
    [key: string]: any;
  }> | VNode<_$vue.RendererNode, _$vue.RendererElement, {
    [key: string]: any;
  }>[], string | VNode<_$vue.RendererNode, _$vue.RendererElement, {
    [key: string]: any;
  }> | VNode<_$vue.RendererNode, _$vue.RendererElement, {
    [key: string]: any;
  }>[]>;
  fullscreen: _$vue.Ref<boolean, boolean>;
  lock: _$vue.Ref<boolean, boolean>;
  customClass: _$vue.Ref<string, string>;
  target: _$vue.Ref<HTMLElement, HTMLElement>;
  beforeClose?: _$vue.Ref<(() => boolean) | undefined, (() => boolean) | undefined> | undefined;
  closed?: _$vue.Ref<(() => void) | undefined, (() => void) | undefined> | undefined;
};
type LoadingInstance = ReturnType<typeof createLoadingComponent>;
//#endregion
export { LoadingInstance, createLoadingComponent };