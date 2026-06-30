import { IconPropType } from "../../../utils/vue/icon.js";
import { MessagePlacement, MessageProps, MessageType } from "./message.js";
import * as _$vue from "vue";

//#region ../../packages/components/message/src/message.vue.d.ts
declare function close(): void;
declare var __VLS_27: {};
type __VLS_Slots = {} & {
  default?: (props: typeof __VLS_27) => any;
};
declare const __VLS_base: _$vue.DefineComponent<MessageProps, {
  visible: _$vue.Ref<boolean, boolean>;
  bottom: _$vue.ComputedRef<number>;
  close: typeof close;
}, {}, {}, {}, _$vue.ComponentOptionsMixin, _$vue.ComponentOptionsMixin, {
  destroy: () => void;
}, string, _$vue.PublicProps, Readonly<MessageProps> & Readonly<{
  onDestroy?: (() => any) | undefined;
}>, {
  type: MessageType;
  id: string;
  icon: IconPropType;
  zIndex: number;
  offset: number;
  placement: MessagePlacement;
  onClose: () => void;
  message: string | _$vue.VNode | (() => _$vue.VNode);
  plain: boolean;
  showClose: boolean;
  duration: number;
  customClass: string;
  dangerouslyUseHTMLString: boolean;
  grouping: boolean;
  repeatNum: number;
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