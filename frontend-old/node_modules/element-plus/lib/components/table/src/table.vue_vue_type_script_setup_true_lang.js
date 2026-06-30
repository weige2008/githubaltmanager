require("../../../_virtual/_rolldown/runtime.js");
const require_index = require("../../../hooks/use-locale/index.js");
const require_index$1 = require("../../../hooks/use-namespace/index.js");
const require_index$2 = require("../../scrollbar/index.js");
const require_use_global_config = require("../../config-provider/src/hooks/use-global-config.js");
const require_index$3 = require("../../../directives/mousewheel/index.js");
const require_defaults = require("./table/defaults.js");
const require_util = require("./util.js");
const require_helper = require("./store/helper.js");
const require_table_layout = require("./table-layout.js");
const require_tokens = require("./tokens.js");
const require_utils_helper = require("./table-header/utils-helper.js");
const require_index$4 = require("./table-header/index.js");
const require_index$5 = require("./table-body/index.js");
const require_index$6 = require("./table-footer/index.js");
const require_utils_helper$1 = require("./table/utils-helper.js");
const require_style_helper = require("./table/style-helper.js");
const require_key_render_helper = require("./table/key-render-helper.js");
const require_h_helper = require("./h-helper.js");
const require_use_scrollbar = require("./composables/use-scrollbar.js");
let lodash_unified = require("lodash-unified");
let vue = require("vue");
//#region ../../packages/components/table/src/table.vue?vue&type=script&setup=true&lang.ts
const _hoisted_1 = ["data-prefix"];
const _hoisted_2 = {
	ref: "hiddenColumns",
	class: "hidden-columns"
};
var table_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ (0, vue.defineComponent)({
	name: "ElTable",
	__name: "table",
	props: require_defaults.default,
	emits: [
		"select",
		"select-all",
		"selection-change",
		"cell-mouse-enter",
		"cell-mouse-leave",
		"cell-dblclick",
		"cell-contextmenu",
		"cell-click",
		"row-dblclick",
		"row-click",
		"row-contextmenu",
		"header-click",
		"header-contextmenu",
		"sort-change",
		"filter-change",
		"current-change",
		"header-dragend",
		"expand-change",
		"scroll"
	],
	setup(__props, { expose: __expose }) {
		const props = __props;
		const { t } = require_index.useLocale();
		const ns = require_index$1.useNamespace("table");
		const globalConfig = require_use_global_config.useGlobalConfig("table");
		const table = (0, vue.getCurrentInstance)();
		(0, vue.provide)(require_tokens.TABLE_INJECTION_KEY, table);
		const store = require_helper.createStore(table, props);
		table.store = store;
		const layout = new require_table_layout.default({
			store: table.store,
			table,
			fit: props.fit,
			showHeader: props.showHeader
		});
		table.layout = layout;
		const isEmpty = (0, vue.computed)(() => (store.states.data.value || []).length === 0);
		/**
		* open functions
		*/
		const { setCurrentRow, getSelectionRows, getHalfSelectionRows, toggleRowSelection, clearSelection, clearFilter, toggleAllSelection, toggleRowExpansion, clearSort, sort, updateKeyChildren } = require_utils_helper$1.default(store);
		const { isHidden, renderExpanded, setDragVisible, isGroup, handleMouseLeave, handleHeaderFooterMousewheel, tableSize, emptyBlockStyle, resizeProxyVisible, bodyWidth, resizeState, doLayout, tableBodyStyles, tableLayout, scrollbarViewStyle, scrollbarStyle } = require_style_helper.default(props, layout, store, table);
		const { scrollBarRef, scrollTo, setScrollLeft, setScrollTop } = require_use_scrollbar.useScrollbar();
		const debouncedUpdateLayout = (0, lodash_unified.debounce)(doLayout, 50);
		const tableId = require_util.createTableId(ns.namespace.value);
		const context = table;
		table.tableId = tableId;
		table.state = {
			isGroup,
			resizeState,
			doLayout,
			debouncedUpdateLayout
		};
		const computedSumText = (0, vue.computed)(() => props.sumText ?? t("el.table.sumText"));
		const computedEmptyText = (0, vue.computed)(() => {
			return props.emptyText ?? t("el.table.emptyText");
		});
		const computedTooltipEffect = (0, vue.computed)(() => props.tooltipEffect ?? globalConfig.value?.tooltipEffect);
		const computedTooltipOptions = (0, vue.computed)(() => props.tooltipOptions ?? globalConfig.value?.tooltipOptions);
		const columns = (0, vue.computed)(() => {
			return require_utils_helper.convertToRows(store.states.originColumns.value)[0];
		});
		require_key_render_helper.default(table);
		(0, vue.onBeforeUnmount)(() => {
			debouncedUpdateLayout.cancel();
		});
		__expose({
			ns,
			layout,
			store,
			columns,
			handleHeaderFooterMousewheel,
			handleMouseLeave,
			tableId,
			tableSize,
			isHidden,
			isEmpty,
			renderExpanded,
			resizeProxyVisible,
			resizeState,
			isGroup,
			bodyWidth,
			tableBodyStyles,
			emptyBlockStyle,
			debouncedUpdateLayout,
			/**
			* @description used in single selection Table, set a certain row selected. If called without any parameter, it will clear selection
			*/
			setCurrentRow,
			/**
			* @description returns the currently selected rows
			*/
			getSelectionRows,
			/**
			* @description returns the currently half-selected rows
			*/
			getHalfSelectionRows,
			/**
			* @description used in multiple selection Table, toggle if a certain row is selected. With the second parameter, you can directly set if this row is selected
			*/
			toggleRowSelection,
			/**
			* @description used in multiple selection Table, clear user selection
			*/
			clearSelection,
			/**
			* @description clear filters of the columns whose `columnKey` are passed in. If no params, clear all filters
			*/
			clearFilter,
			/**
			* @description used in multiple selection Table, toggle select all and deselect all
			*/
			toggleAllSelection,
			/**
			* @description used in expandable Table or tree Table, toggle if a certain row is expanded. With the second parameter, you can directly set if this row is expanded or collapsed
			*/
			toggleRowExpansion,
			/**
			* @description clear sorting, restore data to the original order
			*/
			clearSort,
			/**
			* @description refresh the layout of Table. When the visibility of Table changes, you may need to call this method to get a correct layout
			*/
			doLayout,
			/**
			* @description sort Table manually. Property `prop` is used to set sort column, property `order` is used to set sort order
			*/
			sort,
			/**
			* @description used in lazy Table, must set `rowKey`, update key children
			*/
			updateKeyChildren,
			t,
			setDragVisible,
			context,
			computedSumText,
			computedEmptyText,
			computedTooltipEffect,
			computedTooltipOptions,
			tableLayout,
			scrollbarViewStyle,
			scrollbarStyle,
			scrollBarRef,
			/**
			* @description scrolls to a particular set of coordinates
			*/
			scrollTo,
			/**
			* @description set horizontal scroll position
			*/
			setScrollLeft,
			/**
			* @description set vertical scroll position
			*/
			setScrollTop,
			/**
			* @description whether to allow drag the last column
			*/
			allowDragLastColumn: props.allowDragLastColumn
		});
		return (_ctx, _cache) => {
			return (0, vue.openBlock)(), (0, vue.createElementBlock)("div", {
				ref: "tableWrapper",
				class: (0, vue.normalizeClass)([
					{
						[(0, vue.unref)(ns).m("fit")]: __props.fit,
						[(0, vue.unref)(ns).m("striped")]: __props.stripe,
						[(0, vue.unref)(ns).m("border")]: __props.border || (0, vue.unref)(isGroup),
						[(0, vue.unref)(ns).m("hidden")]: (0, vue.unref)(isHidden),
						[(0, vue.unref)(ns).m("group")]: (0, vue.unref)(isGroup),
						[(0, vue.unref)(ns).m("fluid-height")]: __props.maxHeight,
						[(0, vue.unref)(ns).m("scrollable-x")]: (0, vue.unref)(layout).scrollX.value,
						[(0, vue.unref)(ns).m("scrollable-y")]: (0, vue.unref)(layout).scrollY.value,
						[(0, vue.unref)(ns).m("enable-row-hover")]: !(0, vue.unref)(store).states.isComplex.value,
						[(0, vue.unref)(ns).m("enable-row-transition")]: ((0, vue.unref)(store).states.data.value || []).length !== 0 && ((0, vue.unref)(store).states.data.value || []).length < 100,
						"has-footer": __props.showSummary
					},
					(0, vue.unref)(ns).m((0, vue.unref)(tableSize)),
					__props.className,
					(0, vue.unref)(ns).b(),
					(0, vue.unref)(ns).m(`layout-${(0, vue.unref)(tableLayout)}`)
				]),
				style: (0, vue.normalizeStyle)(__props.style),
				"data-prefix": (0, vue.unref)(ns).namespace.value,
				onMouseleave: _cache[1] || (_cache[1] = (...args) => (0, vue.unref)(handleMouseLeave) && (0, vue.unref)(handleMouseLeave)(...args))
			}, [(0, vue.createElementVNode)("div", {
				ref: "tableInnerWrapper",
				class: (0, vue.normalizeClass)((0, vue.unref)(ns).e("inner-wrapper"))
			}, [
				(0, vue.createElementVNode)("div", _hoisted_2, [(0, vue.renderSlot)(_ctx.$slots, "default")], 512),
				__props.showHeader && (0, vue.unref)(tableLayout) === "fixed" ? (0, vue.withDirectives)(((0, vue.openBlock)(), (0, vue.createElementBlock)("div", {
					key: 0,
					ref: "headerWrapper",
					class: (0, vue.normalizeClass)((0, vue.unref)(ns).e("header-wrapper"))
				}, [(0, vue.createElementVNode)("table", {
					ref: "tableHeader",
					class: (0, vue.normalizeClass)((0, vue.unref)(ns).e("header")),
					style: (0, vue.normalizeStyle)((0, vue.unref)(tableBodyStyles)),
					border: "0",
					cellpadding: "0",
					cellspacing: "0"
				}, [(0, vue.createVNode)((0, vue.unref)(require_h_helper.hColgroup), {
					columns: (0, vue.unref)(store).states.columns.value,
					"table-layout": (0, vue.unref)(tableLayout)
				}, null, 8, ["columns", "table-layout"]), (0, vue.createVNode)((0, vue.unref)(require_index$4.default), {
					ref: "tableHeaderRef",
					border: __props.border,
					"default-sort": __props.defaultSort,
					store: (0, vue.unref)(store),
					"append-filter-panel-to": __props.appendFilterPanelTo,
					"allow-drag-last-column": __props.allowDragLastColumn,
					onSetDragVisible: (0, vue.unref)(setDragVisible)
				}, null, 8, [
					"border",
					"default-sort",
					"store",
					"append-filter-panel-to",
					"allow-drag-last-column",
					"onSetDragVisible"
				])], 6)], 2)), [[(0, vue.unref)(require_index$3.default), (0, vue.unref)(handleHeaderFooterMousewheel)]]) : (0, vue.createCommentVNode)("v-if", true),
				(0, vue.createElementVNode)("div", {
					ref: "bodyWrapper",
					class: (0, vue.normalizeClass)((0, vue.unref)(ns).e("body-wrapper"))
				}, [(0, vue.createVNode)((0, vue.unref)(require_index$2.ElScrollbar), {
					ref_key: "scrollBarRef",
					ref: scrollBarRef,
					"view-style": (0, vue.unref)(scrollbarViewStyle),
					"wrap-style": (0, vue.unref)(scrollbarStyle),
					always: __props.scrollbarAlwaysOn,
					tabindex: __props.scrollbarTabindex,
					native: __props.nativeScrollbar,
					onScroll: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("scroll", $event))
				}, {
					default: (0, vue.withCtx)(() => [
						(0, vue.createElementVNode)("table", {
							ref: "tableBody",
							class: (0, vue.normalizeClass)((0, vue.unref)(ns).e("body")),
							cellspacing: "0",
							cellpadding: "0",
							border: "0",
							style: (0, vue.normalizeStyle)({
								width: (0, vue.unref)(bodyWidth),
								tableLayout: (0, vue.unref)(tableLayout)
							})
						}, [
							(0, vue.createVNode)((0, vue.unref)(require_h_helper.hColgroup), {
								columns: (0, vue.unref)(store).states.columns.value,
								"table-layout": (0, vue.unref)(tableLayout)
							}, null, 8, ["columns", "table-layout"]),
							__props.showHeader && (0, vue.unref)(tableLayout) === "auto" ? ((0, vue.openBlock)(), (0, vue.createBlock)((0, vue.unref)(require_index$4.default), {
								key: 0,
								ref: "tableHeaderRef",
								class: (0, vue.normalizeClass)((0, vue.unref)(ns).e("body-header")),
								border: __props.border,
								"default-sort": __props.defaultSort,
								store: (0, vue.unref)(store),
								"append-filter-panel-to": __props.appendFilterPanelTo,
								onSetDragVisible: (0, vue.unref)(setDragVisible)
							}, null, 8, [
								"class",
								"border",
								"default-sort",
								"store",
								"append-filter-panel-to",
								"onSetDragVisible"
							])) : (0, vue.createCommentVNode)("v-if", true),
							(0, vue.createVNode)((0, vue.unref)(require_index$5.default), {
								context: (0, vue.unref)(context),
								highlight: __props.highlightCurrentRow,
								"row-class-name": __props.rowClassName,
								"tooltip-effect": computedTooltipEffect.value,
								"tooltip-options": computedTooltipOptions.value,
								"row-style": __props.rowStyle,
								store: (0, vue.unref)(store),
								stripe: __props.stripe
							}, null, 8, [
								"context",
								"highlight",
								"row-class-name",
								"tooltip-effect",
								"tooltip-options",
								"row-style",
								"store",
								"stripe"
							]),
							__props.showSummary && (0, vue.unref)(tableLayout) === "auto" ? ((0, vue.openBlock)(), (0, vue.createBlock)((0, vue.unref)(require_index$6.default), {
								key: 1,
								class: (0, vue.normalizeClass)((0, vue.unref)(ns).e("body-footer")),
								border: __props.border,
								"default-sort": __props.defaultSort,
								store: (0, vue.unref)(store),
								"sum-text": computedSumText.value,
								"summary-method": __props.summaryMethod
							}, null, 8, [
								"class",
								"border",
								"default-sort",
								"store",
								"sum-text",
								"summary-method"
							])) : (0, vue.createCommentVNode)("v-if", true)
						], 6),
						isEmpty.value ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("div", {
							key: 0,
							ref: "emptyBlock",
							style: (0, vue.normalizeStyle)((0, vue.unref)(emptyBlockStyle)),
							class: (0, vue.normalizeClass)((0, vue.unref)(ns).e("empty-block"))
						}, [(0, vue.createElementVNode)("span", { class: (0, vue.normalizeClass)((0, vue.unref)(ns).e("empty-text")) }, [(0, vue.renderSlot)(_ctx.$slots, "empty", {}, () => [(0, vue.createTextVNode)((0, vue.toDisplayString)(computedEmptyText.value), 1)])], 2)], 6)) : (0, vue.createCommentVNode)("v-if", true),
						_ctx.$slots.append ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("div", {
							key: 1,
							ref: "appendWrapper",
							class: (0, vue.normalizeClass)((0, vue.unref)(ns).e("append-wrapper"))
						}, [(0, vue.renderSlot)(_ctx.$slots, "append")], 2)) : (0, vue.createCommentVNode)("v-if", true)
					]),
					_: 3
				}, 8, [
					"view-style",
					"wrap-style",
					"always",
					"tabindex",
					"native"
				])], 2),
				__props.showSummary && (0, vue.unref)(tableLayout) === "fixed" ? (0, vue.withDirectives)(((0, vue.openBlock)(), (0, vue.createElementBlock)("div", {
					key: 1,
					ref: "footerWrapper",
					class: (0, vue.normalizeClass)((0, vue.unref)(ns).e("footer-wrapper"))
				}, [(0, vue.createElementVNode)("table", {
					class: (0, vue.normalizeClass)((0, vue.unref)(ns).e("footer")),
					cellspacing: "0",
					cellpadding: "0",
					border: "0",
					style: (0, vue.normalizeStyle)((0, vue.unref)(tableBodyStyles))
				}, [(0, vue.createVNode)((0, vue.unref)(require_h_helper.hColgroup), {
					columns: (0, vue.unref)(store).states.columns.value,
					"table-layout": (0, vue.unref)(tableLayout)
				}, null, 8, ["columns", "table-layout"]), (0, vue.createVNode)((0, vue.unref)(require_index$6.default), {
					border: __props.border,
					"default-sort": __props.defaultSort,
					store: (0, vue.unref)(store),
					"sum-text": computedSumText.value,
					"summary-method": __props.summaryMethod
				}, null, 8, [
					"border",
					"default-sort",
					"store",
					"sum-text",
					"summary-method"
				])], 6)], 2)), [[vue.vShow, !isEmpty.value], [(0, vue.unref)(require_index$3.default), (0, vue.unref)(handleHeaderFooterMousewheel)]]) : (0, vue.createCommentVNode)("v-if", true),
				__props.border || (0, vue.unref)(isGroup) ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("div", {
					key: 2,
					class: (0, vue.normalizeClass)((0, vue.unref)(ns).e("border-left-patch"))
				}, null, 2)) : (0, vue.createCommentVNode)("v-if", true)
			], 2), (0, vue.withDirectives)((0, vue.createElementVNode)("div", {
				ref: "resizeProxy",
				class: (0, vue.normalizeClass)((0, vue.unref)(ns).e("column-resize-proxy"))
			}, null, 2), [[vue.vShow, (0, vue.unref)(resizeProxyVisible)]])], 46, _hoisted_1);
		};
	}
});
//#endregion
exports.default = table_vue_vue_type_script_setup_true_lang_default;

//# sourceMappingURL=table.vue_vue_type_script_setup_true_lang.js.map