import { Column, KeyType } from "./types.js";
import * as _$vue from "vue";
import { CSSProperties } from "vue";

//#region ../../packages/components/table-v2/src/common.d.ts
type AnyColumn = Column<any>;
/**
 * @Note even though we can use `string[] | string` as the type but for
 * convenience here we only use `string` as the acceptable value here.
 */
declare const classType: StringConstructor;
declare const columns: {
  readonly type: _$vue.PropType<AnyColumn[]>;
  readonly required: true;
};
declare const column: {
  readonly type: _$vue.PropType<AnyColumn>;
};
declare const fixedDataType: {
  readonly type: _$vue.PropType<any[]>;
};
declare const dataType: {
  readonly required: true;
  readonly type: _$vue.PropType<any[]>;
};
declare const expandColumnKey: StringConstructor;
declare const expandKeys: {
  readonly type: _$vue.PropType<KeyType[]>;
  readonly default: () => never[];
};
declare const requiredNumber: {
  readonly type: NumberConstructor;
  readonly required: true;
};
declare const rowKey: {
  readonly type: _$vue.PropType<KeyType>;
  readonly default: "id";
};
/**
 * @note even though we can use `StyleValue` but that would be difficult for us to mapping them,
 * so we only use `CSSProperties` as the acceptable value here.
 */
declare const styleType: {
  type: _$vue.PropType<CSSProperties>;
};
//#endregion
export { AnyColumn, classType, column, columns, dataType, expandColumnKey, expandKeys, fixedDataType, requiredNumber, rowKey, styleType };