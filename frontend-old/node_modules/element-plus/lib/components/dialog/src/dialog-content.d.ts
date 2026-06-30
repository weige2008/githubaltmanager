import { IconPropType } from "../../../utils/vue/icon.js";
import { EpPropFinalized, EpPropMergeType } from "../../../utils/vue/props/types.js";
import * as _$vue from "vue";

//#region ../../packages/components/dialog/src/dialog-content.d.ts
/**
 * @description dialog-content component props
 */
interface DialogContentProps {
  /**
   * @description whether to align the header and footer in center
   */
  center?: boolean;
  /**
   * @description whether to align the dialog both horizontally and vertically
   */
  alignCenter?: boolean;
  /**
   * @description custom close icon, default is Close
   */
  closeIcon?: IconPropType;
  /**
   * @description enable dragging feature for Dialog
   */
  draggable?: boolean;
  /**
   * @description draggable Dialog can overflow the viewport
   */
  overflow?: boolean;
  /**
   * @description whether the Dialog takes up full screen
   */
  fullscreen?: boolean;
  /**
   * @description custom class names for header wrapper
   */
  headerClass?: string;
  /**
   * @description custom class names for body wrapper
   */
  bodyClass?: string;
  /**
   * @description custom class names for footer wrapper
   */
  footerClass?: string;
  /**
   * @description whether to show a close button
   */
  showClose?: boolean;
  /**
   * @description title of Dialog. Can also be passed with a named slot (see the following table)
   */
  title?: string;
  /**
   * @description header's aria-level attribute
   */
  ariaLevel?: string;
}
/**
 * @deprecated Removed after 3.0.0, Use `DialogContentProps` instead.
 */
declare const dialogContentProps: {
  readonly center: BooleanConstructor;
  readonly alignCenter: EpPropFinalized<BooleanConstructor, unknown, unknown, undefined, boolean>;
  readonly closeIcon: {
    readonly type: _$vue.PropType<EpPropMergeType<(new (...args: any[]) => (string | _$vue.Component) & {}) | (() => string | _$vue.Component) | (((new (...args: any[]) => (string | _$vue.Component) & {}) | (() => string | _$vue.Component)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly draggable: EpPropFinalized<BooleanConstructor, unknown, unknown, undefined, boolean>;
  readonly overflow: EpPropFinalized<BooleanConstructor, unknown, unknown, undefined, boolean>;
  readonly fullscreen: BooleanConstructor;
  readonly headerClass: StringConstructor;
  readonly bodyClass: StringConstructor;
  readonly footerClass: StringConstructor;
  readonly showClose: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  readonly title: EpPropFinalized<StringConstructor, unknown, unknown, "", boolean>;
  readonly ariaLevel: EpPropFinalized<StringConstructor, unknown, unknown, "2", boolean>;
};
declare const dialogContentEmits: {
  close: () => boolean;
};
declare const dialogContentPropsDefaults: {
  readonly alignCenter: undefined;
  readonly draggable: undefined;
  readonly overflow: undefined;
  readonly showClose: true;
  readonly title: "";
  readonly ariaLevel: "2";
};
//#endregion
export { DialogContentProps, dialogContentEmits, dialogContentProps, dialogContentPropsDefaults };