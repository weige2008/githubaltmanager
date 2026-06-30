import { buildProps } from "../../../utils/vue/props/runtime.mjs";
import { iconPropType } from "../../../utils/vue/icon.mjs";
//#region ../../packages/components/steps/src/item.ts
/**
* @deprecated Removed after 3.0.0, Use `StepProps` instead.
*/
const stepProps = buildProps({
	/**
	* @description step title
	*/
	title: {
		type: String,
		default: ""
	},
	/**
	* @description step custom icon. Icons can be passed via named slot as well
	*/
	icon: { type: iconPropType },
	/**
	* @description step description
	*/
	description: {
		type: String,
		default: ""
	},
	/**
	* @description current status. It will be automatically set by Steps if not configured.
	*/
	status: {
		type: String,
		values: [
			"",
			"wait",
			"process",
			"finish",
			"error",
			"success"
		],
		default: ""
	}
});
//#endregion
export { stepProps };

//# sourceMappingURL=item.mjs.map