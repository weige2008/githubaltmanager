Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const require_size = require("../../../constants/size.js");
const require_types = require("../../../utils/types.js");
const require_runtime = require("../../../utils/vue/props/runtime.js");
const require_icon = require("../../../utils/vue/icon.js");
//#region ../../packages/components/avatar/src/avatar.ts
/**
* @deprecated Removed after 3.0.0, Use `AvatarProps` instead.
*/
const avatarProps = require_runtime.buildProps({
	/**
	* @description avatar size.
	*/
	size: {
		type: [Number, String],
		values: require_size.componentSizes,
		validator: (val) => require_types.isNumber(val)
	},
	/**
	* @description avatar shape.
	*/
	shape: {
		type: String,
		values: ["circle", "square"]
	},
	/**
	* @description representation type to icon, more info on icon component.
	*/
	icon: { type: require_icon.iconPropType },
	/**
	* @description the source of the image for an image avatar.
	*/
	src: {
		type: String,
		default: ""
	},
	/**
	* @description native attribute `alt` of image avatar.
	*/
	alt: String,
	/**
	* @description native attribute srcset of image avatar.
	*/
	srcSet: String,
	/**
	* @description set how the image fit its container for an image avatar.
	*/
	fit: {
		type: require_runtime.definePropType(String),
		default: "cover"
	}
});
const avatarEmits = { error: (evt) => evt instanceof Event };
//#endregion
exports.avatarEmits = avatarEmits;
exports.avatarProps = avatarProps;

//# sourceMappingURL=avatar.js.map