import { buildProps } from "../../../utils/vue/props/runtime.mjs";
import { iconPropType } from "../../../utils/vue/icon.mjs";
//#region ../../packages/components/breadcrumb/src/breadcrumb.ts
/**
* @deprecated Removed after 3.0.0, Use `BreadcrumbProps` instead.
*/
const breadcrumbProps = buildProps({
	/**
	* @description separator character
	*/
	separator: {
		type: String,
		default: "/"
	},
	/**
	* @description icon component of icon separator
	*/
	separatorIcon: { type: iconPropType }
});
//#endregion
export { breadcrumbProps };

//# sourceMappingURL=breadcrumb.mjs.map