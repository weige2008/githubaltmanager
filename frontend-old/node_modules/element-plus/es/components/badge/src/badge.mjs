import { buildProps, definePropType } from "../../../utils/vue/props/runtime.mjs";
//#region ../../packages/components/badge/src/badge.ts
/**
* @deprecated Removed after 3.0.0, Use `BadgeProps` instead.
*/
const badgeProps = buildProps({
	/**
	* @description display value.
	*/
	value: {
		type: [String, Number],
		default: ""
	},
	/**
	* @description maximum value, shows `{max}+` when exceeded. Only works if value is a number.
	*/
	max: {
		type: Number,
		default: 99
	},
	/**
	* @description if a little dot is displayed.
	*/
	isDot: Boolean,
	/**
	* @description hidden badge.
	*/
	hidden: Boolean,
	/**
	* @description badge type.
	*/
	type: {
		type: String,
		values: [
			"primary",
			"success",
			"warning",
			"info",
			"danger"
		],
		default: "danger"
	},
	/**
	* @description whether to show badge when value is zero.
	*/
	showZero: {
		type: Boolean,
		default: true
	},
	/**
	* @description customize dot background color
	*/
	color: String,
	/**
	* @description CSS style of badge
	*/
	badgeStyle: {
		type: definePropType([
			String,
			Object,
			Array,
			Boolean
		]),
		default: void 0
	},
	/**
	* @description set offset of the badge
	*/
	offset: {
		type: definePropType(Array),
		default: () => [0, 0]
	},
	/**
	* @description custom class name of badge
	*/
	badgeClass: { type: String }
});
//#endregion
export { badgeProps };

//# sourceMappingURL=badge.mjs.map