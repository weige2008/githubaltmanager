import { DateCell } from "../types.js";
import * as _$vue from "vue";
import { ExtractPropTypes, ExtractPublicPropTypes } from "vue";

//#region ../../packages/components/date-picker-panel/src/props/basic-cell.d.ts
declare const basicCellProps: {
  readonly cell: {
    readonly type: _$vue.PropType<DateCell>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
};
type BasicCellProps = ExtractPropTypes<typeof basicCellProps>;
type BasicCellPropsPublic = ExtractPublicPropTypes<typeof basicCellProps>;
//#endregion
export { BasicCellProps, BasicCellPropsPublic, basicCellProps };