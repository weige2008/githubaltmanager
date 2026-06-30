import { buildProps, definePropType } from "../../../utils/vue/props/runtime.mjs";
import { timePickerDefaultProps } from "../../time-picker/src/common/props.mjs";
//#region ../../packages/components/date-picker/src/props.ts
const datePickerProps = buildProps({
	...timePickerDefaultProps,
	/**
	* @description type of the picker
	*/
	type: {
		type: definePropType(String),
		default: "date"
	}
});
//#endregion
export { datePickerProps };

//# sourceMappingURL=props.mjs.map