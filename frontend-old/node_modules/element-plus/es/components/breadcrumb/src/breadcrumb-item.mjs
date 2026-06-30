import { buildProps, definePropType } from "../../../utils/vue/props/runtime.mjs";
//#region ../../packages/components/breadcrumb/src/breadcrumb-item.ts
/**
* @deprecated Removed after 3.0.0, Use `BreadcrumbItemProps` instead.
*/
const breadcrumbItemProps = buildProps({
	/**
	* @description target route of the link, same as `to` of `vue-router`
	*/
	to: {
		type: definePropType([String, Object]),
		default: ""
	},
	/**
	* @description if `true`, the navigation will not leave a history record
	*/
	replace: Boolean
});
//#endregion
export { breadcrumbItemProps };

//# sourceMappingURL=breadcrumb-item.mjs.map