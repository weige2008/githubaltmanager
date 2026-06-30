import { buildProps, definePropType } from "../../../utils/vue/props/runtime.mjs";
//#region ../../packages/components/icon/src/icon.ts
/**
* @deprecated Removed after 3.0.0, Use `IconProps` instead.
*/
const iconProps = buildProps({
	/**
	* @description SVG icon size, size x size
	*/
	size: { type: definePropType([Number, String]) },
	/**
	* @description SVG tag's fill attribute
	*/
	color: { type: String }
});
//#endregion
export { iconProps };

//# sourceMappingURL=icon.mjs.map