import { SelectControllerProps } from "./select-controller.js";
import * as _$vue from "vue";
import dayjs from "dayjs";

//#region ../../packages/components/calendar/src/select-controller.vue.d.ts
declare const __VLS_export: _$vue.DefineComponent<SelectControllerProps, {}, {}, {}, {}, _$vue.ComponentOptionsMixin, _$vue.ComponentOptionsMixin, {
  "date-change": (date: dayjs.Dayjs | "today") => void;
}, string, _$vue.PublicProps, Readonly<SelectControllerProps> & Readonly<{
  "onDate-change"?: ((date: dayjs.Dayjs | "today") => any) | undefined;
}>, {}, {}, {}, {}, string, _$vue.ComponentProvideOptions, false, {}, any>;
declare const _default: typeof __VLS_export;
//#endregion
export { _default as default };