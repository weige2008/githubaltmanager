import { Translator } from "../../../../hooks/use-locale/index.js";
import { CheckboxProps, CheckboxValueType } from "../../../checkbox/src/checkbox.js";
import _default$1 from "../../../checkbox/src/checkbox-button.vue.js";
import _default$2 from "../../../checkbox/src/checkbox-group.vue.js";
import { TableColumnCtx } from "../table-column/defaults.js";
import { Store } from "../store/index.js";
import TableLayout from "../table-layout.js";
import { DefaultRow, Sort, TableSortOrder } from "../table/defaults.js";
import * as _$vue from "vue";
import { ComponentInternalInstance, PropType, Ref } from "vue";

//#region ../../packages/components/table/src/table-header/index.d.ts
interface TableHeader extends ComponentInternalInstance {
  state: {
    onColumnsChange: (layout: TableLayout<any>) => void;
    onScrollableChange: (layout: TableLayout<any>) => void;
  };
  filterPanels: Ref<DefaultRow>;
}
interface TableHeaderProps<T extends DefaultRow> {
  fixed: string;
  store: Store<T>;
  border: boolean;
  defaultSort: Sort;
  allowDragLastColumn: boolean;
}
declare const _default: _$vue.DefineComponent<_$vue.ExtractPropTypes<{
  fixed: {
    type: StringConstructor;
    default: string;
  };
  store: {
    required: true;
    type: PropType<TableHeaderProps<any>["store"]>;
  };
  border: BooleanConstructor;
  defaultSort: {
    type: PropType<TableHeaderProps<any>["defaultSort"]>;
    default: () => {
      prop: string;
      order: string;
    };
  };
  appendFilterPanelTo: {
    type: StringConstructor;
  };
  allowDragLastColumn: {
    type: BooleanConstructor;
  };
}>, {
  ns: {
    namespace: _$vue.ComputedRef<string>;
    b: (blockSuffix?: string) => string;
    e: (element?: string) => string;
    m: (modifier?: string) => string;
    be: (blockSuffix?: string, element?: string) => string;
    em: (element?: string, modifier?: string) => string;
    bm: (blockSuffix?: string, modifier?: string) => string;
    bem: (blockSuffix?: string, element?: string, modifier?: string) => string;
    is: {
      (name: string, state: boolean | undefined): string;
      (name: string): string;
    };
    cssVar: (object: Record<string, string>) => Record<string, string>;
    cssVarName: (name: string) => string;
    cssVarBlock: (object: Record<string, string>) => Record<string, string>;
    cssVarBlockName: (name: string) => string;
  };
  t: Translator;
  filterPanels: Ref<{}, {}>;
  onColumnsChange: (layout: TableLayout<DefaultRow>) => void;
  onScrollableChange: (layout: TableLayout<DefaultRow>) => void;
  columnRows: _$vue.ComputedRef<TableColumnCtx<any>[][]>;
  getHeaderRowClass: (rowIndex: number) => string;
  getHeaderRowStyle: (rowIndex: number) => any;
  getHeaderCellClass: (rowIndex: number, columnIndex: number, row: any, column: TableColumnCtx<any>) => string;
  getHeaderCellStyle: (rowIndex: number, columnIndex: number, row: any, column: TableColumnCtx<any>) => _$vue.CSSProperties;
  handleHeaderClick: (event: PointerEvent, column: TableColumnCtx<any>) => void;
  handleHeaderContextMenu: (event: PointerEvent, column: TableColumnCtx<any>) => void;
  handleMouseDown: (event: MouseEvent, column: TableColumnCtx<any>) => void;
  handleMouseMove: (event: MouseEvent, column: TableColumnCtx<any>) => void;
  handleMouseOut: () => void;
  handleSortClick: (event: Event, column: TableColumnCtx<any>, givenOrder?: TableSortOrder | boolean) => void;
  handleFilterClick: (event: Event) => void;
  isGroup: _$vue.ComputedRef<boolean>;
  toggleAllSelection: (event: Event) => void;
  saveIndexSelection: _$vue.Reactive<Map<any, any>>;
  isTableLayoutAuto: boolean;
  theadRef: Ref<any, any>;
  updateFixedColumnStyle: () => void;
}, {}, {}, {}, _$vue.ComponentOptionsMixin, _$vue.ComponentOptionsMixin, {}, string, _$vue.PublicProps, Readonly<_$vue.ExtractPropTypes<{
  fixed: {
    type: StringConstructor;
    default: string;
  };
  store: {
    required: true;
    type: PropType<TableHeaderProps<any>["store"]>;
  };
  border: BooleanConstructor;
  defaultSort: {
    type: PropType<TableHeaderProps<any>["defaultSort"]>;
    default: () => {
      prop: string;
      order: string;
    };
  };
  appendFilterPanelTo: {
    type: StringConstructor;
  };
  allowDragLastColumn: {
    type: BooleanConstructor;
  };
}>> & Readonly<{}>, {
  fixed: string;
  border: boolean;
  defaultSort: Sort;
  allowDragLastColumn: boolean;
}, {}, {
  ElCheckbox: {
    new (...args: any[]): _$vue.CreateComponentPublicInstanceWithMixins<Readonly<CheckboxProps> & Readonly<{
      "onUpdate:modelValue"?: ((val: CheckboxValueType) => any) | undefined;
      onChange?: ((val: CheckboxValueType) => any) | undefined;
    }>, {}, {}, {}, {}, _$vue.ComponentOptionsMixin, _$vue.ComponentOptionsMixin, {
      "update:modelValue": (val: CheckboxValueType) => void;
      change: (val: CheckboxValueType) => void;
    }, _$vue.PublicProps, {
      name: string;
      id: string;
      disabled: boolean;
      modelValue: number | string | boolean;
      validateEvent: boolean;
      value: string | boolean | number | object;
      label: string | boolean | number | object;
      trueValue: string | number;
      falseValue: string | number;
      trueLabel: string | number;
      falseLabel: string | number;
    }, false, {}, {}, _$vue.GlobalComponents, _$vue.GlobalDirectives, string, {}, any, _$vue.ComponentProvideOptions, {
      P: {};
      B: {};
      D: {};
      C: {};
      M: {};
      Defaults: {};
    }, Readonly<CheckboxProps> & Readonly<{
      "onUpdate:modelValue"?: ((val: CheckboxValueType) => any) | undefined;
      onChange?: ((val: CheckboxValueType) => any) | undefined;
    }>, {}, {}, {}, {}, {
      name: string;
      id: string;
      disabled: boolean;
      modelValue: number | string | boolean;
      validateEvent: boolean;
      value: string | boolean | number | object;
      label: string | boolean | number | object;
      trueValue: string | number;
      falseValue: string | number;
      trueLabel: string | number;
      falseLabel: string | number;
    }>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
  } & _$vue.ComponentOptionsBase<Readonly<CheckboxProps> & Readonly<{
    "onUpdate:modelValue"?: ((val: CheckboxValueType) => any) | undefined;
    onChange?: ((val: CheckboxValueType) => any) | undefined;
  }>, {}, {}, {}, {}, _$vue.ComponentOptionsMixin, _$vue.ComponentOptionsMixin, {
    "update:modelValue": (val: CheckboxValueType) => void;
    change: (val: CheckboxValueType) => void;
  }, string, {
    name: string;
    id: string;
    disabled: boolean;
    modelValue: number | string | boolean;
    validateEvent: boolean;
    value: string | boolean | number | object;
    label: string | boolean | number | object;
    trueValue: string | number;
    falseValue: string | number;
    trueLabel: string | number;
    falseLabel: string | number;
  }, {}, string, {}, _$vue.GlobalComponents, _$vue.GlobalDirectives, string, _$vue.ComponentProvideOptions> & _$vue.VNodeProps & _$vue.AllowedComponentProps & _$vue.ComponentCustomProps & (new () => {
    $slots: {
      default?: (props: {}) => any;
    };
  }) & _$vue.ObjectPlugin & {
    setPropsDefaults: (defaults: {
      readonly modelValue?: string | number | boolean | (() => string | number | boolean) | undefined;
      readonly label?: string | number | boolean | (() => string | number | boolean | object) | undefined;
      readonly value?: string | number | boolean | (() => string | number | boolean | object) | undefined;
      readonly indeterminate?: boolean | (() => boolean) | undefined;
      readonly disabled?: boolean | (() => boolean) | undefined;
      readonly checked?: boolean | (() => boolean) | undefined;
      readonly name?: string | (() => string) | undefined;
      readonly trueValue?: string | number | (() => string | number) | undefined;
      readonly falseValue?: string | number | (() => string | number) | undefined;
      readonly trueLabel?: string | number | (() => string | number) | undefined;
      readonly falseLabel?: string | number | (() => string | number) | undefined;
      readonly id?: string | (() => string) | undefined;
      readonly border?: boolean | (() => boolean) | undefined;
      readonly size?: "" | "default" | "large" | "small" | (() => "" | "default" | "large" | "small") | undefined;
      readonly tabindex?: string | number | (() => string | number) | undefined;
      readonly validateEvent?: boolean | (() => boolean) | undefined;
      readonly ariaLabel?: string | (() => string) | undefined;
      readonly ariaControls?: string | (() => string) | undefined;
    }) => void;
  } & {
    CheckboxButton: typeof _default$1;
    CheckboxGroup: typeof _default$2;
  };
}, {}, string, _$vue.ComponentProvideOptions, true, {}, any>;
//#endregion
export { TableHeader, TableHeaderProps, _default as default };