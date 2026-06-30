import * as _$vue from "vue";

//#region ../../packages/components/table/src/composables/use-scrollbar.d.ts
declare const useScrollbar: () => {
  scrollBarRef: _$vue.Ref<any, any>;
  scrollTo: (options: ScrollToOptions | number, yCoord?: number) => void;
  setScrollTop: (top?: number) => void;
  setScrollLeft: (left?: number) => void;
};
//#endregion
export { useScrollbar };