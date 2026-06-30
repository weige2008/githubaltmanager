Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const require_types = require("../../../utils/types.js");
const require_runtime = require("../../../utils/vue/props/runtime.js");
const require_typescript = require("../../../utils/typescript.js");
//#region ../../packages/components/image-viewer/src/image-viewer.ts
/**
* @deprecated Removed after 3.0.0, Use `ImageViewerProps` instead.
*/
const imageViewerProps = require_runtime.buildProps({
	/**
	* @description preview link list.
	*/
	urlList: {
		type: require_runtime.definePropType(Array),
		default: () => require_typescript.mutable([])
	},
	/**
	* @description preview backdrop z-index.
	*/
	zIndex: { type: Number },
	/**
	* @description the initial preview image index, less than or equal to the length of `url-list`.
	*/
	initialIndex: {
		type: Number,
		default: 0
	},
	/**
	* @description whether preview is infinite.
	*/
	infinite: {
		type: Boolean,
		default: true
	},
	/**
	* @description whether user can emit close event when clicking backdrop.
	*/
	hideOnClickModal: Boolean,
	/**
	* @description whether to append image itself to body. A nested parent element attribute transform should have this attribute set to `true`.
	*/
	teleported: Boolean,
	/**
	* @description whether the image-viewer can be closed by pressing ESC.
	*/
	closeOnPressEscape: {
		type: Boolean,
		default: true
	},
	/**
	* @description the zoom rate of the image viewer zoom event.
	*/
	zoomRate: {
		type: Number,
		default: 1.2
	},
	/**
	* @description preview image scale.
	*/
	scale: {
		type: Number,
		default: 1
	},
	/**
	* @description the min scale of the image viewer zoom event.
	*/
	minScale: {
		type: Number,
		default: .2
	},
	/**
	* @description the max scale of the image viewer zoom event.
	*/
	maxScale: {
		type: Number,
		default: 7
	},
	/**
	* @description show preview image progress content.
	*/
	showProgress: Boolean,
	/**
	* @description set HTML attribute: crossorigin.
	*/
	crossorigin: { type: require_runtime.definePropType(String) }
});
const imageViewerEmits = {
	close: () => true,
	error: (evt) => evt instanceof Event,
	switch: (index) => require_types.isNumber(index),
	rotate: (deg) => require_types.isNumber(deg)
};
//#endregion
exports.imageViewerEmits = imageViewerEmits;
exports.imageViewerProps = imageViewerProps;

//# sourceMappingURL=image-viewer.js.map