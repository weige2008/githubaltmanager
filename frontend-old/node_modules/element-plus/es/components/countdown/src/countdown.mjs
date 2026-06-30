import { CHANGE_EVENT } from "../../../constants/event.mjs";
import { isNumber } from "../../../utils/types.mjs";
import { buildProps, definePropType } from "../../../utils/vue/props/runtime.mjs";
//#region ../../packages/components/countdown/src/countdown.ts
/**
* @deprecated Removed after 3.0.0, Use `CountdownProps` instead.
*/
const countdownProps = buildProps({
	/**
	* @description Formatting the countdown display
	*/
	format: {
		type: String,
		default: "HH:mm:ss"
	},
	/**
	* @description Sets the prefix of a countdown
	*/
	prefix: String,
	/**
	* @description Sets the suffix of a countdown
	*/
	suffix: String,
	/**
	* @description countdown titles
	*/
	title: String,
	/**
	* @description target time
	*/
	value: {
		type: definePropType([Number, Object]),
		default: 0
	},
	/**
	* @description Styles countdown values
	*/
	valueStyle: {
		type: definePropType([
			String,
			Object,
			Array,
			Boolean
		]),
		default: void 0
	}
});
const countdownEmits = {
	finish: () => true,
	[CHANGE_EVENT]: (value) => isNumber(value)
};
//#endregion
export { countdownEmits, countdownProps };

//# sourceMappingURL=countdown.mjs.map