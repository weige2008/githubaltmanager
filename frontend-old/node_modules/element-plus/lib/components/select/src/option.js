Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const require_runtime = require("../../../utils/vue/props/runtime.js");
//#region ../../packages/components/select/src/option.ts
const COMPONENT_NAME = "ElOption";
const optionProps = require_runtime.buildProps({
	/**
	* @description value of option
	*/
	value: {
		type: [
			String,
			Number,
			Boolean,
			Object
		],
		required: true
	},
	/**
	* @description label of option, same as `value` if omitted
	*/
	label: { type: [String, Number] },
	created: Boolean,
	/**
	* @description whether option is disabled
	*/
	disabled: Boolean
});
//#endregion
exports.COMPONENT_NAME = COMPONENT_NAME;
exports.optionProps = optionProps;

//# sourceMappingURL=option.js.map