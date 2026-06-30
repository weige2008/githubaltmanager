import { EpPropMergeType } from "../../../utils/vue/props/types.js";
import { MenuItemRegistered } from "./types.js";
import * as _$vue from "vue";
import { ExtractPublicPropTypes } from "vue";
import * as _$vue_router0 from "vue-router";
import { RouteLocationRaw } from "vue-router";

//#region ../../packages/components/menu/src/menu-item.d.ts
interface MenuItemProps {
  /**
   * @description unique identification
   */
  index: string;
  /**
   * @description Vue Router object
   */
  route?: RouteLocationRaw;
  /**
   * @description whether disabled
   */
  disabled?: boolean;
}
/**
 * @deprecated Removed after 3.0.0, Use `MenuItemProps` instead.
 */
declare const menuItemProps: {
  readonly index: {
    readonly type: _$vue.PropType<string>;
    readonly required: true;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly route: {
    readonly type: _$vue.PropType<EpPropMergeType<(new (...args: any[]) => string | _$vue_router0.RouteLocationAsRelativeGeneric | _$vue_router0.RouteLocationAsPathGeneric) | (() => string | _$vue_router0.RouteLocationAsRelativeGeneric | _$vue_router0.RouteLocationAsPathGeneric) | (((new (...args: any[]) => string | _$vue_router0.RouteLocationAsRelativeGeneric | _$vue_router0.RouteLocationAsPathGeneric) | (() => string | _$vue_router0.RouteLocationAsRelativeGeneric | _$vue_router0.RouteLocationAsPathGeneric)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly disabled: BooleanConstructor;
};
/**
 * @deprecated Removed after 3.0.0, Use `MenuItemProps` instead.
 */
type MenuItemPropsPublic = ExtractPublicPropTypes<typeof menuItemProps>;
declare const menuItemEmits: {
  click: (item: MenuItemRegistered) => boolean;
};
type MenuItemEmits = typeof menuItemEmits;
//#endregion
export { MenuItemEmits, MenuItemProps, MenuItemPropsPublic, menuItemEmits, menuItemProps };