import { ImageFitType, ImageProps } from "./image.js";
import { ImageViewerAction } from "../../image-viewer/src/image-viewer.js";
import * as _$vue from "vue";

//#region ../../packages/components/image/src/image.vue.d.ts
declare function clickHandler(): void;
declare var __VLS_1: {}, __VLS_3: {}, __VLS_14: {}, __VLS_17: {
    activeIndex: number;
    total: number;
  }, __VLS_20: {
    actions: (action: ImageViewerAction, options?: {}) => void;
    prev: () => void;
    next: () => void;
    reset: () => void;
    activeIndex: number;
    setActiveItem: (index: number) => void;
  }, __VLS_23: {
    activeIndex: number;
    src: string;
  };
type __VLS_Slots = {} & {
  error?: (props: typeof __VLS_1) => any;
} & {
  placeholder?: (props: typeof __VLS_3) => any;
} & {
  viewer?: (props: typeof __VLS_14) => any;
} & {
  progress?: (props: typeof __VLS_17) => any;
} & {
  toolbar?: (props: typeof __VLS_20) => any;
} & {
  'viewer-error'?: (props: typeof __VLS_23) => any;
};
declare const __VLS_base: _$vue.DefineComponent<ImageProps, {
  /** @description manually open preview */showPreview: typeof clickHandler;
}, {}, {}, {}, _$vue.ComponentOptionsMixin, _$vue.ComponentOptionsMixin, {
  show: () => void;
  close: () => void;
  error: (evt: Event) => void;
  load: (evt: Event) => void;
  switch: (val: number) => void;
}, string, _$vue.PublicProps, Readonly<ImageProps> & Readonly<{
  onShow?: (() => any) | undefined;
  onClose?: (() => any) | undefined;
  onError?: ((evt: Event) => any) | undefined;
  onLoad?: ((evt: Event) => any) | undefined;
  onSwitch?: ((val: number) => any) | undefined;
}>, {
  infinite: boolean;
  scale: number;
  src: string;
  fit: ImageFitType;
  initialIndex: number;
  closeOnPressEscape: boolean;
  previewSrcList: string[];
  zoomRate: number;
  minScale: number;
  maxScale: number;
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