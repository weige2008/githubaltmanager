import { UPDATE_MODEL_EVENT } from "../../../constants/event.mjs";
import { isFunction, isObject, isString } from "../../../utils/types.mjs";
import { buildProps, definePropType } from "../../../utils/vue/props/runtime.mjs";
import { useTooltipContentProps } from "../../tooltip/src/content.mjs";
import { inputProps } from "../../input/src/input.mjs";
import { filterOption } from "./helper.mjs";
//#region ../../packages/components/mention/src/mention.ts
/**
* @deprecated Removed after 3.0.0, Use `MentionProps` instead.
*/
const mentionProps = buildProps({
	...inputProps,
	/**
	* @description mention options list
	*/
	options: {
		type: definePropType(Array),
		default: () => []
	},
	/**
	* @description prefix character to trigger mentions. The string length must be exactly 1.
	*/
	prefix: {
		type: definePropType([String, Array]),
		default: "@",
		validator: (val) => {
			if (isString(val)) return val.length === 1;
			return val.every((v) => isString(v) && v.length === 1);
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
		type: definePropType([Boolean, Function]),
		default: () => filterOption,
		validator: (val) => {
			if (val === false) return true;
			return isFunction(val);
		}
	},
	/**
	* @description set popup placement
	*/
	placement: {
		type: definePropType(String),
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
	checkIsWhole: { type: definePropType(Function) },
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
	popperClass: useTooltipContentProps.popperClass,
	/**
	* @description custom style for dropdown panel
	*/
	popperStyle: useTooltipContentProps.popperStyle,
	/**
	* @description [popper.js](https://popper.js.org/docs/v2/) parameters
	*/
	popperOptions: {
		type: definePropType(Object),
		default: () => ({})
	},
	/**
	* @description configuration options
	*/
	props: {
		type: definePropType(Object),
		default: () => mentionDefaultProps
	}
});
const mentionEmits = {
	[UPDATE_MODEL_EVENT]: (value) => isString(value),
	"whole-remove": (pattern, prefix) => isString(pattern) && isString(prefix),
	input: (value) => isString(value),
	search: (pattern, prefix) => isString(pattern) && isString(prefix),
	select: (option, prefix) => isObject(option) && isString(prefix),
	focus: (evt) => evt instanceof FocusEvent,
	blur: (evt) => evt instanceof FocusEvent
};
const mentionDefaultProps = {
	value: "value",
	label: "label",
	disabled: "disabled"
};
//#endregion
export { mentionDefaultProps, mentionEmits, mentionProps };

//# sourceMappingURL=mention.mjs.map