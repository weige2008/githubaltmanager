import { CarouselProps } from "./carousel.js";
import * as _$vue from "vue";

//#region ../../packages/components/carousel/src/carousel.vue.d.ts
declare var __VLS_40: {};
type __VLS_Slots = {} & {
  default?: (props: typeof __VLS_40) => any;
};
declare const __VLS_base: _$vue.DefineComponent<CarouselProps, {
  /** @description active slide index */activeIndex: _$vue.WritableComputedRef<number, number>; /** @description manually switch slide, index of the slide to be switched to, starting from 0; or the `name` of corresponding `el-carousel-item` */
  setActiveItem: (index: number | string) => void; /** @description switch to the previous slide */
  prev: () => void; /** @description switch to the next slide */
  next: () => void;
}, {}, {}, {}, _$vue.ComponentOptionsMixin, _$vue.ComponentOptionsMixin, {
  change: (current: number, prev: number) => void;
}, string, _$vue.PublicProps, Readonly<CarouselProps> & Readonly<{
  onChange?: ((current: number, prev: number) => any) | undefined;
}>, {
  type: "" | "card";
  height: string;
  direction: "horizontal" | "vertical";
  loop: boolean;
  trigger: "hover" | "click";
  arrow: "always" | "hover" | "never";
  initialIndex: number;
  autoplay: boolean;
  interval: number;
  indicatorPosition: "" | "none" | "outside";
  cardScale: number;
  pauseOnHover: boolean;
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