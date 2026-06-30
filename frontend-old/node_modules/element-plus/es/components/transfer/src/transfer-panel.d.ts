import { EpPropFinalized } from "../../../utils/vue/props/types.js";
import { Mutable } from "../../../utils/typescript.js";
import { TransferDataItem, TransferFormat, TransferKey, TransferPropsAlias } from "./transfer.js";
import _default from "./transfer-panel.vue.js";
import * as _$vue from "vue";
import { ComponentInstance, ExtractPublicPropTypes, VNode } from "vue";
import { ComponentExposed } from "vue-component-type-helpers";

//#region ../../packages/components/transfer/src/transfer-panel.d.ts
interface TransferPanelState {
  checked: TransferKey[];
  allChecked: boolean;
  query: string;
  checkChangeByUser: boolean;
}
declare const CHECKED_CHANGE_EVENT = "checked-change";
interface TransferPanelProps<T extends TransferDataItem = TransferDataItem> {
  data?: T[];
  optionRender?: (option: T) => VNode | VNode[];
  placeholder?: string;
  title?: string;
  filterable?: boolean;
  format?: TransferFormat;
  filterMethod?: (query: string, item: T) => boolean;
  defaultChecked?: TransferKey[];
  props?: TransferPropsAlias;
}
/**
 * @deprecated Removed after 3.0.0, Use `TransferPanelProps` instead.
 */
declare const transferPanelProps: {
  readonly data: EpPropFinalized<(new (...args: any[]) => TransferDataItem[]) | (() => TransferDataItem[]) | (((new (...args: any[]) => TransferDataItem[]) | (() => TransferDataItem[])) | null)[], unknown, unknown, () => never[], boolean>;
  readonly optionRender: {
    readonly type: _$vue.PropType<(option: TransferDataItem) => VNode | VNode[]>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly placeholder: StringConstructor;
  readonly title: StringConstructor;
  readonly filterable: BooleanConstructor;
  readonly format: EpPropFinalized<(new (...args: any[]) => TransferFormat) | (() => TransferFormat) | (((new (...args: any[]) => TransferFormat) | (() => TransferFormat)) | null)[], unknown, unknown, () => {}, boolean>;
  readonly filterMethod: {
    readonly type: _$vue.PropType<(query: string, item: TransferDataItem) => boolean>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly defaultChecked: EpPropFinalized<(new (...args: any[]) => TransferKey[]) | (() => TransferKey[]) | (((new (...args: any[]) => TransferKey[]) | (() => TransferKey[])) | null)[], unknown, unknown, () => never[], boolean>;
  readonly props: EpPropFinalized<(new (...args: any[]) => TransferPropsAlias) | (() => TransferPropsAlias) | (((new (...args: any[]) => TransferPropsAlias) | (() => TransferPropsAlias)) | null)[], unknown, unknown, () => Mutable<{
    readonly label: "label";
    readonly key: "key";
    readonly disabled: "disabled";
  }>, boolean>;
};
/**
 * @deprecated Removed after 3.0.0, Use `TransferPanelProps` instead.
 */
type TransferPanelPropsPublic = ExtractPublicPropTypes<typeof transferPanelProps>;
declare const transferPanelEmits: {
  "checked-change": (value: TransferKey[], movedKeys?: TransferKey[]) => boolean;
};
type TransferPanelEmits = typeof transferPanelEmits;
type TransferPanelInstance = ComponentInstance<typeof _default> & ComponentExposed<typeof _default>;
//#endregion
export { CHECKED_CHANGE_EVENT, TransferPanelEmits, TransferPanelInstance, TransferPanelProps, TransferPanelPropsPublic, TransferPanelState, transferPanelEmits, transferPanelProps };