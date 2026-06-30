Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
require("../../../_virtual/_rolldown/runtime.js");
const require_event = require("../../../constants/event.js");
let _vue_shared = require("@vue/shared");
//#region ../../packages/components/input-otp/src/input-otp.ts
const inputOtpEmits = {
	[require_event.UPDATE_MODEL_EVENT]: (value) => (0, _vue_shared.isString)(value),
	[require_event.CHANGE_EVENT]: (value) => (0, _vue_shared.isString)(value),
	finish: (value) => (0, _vue_shared.isString)(value),
	focus: (eve) => eve instanceof FocusEvent,
	blur: (eve) => eve instanceof FocusEvent
};
//#endregion
exports.inputOtpEmits = inputOtpEmits;

//# sourceMappingURL=input-otp.js.map