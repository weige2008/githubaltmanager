import { DateModelType, DayOrDays, ModelValueType, PickerOptions, SingleOrRange, UserInput } from "../common/props.js";
import * as _$vue from "vue";
import { Dayjs } from "dayjs";

//#region ../../packages/components/time-picker/src/composables/use-common-picker.d.ts
interface CommonPickerProps {
  modelValue: ModelValueType | null;
  valueFormat?: string;
}
type CommonPickerEmits = (event: 'update:modelValue' | 'calendar-change' | 'panel-change', ...args: any[]) => void;
declare const useCommonPicker: <P extends CommonPickerProps, E extends CommonPickerEmits>(props: P, emit: E) => {
  parsedValue: _$vue.ComputedRef<DayOrDays>;
  pickerActualVisible: _$vue.Ref<boolean, boolean>;
  pickerOptions: _$vue.Ref<{
    isValidValue?: ((date: DayOrDays) => boolean) | undefined;
    handleKeydownInput?: ((event: KeyboardEvent) => void) | undefined;
    parseUserInput?: ((value: UserInput) => DayOrDays) | undefined;
    getRangeAvailableTime?: ((date: DayOrDays) => DayOrDays) | undefined;
    getDefaultValue?: (() => DayOrDays) | undefined;
    panelReady?: boolean | undefined;
    handleClear?: (() => void) | undefined;
    handleFocusPicker?: (() => void) | undefined;
    handleCancel?: (() => void) | undefined;
  }, Partial<PickerOptions> | {
    isValidValue?: ((date: DayOrDays) => boolean) | undefined;
    handleKeydownInput?: ((event: KeyboardEvent) => void) | undefined;
    parseUserInput?: ((value: UserInput) => DayOrDays) | undefined;
    getRangeAvailableTime?: ((date: DayOrDays) => DayOrDays) | undefined;
    getDefaultValue?: (() => DayOrDays) | undefined;
    panelReady?: boolean | undefined;
    handleClear?: (() => void) | undefined;
    handleFocusPicker?: (() => void) | undefined;
    handleCancel?: (() => void) | undefined;
  }>;
  pickerVisible: _$vue.Ref<boolean, boolean>;
  userInput: _$vue.Ref<UserInput, UserInput>;
  valueIsEmpty: _$vue.ComputedRef<boolean>;
  emitInput: (input: SingleOrRange<DateModelType> | null) => void;
  onCalendarChange: (e: [Date, null | Date]) => void;
  onPanelChange: (value: [Dayjs, Dayjs], mode: "month" | "year", view: unknown) => void;
  onPick: (date?: any, visible?: boolean) => void;
  onSetPickerOption: <T extends keyof PickerOptions>(e: [T, PickerOptions[T]]) => void;
};
type CommonPickerContext = ReturnType<typeof useCommonPicker>;
//#endregion
export { CommonPickerContext, useCommonPicker };