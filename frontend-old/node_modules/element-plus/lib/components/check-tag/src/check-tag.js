Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const require_event = require("../../../constants/event.js");
const require_types = require("../../../utils/types.js");
//#region ../../packages/components/check-tag/src/check-tag.ts
/**
* @deprecated Removed after 3.0.0, Use `CheckTagProps` instead.
*/
const checkTagProps = require("../../../utils/vue/props/runtime.js").buildProps({
	/**
	* @description is checked
	*/
	checked: Boolean,
	/**
	* @description whether the check-tag is disabled
	*/
	disabled: Boolean,
	/**
	* @description type of Tag
	*/
	type: {
		type: String,
		values: [
			"primary",
			"success",
			"info",
			"warning",
			"danger"
		],
		default: "primary"
	}
});
const checkTagEmits = {
	"update:checked": (value) => require_types.isBoolean(value),
	[require_event.CHANGE_EVENT]: (value) => require_types.isBoolean(value)
};
//#endregion
exports.checkTagEmits = checkTagEmits;
exports.checkTagProps = checkTagProps;

//# sourceMappingURL=check-tag.js.map