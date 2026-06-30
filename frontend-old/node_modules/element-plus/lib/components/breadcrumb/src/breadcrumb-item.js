Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const require_runtime = require("../../../utils/vue/props/runtime.js");
//#region ../../packages/components/breadcrumb/src/breadcrumb-item.ts
/**
* @deprecated Removed after 3.0.0, Use `BreadcrumbItemProps` instead.
*/
const breadcrumbItemProps = require_runtime.buildProps({
	/**
	* @description target route of the link, same as `to` of `vue-router`
	*/
	to: {
		type: require_runtime.definePropType([String, Object]),
		default: ""
	},
	/**
	* @description if `true`, the navigation will not leave a history record
	*/
	replace: Boolean
});
//#endregion
exports.breadcrumbItemProps = breadcrumbItemProps;

//# sourceMappingURL=breadcrumb-item.js.map