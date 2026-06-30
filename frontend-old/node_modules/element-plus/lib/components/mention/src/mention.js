Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
require("../../../_virtual/_rolldown/runtime.js");
const require_event = require("../../../constants/event.js");
const require_runtime$1 = require("../../../utils/vue/props/runtime.js");
const require_content = require("../../tooltip/src/content.js");
const require_input = require("../../input/src/input.js");
const require_helper = require("./helper.js");
let _vue_shared = require("@vue/shared");
//#region ../../packages/components/mention/src/mention.ts
/**
* @deprecated Removed after 3.0.0, Use `MentionProps` instead.
*/
const mentionProps = require_runtime$1.buildProps({
	...require_input.inputProps,
	/**
	* @description mention options list
	*/
	options: {
		type: require_runtime$1.definePropType(Array),
		default: () => []
	},
	/**
	* @description prefix character to trigger mentions. The string length must be exactly 1.
	*/
	prefix: {
		type: require_runtime$1.definePropType([String, Array]),
		default: "@",
		validator: (val) => {
			if ((0, _vue_shared.isString)(val)) return val.length === 1;
			return val.every((v) => (0, _vue_shared.isString)(v) && v.length === 1);
		}
	},
	/**
	* @description character to split mentions. The string length must be exactly 1.
	*/
	split: {
		type: String,
		default: " ",
		validator: (val) => val.length === 1
	},
	/**
	* @description customize filter option logic.
	*/
	filterOption: {
		type: require_runtime$1.definePropType([Boolean, Function]),
		default: () => require_helper.filterOption,
		validator: (val) => {
			if (val === false) return true;
			return (0, _vue_shared.isFunction)(val);
		}
	},
	/**
	* @description set popup placement
	*/
	placement: {
		type: require_runtime$1.definePropType(String),
		default: "bottom"
	},
	/**
	* @description whether the dropdown panel has an arrow
	*/
	showArrow: Boolean,
	/**
	* @description offset of the dropdown panel
	*/
	offset: {
		type: Number,
		default: 0
	},
	/**
	* @description when backspace is pressed to delete, whether the mention content is deleted as a whole
	*/
	whole: Boolean,
	/**
	* @description when backspace is pressed to delete, check if the mention is a whole
	*/
	checkIsWhole: { type: require_runtime$1.definePropType(Function) },
	/**
	* @description input value
	*/
	modelValue: String,
	/**
	* @description whether the dropdown panel of mentions is in a loading state.
	*/
	loading: Boolean,
	/**
	* @description custom class name for dropdown panel
	*/
	popperClass: require_content.useTooltipContentProps.popperClass,
	/**
	* @description custom style for dropdown panel
	*/
	popperStyle: require_content.useTooltipContentProps.popperStyle,
	/**
	* @description [popper.js](https://popper.js.org/docs/v2/) parameters
	*/
	popperOptions: {
		type: require_runtime$1.definePropType(Object),
		default: () => ({})
	},
	/**
	* @description configuration options
	*/
	props: {
		type: require_runtime$1.definePropType(Object),
		default: () => mentionDefaultProps
	}
});
const mentionEmits = {
	[require_event.UPDATE_MODEL_EVENT]: (value) => (0, _vue_shared.isString)(value),
	"whole-remove": (pattern, prefix) => (0, _vue_shared.isString)(pattern) && (0, _vue_shared.isString)(prefix),
	input: (value) => (0, _vue_shared.isString)(value),
	search: (pattern, prefix) => (0, _vue_shared.isString)(pattern) && (0, _vue_shared.isString)(prefix),
	select: (option, prefix) => (0, _vue_shared.isObject)(option) && (0, _vue_shared.isString)(prefix),
	focus: (evt) => evt instanceof FocusEvent,
	blur: (evt) => evt instanceof FocusEvent
};
const mentionDefaultProps = {
	value: "value",
	label: "label",
	disabled: "disabled"
};
//#endregion
exports.mentionDefaultProps = mentionDefaultProps;
exports.mentionEmits = mentionEmits;
exports.mentionProps = mentionProps;

//# sourceMappingURL=mention.js.map