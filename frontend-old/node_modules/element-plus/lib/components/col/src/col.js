Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const require_runtime = require("../../../utils/vue/props/runtime.js");
const require_typescript = require("../../../utils/typescript.js");
//#region ../../packages/components/col/src/col.ts
/**
* @deprecated Removed after 3.0.0, Use `ColProps` instead.
*/
const colProps = require_runtime.buildProps({
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
		type: require_runtime.definePropType([Number, Object]),
		default: () => require_typescript.mutable({})
	},
	/**
	* @description `≥768px` Responsive columns or column props object
	*/
	sm: {
		type: require_runtime.definePropType([Number, Object]),
		default: () => require_typescript.mutable({})
	},
	/**
	* @description `≥992px` Responsive columns or column props object
	*/
	md: {
		type: require_runtime.definePropType([Number, Object]),
		default: () => require_typescript.mutable({})
	},
	/**
	* @description `≥1200px` Responsive columns or column props object
	*/
	lg: {
		type: require_runtime.definePropType([Number, Object]),
		default: () => require_typescript.mutable({})
	},
	/**
	* @description `≥1920px` Responsive columns or column props object
	*/
	xl: {
		type: require_runtime.definePropType([Number, Object]),
		default: () => require_typescript.mutable({})
	}
});
//#endregion
exports.colProps = colProps;

//# sourceMappingURL=col.js.map