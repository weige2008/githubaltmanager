import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from "../../../constants/event.mjs";
import { isNumber } from "../../../utils/types.mjs";
import { buildProps, definePropType } from "../../../utils/vue/props/runtime.mjs";
import { iconPropType } from "../../../utils/vue/icon.mjs";
import { mutable } from "../../../utils/typescript.mjs";
import { useSizeProp } from "../../../hooks/use-size/index.mjs";
import { useAriaProps } from "../../../hooks/use-aria/index.mjs";
import { Star, StarFilled } from "@element-plus/icons-vue";
//#region ../../packages/components/rate/src/rate.ts
/**
* @deprecated Removed after 3.0.0, Use `RateProps` instead.
*/
const rateProps = buildProps({
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
		type: definePropType([Array, Object]),
		default: () => mutable([
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
		type: definePropType([Array, Object]),
		default: () => [
			StarFilled,
			StarFilled,
			StarFilled
		]
	},
	/**
	* @description component of unselected icons
	*/
	voidIcon: {
		type: iconPropType,
		default: () => Star
	},
	/**
	* @description component of unselected read-only icons
	*/
	disabledVoidIcon: {
		type: iconPropType,
		default: () => StarFilled
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
		type: definePropType(Array),
		default: () => mutable([
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
	size: useSizeProp,
	/**
	* @description whether value can be reset to `0`
	*/
	clearable: Boolean,
	...useAriaProps(["ariaLabel"])
});
const rateEmits = {
	[CHANGE_EVENT]: (value) => isNumber(value),
	[UPDATE_MODEL_EVENT]: (value) => isNumber(value)
};
//#endregion
export { rateEmits, rateProps };

//# sourceMappingURL=rate.mjs.map