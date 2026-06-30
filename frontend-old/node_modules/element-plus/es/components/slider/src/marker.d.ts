import { EpPropFinalized, EpPropMergeType } from "../../../utils/vue/props/types.js";
import * as _$vue from "vue";
import { CSSProperties, ExtractPropTypes, ExtractPublicPropTypes } from "vue";

//#region ../../packages/components/slider/src/marker.d.ts
declare const sliderMarkerProps: {
  readonly mark: EpPropFinalized<(new (...args: any[]) => string | {
    style: CSSProperties;
    label: any;
  }) | (() => string | {
    style: CSSProperties;
    label: any;
  }) | (((new (...args: any[]) => string | {
    style: CSSProperties;
    label: any;
  }) | (() => string | {
    style: CSSProperties;
    label: any;
  })) | null)[], unknown, unknown, undefined, boolean>;
};
type SliderMarkerProps = ExtractPropTypes<typeof sliderMarkerProps>;
type SliderMarkerPropsPublic = ExtractPublicPropTypes<typeof sliderMarkerProps>;
declare const _default: _$vue.DefineComponent<ExtractPropTypes<{
  readonly mark: EpPropFinalized<(new (...args: any[]) => string | {
    style: CSSProperties;
    label: any;
  }) | (() => string | {
    style: CSSProperties;
    label: any;
  }) | (((new (...args: any[]) => string | {
    style: CSSProperties;
    label: any;
  }) | (() => string | {
    style: CSSProperties;
    label: any;
  })) | null)[], unknown, unknown, undefined, boolean>;
}>, () => _$vue.VNode<_$vue.RendererNode, _$vue.RendererElement, {
  [key: string]: any;
}>, {}, {}, {}, _$vue.ComponentOptionsMixin, _$vue.ComponentOptionsMixin, {}, string, _$vue.PublicProps, Readonly<ExtractPropTypes<{
  readonly mark: EpPropFinalized<(new (...args: any[]) => string | {
    style: CSSProperties;
    label: any;
  }) | (() => string | {
    style: CSSProperties;
    label: any;
  }) | (((new (...args: any[]) => string | {
    style: CSSProperties;
    label: any;
  }) | (() => string | {
    style: CSSProperties;
    label: any;
  })) | null)[], unknown, unknown, undefined, boolean>;
}>> & Readonly<{}>, {
  readonly mark: EpPropMergeType<(new (...args: any[]) => string | {
    style: CSSProperties;
    label: any;
  }) | (() => string | {
    style: CSSProperties;
    label: any;
  }) | (((new (...args: any[]) => string | {
    style: CSSProperties;
    label: any;
  }) | (() => string | {
    style: CSSProperties;
    label: any;
  })) | null)[], unknown, unknown>;
}, {}, {}, {}, string, _$vue.ComponentProvideOptions, true, {}, any>;
//#endregion
export { SliderMarkerProps, SliderMarkerPropsPublic, _default as default, sliderMarkerProps };