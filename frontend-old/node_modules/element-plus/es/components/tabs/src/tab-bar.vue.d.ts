import { TabPaneName, TabsPaneContext } from "./constants.js";
import { TabBarProps } from "./tab-bar.js";
import * as _$vue from "vue";
import { CSSProperties } from "vue";

//#region ../../packages/components/tabs/src/tab-bar.vue.d.ts
declare const __VLS_export: _$vue.DefineComponent<TabBarProps, {
  /** @description tab root html element */ref: _$vue.Ref<HTMLDivElement | undefined, HTMLDivElement | undefined>; /** @description method to manually update tab bar style, return the updated style */
  update: () => CSSProperties;
}, {}, {}, {}, _$vue.ComponentOptionsMixin, _$vue.ComponentOptionsMixin, {}, string, _$vue.PublicProps, Readonly<TabBarProps> & Readonly<{}>, {
  tabs: TabsPaneContext[];
  tabRefs: {
    [key: TabPaneName]: HTMLDivElement;
  };
}, {}, {}, {}, string, _$vue.ComponentProvideOptions, false, {}, any>;
declare const _default: typeof __VLS_export;
//#endregion
export { _default as default };