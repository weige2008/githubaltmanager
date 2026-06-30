Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const require_runtime = require("../../../utils/vue/props/runtime.js");
//#region ../../packages/components/watermark/src/watermark.ts
/**
* @deprecated Removed after 3.0.0, Use `WatermarkProps` instead.
*/
const watermarkProps = require_runtime.buildProps({
	/**
	* @description The z-index of the appended watermark element
	*/
	zIndex: {
		type: Number,
		default: 9
	},
	/**
	* @description The rotation angle of the watermark
	*/
	rotate: {
		type: Number,
		default: -22
	},
	/**
	* @description The width of the watermark
	*/
	width: Number,
	/**
	* @description The height of the watermark
	*/
	height: Number,
	/**
	* @description Image source, it is recommended to export 2x or 3x image, high priority (support base64 format)
	*/
	image: String,
	/**
	* @description Watermark text content
	*/
	content: {
		type: require_runtime.definePropType([String, Array]),
		default: "Element Plus"
	},
	/**
	* @description Text style
	*/
	font: { type: require_runtime.definePropType(Object) },
	/**
	* @description The spacing between watermarks
	*/
	gap: {
		type: require_runtime.definePropType(Array),
		default: () => [100, 100]
	},
	/**
	* @description The offset of the watermark from the upper left corner of the container. The default is gap/2
	*/
	offset: { type: require_runtime.definePropType(Array) }
});
//#endregion
exports.watermarkProps = watermarkProps;

//# sourceMappingURL=watermark.js.map