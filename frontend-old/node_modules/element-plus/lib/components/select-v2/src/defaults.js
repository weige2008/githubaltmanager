Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
require("../../../_virtual/_rolldown/runtime.js");
const require_event = require("../../../constants/event.js");
const require_types = require("../../../utils/types.js");
const require_runtime$1 = require("../../../utils/vue/props/runtime.js");
const require_icon = require("../../../utils/vue/icon.js");
const require_index = require("../../../hooks/use-size/index.js");
const require_index$1 = require("../../../hooks/use-empty-values/index.js");
const require_index$2 = require("../../../hooks/use-aria/index.js");
const require_content = require("../../tooltip/src/content.js");
const require_scrollbar = require("../../scrollbar/src/scrollbar.js");
const require_tag = require("../../tag/src/tag.js");
const require_useProps = require("./useProps.js");
let _element_plus_icons_vue = require("@element-plus/icons-vue");
let _popperjs_core = require("@popperjs/core");
//#region ../../packages/components/select-v2/src/defaults.ts
const selectV2Props = require_runtime$1.buildProps({
	/**
	* @description whether creating new items is allowed. To use this, `filterable` must be true
	*/
	allowCreate: Boolean,
	/**
	* @description autocomplete of select input
	*/
	autocomplete: {
		type: require_runtime$1.definePropType(String),
		default: "none"
	},
	/**
	* @description for non-filterable Select, this prop decides if the option menu pops up when the input is focused
	*/
	automaticDropdown: Boolean,
	/**
	* @description whether select can be cleared
	*/
	clearable: Boolean,
	/**
	* @description custom clear icon
	*/
	clearIcon: {
		type: require_icon.iconPropType,
		default: _element_plus_icons_vue.CircleClose
	},
	/**
	* @description tooltip theme, built-in theme: `dark` / `light`
	*/
	effect: {
		type: require_runtime$1.definePropType(String),
		default: "light"
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
	* @description The max tags number to be shown. To use this, `collapse-tags` must be true
	*/
	maxCollapseTags: {
		type: Number,
		default: 1
	},
	/**
	* @description
	*/
	defaultFirstOption: Boolean,
	/**
	* @description is disabled
	*/
	disabled: {
		type: Boolean,
		default: void 0
	},
	/**
	* @description Estimated item height for variable option sizes. Defaults to fixed `itemHeight` when omitted.
	*/
	estimatedOptionHeight: {
		type: Number,
		default: void 0
	},
	/**
	* @description whether Select is filterable
	*/
	filterable: Boolean,
	/**
	* @description custom filter method, the first parameter is the current input value. To use this, `filterable` must be true
	*/
	filterMethod: { type: require_runtime$1.definePropType(Function) },
	/**
	* @description The height of the dropdown panel, 34px for each item
	*/
	height: {
		type: Number,
		default: 274
	},
	/**
	* @description The height of the dropdown item
	*/
	itemHeight: {
		type: Number,
		default: 34
	},
	/**
	* @description native input id
	*/
	id: String,
	/**
	* @description whether Select is loading data from server
	*/
	loading: Boolean,
	/**
	* @description displayed text while loading data from server, default is 'Loading'
	*/
	loadingText: String,
	/**
	* @description biding value
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
	* @description is multiple
	*/
	multiple: Boolean,
	/**
	* @description maximum number of options user can select when multiple is true. No limit when set to 0
	*/
	multipleLimit: {
		type: Number,
		default: 0
	},
	/**
	* @description the name attribute of select input
	*/
	name: String,
	/**
	* @description displayed text when there is no options, you can also use slot empty, the default is 'No Data'
	*/
	noDataText: String,
	/**
	* @description displayed text when no data matches the filtering query, you can also use slot `empty`, default is 'No matching data'
	*/
	noMatchText: String,
	/**
	* @description function that gets called when the input value changes. Its parameter is the current input value. To use this, `filterable` must be true
	*/
	remoteMethod: { type: require_runtime$1.definePropType(Function) },
	/**
	* @description whether reserve the keyword after select filtered option.
	*/
	reserveKeyword: {
		type: Boolean,
		default: true
	},
	/**
	* @description data of the options, the key of `value` and `label` can be customize by `props`
	*/
	options: {
		type: require_runtime$1.definePropType(Array),
		required: true
	},
	/**
	* @description placeholder, the default is 'Please select'
	*/
	placeholder: { type: String },
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
	* @description custom class name for Select's dropdown
	*/
	popperClass: require_content.useTooltipContentProps.popperClass,
	/**
	* @description custom style for Select's dropdown
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
	* @description whether search data from server
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
	* @description size of component
	*/
	size: require_index.useSizeProp,
	/**
	* @description configuration options, see the following table
	*/
	props: {
		type: require_runtime$1.definePropType(Object),
		default: () => require_useProps.defaultProps
	},
	/**
	* @description unique identity key name for value, required when value is an object
	*/
	valueKey: {
		type: String,
		default: "value"
	},
	/**
	* @description Controls whether the scrollbar is always displayed
	*/
	scrollbarAlwaysOn: Boolean,
	/**
	* @description whether to trigger form validation
	*/
	validateEvent: {
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
	* @description in remote search method show suffix icon
	*/
	remoteShowSuffix: Boolean,
	/**
	* @description Determines whether the arrow is displayed
	*/
	showArrow: {
		type: Boolean,
		default: true
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
	* @description tabindex for input
	*/
	tabindex: {
		type: [String, Number],
		default: 0
	},
	/**
	* @description which element the select dropdown appends to
	*/
	appendTo: require_content.useTooltipContentProps.appendTo,
	/**
	* @description if it is `true`, the width of the dropdown panel is the same as the input box.
	* if it is `false`, the width is automatically calculated based on the value of `label`,
	* or it can be set to a number to make it a fixed width
	*/
	fitInputWidth: {
		type: [Boolean, Number],
		default: true,
		validator(val) {
			return require_types.isBoolean(val) || require_types.isNumber(val);
		}
	},
	suffixIcon: {
		type: require_icon.iconPropType,
		default: _element_plus_icons_vue.ArrowDown
	},
	...require_index$1.useEmptyValuesProps,
	...require_index$2.useAriaProps(["ariaLabel"])
});
const optionV2Props = require_runtime$1.buildProps({
	data: Array,
	disabled: Boolean,
	hovering: Boolean,
	item: {
		type: require_runtime$1.definePropType(Object),
		required: true
	},
	index: Number,
	style: Object,
	selected: Boolean,
	created: Boolean
});
const selectV2Emits = {
	[require_event.UPDATE_MODEL_EVENT]: (val) => true,
	[require_event.CHANGE_EVENT]: (val) => true,
	"end-reached": require_scrollbar.scrollbarEmits["end-reached"],
	"remove-tag": (val) => true,
	"visible-change": (visible) => true,
	focus: (evt) => evt instanceof FocusEvent,
	blur: (evt) => evt instanceof FocusEvent,
	clear: () => true
};
const optionV2Emits = {
	hover: (index) => require_types.isNumber(index),
	select: (val, index) => true
};
//#endregion
exports.optionV2Emits = optionV2Emits;
exports.optionV2Props = optionV2Props;
exports.selectV2Emits = selectV2Emits;
exports.selectV2Props = selectV2Props;

//# sourceMappingURL=defaults.js.map