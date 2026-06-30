import { VNodeChildAtom } from "../../../utils/vue/vnode.js";
import { CarouselEmits, CarouselProps } from "./carousel.js";
import { CarouselItemContext } from "./constants.js";
import * as _$vue from "vue";
import { SetupContext } from "vue";
import { DebouncedFunc } from "lodash-unified";

//#region ../../packages/components/carousel/src/use-carousel.d.ts
declare const useCarousel: (props: Required<CarouselProps>, emit: SetupContext<CarouselEmits>["emit"], componentName: string) => {
  root: _$vue.Ref<HTMLDivElement | undefined, HTMLDivElement | undefined>;
  activeIndex: _$vue.Ref<number, number>;
  exposeActiveIndex: _$vue.WritableComputedRef<number, number>;
  arrowDisplay: _$vue.ComputedRef<boolean>;
  hasLabel: _$vue.ComputedRef<boolean>;
  hover: _$vue.Ref<boolean, boolean>;
  isCardType: _$vue.ComputedRef<boolean>;
  items: _$vue.ShallowRef<CarouselItemContext[], CarouselItemContext[]>;
  isVertical: _$vue.ComputedRef<boolean>;
  containerStyle: _$vue.ComputedRef<{
    height: string;
    overflow?: undefined;
  } | {
    height: string;
    overflow: string;
  }>;
  isItemsTwoLength: _$vue.Ref<boolean, boolean>;
  handleButtonEnter: (arrow: "left" | "right") => void;
  handleButtonLeave: () => void;
  handleIndicatorClick: (index: number) => void;
  handleMouseEnter: () => void;
  handleMouseLeave: () => void;
  setActiveItem: (index: number | string) => void;
  prev: () => void;
  next: () => void;
  PlaceholderItem: () => ({
    [name: string]: unknown;
    $stable?: boolean;
  } | VNodeChildAtom)[] | null;
  isTwoLengthShow: (index: number) => boolean;
  ItemsSorter: _$vue.DefineComponent<{}, () => _$vue.VNode<_$vue.RendererNode, _$vue.RendererElement, {
    [key: string]: any;
  }> | null, {}, {}, {}, _$vue.ComponentOptionsMixin, _$vue.ComponentOptionsMixin, {}, string, _$vue.PublicProps, Readonly<{}> & Readonly<{}>, {}, {}, {}, {}, string, _$vue.ComponentProvideOptions, true, {}, any>;
  throttledArrowClick: DebouncedFunc<(index: number) => void>;
  throttledIndicatorHover: DebouncedFunc<(index: number) => void>;
};
//#endregion
export { useCarousel };