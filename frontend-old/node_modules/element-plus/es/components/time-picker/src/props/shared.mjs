import { buildProps, definePropType } from "../../../../utils/vue/props/runtime.mjs";
//#region ../../packages/components/time-picker/src/props/shared.ts
const disabledTimeListsProps = buildProps({
	/**
	* @description To specify the array of hours that cannot be selected
	*/
	disabledHours: { type: definePropType(Function) },
	/**
	* @description To specify the array of minutes that cannot be selected
	*/
	disabledMinutes: { type: definePropType(Function) },
	/**
	* @description To specify the array of seconds that cannot be selected
	*/
	disabledSeconds: { type: definePropType(Function) }
});
const timePanelSharedProps = buildProps({
	visible: Boolean,
	actualVisible: {
		type: Boolean,
		default: void 0
	},
	format: {
		type: String,
		default: ""
	}
});
//#endregion
export { disabledTimeListsProps, timePanelSharedProps };

//# sourceMappingURL=shared.mjs.map