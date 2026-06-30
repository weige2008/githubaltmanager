import { IconPropType } from "../../../utils/vue/icon.js";
import { NotificationPosition, NotificationProps, NotificationType } from "./notification.js";
import * as _$vue from "vue";

//#region ../../packages/components/notification/src/notification.vue.d.ts
declare function close(): void;
declare var __VLS_21: {};
type __VLS_Slots = {} & {
  default?: (props: typeof __VLS_21) => any;
};
declare const __VLS_base: _$vue.DefineComponent<NotificationProps, {
  visible: _$vue.Ref<boolean, boolean>; /** @description close notification */
  close: typeof close;
}, {}, {}, {}, _$vue.ComponentOptionsMixin, _$vue.ComponentOptionsMixin, {
  destroy: () => void;
}, string, _$vue.PublicProps, Readonly<NotificationProps> & Readonly<{
  onDestroy?: (() => any) | undefined;
}>, {
  type: NotificationType;
  id: string;
  position: NotificationPosition;
  offset: number;
  onClick: () => void;
  message: string | _$vue.VNode | (() => _$vue.VNode);
  title: string;
  closeIcon: IconPropType;
  showClose: boolean;
  duration: number;
  customClass: string;
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