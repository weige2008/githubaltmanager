import { buildProps, definePropType } from "../../../utils/vue/props/runtime.mjs";
//#region ../../packages/components/skeleton/src/skeleton.ts
/**
* @deprecated Removed after 3.0.0, Use `SkeletonProps` instead.
*/
const skeletonProps = buildProps({
	/**
	* @description whether showing the animation
	*/
	animated: Boolean,
	/**
	* @description how many fake items to render to the DOM
	*/
	count: {
		type: Number,
		default: 1
	},
	/**
	* @description numbers of the row, only useful when no template slot were given
	*/
	rows: {
		type: Number,
		default: 3
	},
	/**
	* @description whether showing the real DOM
	*/
	loading: {
		type: Boolean,
		default: true
	},
	/**
	* @description rendering delay in milliseconds
	*/
	throttle: { type: definePropType([Number, Object]) }
});
//#endregion
export { skeletonProps };

//# sourceMappingURL=skeleton.mjs.map