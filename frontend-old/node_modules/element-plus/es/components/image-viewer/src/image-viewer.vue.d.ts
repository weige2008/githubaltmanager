import { ImageViewerAction, ImageViewerProps } from "./image-viewer.js";
import * as _$vue from "vue";

//#region ../../packages/components/image-viewer/src/image-viewer.vue.d.ts
declare function toggleMode(): void;
declare function setActiveItem(index: number): void;
declare function prev(): void;
declare function next(): void;
declare function handleActions(action: ImageViewerAction, options?: {}): void;
declare var __VLS_55: {
    activeIndex: number;
    total: number;
  }, __VLS_57: {
    actions: typeof handleActions;
    prev: typeof prev;
    next: typeof next;
    reset: typeof toggleMode;
    activeIndex: number;
    setActiveItem: typeof setActiveItem;
  }, __VLS_124: {
    activeIndex: number;
    src: string;
  }, __VLS_126: {};
type __VLS_Slots = {} & {
  progress?: (props: typeof __VLS_55) => any;
} & {
  toolbar?: (props: typeof __VLS_57) => any;
} & {
  'viewer-error'?: (props: typeof __VLS_124) => any;
} & {
  default?: (props: typeof __VLS_126) => any;
};
declare const __VLS_base: _$vue.DefineComponent<ImageViewerProps, {
  /**
   * @description manually switch image
   */
  setActiveItem: typeof setActiveItem;
}, {}, {}, {}, _$vue.ComponentOptionsMixin, _$vue.ComponentOptionsMixin, {
  rotate: (deg: number) => void;
  close: () => void;
  error: (evt: Event) => void;
  switch: (index: number) => void;
}, string, _$vue.PublicProps, Readonly<ImageViewerProps> & Readonly<{
  onRotate?: ((deg: number) => any) | undefined;
  onClose?: (() => any) | undefined;
  onError?: ((evt: Event) => any) | undefined;
  onSwitch?: ((index: number) => any) | undefined;
}>, {
  infinite: boolean;
  scale: number;
  initialIndex: number;
  closeOnPressEscape: boolean;
  zoomRate: number;
  minScale: number;
  maxScale: number;
  urlList: string[];
}, {}, {}, {}, string, _$vue.ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
type __VLS_WithSlots<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
export { _default as default };