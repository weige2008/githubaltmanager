import { FixedSizeListInstance } from "../../virtual-list/src/components/fixed-size-list.js";
import { DynamicSizeListInstance } from "../../virtual-list/src/components/dynamic-size-list.js";
import { ScrollbarDirection } from "../../scrollbar/src/scrollbar.js";
import { Option } from "./select.types.js";
import * as _$vue from "vue";
import { ComponentPublicInstance, ComputedRef, ExtractPropTypes, Ref } from "vue";
import * as _$vue_jsx_runtime0 from "vue/jsx-runtime";

//#region ../../packages/components/select-v2/src/select-dropdown.d.ts
declare const props: {
  loading: BooleanConstructor;
  data: {
    type: ArrayConstructor;
    required: true;
  };
  hoveringIndex: NumberConstructor;
  width: NumberConstructor;
  id: StringConstructor;
  ariaLabel: StringConstructor;
};
interface SelectDropdownExposed {
  listRef: Ref<FixedSizeListInstance | DynamicSizeListInstance | undefined>;
  isSized: ComputedRef<boolean>;
  isItemDisabled: (modelValue: any[] | any, selected: boolean) => boolean;
  isItemHovering: (target: number) => boolean;
  isItemSelected: (modelValue: any[] | any, target: Option) => boolean;
  scrollToItem: (index: number) => void;
  resetScrollTop: () => void;
}
type SelectDropdownInstance = ComponentPublicInstance<ExtractPropTypes<typeof props>, SelectDropdownExposed>;
declare const _default: _$vue.DefineComponent<ExtractPropTypes<{
  loading: BooleanConstructor;
  data: {
    type: ArrayConstructor;
    required: true;
  };
  hoveringIndex: NumberConstructor;
  width: NumberConstructor;
  id: StringConstructor;
  ariaLabel: StringConstructor;
}>, () => _$vue_jsx_runtime0.JSX.Element, {}, {}, {}, _$vue.ComponentOptionsMixin, _$vue.ComponentOptionsMixin, {
  'end-reached': (direction: ScrollbarDirection) => boolean;
}, string, _$vue.PublicProps, Readonly<ExtractPropTypes<{
  loading: BooleanConstructor;
  data: {
    type: ArrayConstructor;
    required: true;
  };
  hoveringIndex: NumberConstructor;
  width: NumberConstructor;
  id: StringConstructor;
  ariaLabel: StringConstructor;
}>> & Readonly<{
  "onEnd-reached"?: ((direction: ScrollbarDirection) => any) | undefined;
}>, {
  loading: boolean;
}, {}, {}, {}, string, _$vue.ComponentProvideOptions, true, {}, any>;
//#endregion
export { SelectDropdownInstance, _default as default };