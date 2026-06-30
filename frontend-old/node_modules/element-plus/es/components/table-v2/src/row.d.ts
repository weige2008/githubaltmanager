import { EpPropFinalized } from "../../../utils/vue/props/types.js";
import { FixedDirection, KeyType, RowCommonParams } from "./types.js";
import { AnyColumn } from "./common.js";
import * as _$vue from "vue";
import { CSSProperties, ExtractPropTypes, ExtractPublicPropTypes } from "vue";

//#region ../../packages/components/table-v2/src/row.d.ts
type RowExpandParams = {
  expanded: boolean;
  rowKey: KeyType;
} & RowCommonParams;
type RowHoverParams = {
  event?: MouseEvent;
  hovered: boolean;
  rowKey: KeyType;
} & Partial<RowCommonParams>;
type RowEventHandlerParams = {
  rowKey: KeyType;
  event: Event;
} & RowCommonParams;
type RowHeightChangedParams = {
  rowKey: KeyType;
  height: number;
  rowIndex: number;
};
type RowExpandHandler = (params: RowExpandParams) => void;
type RowHoverHandler = (params: RowHoverParams) => void;
type RowEventHandler = (params: RowEventHandlerParams) => void;
type RowHeightChangeHandler = (row: RowHeightChangedParams, fixedDirection: boolean | FixedDirection | undefined) => void;
type RowEventHandlers = {
  onClick?: RowEventHandler;
  onContextmenu?: RowEventHandler;
  onDblclick?: RowEventHandler;
  onMouseenter?: RowEventHandler;
  onMouseleave?: RowEventHandler;
};
declare const tableV2RowProps: {
  readonly class: StringConstructor;
  readonly columns: {
    readonly type: _$vue.PropType<AnyColumn[]>;
    readonly required: true;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly columnsStyles: {
    readonly type: _$vue.PropType<Record<KeyType, CSSProperties>>;
    readonly required: true;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly depth: NumberConstructor;
  readonly expandColumnKey: StringConstructor;
  readonly estimatedRowHeight: {
    readonly default: undefined;
    readonly type: _$vue.PropType<number>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    readonly __epPropKey: true;
  };
  readonly isScrolling: BooleanConstructor;
  readonly onRowExpand: {
    readonly type: _$vue.PropType<RowExpandHandler>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly onRowHover: {
    readonly type: _$vue.PropType<RowHoverHandler>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly onRowHeightChange: {
    readonly type: _$vue.PropType<RowHeightChangeHandler>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly rowData: {
    readonly type: _$vue.PropType<any>;
    readonly required: true;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly rowEventHandlers: {
    readonly type: _$vue.PropType<RowEventHandlers>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly rowIndex: {
    readonly type: _$vue.PropType<number>;
    readonly required: true;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly rowKey: EpPropFinalized<(new (...args: any[]) => string | number | symbol) | (() => KeyType) | (((new (...args: any[]) => string | number | symbol) | (() => KeyType)) | null)[], unknown, unknown, "id", boolean>;
  readonly style: {
    readonly type: _$vue.PropType<CSSProperties>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
};
type TableV2RowProps = ExtractPropTypes<typeof tableV2RowProps>;
type TableV2RowPropsPublic = ExtractPublicPropTypes<typeof tableV2RowProps>;
//#endregion
export { RowEventHandler, RowEventHandlerParams, RowEventHandlers, RowExpandHandler, RowExpandParams, RowHeightChangeHandler, RowHeightChangedParams, RowHoverHandler, RowHoverParams, TableV2RowProps, TableV2RowPropsPublic, tableV2RowProps };