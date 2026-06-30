import { definePropType } from "../../../utils/vue/props/runtime.mjs";
import { buttonProps } from "./button.mjs";
//#region ../../packages/components/button/src/button-group.ts
/**
* @deprecated Removed after 3.0.0, Use `ButtonGroupProps` instead.
*/
const buttonGroupProps = {
	/**
	* @description control the size of buttons in this button-group
	*/
	size: buttonProps.size,
	/**
	* @description control the type of buttons in this button-group
	*/
	type: buttonProps.type,
	/**
	* @description display direction
	*/
	direction: {
		type: definePropType(String),
		values: ["horizontal", "vertical"],
		default: "horizontal"
	}
};
//#endregion
export { buttonGroupProps };

//# sourceMappingURL=button-group.mjs.map