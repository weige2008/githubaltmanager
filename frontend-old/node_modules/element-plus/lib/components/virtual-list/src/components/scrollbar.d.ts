import { EpPropFinalized, EpPropMergeType } from "../../../../utils/vue/props/types.js";
import * as _$vue from "vue";

//#region ../../packages/components/virtual-list/src/components/scrollbar.d.ts
declare const ScrollBar: _$vue.DefineComponent<_$vue.ExtractPropTypes<{
  readonly alwaysOn: BooleanConstructor;
  readonly class: StringConstructor;
  readonly layout: EpPropFinalized<StringConstructor, "horizontal" | "vertical", never, "vertical", false>;
  readonly total: {
    readonly type: _$vue.PropType<number>;
    readonly required: true;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly ratio: {
    readonly type: _$vue.PropType<number>;
    readonly required: true;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly clientSize: {
    readonly type: _$vue.PropType<number>;
    readonly required: true;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly scrollFrom: {
    readonly type: _$vue.PropType<number>;
    readonly required: true;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly scrollbarSize: EpPropFinalized<NumberConstructor, unknown, unknown, 6, boolean>;
  readonly startGap: EpPropFinalized<NumberConstructor, unknown, unknown, 0, boolean>;
  readonly endGap: EpPropFinalized<NumberConstructor, unknown, unknown, 2, boolean>;
  readonly visible: BooleanConstructor;
}>, () => _$vue.VNode<_$vue.RendererNode, _$vue.RendererElement, {
  [key: string]: any;
}>, {}, {}, {}, _$vue.ComponentOptionsMixin, _$vue.ComponentOptionsMixin, ("scroll" | "start-move" | "stop-move")[], "scroll" | "start-move" | "stop-move", _$vue.PublicProps, Readonly<_$vue.ExtractPropTypes<{
  readonly alwaysOn: BooleanConstructor;
  readonly class: StringConstructor;
  readonly layout: EpPropFinalized<StringConstructor, "horizontal" | "vertical", never, "vertical", false>;
  readonly total: {
    readonly type: _$vue.PropType<number>;
    readonly required: true;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly ratio: {
    readonly type: _$vue.PropType<number>;
    readonly required: true;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly clientSize: {
    readonly type: _$vue.PropType<number>;
    readonly required: true;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly scrollFrom: {
    readonly type: _$vue.PropType<number>;
    readonly required: true;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly scrollbarSize: EpPropFinalized<NumberConstructor, unknown, unknown, 6, boolean>;
  readonly startGap: EpPropFinalized<NumberConstructor, unknown, unknown, 0, boolean>;
  readonly endGap: EpPropFinalized<NumberConstructor, unknown, unknown, 2, boolean>;
  readonly visible: BooleanConstructor;
}>> & Readonly<{
  onScroll?: ((...args: any[]) => any) | undefined;
  "onStart-move"?: ((...args: any[]) => any) | undefined;
  "onStop-move"?: ((...args: any[]) => any) | undefined;
}>, {
  readonly layout: EpPropMergeType<StringConstructor, "horizontal" | "vertical", never>;
  readonly alwaysOn: boolean;
  readonly scrollbarSize: number;
  readonly startGap: number;
  readonly endGap: number;
  readonly visible: boolean;
}, {}, {}, {}, string, _$vue.ComponentProvideOptions, true, {}, any>;
//#endregion
export { ScrollBar as default };