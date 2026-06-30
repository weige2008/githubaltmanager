import { ComponentSize } from "../../constants/size.js";
import { Option } from "./src/types.js";
import { Props, SegmentedEmits, SegmentedInstance, SegmentedProps, SegmentedPropsPublic, defaultProps, segmentedEmits, segmentedProps } from "./src/segmented.js";
import * as _$vue from "vue";

//#region ../../packages/components/segmented/index.d.ts
declare const ElSegmented: (<T extends Option = Option>(__VLS_props: NonNullable<Awaited<typeof __VLS_setup>>["props"], __VLS_ctx?: {
  slots: {
    default?: (props: {
      item: T;
    }) => any;
  };
  attrs: any;
  emit: ((event: "update:modelValue", val: any) => void) & ((event: "change", val: any) => void);
}, __VLS_exposed?: NonNullable<Awaited<typeof __VLS_setup>>["expose"], __VLS_setup?: Promise<{
  props: _$vue.PublicProps & {
    direction?: "vertical" | "horizontal" | undefined;
    options?: T[] | undefined;
    modelValue?: string | number | boolean | undefined;
    props?: Props | undefined;
    block?: boolean | undefined;
    size?: ComponentSize | undefined;
    disabled?: boolean | undefined;
    validateEvent?: boolean | undefined;
    id?: string | undefined;
    name?: string | undefined;
    ariaLabel?: string | undefined;
    "onUpdate:modelValue"?: ((val: any) => any) | undefined;
    onChange?: ((val: any) => any) | undefined;
  } & (typeof globalThis extends {
    __VLS_PROPS_FALLBACK: infer P;
  } ? P : {});
  expose: (exposed: {}) => void;
  attrs: any;
  slots: {
    default?: (props: {
      item: T;
    }) => any;
  };
  emit: ((event: "update:modelValue", val: any) => void) & ((event: "change", val: any) => void);
}>) => _$vue.VNode & {
  __ctx?: Awaited<typeof __VLS_setup>;
}) & _$vue.ObjectPlugin & {
  setPropsDefaults: (defaults: {
    direction?: "horizontal" | "vertical" | (() => "horizontal" | "vertical") | undefined;
    options?: (() => Option[]) | undefined;
    modelValue?: string | number | boolean | (() => string | number | boolean) | undefined;
    props?: (() => Props) | undefined;
    block?: boolean | (() => boolean) | undefined;
    size?: "" | "default" | "large" | "small" | (() => "" | "default" | "large" | "small") | undefined;
    disabled?: boolean | (() => boolean) | undefined;
    validateEvent?: boolean | (() => boolean) | undefined;
    id?: string | (() => string) | undefined;
    name?: string | (() => string) | undefined;
    ariaLabel?: string | (() => string) | undefined;
  }) => void;
} & Record<string, any>;
//#endregion
export { ElSegmented, ElSegmented as default, Props, SegmentedEmits, SegmentedInstance, SegmentedProps, SegmentedPropsPublic, defaultProps, segmentedEmits, segmentedProps };