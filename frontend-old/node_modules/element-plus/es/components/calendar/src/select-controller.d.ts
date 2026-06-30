import * as _$vue from "vue";
import { ExtractPublicPropTypes } from "vue";
import { Dayjs } from "dayjs";

//#region ../../packages/components/calendar/src/select-controller.d.ts
interface SelectControllerProps {
  date: Dayjs;
  formatter?: (value: number, type: 'year' | 'month') => string | number;
}
/**
 *  @deprecated Removed after 3.0.0, Use `SelectControllerProps` instead.
 */
declare const selectControllerProps: {
  readonly date: {
    readonly type: _$vue.PropType<Dayjs>;
    readonly required: true;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly formatter: {
    readonly type: _$vue.PropType<(value: number, type: "year" | "month") => string | number>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
};
/**
 *  @deprecated Removed after 3.0.0, Use `SelectControllerProps` instead.
 */
type SelectControllerPropsPublic = ExtractPublicPropTypes<typeof selectControllerProps>;
declare const selectControllerEmits: {
  'date-change': (date: Dayjs | "today") => boolean;
};
type SelectControllerEmits = typeof selectControllerEmits;
//#endregion
export { SelectControllerEmits, SelectControllerProps, SelectControllerPropsPublic, selectControllerEmits, selectControllerProps };