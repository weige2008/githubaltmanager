import { EpPropFinalized, EpPropMergeType } from "../../../utils/vue/props/types.js";
import * as _$vue from "vue";
import { ExtractPropTypes, ExtractPublicPropTypes } from "vue";

//#region ../../packages/components/timeline/src/timeline.d.ts
declare const timelineProps: {
  readonly mode: EpPropFinalized<StringConstructor, "start" | "end" | "alternate" | "alternate-reverse", unknown, "start", boolean>;
  readonly reverse: BooleanConstructor;
};
type TimelineProps = ExtractPropTypes<typeof timelineProps>;
type TimelinePropsPublic = ExtractPublicPropTypes<typeof timelineProps>;
declare const Timeline: _$vue.DefineComponent<ExtractPropTypes<{
  readonly mode: EpPropFinalized<StringConstructor, "start" | "end" | "alternate" | "alternate-reverse", unknown, "start", boolean>;
  readonly reverse: BooleanConstructor;
}>, () => _$vue.VNode<_$vue.RendererNode, _$vue.RendererElement, {
  [key: string]: any;
}>, {}, {}, {}, _$vue.ComponentOptionsMixin, _$vue.ComponentOptionsMixin, {}, string, _$vue.PublicProps, Readonly<ExtractPropTypes<{
  readonly mode: EpPropFinalized<StringConstructor, "start" | "end" | "alternate" | "alternate-reverse", unknown, "start", boolean>;
  readonly reverse: BooleanConstructor;
}>> & Readonly<{}>, {
  readonly reverse: boolean;
  readonly mode: EpPropMergeType<StringConstructor, "start" | "end" | "alternate" | "alternate-reverse", unknown>;
}, {}, {}, {}, string, _$vue.ComponentProvideOptions, true, {}, any>;
type TimelineInstance = InstanceType<typeof Timeline> & unknown;
//#endregion
export { TimelineInstance, TimelineProps, TimelinePropsPublic, Timeline as default, timelineProps };