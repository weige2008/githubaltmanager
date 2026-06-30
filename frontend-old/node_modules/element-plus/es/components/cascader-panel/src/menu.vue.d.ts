import Node from "./node.js";
import { CascaderCommonProps } from "./config.js";
import { FixedSizeListInstance } from "../../virtual-list/src/components/fixed-size-list.js";
import * as _$vue from "vue";

//#region ../../packages/components/cascader-panel/src/menu.vue.d.ts
type __VLS_Props = {
  nodes: Node[];
  index: number;
} & Pick<CascaderCommonProps, 'virtualScroll' | 'itemSize' | 'height'>;
declare var __VLS_28: {}, __VLS_58: {};
type __VLS_Slots = {} & {
  empty?: (props: typeof __VLS_28) => any;
} & {
  empty?: (props: typeof __VLS_58) => any;
};
declare const __VLS_base: _$vue.DefineComponent<__VLS_Props, {
  getActiveNodeIndex: () => number;
  getNodeIndexById: (nodeId: string | undefined) => number;
  scrollToItem: (index: number) => void;
  focusNodeAt: (index: number) => void;
  virtualListRef: _$vue.Ref<FixedSizeListInstance | undefined, FixedSizeListInstance | undefined>;
  readonly $el: HTMLElement;
}, {}, {}, {}, _$vue.ComponentOptionsMixin, _$vue.ComponentOptionsMixin, {}, string, _$vue.PublicProps, Readonly<__VLS_Props> & Readonly<{}>, {
  height: number;
  itemSize: number;
  virtualScroll: boolean;
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