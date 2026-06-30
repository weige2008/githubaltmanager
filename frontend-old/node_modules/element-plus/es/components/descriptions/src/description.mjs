import { buildProps } from "../../../utils/vue/props/runtime.mjs";
import { useSizeProp } from "../../../hooks/use-size/index.mjs";
//#region ../../packages/components/descriptions/src/description.ts
/**
* @deprecated Removed after 3.0.0, Use `DescriptionProps` instead.
*/
const descriptionProps = buildProps({
	/**
	* @description with or without border
	*/
	border: Boolean,
	/**
	* @description numbers of `Descriptions Item` in one line
	*/
	column: {
		type: Number,
		default: 3
	},
	/**
	* @description direction of list
	*/
	direction: {
		type: String,
		values: ["horizontal", "vertical"],
		default: "horizontal"
	},
	/**
	* @description size of list
	*/
	size: useSizeProp,
	/**
	* @description title text, display on the top left
	*/
	title: {
		type: String,
		default: ""
	},
	/**
	* @description extra text, display on the top right
	*/
	extra: {
		type: String,
		default: ""
	},
	/**
	* @description width of every label column
	*/
	labelWidth: { type: [String, Number] }
});
//#endregion
export { descriptionProps };

//# sourceMappingURL=description.mjs.map