Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
require("../../../_virtual/_rolldown/runtime.js");
const require_aria = require("../../../constants/aria.js");
const require_event = require("../../../constants/event.js");
const require_types = require("../../../utils/types.js");
const require_runtime$1 = require("../../../utils/vue/props/runtime.js");
const require_icon = require("../../../utils/vue/icon.js");
const require_index = require("../../../hooks/use-size/index.js");
const require_tag = require("../../tag/src/tag.js");
let _element_plus_icons_vue = require("@element-plus/icons-vue");
let _vue_shared = require("@vue/shared");
//#region ../../packages/components/input-tag/src/input-tag.ts
/**
* @deprecated Removed after 3.0.0, Use `InputTagProps` instead.
*/
const inputTagProps = require_runtime$1.buildProps({
	/**
	* @description binding value
	*/
	modelValue: { type: require_runtime$1.definePropType(Array) },
	/**
	* @description max number tags that can be enter
	*/
	max: Number,
	/**
	* @description tag type
	*/
	tagType: {
		...require_tag.tagProps.type,
		default: "info"
	},
	/**
	* @description tag effect
	*/
	tagEffect: require_tag.tagProps.effect,
	/**
	* @description tooltip theme, built-in theme: `dark` / `light`
	*/
	effect: {
		type: require_runtime$1.definePropType(String),
		default: "light"
	},
	/**
	* @description the key to trigger input tag
	*/
	trigger: {
		type: require_runtime$1.definePropType(String),
		default: require_aria.EVENT_CODE.enter
	},
	/**
	* @description whether tags can be dragged
	*/
	draggable: Boolean,
	/**
	* @description add a tag when a delimiter is matched
	*/
	delimiter: {
		type: [String, RegExp],
		default: ""
	},
	/**
	* @description input box size
	*/
	size: require_index.useSizeProp,
	/**
	* @description whether to show clear button
	*/
	clearable: Boolean,
	/**
	* @description custom clear icon component
	*/
	clearIcon: {
		type: require_icon.iconPropType,
		default: _element_plus_icons_vue.CircleClose
	},
	/**
	* @description whether to disable input-tag
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
	* @description native input readonly
	*/
	readonly: Boolean,
	/**
	* @description native input autofocus
	*/
	autofocus: Boolean,
	/**
	* @description same as `id` in native input
	*/
	id: {
		type: String,
		default: void 0
	},
	/**
	* @description same as `tabindex` in native input
	*/
	tabindex: {
		type: [String, Number],
		default: 0
	},
	/**
	* @description same as `maxlength` in native input
	*/
	maxlength: { type: [String, Number] },
	/**
	* @description same as `minlength` in native input
	*/
	minlength: { type: [String, Number] },
	/**
	* @description placeholder of input
	*/
	placeholder: String,
	/**
	* @description native input autocomplete
	*/
	autocomplete: {
		type: require_runtime$1.definePropType(String),
		default: "off"
	},
	/**
	* @description whether to save the input value when the input loses focus
	*/
	saveOnBlur: {
		type: Boolean,
		default: true
	},
	/**
	* @description whether to collapse tags to a text
	*/
	collapseTags: Boolean,
	/**
	* @description whether show all selected tags when mouse hover text of collapse-tags. To use this, `collapse-tags` must be true
	*/
	collapseTagsTooltip: Boolean,
	/**
	* @description the max tags number to be shown. To use this, `collapse-tags` must be true
	*/
	maxCollapseTags: {
		type: Number,
		default: 1
	},
	/**
	* @description native `aria-label` attribute
	*/
	ariaLabel: String
});
const inputTagEmits = {
	[require_event.UPDATE_MODEL_EVENT]: (value) => (0, _vue_shared.isArray)(value) || require_types.isUndefined(value),
	[require_event.CHANGE_EVENT]: (value) => (0, _vue_shared.isArray)(value) || require_types.isUndefined(value),
	[require_event.INPUT_EVENT]: (value) => (0, _vue_shared.isString)(value),
	"add-tag": (value) => (0, _vue_shared.isString)(value) || (0, _vue_shared.isArray)(value),
	"remove-tag": (value, index) => (0, _vue_shared.isString)(value) && require_types.isNumber(index),
	"drag-tag": (oldIndex, newIndex, value) => require_types.isNumber(oldIndex) && require_types.isNumber(newIndex) && (0, _vue_shared.isString)(value),
	focus: (evt) => evt instanceof FocusEvent,
	blur: (evt) => evt instanceof FocusEvent,
	clear: () => true
};
//#endregion
exports.inputTagEmits = inputTagEmits;
exports.inputTagProps = inputTagProps;

//# sourceMappingURL=input-tag.js.map