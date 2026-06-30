import { buildProps, definePropType } from "../../../utils/vue/props/runtime.mjs";
import { mutable } from "../../../utils/typescript.mjs";
//#region ../../packages/components/col/src/col.ts
/**
* @deprecated Removed after 3.0.0, Use `ColProps` instead.
*/
const colProps = buildProps({
	/**
	* @description custom element tag
	*/
	tag: {
		type: String,
		default: "div"
	},
	/**
	* @description number of column the grid spans
	*/
	span: {
		type: Number,
		default: 24
	},
	/**
	* @description number of spacing on the left side of the grid
	*/
	offset: {
		type: Number,
		default: 0
	},
	/**
	* @description number of columns that grid moves to the left
	*/
	pull: {
		type: Number,
		default: 0
	},
	/**
	* @description number of columns that grid moves to the right
	*/
	push: {
		type: Number,
		default: 0
	},
	/**
	* @description `<768px` Responsive columns or column props object
	*/
	xs: {
		type: definePropType([Number, Object]),
		default: () => mutable({})
	},
	/**
	* @description `≥768px` Responsive columns or column props object
	*/
	sm: {
		type: definePropType([Number, Object]),
		default: () => mutable({})
	},
	/**
	* @description `≥992px` Responsive columns or column props object
	*/
	md: {
		type: definePropType([Number, Object]),
		default: () => mutable({})
	},
	/**
	* @description `≥1200px` Responsive columns or column props object
	*/
	lg: {
		type: definePropType([Number, Object]),
		default: () => mutable({})
	},
	/**
	* @description `≥1920px` Responsive columns or column props object
	*/
	xl: {
		type: definePropType([Number, Object]),
		default: () => mutable({})
	}
});
//#endregion
export { colProps };

//# sourceMappingURL=col.mjs.map