Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
require("../../../_virtual/_rolldown/runtime.js");
const require_size = require("../../../constants/size.js");
const require_types = require("../../../utils/types.js");
const require_runtime$1 = require("../../../utils/vue/props/runtime.js");
const require_content = require("../../tooltip/src/content.js");
let _popperjs_core = require("@popperjs/core");
//#region ../../packages/components/avatar/src/avatar-group-props.ts
const avatarGroupProps = {
	/**
	* @description control the size of avatars in this avatar-group
	*/
	size: {
		type: require_runtime$1.definePropType([Number, String]),
		values: require_size.componentSizes,
		validator: (val) => require_types.isNumber(val)
	},
	/**
	* @description control the shape of avatars in this avatar-group
	*/
	shape: {
		type: require_runtime$1.definePropType(String),
		values: ["circle", "square"]
	},
	/**
	* @description whether to collapse avatars
	*/
	collapseAvatars: Boolean,
	/**
	* @description whether show all collapsed avatars when mouse hover text of the collapse-avatar. To use this, `collapse-avatars` must be true
	*/
	collapseAvatarsTooltip: Boolean,
	/**
	* @description the max avatars number to be shown. To use this, `collapse-avatars` must be true
	*/
	maxCollapseAvatars: {
		type: Number,
		default: 1
	},
	/**
	* @description tooltip theme, built-in theme: `dark` / `light`
	*/
	effect: {
		type: require_runtime$1.definePropType(String),
		default: "light"
	},
	/**
	* @description placement of tooltip
	*/
	placement: {
		type: require_runtime$1.definePropType(String),
		values: _popperjs_core.placements,
		default: "top"
	},
	/**
	* @description custom class name for tooltip
	*/
	popperClass: require_content.useTooltipContentProps.popperClass,
	/**
	* @description custom style for tooltip
	*/
	popperStyle: require_content.useTooltipContentProps.popperStyle,
	/**
	* @description custom class name for the collapse-avatar
	*/
	collapseClass: String,
	/**
	* @description custom style for the collapse-avatar
	*/
	collapseStyle: {
		type: require_runtime$1.definePropType([
			String,
			Array,
			Object,
			Boolean
		]),
		default: void 0
	}
};
//#endregion
exports.avatarGroupProps = avatarGroupProps;

//# sourceMappingURL=avatar-group-props.js.map