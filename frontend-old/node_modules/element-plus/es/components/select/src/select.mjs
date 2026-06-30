import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from "../../../constants/event.mjs";
import { buildProps, definePropType } from "../../../utils/vue/props/runtime.mjs";
import { iconPropType } from "../../../utils/vue/icon.mjs";
import { useSizeProp } from "../../../hooks/use-size/index.mjs";
import { useEmptyValuesProps } from "../../../hooks/use-empty-values/index.mjs";
import { useAriaProps } from "../../../hooks/use-aria/index.mjs";
import { useTooltipContentProps } from "../../tooltip/src/content.mjs";
import { scrollbarEmits } from "../../scrollbar/src/scrollbar.mjs";
import { tagProps } from "../../tag/src/tag.mjs";
import { defaultProps } from "../../select-v2/src/useProps.mjs";
import { ArrowDown, CircleClose } from "@element-plus/icons-vue";
import { placements } from "@popperjs/core";
//#region ../../packages/components/select/src/select.ts
const selectProps = buildProps({
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
		type: definePropType([
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
	size: useSizeProp,
	/**
	* @description tooltip theme, built-in theme: `dark` / `light`
	*/
	effect: {
		type: definePropType(String),
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
	popperStyle: { type: definePropType([String, Object]) },
	/**
	* @description [popper.js](https://popper.js.org/docs/v2/) parameters
	*/
	popperOptions: {
		type: definePropType(Object),
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
	remoteMethod: { type: definePropType(Function) },
	/**
	* @description custom filter method, the first parameter is the current input value. To use this, `filterable` must be true
	*/
	filterMethod: { type: definePropType(Function) },
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
		type: definePropType(Object),
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
	teleported: useTooltipContentProps.teleported,
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
		type: iconPropType,
		default: CircleClose
	},
	/**
	* @description whether the width of the dropdown is the same as the input
	*/
	fitInputWidth: Boolean,
	/**
	* @description custom suffix icon component
	*/
	suffixIcon: {
		type: iconPropType,
		default: ArrowDown
	},
	/**
	* @description tag type
	*/
	tagType: {
		...tagProps.type,
		default: "info"
	},
	/**
	* @description tag effect
	*/
	tagEffect: {
		...tagProps.effect,
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
		type: definePropType(String),
		values: placements,
		default: "bottom-start"
	},
	/**
	* @description list of possible positions for dropdown
	*/
	fallbackPlacements: {
		type: definePropType(Array),
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
	appendTo: useTooltipContentProps.appendTo,
	options: { type: definePropType(Array) },
	props: {
		type: definePropType(Object),
		default: () => defaultProps
	},
	...useEmptyValuesProps,
	...useAriaProps(["ariaLabel"])
});
const selectEmits = {
	[UPDATE_MODEL_EVENT]: (val) => true,
	[CHANGE_EVENT]: (val) => true,
	"popup-scroll": scrollbarEmits.scroll,
	"end-reached": scrollbarEmits["end-reached"],
	"remove-tag": (val) => true,
	"visible-change": (visible) => true,
	focus: (evt) => evt instanceof FocusEvent,
	blur: (evt) => evt instanceof FocusEvent,
	clear: () => true
};
//#endregion
export { selectEmits, selectProps };

//# sourceMappingURL=select.mjs.map