Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
require("../../../_virtual/_rolldown/runtime.js");
const require_runtime$1 = require("../../../utils/vue/props/runtime.js");
let _element_plus_icons_vue = require("@element-plus/icons-vue");
//#region ../../packages/components/result/src/result.ts
const IconMap = {
	primary: "icon-primary",
	success: "icon-success",
	warning: "icon-warning",
	error: "icon-error",
	info: "icon-info"
};
const IconComponentMap = {
	[IconMap.primary]: _element_plus_icons_vue.InfoFilled,
	[IconMap.success]: _element_plus_icons_vue.CircleCheckFilled,
	[IconMap.warning]: _element_plus_icons_vue.WarningFilled,
	[IconMap.error]: _element_plus_icons_vue.CircleCloseFilled,
	[IconMap.info]: _element_plus_icons_vue.InfoFilled
};
/**
* @deprecated Removed after 3.0.0, Use `ResultProps` instead.
*/
const resultProps = require_runtime$1.buildProps({
	/**
	* @description title of result
	*/
	title: {
		type: String,
		default: ""
	},
	/**
	* @description sub title of result
	*/
	subTitle: {
		type: String,
		default: ""
	},
	/**
	* @description icon type of result
	*/
	icon: {
		type: String,
		values: [
			"primary",
			"success",
			"warning",
			"info",
			"error"
		],
		default: "info"
	}
});
//#endregion
exports.IconComponentMap = IconComponentMap;
exports.IconMap = IconMap;
exports.resultProps = resultProps;

//# sourceMappingURL=result.js.map