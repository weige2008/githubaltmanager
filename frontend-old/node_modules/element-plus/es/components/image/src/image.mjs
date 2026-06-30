import { isNumber } from "../../../utils/types.mjs";
import { buildProps, definePropType } from "../../../utils/vue/props/runtime.mjs";
import { mutable } from "../../../utils/typescript.mjs";
//#region ../../packages/components/image/src/image.ts
/**
* @deprecated Removed after 3.0.0, Use `ImageProps` instead.
*/
const imageProps = buildProps({
	/**
	* @description when enabling preview, use this flag to control whether clicking on backdrop can exit preview mode.
	*/
	hideOnClickModal: Boolean,
	/**
	* @description image source, same as native.
	*/
	src: {
		type: String,
		default: ""
	},
	/**
	* @description indicate how the image should be resized to fit its container, same as [object-fit](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit).
	*/
	fit: {
		type: String,
		values: [
			"",
			"contain",
			"cover",
			"fill",
			"none",
			"scale-down"
		],
		default: ""
	},
	/**
	* @description Indicates how the browser should load the image, same as [native](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/img#loading)
	*/
	loading: {
		type: String,
		values: ["eager", "lazy"]
	},
	/**
	* @description whether to use lazy load.
	*/
	lazy: Boolean,
	/**
	* @description the container to add scroll listener when using lazy load.
	*/
	scrollContainer: { type: definePropType([String, Object]) },
	/**
	* @description allow big image preview.
	*/
	previewSrcList: {
		type: definePropType(Array),
		default: () => mutable([])
	},
	/**
	* @description whether to append image-viewer to body. A nested parent element attribute transform should have this attribute set to `true`.
	*/
	previewTeleported: Boolean,
	/**
	* @description set image preview z-index.
	*/
	zIndex: { type: Number },
	/**
	* @description initial preview image index, less than the length of `url-list`.
	*/
	initialIndex: {
		type: Number,
		default: 0
	},
	/**
	* @description whether the viewer preview is infinite.
	*/
	infinite: {
		type: Boolean,
		default: true
	},
	/**
	* @description whether the image-viewer can be closed by pressing ESC.
	*/
	closeOnPressEscape: {
		type: Boolean,
		default: true
	},
	/**
	* @description the zoom rate of the image viewer zoom event
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
	crossorigin: { type: definePropType(String) }
});
const imageEmits = {
	load: (evt) => evt instanceof Event,
	error: (evt) => evt instanceof Event,
	switch: (val) => isNumber(val),
	close: () => true,
	show: () => true
};
//#endregion
export { imageEmits, imageProps };

//# sourceMappingURL=image.mjs.map