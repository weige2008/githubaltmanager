Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
require("../../../_virtual/_rolldown/runtime.js");
const require_event = require("../../../constants/event.js");
const require_types = require("../../../utils/types.js");
const require_runtime$1 = require("../../../utils/vue/props/runtime.js");
const require_icon = require("../../../utils/vue/icon.js");
const require_validator = require("../../../utils/vue/validator.js");
const require_index = require("../../../hooks/use-aria/index.js");
let _vue_shared = require("@vue/shared");
//#region ../../packages/components/switch/src/switch.ts
/**
* @deprecated Removed after 3.0.0, Use `SwitchProps` instead.
*/
const switchProps = require_runtime$1.buildProps({
	/**
	* @description binding value, it should be equivalent to either `active-value` or `inactive-value`, by default it's `boolean` type
	*/
	modelValue: {
		type: [
			Boolean,
			String,
			Number
		],
		default: false
	},
	/**
	* @description whether Switch is disabled
	*/
	disabled: {
		type: Boolean,
		default: void 0
	},
	/**
	* @description whether Switch is in loading state
	*/
	loading: Boolean,
	/**
	* @description size of Switch
	*/
	size: {
		type: String,
		validator: require_validator.isValidComponentSize
	},
	/**
	* @description width of Switch
	*/
	width: {
		type: [String, Number],
		default: ""
	},
	/**
	* @description whether icon or text is displayed inside dot, only the first character will be rendered for text
	*/
	inlinePrompt: Boolean,
	/**
	* @description component of the icon displayed in action when in `off` state
	*/
	inactiveActionIcon: { type: require_icon.iconPropType },
	/**
	* @description component of the icon displayed in action when in `on` state
	*/
	activeActionIcon: { type: require_icon.iconPropType },
	/**
	* @description component of the icon displayed when in `on` state, overrides `active-text`
	*/
	activeIcon: { type: require_icon.iconPropType },
	/**
	* @description component of the icon displayed when in `off` state, overrides `inactive-text`
	*/
	inactiveIcon: { type: require_icon.iconPropType },
	/**
	* @description text displayed when in `on` state
	*/
	activeText: {
		type: String,
		default: ""
	},
	/**
	* @description text displayed when in `off` state
	*/
	inactiveText: {
		type: String,
		default: ""
	},
	/**
	* @description switch value when in `on` state
	*/
	activeValue: {
		type: [
			Boolean,
			String,
			Number
		],
		default: true
	},
	/**
	* @description switch value when in `off` state
	*/
	inactiveValue: {
		type: [
			Boolean,
			String,
			Number
		],
		default: false
	},
	/**
	* @description input name of Switch
	*/
	name: {
		type: String,
		default: ""
	},
	/**
	* @description whether to trigger form validation
	*/
	validateEvent: {
		type: Boolean,
		default: true
	},
	/**
	* @description before-change hook before the switch state changes. If `false` is returned or a `Promise` is returned and then is rejected, will stop switching
	*/
	beforeChange: { type: require_runtime$1.definePropType(Function) },
	/**
	* @description id for input
	*/
	id: String,
	/**
	* @description tabindex for input
	*/
	tabindex: { type: [String, Number] },
	...require_index.useAriaProps(["ariaLabel"])
});
const switchEmits = {
	[require_event.UPDATE_MODEL_EVENT]: (val) => require_types.isBoolean(val) || (0, _vue_shared.isString)(val) || require_types.isNumber(val),
	[require_event.CHANGE_EVENT]: (val) => require_types.isBoolean(val) || (0, _vue_shared.isString)(val) || require_types.isNumber(val),
	[require_event.INPUT_EVENT]: (val) => require_types.isBoolean(val) || (0, _vue_shared.isString)(val) || require_types.isNumber(val)
};
//#endregion
exports.switchEmits = switchEmits;
exports.switchProps = switchProps;

//# sourceMappingURL=switch.js.map