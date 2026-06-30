Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
require("../../../_virtual/_rolldown/runtime.js");
const require_runtime$1 = require("../../../utils/vue/props/runtime.js");
const require_index = require("../../../hooks/use-size/index.js");
const require_index$1 = require("../../../hooks/use-empty-values/index.js");
let _element_plus_icons_vue = require("@element-plus/icons-vue");
//#region ../../packages/components/time-select/src/time-select.ts
const DEFAULT_START = "09:00";
const DEFAULT_END = "18:00";
const DEFAULT_STEP = "00:30";
/**
* @deprecated Removed after 3.0.0, Use `TimeSelectProps` instead.
*/
const timeSelectProps = require_runtime$1.buildProps({
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
	modelValue: { type: require_runtime$1.definePropType(String) },
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
		type: require_runtime$1.definePropType(String),
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
	size: require_index.useSizeProp,
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
	minTime: { type: require_runtime$1.definePropType(String) },
	/**
	* @description maximum time, any time after this time will be disabled
	*/
	maxTime: { type: require_runtime$1.definePropType(String) },
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
		type: require_runtime$1.definePropType([String, Object]),
		default: () => _element_plus_icons_vue.Clock
	},
	/**
	* @description custom clear icon component
	*/
	clearIcon: {
		type: require_runtime$1.definePropType([String, Object]),
		default: () => _element_plus_icons_vue.CircleClose
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
	popperStyle: { type: require_runtime$1.definePropType([String, Object]) },
	...require_index$1.useEmptyValuesProps
});
//#endregion
exports.DEFAULT_END = DEFAULT_END;
exports.DEFAULT_START = DEFAULT_START;
exports.DEFAULT_STEP = DEFAULT_STEP;
exports.timeSelectProps = timeSelectProps;

//# sourceMappingURL=time-select.js.map