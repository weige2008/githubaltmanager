Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
require("../../../_virtual/_rolldown/runtime.js");
const require_event = require("../../../constants/event.js");
const require_types = require("../../../utils/types.js");
const require_runtime$1 = require("../../../utils/vue/props/runtime.js");
const require_index = require("../../../hooks/use-size/index.js");
const require_index$1 = require("../../../hooks/use-aria/index.js");
let _vue_shared = require("@vue/shared");
//#region ../../packages/components/segmented/src/segmented.ts
const defaultProps = {
	label: "label",
	value: "value",
	disabled: "disabled"
};
/**
* @deprecated Removed after 3.0.0, Use `SegmentedProps` instead.
*/
const segmentedProps = require_runtime$1.buildProps({
	direction: {
		type: require_runtime$1.definePropType(String),
		default: "horizontal"
	},
	/**
	* @description options of segmented
	*/
	options: {
		type: require_runtime$1.definePropType(Array),
		default: () => []
	},
	/**
	* @description binding value
	*/
	modelValue: {
		type: [
			String,
			Number,
			Boolean
		],
		default: void 0
	},
	/**
	* @description configuration options, see the following table
	*/
	props: {
		type: require_runtime$1.definePropType(Object),
		default: () => defaultProps
	},
	/**
	* @description fit width of parent content
	*/
	block: Boolean,
	/**
	* @description size of component
	*/
	size: require_index.useSizeProp,
	/**
	* @description whether segmented is disabled
	*/
	disabled: {
		type: Boolean,
		default: void 0
	},
	/**
	* @description whether to trigger form validation
	*/
	validateEvent: {
		type: Boolean,
		default: true
	},
	/**
	* @description native input id
	*/
	id: String,
	/**
	* @description native `name` attribute
	*/
	name: String,
	...require_index$1.useAriaProps(["ariaLabel"])
});
const segmentedEmits = {
	[require_event.UPDATE_MODEL_EVENT]: (val) => (0, _vue_shared.isString)(val) || require_types.isNumber(val) || require_types.isBoolean(val),
	[require_event.CHANGE_EVENT]: (val) => (0, _vue_shared.isString)(val) || require_types.isNumber(val) || require_types.isBoolean(val)
};
//#endregion
exports.defaultProps = defaultProps;
exports.segmentedEmits = segmentedEmits;
exports.segmentedProps = segmentedProps;

//# sourceMappingURL=segmented.js.map