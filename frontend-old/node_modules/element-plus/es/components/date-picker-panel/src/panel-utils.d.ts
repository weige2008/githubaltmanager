import { EpPropFinalized, EpPropMergeType } from "../../../utils/vue/props/types.js";
import { DayOrDays } from "../../time-picker/src/common/props.js";
import { DatePickerType } from "./types.js";
import * as _$vue from "vue";
import * as _$dayjs from "dayjs";

//#region ../../packages/components/date-picker-panel/src/panel-utils.d.ts
declare const getPanel: (type: DatePickerType) => ({
  new (...args: any[]): _$vue.CreateComponentPublicInstanceWithMixins<Readonly<_$vue.ExtractPropTypes<{
    readonly unlinkPanels: BooleanConstructor;
    readonly visible: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
    readonly showConfirm: BooleanConstructor;
    readonly showFooter: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
    readonly border: BooleanConstructor;
    readonly disabled: BooleanConstructor;
    readonly parsedValue: {
      readonly type: _$vue.PropType<EpPropMergeType<(new (...args: any[]) => _$dayjs.Dayjs | [_$dayjs.Dayjs, _$dayjs.Dayjs]) | (() => DayOrDays) | (((new (...args: any[]) => _$dayjs.Dayjs | [_$dayjs.Dayjs, _$dayjs.Dayjs]) | (() => DayOrDays)) | null)[], unknown, unknown>>;
      readonly required: false;
      readonly validator: ((val: unknown) => boolean) | undefined;
      __epPropKey: true;
    };
    readonly singlePanel: BooleanConstructor;
    readonly type: {
      readonly type: _$vue.PropType<EpPropMergeType<(new (...args: any[]) => "month" | "year" | "dates" | "months" | "years" | "date" | "week" | "datetime" | "datetimerange" | "daterange" | "monthrange" | "yearrange") | (() => "month" | "year" | "dates" | "months" | "years" | "date" | "week" | "datetime" | "datetimerange" | "daterange" | "monthrange" | "yearrange") | (((new (...args: any[]) => "month" | "year" | "dates" | "months" | "years" | "date" | "week" | "datetime" | "datetimerange" | "daterange" | "monthrange" | "yearrange") | (() => "month" | "year" | "dates" | "months" | "years" | "date" | "week" | "datetime" | "datetimerange" | "daterange" | "monthrange" | "yearrange")) | null)[], "month" | "year" | "dates" | "months" | "years" | "date" | "week" | "datetime" | "datetimerange" | "daterange" | "monthrange" | "yearrange", unknown>>;
      readonly required: true;
      readonly validator: ((val: unknown) => boolean) | undefined;
      __epPropKey: true;
    };
    readonly dateFormat: StringConstructor;
    readonly timeFormat: StringConstructor;
    readonly showNow: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
    readonly showWeekNumber: BooleanConstructor;
    readonly editable: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  }>> & Readonly<{
    onClear?: ((...args: any[]) => any) | undefined;
    "onCalendar-change"?: ((...args: any[]) => any) | undefined;
    "onPanel-change"?: ((...args: any[]) => any) | undefined;
    onPick?: ((...args: any[]) => any) | undefined;
    "onSet-picker-option"?: ((...args: any[]) => any) | undefined;
  }>, {}, {}, {}, {}, _$vue.ComponentOptionsMixin, _$vue.ComponentOptionsMixin, {
    clear: (...args: any[]) => void;
    "calendar-change": (...args: any[]) => void;
    "panel-change": (...args: any[]) => void;
    pick: (...args: any[]) => void;
    "set-picker-option": (...args: any[]) => void;
  }, _$vue.PublicProps, {
    readonly visible: EpPropMergeType<BooleanConstructor, unknown, unknown>;
    readonly border: boolean;
    readonly disabled: boolean;
    readonly editable: EpPropMergeType<BooleanConstructor, unknown, unknown>;
    readonly showNow: EpPropMergeType<BooleanConstructor, unknown, unknown>;
    readonly showConfirm: boolean;
    readonly showFooter: EpPropMergeType<BooleanConstructor, unknown, unknown>;
    readonly showWeekNumber: boolean;
    readonly unlinkPanels: boolean;
    readonly singlePanel: boolean;
  }, true, {}, {}, _$vue.GlobalComponents, _$vue.GlobalDirectives, string, {}, any, _$vue.ComponentProvideOptions, {
    P: {};
    B: {};
    D: {};
    C: {};
    M: {};
    Defaults: {};
  }, Readonly<_$vue.ExtractPropTypes<{
    readonly unlinkPanels: BooleanConstructor;
    readonly visible: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
    readonly showConfirm: BooleanConstructor;
    readonly showFooter: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
    readonly border: BooleanConstructor;
    readonly disabled: BooleanConstructor;
    readonly parsedValue: {
      readonly type: _$vue.PropType<EpPropMergeType<(new (...args: any[]) => _$dayjs.Dayjs | [_$dayjs.Dayjs, _$dayjs.Dayjs]) | (() => DayOrDays) | (((new (...args: any[]) => _$dayjs.Dayjs | [_$dayjs.Dayjs, _$dayjs.Dayjs]) | (() => DayOrDays)) | null)[], unknown, unknown>>;
      readonly required: false;
      readonly validator: ((val: unknown) => boolean) | undefined;
      __epPropKey: true;
    };
    readonly singlePanel: BooleanConstructor;
    readonly type: {
      readonly type: _$vue.PropType<EpPropMergeType<(new (...args: any[]) => "month" | "year" | "dates" | "months" | "years" | "date" | "week" | "datetime" | "datetimerange" | "daterange" | "monthrange" | "yearrange") | (() => "month" | "year" | "dates" | "months" | "years" | "date" | "week" | "datetime" | "datetimerange" | "daterange" | "monthrange" | "yearrange") | (((new (...args: any[]) => "month" | "year" | "dates" | "months" | "years" | "date" | "week" | "datetime" | "datetimerange" | "daterange" | "monthrange" | "yearrange") | (() => "month" | "year" | "dates" | "months" | "years" | "date" | "week" | "datetime" | "datetimerange" | "daterange" | "monthrange" | "yearrange")) | null)[], "month" | "year" | "dates" | "months" | "years" | "date" | "week" | "datetime" | "datetimerange" | "daterange" | "monthrange" | "yearrange", unknown>>;
      readonly required: true;
      readonly validator: ((val: unknown) => boolean) | undefined;
      __epPropKey: true;
    };
    readonly dateFormat: StringConstructor;
    readonly timeFormat: StringConstructor;
    readonly showNow: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
    readonly showWeekNumber: BooleanConstructor;
    readonly editable: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  }>> & Readonly<{
    onClear?: ((...args: any[]) => any) | undefined;
    "onCalendar-change"?: ((...args: any[]) => any) | undefined;
    "onPanel-change"?: ((...args: any[]) => any) | undefined;
    onPick?: ((...args: any[]) => any) | undefined;
    "onSet-picker-option"?: ((...args: any[]) => any) | undefined;
  }>, {}, {}, {}, {}, {
    readonly visible: EpPropMergeType<BooleanConstructor, unknown, unknown>;
    readonly border: boolean;
    readonly disabled: boolean;
    readonly editable: EpPropMergeType<BooleanConstructor, unknown, unknown>;
    readonly showNow: EpPropMergeType<BooleanConstructor, unknown, unknown>;
    readonly showConfirm: boolean;
    readonly showFooter: EpPropMergeType<BooleanConstructor, unknown, unknown>;
    readonly showWeekNumber: boolean;
    readonly unlinkPanels: boolean;
    readonly singlePanel: boolean;
  }>;
  __isFragment?: never;
  __isTeleport?: never;
  __isSuspense?: never;
} & _$vue.ComponentOptionsBase<Readonly<_$vue.ExtractPropTypes<{
  readonly unlinkPanels: BooleanConstructor;
  readonly visible: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  readonly showConfirm: BooleanConstructor;
  readonly showFooter: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  readonly border: BooleanConstructor;
  readonly disabled: BooleanConstructor;
  readonly parsedValue: {
    readonly type: _$vue.PropType<EpPropMergeType<(new (...args: any[]) => _$dayjs.Dayjs | [_$dayjs.Dayjs, _$dayjs.Dayjs]) | (() => DayOrDays) | (((new (...args: any[]) => _$dayjs.Dayjs | [_$dayjs.Dayjs, _$dayjs.Dayjs]) | (() => DayOrDays)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly singlePanel: BooleanConstructor;
  readonly type: {
    readonly type: _$vue.PropType<EpPropMergeType<(new (...args: any[]) => "month" | "year" | "dates" | "months" | "years" | "date" | "week" | "datetime" | "datetimerange" | "daterange" | "monthrange" | "yearrange") | (() => "month" | "year" | "dates" | "months" | "years" | "date" | "week" | "datetime" | "datetimerange" | "daterange" | "monthrange" | "yearrange") | (((new (...args: any[]) => "month" | "year" | "dates" | "months" | "years" | "date" | "week" | "datetime" | "datetimerange" | "daterange" | "monthrange" | "yearrange") | (() => "month" | "year" | "dates" | "months" | "years" | "date" | "week" | "datetime" | "datetimerange" | "daterange" | "monthrange" | "yearrange")) | null)[], "month" | "year" | "dates" | "months" | "years" | "date" | "week" | "datetime" | "datetimerange" | "daterange" | "monthrange" | "yearrange", unknown>>;
    readonly required: true;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly dateFormat: StringConstructor;
  readonly timeFormat: StringConstructor;
  readonly showNow: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  readonly showWeekNumber: BooleanConstructor;
  readonly editable: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
}>> & Readonly<{
  onClear?: ((...args: any[]) => any) | undefined;
  "onCalendar-change"?: ((...args: any[]) => any) | undefined;
  "onPanel-change"?: ((...args: any[]) => any) | undefined;
  onPick?: ((...args: any[]) => any) | undefined;
  "onSet-picker-option"?: ((...args: any[]) => any) | undefined;
}>, {}, {}, {}, {}, _$vue.ComponentOptionsMixin, _$vue.ComponentOptionsMixin, {
  clear: (...args: any[]) => void;
  "calendar-change": (...args: any[]) => void;
  "panel-change": (...args: any[]) => void;
  pick: (...args: any[]) => void;
  "set-picker-option": (...args: any[]) => void;
}, string, {
  readonly visible: EpPropMergeType<BooleanConstructor, unknown, unknown>;
  readonly border: boolean;
  readonly disabled: boolean;
  readonly editable: EpPropMergeType<BooleanConstructor, unknown, unknown>;
  readonly showNow: EpPropMergeType<BooleanConstructor, unknown, unknown>;
  readonly showConfirm: boolean;
  readonly showFooter: EpPropMergeType<BooleanConstructor, unknown, unknown>;
  readonly showWeekNumber: boolean;
  readonly unlinkPanels: boolean;
  readonly singlePanel: boolean;
}, {}, string, {}, _$vue.GlobalComponents, _$vue.GlobalDirectives, string, _$vue.ComponentProvideOptions> & _$vue.VNodeProps & _$vue.AllowedComponentProps & _$vue.ComponentCustomProps & (new () => {
  $slots: {
    sidebar?: (props: {
      class: string;
    }) => any;
  } & {
    'prev-year'?: (props: {}) => any;
  } & {
    'prev-month'?: (props: {}) => any;
  } & {
    'next-year'?: (props: {}) => any;
  } & {
    'next-month'?: (props: {}) => any;
  } & {
    'prev-year'?: (props: {}) => any;
  } & {
    'prev-month'?: (props: {}) => any;
  } & {
    'next-year'?: (props: {}) => any;
  } & {
    'next-month'?: (props: {}) => any;
  };
})) | ({
  new (...args: any[]): _$vue.CreateComponentPublicInstanceWithMixins<Readonly<_$vue.ExtractPropTypes<{
    readonly unlinkPanels: BooleanConstructor;
    readonly visible: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
    readonly showConfirm: BooleanConstructor;
    readonly showFooter: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
    readonly border: BooleanConstructor;
    readonly disabled: BooleanConstructor;
    readonly parsedValue: {
      readonly type: _$vue.PropType<EpPropMergeType<(new (...args: any[]) => _$dayjs.Dayjs | [_$dayjs.Dayjs, _$dayjs.Dayjs]) | (() => DayOrDays) | (((new (...args: any[]) => _$dayjs.Dayjs | [_$dayjs.Dayjs, _$dayjs.Dayjs]) | (() => DayOrDays)) | null)[], unknown, unknown>>;
      readonly required: false;
      readonly validator: ((val: unknown) => boolean) | undefined;
      __epPropKey: true;
    };
    readonly singlePanel: BooleanConstructor;
  }>> & Readonly<{}>, {}, {}, {}, {}, _$vue.ComponentOptionsMixin, _$vue.ComponentOptionsMixin, {}, _$vue.PublicProps, {
    readonly visible: EpPropMergeType<BooleanConstructor, unknown, unknown>;
    readonly border: boolean;
    readonly disabled: boolean;
    readonly showConfirm: boolean;
    readonly showFooter: EpPropMergeType<BooleanConstructor, unknown, unknown>;
    readonly unlinkPanels: boolean;
    readonly singlePanel: boolean;
  }, true, {}, {}, _$vue.GlobalComponents, _$vue.GlobalDirectives, string, {}, any, _$vue.ComponentProvideOptions, {
    P: {};
    B: {};
    D: {};
    C: {};
    M: {};
    Defaults: {};
  }, Readonly<_$vue.ExtractPropTypes<{
    readonly unlinkPanels: BooleanConstructor;
    readonly visible: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
    readonly showConfirm: BooleanConstructor;
    readonly showFooter: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
    readonly border: BooleanConstructor;
    readonly disabled: BooleanConstructor;
    readonly parsedValue: {
      readonly type: _$vue.PropType<EpPropMergeType<(new (...args: any[]) => _$dayjs.Dayjs | [_$dayjs.Dayjs, _$dayjs.Dayjs]) | (() => DayOrDays) | (((new (...args: any[]) => _$dayjs.Dayjs | [_$dayjs.Dayjs, _$dayjs.Dayjs]) | (() => DayOrDays)) | null)[], unknown, unknown>>;
      readonly required: false;
      readonly validator: ((val: unknown) => boolean) | undefined;
      __epPropKey: true;
    };
    readonly singlePanel: BooleanConstructor;
  }>> & Readonly<{}>, {}, {}, {}, {}, {
    readonly visible: EpPropMergeType<BooleanConstructor, unknown, unknown>;
    readonly border: boolean;
    readonly disabled: boolean;
    readonly showConfirm: boolean;
    readonly showFooter: EpPropMergeType<BooleanConstructor, unknown, unknown>;
    readonly unlinkPanels: boolean;
    readonly singlePanel: boolean;
  }>;
  __isFragment?: never;
  __isTeleport?: never;
  __isSuspense?: never;
} & _$vue.ComponentOptionsBase<Readonly<_$vue.ExtractPropTypes<{
  readonly unlinkPanels: BooleanConstructor;
  readonly visible: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  readonly showConfirm: BooleanConstructor;
  readonly showFooter: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  readonly border: BooleanConstructor;
  readonly disabled: BooleanConstructor;
  readonly parsedValue: {
    readonly type: _$vue.PropType<EpPropMergeType<(new (...args: any[]) => _$dayjs.Dayjs | [_$dayjs.Dayjs, _$dayjs.Dayjs]) | (() => DayOrDays) | (((new (...args: any[]) => _$dayjs.Dayjs | [_$dayjs.Dayjs, _$dayjs.Dayjs]) | (() => DayOrDays)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly singlePanel: BooleanConstructor;
}>> & Readonly<{}>, {}, {}, {}, {}, _$vue.ComponentOptionsMixin, _$vue.ComponentOptionsMixin, {}, string, {
  readonly visible: EpPropMergeType<BooleanConstructor, unknown, unknown>;
  readonly border: boolean;
  readonly disabled: boolean;
  readonly showConfirm: boolean;
  readonly showFooter: EpPropMergeType<BooleanConstructor, unknown, unknown>;
  readonly unlinkPanels: boolean;
  readonly singlePanel: boolean;
}, {}, string, {}, _$vue.GlobalComponents, _$vue.GlobalDirectives, string, _$vue.ComponentProvideOptions> & _$vue.VNodeProps & _$vue.AllowedComponentProps & _$vue.ComponentCustomProps & (new () => {
  $slots: {
    sidebar?: (props: {
      class: string;
    }) => any;
  } & {
    'prev-year'?: (props: {}) => any;
  } & {
    'next-year'?: (props: {}) => any;
  } & {
    'prev-year'?: (props: {}) => any;
  } & {
    'next-year'?: (props: {}) => any;
  };
})) | ({
  new (...args: any[]): _$vue.CreateComponentPublicInstanceWithMixins<Readonly<_$vue.ExtractPropTypes<{
    readonly parsedValue: {
      readonly type: _$vue.PropType<EpPropMergeType<(new (...args: any[]) => _$dayjs.Dayjs | [_$dayjs.Dayjs, _$dayjs.Dayjs]) | (() => DayOrDays) | (((new (...args: any[]) => _$dayjs.Dayjs | [_$dayjs.Dayjs, _$dayjs.Dayjs]) | (() => DayOrDays)) | null)[], unknown, unknown>>;
      readonly required: false;
      readonly validator: ((val: unknown) => boolean) | undefined;
      __epPropKey: true;
    };
    readonly visible: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
    readonly format: EpPropFinalized<StringConstructor, unknown, unknown, "", boolean>;
    readonly type: {
      readonly type: _$vue.PropType<EpPropMergeType<(new (...args: any[]) => "month" | "year" | "dates" | "months" | "years" | "date" | "week" | "datetime" | "datetimerange" | "daterange" | "monthrange" | "yearrange") | (() => "month" | "year" | "dates" | "months" | "years" | "date" | "week" | "datetime" | "datetimerange" | "daterange" | "monthrange" | "yearrange") | (((new (...args: any[]) => "month" | "year" | "dates" | "months" | "years" | "date" | "week" | "datetime" | "datetimerange" | "daterange" | "monthrange" | "yearrange") | (() => "month" | "year" | "dates" | "months" | "years" | "date" | "week" | "datetime" | "datetimerange" | "daterange" | "monthrange" | "yearrange")) | null)[], "month" | "year" | "dates" | "months" | "years" | "date" | "week" | "datetime" | "datetimerange" | "daterange" | "monthrange" | "yearrange", unknown>>;
      readonly required: true;
      readonly validator: ((val: unknown) => boolean) | undefined;
      __epPropKey: true;
    };
    readonly dateFormat: StringConstructor;
    readonly timeFormat: StringConstructor;
    readonly showNow: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
    readonly showConfirm: BooleanConstructor;
    readonly showFooter: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
    readonly showWeekNumber: BooleanConstructor;
    readonly border: BooleanConstructor;
    readonly disabled: BooleanConstructor;
    readonly editable: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  }>> & Readonly<{
    "onPanel-change"?: ((...args: any[]) => any) | undefined;
    onPick?: ((...args: any[]) => any) | undefined;
    "onSet-picker-option"?: ((...args: any[]) => any) | undefined;
  }>, {}, {}, {}, {}, _$vue.ComponentOptionsMixin, _$vue.ComponentOptionsMixin, {
    "panel-change": (...args: any[]) => void;
    pick: (...args: any[]) => void;
    "set-picker-option": (...args: any[]) => void;
  }, _$vue.PublicProps, {
    readonly visible: EpPropMergeType<BooleanConstructor, unknown, unknown>;
    readonly border: boolean;
    readonly disabled: boolean;
    readonly editable: EpPropMergeType<BooleanConstructor, unknown, unknown>;
    readonly showNow: EpPropMergeType<BooleanConstructor, unknown, unknown>;
    readonly showConfirm: boolean;
    readonly showFooter: EpPropMergeType<BooleanConstructor, unknown, unknown>;
    readonly showWeekNumber: boolean;
    readonly format: string;
  }, true, {}, {}, _$vue.GlobalComponents, _$vue.GlobalDirectives, string, {}, any, _$vue.ComponentProvideOptions, {
    P: {};
    B: {};
    D: {};
    C: {};
    M: {};
    Defaults: {};
  }, Readonly<_$vue.ExtractPropTypes<{
    readonly parsedValue: {
      readonly type: _$vue.PropType<EpPropMergeType<(new (...args: any[]) => _$dayjs.Dayjs | [_$dayjs.Dayjs, _$dayjs.Dayjs]) | (() => DayOrDays) | (((new (...args: any[]) => _$dayjs.Dayjs | [_$dayjs.Dayjs, _$dayjs.Dayjs]) | (() => DayOrDays)) | null)[], unknown, unknown>>;
      readonly required: false;
      readonly validator: ((val: unknown) => boolean) | undefined;
      __epPropKey: true;
    };
    readonly visible: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
    readonly format: EpPropFinalized<StringConstructor, unknown, unknown, "", boolean>;
    readonly type: {
      readonly type: _$vue.PropType<EpPropMergeType<(new (...args: any[]) => "month" | "year" | "dates" | "months" | "years" | "date" | "week" | "datetime" | "datetimerange" | "daterange" | "monthrange" | "yearrange") | (() => "month" | "year" | "dates" | "months" | "years" | "date" | "week" | "datetime" | "datetimerange" | "daterange" | "monthrange" | "yearrange") | (((new (...args: any[]) => "month" | "year" | "dates" | "months" | "years" | "date" | "week" | "datetime" | "datetimerange" | "daterange" | "monthrange" | "yearrange") | (() => "month" | "year" | "dates" | "months" | "years" | "date" | "week" | "datetime" | "datetimerange" | "daterange" | "monthrange" | "yearrange")) | null)[], "month" | "year" | "dates" | "months" | "years" | "date" | "week" | "datetime" | "datetimerange" | "daterange" | "monthrange" | "yearrange", unknown>>;
      readonly required: true;
      readonly validator: ((val: unknown) => boolean) | undefined;
      __epPropKey: true;
    };
    readonly dateFormat: StringConstructor;
    readonly timeFormat: StringConstructor;
    readonly showNow: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
    readonly showConfirm: BooleanConstructor;
    readonly showFooter: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
    readonly showWeekNumber: BooleanConstructor;
    readonly border: BooleanConstructor;
    readonly disabled: BooleanConstructor;
    readonly editable: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  }>> & Readonly<{
    "onPanel-change"?: ((...args: any[]) => any) | undefined;
    onPick?: ((...args: any[]) => any) | undefined;
    "onSet-picker-option"?: ((...args: any[]) => any) | undefined;
  }>, {}, {}, {}, {}, {
    readonly visible: EpPropMergeType<BooleanConstructor, unknown, unknown>;
    readonly border: boolean;
    readonly disabled: boolean;
    readonly editable: EpPropMergeType<BooleanConstructor, unknown, unknown>;
    readonly showNow: EpPropMergeType<BooleanConstructor, unknown, unknown>;
    readonly showConfirm: boolean;
    readonly showFooter: EpPropMergeType<BooleanConstructor, unknown, unknown>;
    readonly showWeekNumber: boolean;
    readonly format: string;
  }>;
  __isFragment?: never;
  __isTeleport?: never;
  __isSuspense?: never;
} & _$vue.ComponentOptionsBase<Readonly<_$vue.ExtractPropTypes<{
  readonly parsedValue: {
    readonly type: _$vue.PropType<EpPropMergeType<(new (...args: any[]) => _$dayjs.Dayjs | [_$dayjs.Dayjs, _$dayjs.Dayjs]) | (() => DayOrDays) | (((new (...args: any[]) => _$dayjs.Dayjs | [_$dayjs.Dayjs, _$dayjs.Dayjs]) | (() => DayOrDays)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly visible: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  readonly format: EpPropFinalized<StringConstructor, unknown, unknown, "", boolean>;
  readonly type: {
    readonly type: _$vue.PropType<EpPropMergeType<(new (...args: any[]) => "month" | "year" | "dates" | "months" | "years" | "date" | "week" | "datetime" | "datetimerange" | "daterange" | "monthrange" | "yearrange") | (() => "month" | "year" | "dates" | "months" | "years" | "date" | "week" | "datetime" | "datetimerange" | "daterange" | "monthrange" | "yearrange") | (((new (...args: any[]) => "month" | "year" | "dates" | "months" | "years" | "date" | "week" | "datetime" | "datetimerange" | "daterange" | "monthrange" | "yearrange") | (() => "month" | "year" | "dates" | "months" | "years" | "date" | "week" | "datetime" | "datetimerange" | "daterange" | "monthrange" | "yearrange")) | null)[], "month" | "year" | "dates" | "months" | "years" | "date" | "week" | "datetime" | "datetimerange" | "daterange" | "monthrange" | "yearrange", unknown>>;
    readonly required: true;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly dateFormat: StringConstructor;
  readonly timeFormat: StringConstructor;
  readonly showNow: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  readonly showConfirm: BooleanConstructor;
  readonly showFooter: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  readonly showWeekNumber: BooleanConstructor;
  readonly border: BooleanConstructor;
  readonly disabled: BooleanConstructor;
  readonly editable: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
}>> & Readonly<{
  "onPanel-change"?: ((...args: any[]) => any) | undefined;
  onPick?: ((...args: any[]) => any) | undefined;
  "onSet-picker-option"?: ((...args: any[]) => any) | undefined;
}>, {}, {}, {}, {}, _$vue.ComponentOptionsMixin, _$vue.ComponentOptionsMixin, {
  "panel-change": (...args: any[]) => void;
  pick: (...args: any[]) => void;
  "set-picker-option": (...args: any[]) => void;
}, string, {
  readonly visible: EpPropMergeType<BooleanConstructor, unknown, unknown>;
  readonly border: boolean;
  readonly disabled: boolean;
  readonly editable: EpPropMergeType<BooleanConstructor, unknown, unknown>;
  readonly showNow: EpPropMergeType<BooleanConstructor, unknown, unknown>;
  readonly showConfirm: boolean;
  readonly showFooter: EpPropMergeType<BooleanConstructor, unknown, unknown>;
  readonly showWeekNumber: boolean;
  readonly format: string;
}, {}, string, {}, _$vue.GlobalComponents, _$vue.GlobalDirectives, string, _$vue.ComponentProvideOptions> & _$vue.VNodeProps & _$vue.AllowedComponentProps & _$vue.ComponentCustomProps & (new () => {
  $slots: {
    sidebar?: (props: {
      class: string;
    }) => any;
  } & {
    'prev-year'?: (props: {}) => any;
  } & {
    'prev-month'?: (props: {}) => any;
  } & {
    'next-month'?: (props: {}) => any;
  } & {
    'next-year'?: (props: {}) => any;
  };
}));
//#endregion
export { getPanel };