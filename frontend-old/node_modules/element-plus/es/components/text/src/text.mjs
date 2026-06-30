import { componentSizes } from "../../../constants/size.mjs";
import { buildProps } from "../../../utils/vue/props/runtime.mjs";
//#region ../../packages/components/text/src/text.ts
/**
* @deprecated Removed after 3.0.0, Use `TextProps` instead.
*/
const textProps = buildProps({
	/**
	* @description text type
	*/
	type: {
		type: String,
		values: [
			"primary",
			"success",
			"info",
			"warning",
			"danger",
			""
		],
		default: ""
	},
	/**
	* @description text size
	*/
	size: {
		type: String,
		values: componentSizes,
		default: ""
	},
	/**
	* @description render ellipsis
	*/
	truncated: Boolean,
	/**
	* @description maximum lines
	*/
	lineClamp: { type: [String, Number] },
	/**
	* @description custom element tag
	*/
	tag: {
		type: String,
		default: "span"
	}
});
//#endregion
export { textProps };

//# sourceMappingURL=text.mjs.map