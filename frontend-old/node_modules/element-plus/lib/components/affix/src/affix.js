Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const require_event = require("../../../constants/event.js");
const require_types = require("../../../utils/types.js");
const require_runtime = require("../../../utils/vue/props/runtime.js");
//#region ../../packages/components/affix/src/affix.ts
/**
* @deprecated Removed after 3.0.0, Use `AffixProps` instead.
*/
const affixProps = require_runtime.buildProps({
	/**
	* @description affix element zIndex value
	* */
	zIndex: {
		type: require_runtime.definePropType([Number, String]),
		default: 100
	},
	/**
	* @description target container. (CSS selector)
	*/
	target: {
		type: String,
		default: ""
	},
	/**
	* @description offset distance
	* */
	offset: {
		type: Number,
		default: 0
	},
	/**
	* @description position of affix
	* */
	position: {
		type: String,
		values: ["top", "bottom"],
		default: "top"
	},
	/**
	* @description whether affix element is teleported, if `true` it will be teleported to where `append-to` sets
	* */
	teleported: Boolean,
	/**
	* @description which element the affix element appends to
	* */
	appendTo: {
		type: require_runtime.definePropType([String, Object]),
		default: "body"
	}
});
const affixEmits = {
	scroll: ({ scrollTop, fixed }) => require_types.isNumber(scrollTop) && require_types.isBoolean(fixed),
	[require_event.CHANGE_EVENT]: (fixed) => require_types.isBoolean(fixed)
};
//#endregion
exports.affixEmits = affixEmits;
exports.affixProps = affixProps;

//# sourceMappingURL=affix.js.map