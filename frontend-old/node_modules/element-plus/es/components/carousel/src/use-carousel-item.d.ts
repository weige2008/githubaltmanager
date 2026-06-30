import { CarouselItemProps } from "./carousel-item.js";
import * as _$vue from "vue";

//#region ../../packages/components/carousel/src/use-carousel-item.d.ts
declare const useCarouselItem: (props: Required<CarouselItemProps>) => {
  carouselItemRef: _$vue.Ref<HTMLElement | undefined, HTMLElement | undefined>;
  active: _$vue.Ref<boolean, boolean>;
  animating: _$vue.Ref<boolean, boolean>;
  hover: _$vue.Ref<boolean, boolean>;
  inStage: _$vue.Ref<boolean, boolean>;
  isVertical: _$vue.Ref<boolean, boolean>;
  translate: _$vue.Ref<number, number>;
  isCardType: _$vue.Ref<boolean, boolean>;
  scale: _$vue.Ref<number, number>;
  ready: _$vue.Ref<boolean, boolean>;
  handleItemClick: () => void;
};
//#endregion
export { useCarouselItem };