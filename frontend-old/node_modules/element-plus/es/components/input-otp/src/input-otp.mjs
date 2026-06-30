import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from "../../../constants/event.mjs";
import { isString } from "../../../utils/types.mjs";
//#region ../../packages/components/input-otp/src/input-otp.ts
const inputOtpEmits = {
	[UPDATE_MODEL_EVENT]: (value) => isString(value),
	[CHANGE_EVENT]: (value) => isString(value),
	finish: (value) => isString(value),
	focus: (eve) => eve instanceof FocusEvent,
	blur: (eve) => eve instanceof FocusEvent
};
//#endregion
export { inputOtpEmits };

//# sourceMappingURL=input-otp.mjs.map