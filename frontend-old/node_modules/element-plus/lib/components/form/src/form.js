Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
require("../../../_virtual/_rolldown/runtime.js");
const require_size = require("../../../constants/size.js");
const require_types = require("../../../utils/types.js");
const require_runtime$1 = require("../../../utils/vue/props/runtime.js");
let _vue_shared = require("@vue/shared");
//#region ../../packages/components/form/src/form.ts
/**
* @deprecated Removed after 3.0.0, Use `FormMetaProps` instead.
*/
const formMetaProps = require_runtime$1.buildProps({
	/**
	* @description Control the size of components in this form.
	*/
	size: {
		type: String,
		values: require_size.componentSizes
	},
	/**
	* @description Whether to disable all components in this form. If set to `true`, it will override the `disabled` prop of the inner component.
	*/
	disabled: Boolean
});
/**
* @deprecated Removed after 3.0.0, Use `FormProps` instead.
*/
const formProps = require_runtime$1.buildProps({
	...formMetaProps,
	/**
	* @description Data of form component.
	*/
	model: Object,
	/**
	* @description Validation rules of form.
	*/
	rules: { type: require_runtime$1.definePropType(Object) },
	/**
	* @description Position of label. If set to `'left'` or `'right'`, `label-width` prop is also required.
	*/
	labelPosition: {
		type: String,
		values: [
			"left",
			"right",
			"top"
		],
		default: "right"
	},
	/**
	* @description Position of asterisk.
	*/
	requireAsteriskPosition: {
		type: String,
		values: ["left", "right"],
		default: "left"
	},
	/**
	* @description Width of label, e.g. `'50px'`. All its direct child form items will inherit this value. `auto` is supported.
	*/
	labelWidth: {
		type: [String, Number],
		default: ""
	},
	/**
	* @description Suffix of the label.
	*/
	labelSuffix: {
		type: String,
		default: ""
	},
	/**
	* @description Whether the form is inline.
	*/
	inline: Boolean,
	/**
	* @description Whether to display the error message inline with the form item.
	*/
	inlineMessage: Boolean,
	/**
	* @description Whether to display an icon indicating the validation result.
	*/
	statusIcon: Boolean,
	/**
	* @description Whether to show the error message.
	*/
	showMessage: {
		type: Boolean,
		default: true
	},
	/**
	* @description Whether to trigger validation when the `rules` prop is changed.
	*/
	validateOnRuleChange: {
		type: Boolean,
		default: true
	},
	/**
	* @description Whether to hide required fields should have a red asterisk (star) beside their labels.
	*/
	hideRequiredAsterisk: Boolean,
	/**
	* @description When validation fails, scroll to the first error form entry.
	*/
	scrollToError: Boolean,
	/**
	* @description When validation fails, it scrolls to the first error item based on the scrollIntoView option.
	*/
	scrollIntoViewOptions: {
		type: require_runtime$1.definePropType([Object, Boolean]),
		default: true
	}
});
const formEmits = { validate: (prop, isValid, message) => ((0, _vue_shared.isArray)(prop) || (0, _vue_shared.isString)(prop)) && require_types.isBoolean(isValid) && (0, _vue_shared.isString)(message) };
//#endregion
exports.formEmits = formEmits;
exports.formMetaProps = formMetaProps;
exports.formProps = formProps;

//# sourceMappingURL=form.js.map