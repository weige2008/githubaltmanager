import { EpPropFinalized, EpPropMergeType } from "../../../utils/vue/props/types.js";
import { Language } from "../../../locale/index.js";
import { ButtonConfigContext } from "../../button/src/button.js";
import { CardConfigContext } from "../../card/src/card.js";
import { MessageConfigContext } from "../../message/src/message.js";
import { DialogConfigContext } from "../../dialog/src/dialog.js";
import { LinkConfigContext } from "../../link/src/link.js";
import { TableConfigContext } from "../../table/src/table/defaults.js";
import * as _$vue from "vue";
import { ExtractPropTypes, ExtractPublicPropTypes } from "vue";

//#region ../../packages/components/config-provider/src/config-provider-props.d.ts
type ExperimentalFeatures = {};
declare const configProviderProps: {
  readonly emptyValues: ArrayConstructor;
  readonly valueOnClear: EpPropFinalized<(new (...args: any[]) => string | number | boolean | Function) | (() => string | number | boolean | Function | null) | (((new (...args: any[]) => string | number | boolean | Function) | (() => string | number | boolean | Function | null)) | null)[], unknown, unknown, undefined, boolean>;
  readonly a11y: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  readonly locale: {
    readonly type: _$vue.PropType<Language>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly size: {
    readonly type: _$vue.PropType<EpPropMergeType<StringConstructor, "" | "default" | "large" | "small", never>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly button: {
    readonly type: _$vue.PropType<ButtonConfigContext>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly card: {
    readonly type: _$vue.PropType<CardConfigContext>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly dialog: {
    readonly type: _$vue.PropType<DialogConfigContext>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly link: {
    readonly type: _$vue.PropType<LinkConfigContext>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly experimentalFeatures: {
    readonly type: _$vue.PropType<ExperimentalFeatures>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly keyboardNavigation: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  readonly message: {
    readonly type: _$vue.PropType<MessageConfigContext>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly zIndex: NumberConstructor;
  readonly namespace: EpPropFinalized<StringConstructor, unknown, unknown, "el", boolean>;
  readonly table: {
    readonly type: _$vue.PropType<TableConfigContext>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
};
type ConfigProviderProps = ExtractPropTypes<typeof configProviderProps>;
type ConfigProviderPropsPublic = ExtractPublicPropTypes<typeof configProviderProps>;
//#endregion
export { ConfigProviderProps, ConfigProviderPropsPublic, ExperimentalFeatures, configProviderProps };