import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from "../../../constants/event.mjs";
import { isBoolean } from "../../../utils/types.mjs";
import { buildProps, definePropType } from "../../../utils/vue/props/runtime.mjs";
import { iconPropType } from "../../../utils/vue/icon.mjs";
import { useSizeProp } from "../../../hooks/use-size/index.mjs";
import { useEmptyValuesProps } from "../../../hooks/use-empty-values/index.mjs";
import { useTooltipContentProps } from "../../tooltip/src/content.mjs";
import { tagProps } from "../../tag/src/tag.mjs";
import { CommonProps } from "../../cascader-panel/src/config.mjs";
import { CircleClose } from "@element-plus/icons-vue";
import { placements } from "@popperjs/core";
//#region ../../packages/components/cascader/src/cascader.ts
/**
* @deprecated Removed after 3.0.0, Use `CascaderComponentProps` instead.
*/
const cascaderProps = buildProps({
	...CommonProps,
	/**
	* @description size of input
	*/
	size: useSizeProp,
	/**
	* @description placeholder of input
	*/
	placeholder: String,
	/**
	* @description whether Cascader is disabled
	*/
	disabled: {
		type: Boolean,
		default: void 0
	},
	/**
	* @description whether selected value can be cleared
	*/
	clearable: Boolean,
	/**
	* @description custom clear icon component
	*/
	clearIcon: {
		type: iconPropType,
		default: CircleClose
	},
	/**
	* @description whether the options can be searched
	*/
	filterable: Boolean,
	/**
	* @description customize search logic, the first parameter is `node`, the second is `keyword`, and need return a boolean value indicating whether it hits.
	*/
	filterMethod: {
		type: definePropType(Function),
		default: (node, keyword) => node.text.includes(keyword)
	},
	/**
	* @description option label separator
	*/
	separator: {
		type: String,
		default: " / "
	},
	/**
	* @description whether to display all levels of the selected value in the input
	*/
	showAllLevels: {
		type: Boolean,
		default: true
	},
	/**
	* @description whether to collapse tags in multiple selection mode
	*/
	collapseTags: Boolean,
	/**
	* @description The max tags number to be shown. To use this, collapse-tags must be true
	*/
	maxCollapseTags: {
		type: Number,
		default: 1
	},
	/**
	* @description whether show all selected tags when mouse hover text of collapse-tags. To use this, collapse-tags must be true
	*/
	collapseTagsTooltip: Boolean,
	/**
	* @description The max height of collapse tags tooltip, in pixels. To use this, collapse-tags-tooltip must be true
	*/
	maxCollapseTagsTooltipHeight: { type: [String, Number] },
	/**
	* @description debounce delay when typing filter keyword, in milliseconds
	*/
	debounce: {
		type: Number,
		default: 300
	},
	/**
	* @description hook function before filtering with the value to be filtered as its parameter. If `false` is returned or a `Promise` is returned and then is rejected, filtering will be aborted
	*/
	beforeFilter: {
		type: definePropType(Function),
		default: () => true
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
			"bottom",
			"top-start",
			"top",
			"right",
			"left"
		]
	},
	/**
	* @description custom class name for Cascader's dropdown
	*/
	popperClass: useTooltipContentProps.popperClass,
	/**
	* @description custom style for Cascader's dropdown
	*/
	popperStyle: useTooltipContentProps.popperStyle,
	/**
	* @description whether cascader popup is teleported
	*/
	teleported: useTooltipContentProps.teleported,
	/**
	* @description tooltip theme, built-in theme: `dark` / `light`
	*/
	effect: {
		type: definePropType(String),
		default: "light"
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
	* @description when dropdown is inactive and `persistent` is `false`, dropdown will be destroyed
	*/
	persistent: {
		type: Boolean,
		default: true
	},
	/**
	* @description Use `parent` when you want things tidy (like "Entire Collection" instead of listing 100 items)
	* Use `child` when every single item matters (like important settings)
	*/
	showCheckedStrategy: {
		type: String,
		values: ["parent", "child"],
		default: "child"
	},
	/**
	* @description whether to check or uncheck node when clicking on the node
	*/
	checkOnClickNode: Boolean,
	/**
	* @description whether to show the radio or checkbox prefix
	*/
	showPrefix: {
		type: Boolean,
		default: true
	},
	/**
	* @description whether the width of the suggestion panel is the same as the input, if the value is `number`, then the width is fixed
	*/
	fitInputWidth: {
		type: [Boolean, Number],
		default: false
	},
	...useEmptyValuesProps
});
const emitChangeFn = (value) => true;
const cascaderEmits = {
	[UPDATE_MODEL_EVENT]: emitChangeFn,
	[CHANGE_EVENT]: emitChangeFn,
	focus: (evt) => evt instanceof FocusEvent,
	blur: (evt) => evt instanceof FocusEvent,
	clear: () => true,
	visibleChange: (val) => isBoolean(val),
	expandChange: (val) => !!val,
	removeTag: (val) => !!val
};
//#endregion
export { cascaderEmits, cascaderProps };

//# sourceMappingURL=cascader.mjs.map