Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
//#region ../../packages/components/table/src/table-column/defaults.ts
/**
* @deprecated Removed after 3.0.0, Use `TableColumnProps` instead.
*/
const tableColumnProps = {
	/**
	* @description type of the column. If set to `selection`, the column will display checkbox. If set to `index`, the column will display index of the row (staring from 1). If set to `expand`, the column will display expand icon
	*/
	type: {
		type: String,
		default: "default"
	},
	/**
	* @description column label
	*/
	label: String,
	/**
	* @description class name of cells in the column
	*/
	className: String,
	/**
	* @description class name of the label of this column
	*/
	labelClassName: String,
	/**
	* @description
	*/
	property: String,
	/**
	* @description field name. You can also use its alias: `property`
	*/
	prop: String,
	/**
	* @description column width
	*/
	width: {
		type: [String, Number],
		default: ""
	},
	/**
	* @description column minimum width. Columns with `width` has a fixed width, while columns with `min-width` has a width that is distributed in proportion
	*/
	minWidth: {
		type: [String, Number],
		default: ""
	},
	/**
	* @description render function for table header of this column
	*/
	renderHeader: Function,
	/**
	* @description whether column can be sorted. Remote sorting can be done by setting this attribute to 'custom' and listening to the `sort-change` event of Table
	*/
	sortable: {
		type: [Boolean, String],
		default: false
	},
	/**
	* @description sorting method, works when `sortable` is `true`. Should return a number, just like Array.sort
	*/
	sortMethod: Function,
	/**
	* @description specify which property to sort by, works when `sortable` is `true` and `sort-method` is `undefined`. If set to an Array, the column will sequentially sort by the next property if the previous one is equal
	*/
	sortBy: [
		String,
		Function,
		Array
	],
	/**
	* @description whether column width can be resized, works when `border` of `el-table` is `true`
	*/
	resizable: {
		type: Boolean,
		default: true
	},
	/**
	* @description column's key. If you need to use the filter-change event, you need this attribute to identify which column is being filtered
	*/
	columnKey: String,
	/**
	* @description alignment, the value should be 'left' \/ 'center' \/ 'right'
	*/
	align: String,
	/**
	* @description alignment of the table header. If omitted, the value of the above `align` attribute will be applied, the value should be 'left' \/ 'center' \/ 'right'
	*/
	headerAlign: String,
	/**
	* @description whether to hide extra content and show them in a tooltip when hovering on the cell
	*/
	showOverflowTooltip: {
		type: [Boolean, Object],
		default: void 0
	},
	/**
	* @description function that formats cell tooltip content, works when `show-overflow-tooltip` is `true`
	*/
	tooltipFormatter: Function,
	/**
	* @description whether column is fixed at left / right. Will be fixed at left if `true`
	*/
	fixed: [Boolean, String],
	/**
	* @description function that formats cell content
	*/
	formatter: Function,
	/**
	* @description function that determines if a certain row can be selected, works when `type` is 'selection'
	*/
	selectable: Function,
	/**
	* @description whether to reserve selection after data refreshing, works when `type` is 'selection'. Note that `row-key` is required for this to work
	*/
	reserveSelection: Boolean,
	/**
	* @description data filtering method. If `filter-multiple` is on, this method will be called multiple times for each row, and a row will display if one of the calls returns `true`
	*/
	filterMethod: Function,
	/**
	* @description filter value for selected data, might be useful when table header is rendered with `render-header`
	*/
	filteredValue: Array,
	/**
	* @description an array of data filtering options. For each element in this array, `text` and `value` are required
	*/
	filters: Array,
	/**
	* @description placement for the filter dropdown
	*/
	filterPlacement: String,
	/**
	* @description whether data filtering supports multiple options
	*/
	filterMultiple: {
		type: Boolean,
		default: true
	},
	/**
	* @description className for the filter dropdown
	*/
	filterClassName: String,
	/**
	* @description customize indices for each row, works on columns with `type=index`
	*/
	index: [Number, Function],
	/**
	* @description the order of the sorting strategies used when sorting the data, works when `sortable` is `true`. Accepts an array, as the user clicks on the header, the column is sorted in order of the elements in the array
	*/
	sortOrders: {
		type: Array,
		default: () => {
			return [
				"ascending",
				"descending",
				null
			];
		},
		validator: (val) => {
			return val.every((order) => [
				"ascending",
				"descending",
				null
			].includes(order));
		}
	}
};
//#endregion
exports.default = tableColumnProps;
exports.tableColumnProps = tableColumnProps;

//# sourceMappingURL=defaults.js.map