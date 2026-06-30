Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const require_runtime = require("../../../utils/vue/props/runtime.js");
const require_button = require("./button.js");
//#region ../../packages/components/button/src/button-group.ts
/**
* @deprecated Removed after 3.0.0, Use `ButtonGroupProps` instead.
*/
const buttonGroupProps = {
	/**
	* @description control the size of buttons in this button-group
	*/
	size: require_button.buttonProps.size,
	/**
	* @description control the type of buttons in this button-group
	*/
	type: require_button.buttonProps.type,
	/**
	* @description display direction
	*/
	direction: {
		type: require_runtime.definePropType(String),
		values: ["horizontal", "vertical"],
		default: "horizontal"
	}
};
//#endregion
exports.buttonGroupProps = buttonGroupProps;

//# sourceMappingURL=button-group.js.map