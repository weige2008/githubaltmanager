import { componentSizes } from "../../../constants/size.mjs";
import { buildProps, definePropType } from "../../../utils/vue/props/runtime.mjs";
//#region ../../packages/components/form/src/form-item.ts
const formItemValidateStates = [
	"",
	"error",
	"validating",
	"success"
];
/**
* @deprecated Removed after 3.0.0, Use `FormItemProps` instead.
*/
const formItemProps = buildProps({
	/**
	* @description Label text.
	*/
	label: String,
	/**
	* @description Width of label, e.g. `'50px'`. `'auto'` is supported.
	*/
	labelWidth: { type: [String, Number] },
	/**
	* @description Position of label. If set to `'left'` or `'right'`, `label-width` prop is also required. The default is extend from `form label-position`.
	*/
	labelPosition: {
		type: String,
		values: [
			"left",
			"right",
			"top",
			""
		],
		default: ""
	},
	/**
	* @description  A key of `model`. It could be an array of property paths (e.g `['a', 'b', '0']`). In the use of `validate` and `resetFields` method, the attribute is required.
	*/
	prop: { type: definePropType([String, Array]) },
	/**
	* @description Whether the field is required or not, will be determined by validation rules if omitted.
	*/
	required: {
		type: Boolean,
		default: void 0
	},
	/**
	* @description Validation rules of form, see the [following table](#formitemrule), more advanced usage at [async-validator](https://github.com/yiminghe/async-validator).
	*/
	rules: { type: definePropType([Object, Array]) },
	/**
	* @description Field error message, set its value and the field will validate error and show this message immediately.
	*/
	error: String,
	/**
	* @description Validation state of formItem.
	*/
	validateStatus: {
		type: String,
		values: formItemValidateStates
	},
	/**
	* @description Same as for in native label.
	*/
	for: String,
	/**
	* @description Inline style validate message.
	*/
	inlineMessage: {
		type: Boolean,
		default: void 0
	},
	/**
	* @description Whether to show the error message.
	*/
	showMessage: {
		type: Boolean,
		default: true
	},
	/**
	* @description Control the size of components in this form-item.
	*/
	size: {
		type: String,
		values: componentSizes
	}
});
//#endregion
export { formItemProps, formItemValidateStates };

//# sourceMappingURL=form-item.mjs.map