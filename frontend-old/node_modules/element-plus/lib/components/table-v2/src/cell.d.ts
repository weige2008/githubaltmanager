import { EpPropFinalized } from "../../../utils/vue/props/types.js";
import { AnyColumn } from "./common.js";
import * as _$vue from "vue";
import { ExtractPropTypes, ExtractPublicPropTypes, StyleValue } from "vue";

//#region ../../packages/components/table-v2/src/cell.d.ts
declare const tableV2CellProps: {
  readonly class: StringConstructor;
  readonly cellData: {
    readonly type: _$vue.PropType<any>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly column: {
    readonly type: _$vue.PropType<AnyColumn>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly columnIndex: NumberConstructor;
  readonly style: EpPropFinalized<(new (...args: any[]) => string | false | _$vue.CSSProperties | StyleValue[]) | (() => StyleValue) | (((new (...args: any[]) => string | false | _$vue.CSSProperties | StyleValue[]) | (() => StyleValue)) | null)[], unknown, unknown, undefined, boolean>;
  readonly rowData: {
    readonly type: _$vue.PropType<any>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly rowIndex: NumberConstructor;
};
type TableV2CellProps = ExtractPropTypes<typeof tableV2CellProps>;
type TableV2CellPropsPublic = ExtractPublicPropTypes<typeof tableV2CellProps>;
//#endregion
export { TableV2CellProps, TableV2CellPropsPublic, tableV2CellProps };