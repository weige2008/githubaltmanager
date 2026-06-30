import { SFCWithInstall } from "../../utils/vue/typescript.js";
import InfiniteScroll from "./src/index.js";
import * as _$vue from "vue";

//#region ../../packages/components/infinite-scroll/index.d.ts
declare const _InfiniteScroll: SFCWithInstall<typeof InfiniteScroll>;
declare const ElInfiniteScroll: SFCWithInstall<_$vue.ObjectDirective<HTMLElement & {
  ElInfiniteScroll: {
    container: HTMLElement | Window;
    containerEl: HTMLElement;
    instance: _$vue.ComponentPublicInstance;
    delay: number;
    lastScrollTop: number;
    cb: () => void;
    onScroll: () => void;
    observer?: MutationObserver;
  };
}, () => void, string, any>>;
//#endregion
export { ElInfiniteScroll, _InfiniteScroll as default };