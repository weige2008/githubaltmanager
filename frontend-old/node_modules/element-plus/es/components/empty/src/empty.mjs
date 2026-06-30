import { buildProps } from "../../../utils/vue/props/runtime.mjs";
//#region ../../packages/components/empty/src/empty.ts
/**
* @deprecated Removed after 3.0.0, Use `EmptyProps` instead.
*/
const emptyProps = buildProps({
	/**
	* @description image URL of empty
	*/
	image: {
		type: String,
		default: ""
	},
	/**
	* @description image size (width) of empty
	*/
	imageSize: Number,
	/**
	* @description description of empty
	*/
	description: {
		type: String,
		default: ""
	}
});
//#endregion
export { emptyProps };

//# sourceMappingURL=empty.mjs.map