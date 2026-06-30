Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const require_runtime = require("../../../utils/vue/props/runtime.js");
const require_icon = require("../../../utils/vue/icon.js");
//#region ../../packages/components/link/src/link.ts
/**
* @deprecated Removed after 3.0.0, Use `LinkProps` instead.
*/
const linkProps = require_runtime.buildProps({
	/**
	* @description type
	*/
	type: {
		type: String,
		values: [
			"primary",
			"success",
			"warning",
			"info",
			"danger",
			"default"
		],
		default: void 0
	},
	/**
	* @description when underlines should appear
	*/
	underline: {
		type: [Boolean, String],
		values: [
			true,
			false,
			"always",
			"never",
			"hover"
		],
		default: void 0
	},
	/**
	* @description whether the component is disabled
	*/
	disabled: Boolean,
	/**
	* @description same as native hyperlink's `href`
	*/
	href: {
		type: String,
		default: ""
	},
	/**
	* @description same as native hyperlink's `target`
	*/
	target: {
		type: String,
		default: "_self"
	},
	/**
	* @description icon component
	*/
	icon: { type: require_icon.iconPropType }
});
const linkEmits = { click: (evt) => evt instanceof MouseEvent };
//#endregion
exports.linkEmits = linkEmits;
exports.linkProps = linkProps;

//# sourceMappingURL=link.js.map