Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
require("../../../_virtual/_rolldown/runtime.js");
const require_event = require("../../../constants/event.js");
const require_types = require("../../../utils/types.js");
const require_runtime$1 = require("../../../utils/vue/props/runtime.js");
const require_icon = require("../../../utils/vue/icon.js");
const require_typescript = require("../../../utils/typescript.js");
const require_index = require("../../../hooks/use-size/index.js");
const require_index$1 = require("../../../hooks/use-aria/index.js");
let _element_plus_icons_vue = require("@element-plus/icons-vue");
//#region ../../packages/components/rate/src/rate.ts
/**
* @deprecated Removed after 3.0.0, Use `RateProps` instead.
*/
const rateProps = require_runtime$1.buildProps({
	/**
	* @description binding value
	*/
	modelValue: {
		type: Number,
		default: 0
	},
	/**
	* @description native `id` attribute
	*/
	id: {
		type: String,
		default: void 0
	},
	/**
	* @description threshold value between low and medium level. The value itself will be included in low level
	*/
	lowThreshold: {
		type: Number,
		default: 2
	},
	/**
	* @description threshold value between medium and high level. The value itself will be included in high level
	*/
	highThreshold: {
		type: Number,
		default: 4
	},
	/**
	* @description max rating score
	*/
	max: {
		type: Number,
		default: 5
	},
	/**
	* @description colors for icons. If array, it should have 3 elements, each of which corresponds with a score level, else if object, the key should be threshold value between two levels, and the value should be corresponding color
	*/
	colors: {
		type: require_runtime$1.definePropType([Array, Object]),
		default: () => require_typescript.mutable([
			"",
			"",
			""
		])
	},
	/**
	* @description color of unselected icons
	*/
	voidColor: {
		type: String,
		default: ""
	},
	/**
	* @description color of unselected read-only icons
	*/
	disabledVoidColor: {
		type: String,
		default: ""
	},
	/**
	* @description icon components. If array, it should have 3 elements, each of which corresponds with a score level, else if object, the key should be threshold value between two levels, and the value should be corresponding icon component
	*/
	icons: {
		type: require_runtime$1.definePropType([Array, Object]),
		default: () => [
			_element_plus_icons_vue.StarFilled,
			_element_plus_icons_vue.StarFilled,
			_element_plus_icons_vue.StarFilled
		]
	},
	/**
	* @description component of unselected icons
	*/
	voidIcon: {
		type: require_icon.iconPropType,
		default: () => _element_plus_icons_vue.Star
	},
	/**
	* @description component of unselected read-only icons
	*/
	disabledVoidIcon: {
		type: require_icon.iconPropType,
		default: () => _element_plus_icons_vue.StarFilled
	},
	/**
	* @description whether Rate is read-only
	*/
	disabled: {
		type: Boolean,
		default: void 0
	},
	/**
	* @description whether picking half start is allowed
	*/
	allowHalf: Boolean,
	/**
	* @description whether to display texts
	*/
	showText: Boolean,
	/**
	* @description whether to display current score. show-score and show-text cannot be true at the same time
	*/
	showScore: Boolean,
	/**
	* @description color of texts
	*/
	textColor: {
		type: String,
		default: ""
	},
	/**
	* @description text array
	*/
	texts: {
		type: require_runtime$1.definePropType(Array),
		default: () => require_typescript.mutable([
			"Extremely bad",
			"Disappointed",
			"Fair",
			"Satisfied",
			"Surprise"
		])
	},
	/**
	* @description score template
	*/
	scoreTemplate: {
		type: String,
		default: "{value}"
	},
	/**
	* @description size of Rate
	*/
	size: require_index.useSizeProp,
	/**
	* @description whether value can be reset to `0`
	*/
	clearable: Boolean,
	...require_index$1.useAriaProps(["ariaLabel"])
});
const rateEmits = {
	[require_event.CHANGE_EVENT]: (value) => require_types.isNumber(value),
	[require_event.UPDATE_MODEL_EVENT]: (value) => require_types.isNumber(value)
};
//#endregion
exports.rateEmits = rateEmits;
exports.rateProps = rateProps;

//# sourceMappingURL=rate.js.map