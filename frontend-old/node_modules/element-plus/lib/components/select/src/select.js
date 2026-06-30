Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
require("../../../_virtual/_rolldown/runtime.js");
const require_event = require("../../../constants/event.js");
const require_runtime$1 = require("../../../utils/vue/props/runtime.js");
const require_icon = require("../../../utils/vue/icon.js");
const require_index = require("../../../hooks/use-size/index.js");
const require_index$1 = require("../../../hooks/use-empty-values/index.js");
const require_index$2 = require("../../../hooks/use-aria/index.js");
const require_content = require("../../tooltip/src/content.js");
const require_scrollbar = require("../../scrollbar/src/scrollbar.js");
const require_tag = require("../../tag/src/tag.js");
const require_useProps = require("../../select-v2/src/useProps.js");
let _element_plus_icons_vue = require("@element-plus/icons-vue");
let _popperjs_core = require("@popperjs/core");
//#region ../../packages/components/select/src/select.ts
const selectProps = require_runtime$1.buildProps({
	/**
	* @description the name attribute of select input
	*/
	name: String,
	/**
	* @description native input id
	*/
	id: String,
	/**
	* @description binding value
	*/
	modelValue: {
		type: require_runtime$1.definePropType([
			Array,
			String,
			Number,
			Boolean,
			Object
		]),
		default: void 0
	},
	/**
	* @description the autocomplete attribute of select input
	*/
	autocomplete: {
		type: String,
		default: "off"
	},
	/**
	* @description for non-filterable Select, this prop decides if the option menu pops up when the input is focused
	*/
	automaticDropdown: Boolean,
	/**
	* @description size of Input
	*/
	size: require_index.useSizeProp,
	/**
	* @description tooltip theme, built-in theme: `dark` / `light`
	*/
	effect: {
		type: require_runtime$1.definePropType(String),
		default: "light"
	},
	/**
	* @description whether Select is disabled
	*/
	disabled: {
		type: Boolean,
		default: void 0
	},
	/**
	* @description whether select can be cleared
	*/
	clearable: Boolean,
	/**
	* @description whether Select is filterable
	*/
	filterable: Boolean,
	/**
	* @description whether creating new items is allowed. To use this, `filterable` must be true
	*/
	allowCreate: Boolean,
	/**
	* @description whether Select is loading data from server
	*/
	loading: Boolean,
	/**
	* @description custom class name for Select's dropdown
	*/
	popperClass: {
		type: String,
		default: ""
	},
	/**
	* @description custom style for Select's dropdown
	*/
	popperStyle: { type: require_runtime$1.definePropType([String, Object]) },
	/**
	* @description [popper.js](https://popper.js.org/docs/v2/) parameters
	*/
	popperOptions: {
		type: require_runtime$1.definePropType(Object),
		default: () => ({})
	},
	/**
	* @description whether options are loaded from server
	*/
	remote: Boolean,
	/**
	* @description debounce delay during remote search, in milliseconds
	*/
	debounce: {
		type: Number,
		default: 300
	},
	/**
	* @description displayed text while loading data from server, default is 'Loading'
	*/
	loadingText: String,
	/**
	* @description displayed text when no data matches the filtering query, you can also use slot `empty`, default is 'No matching data'
	*/
	noMatchText: String,
	/**
	* @description displayed text when there is no options, you can also use slot `empty`, default is 'No data'
	*/
	noDataText: String,
	/**
	* @description function that gets called when the input value changes. Its parameter is the current input value. To use this, `filterable` must be true
	*/
	remoteMethod: { type: require_runtime$1.definePropType(Function) },
	/**
	* @description custom filter method, the first parameter is the current input value. To use this, `filterable` must be true
	*/
	filterMethod: { type: require_runtime$1.definePropType(Function) },
	/**
	* @description whether multiple-select is activated
	*/
	multiple: Boolean,
	/**
	* @description maximum number of options user can select when `multiple` is `true`. No limit when set to 0
	*/
	multipleLimit: {
		type: Number,
		default: 0
	},
	/**
	* @description placeholder, default is 'Select'
	*/
	placeholder: { type: String },
	/**
	* @description select first matching option on enter key. Use with `filterable` or `remote`
	*/
	defaultFirstOption: Boolean,
	/**
	* @description when `multiple` and `filter` is true, whether to reserve current keyword after selecting an option
	*/
	reserveKeyword: {
		type: Boolean,
		default: true
	},
	/**
	* @description unique identity key name for value, required when value is an object
	*/
	valueKey: {
		type: String,
		default: "value"
	},
	/**
	* @description whether to collapse tags to a text when multiple selecting
	*/
	collapseTags: Boolean,
	/**
	* @description whether show all selected tags when mouse hover text of collapse-tags. To use this, `collapse-tags` must be true
	*/
	collapseTagsTooltip: Boolean,
	/**
	* @description configuration object for the collapse-tags tooltip. To use this, `collapse-tags` and `collapse-tags-tooltip` must be true
	*/
	tagTooltip: {
		type: require_runtime$1.definePropType(Object),
		default: () => ({})
	},
	/**
	* @description the max tags number to be shown. To use this, `collapse-tags` must be true
	*/
	maxCollapseTags: {
		type: Number,
		default: 1
	},
	/**
	* @description whether select dropdown is teleported, if `true` it will be teleported to where `append-to` sets
	*/
	teleported: require_content.useTooltipContentProps.teleported,
	/**
	* @description when select dropdown is inactive and `persistent` is `false`, select dropdown will be destroyed
	*/
	persistent: {
		type: Boolean,
		default: true
	},
	/**
	* @description custom clear icon component
	*/
	clearIcon: {
		type: require_icon.iconPropType,
		default: _element_plus_icons_vue.CircleClose
	},
	/**
	* @description whether the width of the dropdown is the same as the input
	*/
	fitInputWidth: Boolean,
	/**
	* @description custom suffix icon component
	*/
	suffixIcon: {
		type: require_icon.iconPropType,
		default: _element_plus_icons_vue.ArrowDown
	},
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
	tagEffect: {
		...require_tag.tagProps.effect,
		default: "light"
	},
	/**
	* @description whether to trigger form validation
	*/
	validateEvent: {
		type: Boolean,
		default: true
	},
	/**
	* @description in remote search method show suffix icon
	*/
	remoteShowSuffix: Boolean,
	/**
	* @description determines whether the arrow is displayed
	*/
	showArrow: {
		type: Boolean,
		default: true
	},
	/**
	* @description offset of the dropdown
	*/
	offset: {
		type: Number,
		default: 12
	},
	/**
	* @description position of dropdown
	*/
	placement: {
		type: require_runtime$1.definePropType(String),
		values: _popperjs_core.placements,
		default: "bottom-start"
	},
	/**
	* @description list of possible positions for dropdown
	*/
	fallbackPlacements: {
		type: require_runtime$1.definePropType(Array),
		default: [
			"bottom-start",
			"top-start",
			"right",
			"left"
		]
	},
	/**
	* @description tabindex for input
	*/
	tabindex: {
		type: [String, Number],
		default: 0
	},
	/**
	* @description which element the selection dropdown appends to
	*/
	appendTo: require_content.useTooltipContentProps.appendTo,
	options: { type: require_runtime$1.definePropType(Array) },
	props: {
		type: require_runtime$1.definePropType(Object),
		default: () => require_useProps.defaultProps
	},
	...require_index$1.useEmptyValuesProps,
	...require_index$2.useAriaProps(["ariaLabel"])
});
const selectEmits = {
	[require_event.UPDATE_MODEL_EVENT]: (val) => true,
	[require_event.CHANGE_EVENT]: (val) => true,
	"popup-scroll": require_scrollbar.scrollbarEmits.scroll,
	"end-reached": require_scrollbar.scrollbarEmits["end-reached"],
	"remove-tag": (val) => true,
	"visible-change": (visible) => true,
	focus: (evt) => evt instanceof FocusEvent,
	blur: (evt) => evt instanceof FocusEvent,
	clear: () => true
};
//#endregion
exports.selectEmits = selectEmits;
exports.selectProps = selectProps;

//# sourceMappingURL=select.js.map