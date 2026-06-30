import { EpPropFinalized } from "../../../utils/vue/props/types.js";
import { ItemSize } from "../../virtual-list/src/types.js";
import { KeyType } from "./types.js";
import { AnyColumn } from "./common.js";
import * as _$vue from "vue";
import { ExtractPropTypes, ExtractPublicPropTypes } from "vue";

//#region ../../packages/components/table-v2/src/grid.d.ts
type onRowRenderedParams = {
  rowCacheStart: number;
  rowCacheEnd: number;
  rowVisibleStart: number;
  rowVisibleEnd: number;
};
declare const tableV2GridProps: {
  readonly columns: {
    readonly type: _$vue.PropType<AnyColumn[]>;
    readonly required: true;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly data: {
    readonly type: _$vue.PropType<any[]>;
    readonly required: true;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly fixedData: {
    readonly type: _$vue.PropType<any[]>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly estimatedRowHeight: {
    readonly default: undefined;
    readonly type: _$vue.PropType<number>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    readonly __epPropKey: true;
  };
  readonly width: {
    readonly type: _$vue.PropType<number>;
    readonly required: true;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly height: {
    readonly type: _$vue.PropType<number>;
    readonly required: true;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly headerWidth: {
    readonly type: _$vue.PropType<number>;
    readonly required: true;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly headerHeight: EpPropFinalized<(new (...args: any[]) => number | number[]) | (() => number | number[]) | (((new (...args: any[]) => number | number[]) | (() => number | number[])) | null)[], unknown, unknown, 50, boolean>;
  readonly bodyWidth: {
    readonly type: _$vue.PropType<number>;
    readonly required: true;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly rowHeight: {
    readonly type: _$vue.PropType<number>;
    readonly required: true;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly cache: EpPropFinalized<NumberConstructor, never, never, 2, false>;
  readonly useIsScrolling: BooleanConstructor;
  readonly scrollbarAlwaysOn: BooleanConstructor;
  readonly scrollbarStartGap: EpPropFinalized<NumberConstructor, unknown, unknown, 0, boolean>;
  readonly scrollbarEndGap: EpPropFinalized<NumberConstructor, unknown, unknown, 2, boolean>;
  readonly class: StringConstructor;
  readonly style: {
    readonly type: _$vue.PropType<_$vue.CSSProperties>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly containerStyle: {
    readonly type: _$vue.PropType<_$vue.CSSProperties>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly getRowHeight: {
    readonly type: _$vue.PropType<ItemSize>;
    readonly required: true;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly rowKey: EpPropFinalized<(new (...args: any[]) => string | number | symbol) | (() => KeyType) | (((new (...args: any[]) => string | number | symbol) | (() => KeyType)) | null)[], unknown, unknown, "id", boolean>;
  readonly onRowsRendered: {
    readonly type: _$vue.PropType<(params: onRowRenderedParams) => void>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly onScroll: {
    readonly type: _$vue.PropType<(...args: any[]) => void>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
};
type TableV2GridProps = ExtractPropTypes<typeof tableV2GridProps>;
type TableV2GridPropsPublic = ExtractPublicPropTypes<typeof tableV2GridProps>;
//#endregion
export { TableV2GridProps, TableV2GridPropsPublic, onRowRenderedParams, tableV2GridProps };