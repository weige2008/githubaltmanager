import { buildProps, definePropType } from "../../../utils/vue/props/runtime.mjs";
import { useSizeProp } from "../../../hooks/use-size/index.mjs";
import { useEmptyValuesProps } from "../../../hooks/use-empty-values/index.mjs";
import { CircleClose, Clock } from "@element-plus/icons-vue";
//#region ../../packages/components/time-select/src/time-select.ts
const DEFAULT_START = "09:00";
const DEFAULT_END = "18:00";
const DEFAULT_STEP = "00:30";
/**
* @deprecated Removed after 3.0.0, Use `TimeSelectProps` instead.
*/
const timeSelectProps = buildProps({
	/**
	* @description set format of time
	*/
	format: {
		type: String,
		default: "HH:mm"
	},
	/**
	* @description binding value
	*/
	modelValue: { type: definePropType(String) },
	/**
	* @description whether TimeSelect is disabled
	*/
	disabled: {
		type: Boolean,
		default: void 0
	},
	/**
	* @description whether the input is editable
	*/
	editable: {
		type: Boolean,
		default: true
	},
	/**
	* @description Tooltip theme, built-in theme: `dark` / `light`
	*/
	effect: {
		type: definePropType(String),
		default: "light"
	},
	/**
	* @description whether to show clear button
	*/
	clearable: {
		type: Boolean,
		default: true
	},
	/**
	* @description size of Input
	*/
	size: useSizeProp,
	/**
	* @description placeholder in non-range mode
	*/
	placeholder: String,
	/**
	* @description start time
	*/
	start: {
		type: String,
		default: DEFAULT_START
	},
	/**
	* @description end time
	*/
	end: {
		type: String,
		default: DEFAULT_END
	},
	/**
	* @description time step
	*/
	step: {
		type: String,
		default: DEFAULT_STEP
	},
	/**
	* @description minimum time, any time before this time will be disabled
	*/
	minTime: { type: definePropType(String) },
	/**
	* @description maximum time, any time after this time will be disabled
	*/
	maxTime: { type: definePropType(String) },
	/**
	* @description whether `end` is included in options
	*/
	includeEndTime: Boolean,
	/**
	* @description same as `name` in native input
	*/
	name: String,
	/**
	* @description custom prefix icon component
	*/
	prefixIcon: {
		type: definePropType([String, Object]),
		default: () => Clock
	},
	/**
	* @description custom clear icon component
	*/
	clearIcon: {
		type: definePropType([String, Object]),
		default: () => CircleClose
	},
	/**
	* @description custom class name for TimeSelect's dropdown
	*/
	popperClass: {
		type: String,
		default: ""
	},
	/**
	* @description custom style for TimeSelect's dropdown
	*/
	popperStyle: { type: definePropType([String, Object]) },
	...useEmptyValuesProps
});
//#endregion
export { DEFAULT_END, DEFAULT_START, DEFAULT_STEP, timeSelectProps };

//# sourceMappingURL=time-select.mjs.map