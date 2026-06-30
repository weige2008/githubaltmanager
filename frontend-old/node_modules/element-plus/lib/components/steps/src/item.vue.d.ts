import { IconPropType } from "../../../utils/vue/icon.js";
import { StepsProps } from "./steps.js";
import { StepProps } from "./item.js";
import * as _$vue from "vue";
import { ComputedRef, Ref, VNode } from "vue";

//#region ../../packages/components/steps/src/item.vue.d.ts
interface StepItemState {
  uid: number;
  getVnode: () => VNode;
  currentStatus: ComputedRef<string>;
  internalStatus: Ref<string>;
  setIndex: (val: number) => void;
  calcProgress: (status: string) => void;
}
interface IStepsInject {
  props: Required<StepsProps>;
  steps: Ref<StepItemState[]>;
  addStep: (item: StepItemState) => void;
  removeStep: (item: StepItemState) => void;
}
declare var __VLS_1: {}, __VLS_36: {}, __VLS_38: {};
type __VLS_Slots = {} & {
  icon?: (props: typeof __VLS_1) => any;
} & {
  title?: (props: typeof __VLS_36) => any;
} & {
  description?: (props: typeof __VLS_38) => any;
};
declare const __VLS_base: _$vue.DefineComponent<StepProps, {}, {}, {}, {}, _$vue.ComponentOptionsMixin, _$vue.ComponentOptionsMixin, {}, string, _$vue.PublicProps, Readonly<StepProps> & Readonly<{}>, {
  icon: IconPropType;
  title: string;
  description: string;
  status: "" | "wait" | "process" | "finish" | "error" | "success";
}, {}, {}, {}, string, _$vue.ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
type __VLS_WithSlots<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
export { IStepsInject, StepItemState, _default as default };