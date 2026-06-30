import { buildProps, definePropType } from "../../../utils/vue/props/runtime.mjs";
//#region ../../packages/components/statistic/src/statistic.ts
/**
* @deprecated Removed after 3.0.0, Use `StatisticProps` instead.
*/
const statisticProps = buildProps({
	/**
	* @description Setting the decimal point
	*/
	decimalSeparator: {
		type: String,
		default: "."
	},
	/**
	* @description Sets the thousandth identifier
	*/
	groupSeparator: {
		type: String,
		default: ","
	},
	/**
	* @description numerical precision
	*/
	precision: {
		type: Number,
		default: 0
	},
	/**
	* @description Custom numerical presentation
	*/
	formatter: Function,
	/**
	* @description Numerical content
	*/
	value: {
		type: definePropType([Number, Object]),
		default: 0
	},
	/**
	* @description Sets the prefix of a number
	*/
	prefix: String,
	/**
	* @description  Sets the suffix of a number
	*/
	suffix: String,
	/**
	* @description Numeric titles
	*/
	title: String,
	/**
	* @description Styles numeric values
	*/
	valueStyle: {
		type: definePropType([
			String,
			Object,
			Array,
			Boolean
		]),
		default: void 0
	}
});
//#endregion
export { statisticProps };

//# sourceMappingURL=statistic.mjs.map