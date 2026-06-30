import { useLocale } from "../../../hooks/use-locale/index.mjs";
import { useNamespace } from "../../../hooks/use-namespace/index.mjs";
import { ElScrollbar } from "../../scrollbar/index.mjs";
import { useGlobalConfig } from "../../config-provider/src/hooks/use-global-config.mjs";
import Mousewheel from "../../../directives/mousewheel/index.mjs";
import tableProps from "./table/defaults.mjs";
import { createTableId } from "./util.mjs";
import { createStore } from "./store/helper.mjs";
import TableLayout from "./table-layout.mjs";
import { TABLE_INJECTION_KEY } from "./tokens.mjs";
import { convertToRows } from "./table-header/utils-helper.mjs";
import table_header_default from "./table-header/index.mjs";
import table_body_default from "./table-body/index.mjs";
import table_footer_default from "./table-footer/index.mjs";
import useUtils from "./table/utils-helper.mjs";
import useStyle from "./table/style-helper.mjs";
import useKeyRender from "./table/key-render-helper.mjs";
import { hColgroup } from "./h-helper.mjs";
import { useScrollbar } from "./composables/use-scrollbar.mjs";
import { debounce } from "lodash-unified";
import { computed, createBlock, createCommentVNode, createElementBlock, createElementVNode, createTextVNode, createVNode, defineComponent, getCurrentInstance, normalizeClass, normalizeStyle, onBeforeUnmount, openBlock, provide, renderSlot, toDisplayString, unref, vShow, withCtx, withDirectives } from "vue";
//#region ../../packages/components/table/src/table.vue?vue&type=script&setup=true&lang.ts
const _hoisted_1 = ["data-prefix"];
const _hoisted_2 = {
	ref: "hiddenColumns",
	class: "hidden-columns"
};
var table_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	name: "ElTable",
	__name: "table",
	props: tableProps,
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
		const { t } = useLocale();
		const ns = useNamespace("table");
		const globalConfig = useGlobalConfig("table");
		const table = getCurrentInstance();
		provide(TABLE_INJECTION_KEY, table);
		const store = createStore(table, props);
		table.store = store;
		const layout = new TableLayout({
			store: table.store,
			table,
			fit: props.fit,
			showHeader: props.showHeader
		});
		table.layout = layout;
		const isEmpty = computed(() => (store.states.data.value || []).length === 0);
		/**
		* open functions
		*/
		const { setCurrentRow, getSelectionRows, getHalfSelectionRows, toggleRowSelection, clearSelection, clearFilter, toggleAllSelection, toggleRowExpansion, clearSort, sort, updateKeyChildren } = useUtils(store);
		const { isHidden, renderExpanded, setDragVisible, isGroup, handleMouseLeave, handleHeaderFooterMousewheel, tableSize, emptyBlockStyle, resizeProxyVisible, bodyWidth, resizeState, doLayout, tableBodyStyles, tableLayout, scrollbarViewStyle, scrollbarStyle } = useStyle(props, layout, store, table);
		const { scrollBarRef, scrollTo, setScrollLeft, setScrollTop } = useScrollbar();
		const debouncedUpdateLayout = debounce(doLayout, 50);
		const tableId = createTableId(ns.namespace.value);
		const context = table;
		table.tableId = tableId;
		table.state = {
			isGroup,
			resizeState,
			doLayout,
			debouncedUpdateLayout
		};
		const computedSumText = computed(() => props.sumText ?? t("el.table.sumText"));
		const computedEmptyText = computed(() => {
			return props.emptyText ?? t("el.table.emptyText");
		});
		const computedTooltipEffect = computed(() => props.tooltipEffect ?? globalConfig.value?.tooltipEffect);
		const computedTooltipOptions = computed(() => props.tooltipOptions ?? globalConfig.value?.tooltipOptions);
		const columns = computed(() => {
			return convertToRows(store.states.originColumns.value)[0];
		});
		useKeyRender(table);
		onBeforeUnmount(() => {
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
			return openBlock(), createElementBlock("div", {
				ref: "tableWrapper",
				class: normalizeClass([
					{
						[unref(ns).m("fit")]: __props.fit,
						[unref(ns).m("striped")]: __props.stripe,
						[unref(ns).m("border")]: __props.border || unref(isGroup),
						[unref(ns).m("hidden")]: unref(isHidden),
						[unref(ns).m("group")]: unref(isGroup),
						[unref(ns).m("fluid-height")]: __props.maxHeight,
						[unref(ns).m("scrollable-x")]: unref(layout).scrollX.value,
						[unref(ns).m("scrollable-y")]: unref(layout).scrollY.value,
						[unref(ns).m("enable-row-hover")]: !unref(store).states.isComplex.value,
						[unref(ns).m("enable-row-transition")]: (unref(store).states.data.value || []).length !== 0 && (unref(store).states.data.value || []).length < 100,
						"has-footer": __props.showSummary
					},
					unref(ns).m(unref(tableSize)),
					__props.className,
					unref(ns).b(),
					unref(ns).m(`layout-${unref(tableLayout)}`)
				]),
				style: normalizeStyle(__props.style),
				"data-prefix": unref(ns).namespace.value,
				onMouseleave: _cache[1] || (_cache[1] = (...args) => unref(handleMouseLeave) && unref(handleMouseLeave)(...args))
			}, [createElementVNode("div", {
				ref: "tableInnerWrapper",
				class: normalizeClass(unref(ns).e("inner-wrapper"))
			}, [
				createElementVNode("div", _hoisted_2, [renderSlot(_ctx.$slots, "default")], 512),
				__props.showHeader && unref(tableLayout) === "fixed" ? withDirectives((openBlock(), createElementBlock("div", {
					key: 0,
					ref: "headerWrapper",
					class: normalizeClass(unref(ns).e("header-wrapper"))
				}, [createElementVNode("table", {
					ref: "tableHeader",
					class: normalizeClass(unref(ns).e("header")),
					style: normalizeStyle(unref(tableBodyStyles)),
					border: "0",
					cellpadding: "0",
					cellspacing: "0"
				}, [createVNode(unref(hColgroup), {
					columns: unref(store).states.columns.value,
					"table-layout": unref(tableLayout)
				}, null, 8, ["columns", "table-layout"]), createVNode(unref(table_header_default), {
					ref: "tableHeaderRef",
					border: __props.border,
					"default-sort": __props.defaultSort,
					store: unref(store),
					"append-filter-panel-to": __props.appendFilterPanelTo,
					"allow-drag-last-column": __props.allowDragLastColumn,
					onSetDragVisible: unref(setDragVisible)
				}, null, 8, [
					"border",
					"default-sort",
					"store",
					"append-filter-panel-to",
					"allow-drag-last-column",
					"onSetDragVisible"
				])], 6)], 2)), [[unref(Mousewheel), unref(handleHeaderFooterMousewheel)]]) : createCommentVNode("v-if", true),
				createElementVNode("div", {
					ref: "bodyWrapper",
					class: normalizeClass(unref(ns).e("body-wrapper"))
				}, [createVNode(unref(ElScrollbar), {
					ref_key: "scrollBarRef",
					ref: scrollBarRef,
					"view-style": unref(scrollbarViewStyle),
					"wrap-style": unref(scrollbarStyle),
					always: __props.scrollbarAlwaysOn,
					tabindex: __props.scrollbarTabindex,
					native: __props.nativeScrollbar,
					onScroll: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("scroll", $event))
				}, {
					default: withCtx(() => [
						createElementVNode("table", {
							ref: "tableBody",
							class: normalizeClass(unref(ns).e("body")),
							cellspacing: "0",
							cellpadding: "0",
							border: "0",
							style: normalizeStyle({
								width: unref(bodyWidth),
								tableLayout: unref(tableLayout)
							})
						}, [
							createVNode(unref(hColgroup), {
								columns: unref(store).states.columns.value,
								"table-layout": unref(tableLayout)
							}, null, 8, ["columns", "table-layout"]),
							__props.showHeader && unref(tableLayout) === "auto" ? (openBlock(), createBlock(unref(table_header_default), {
								key: 0,
								ref: "tableHeaderRef",
								class: normalizeClass(unref(ns).e("body-header")),
								border: __props.border,
								"default-sort": __props.defaultSort,
								store: unref(store),
								"append-filter-panel-to": __props.appendFilterPanelTo,
								onSetDragVisible: unref(setDragVisible)
							}, null, 8, [
								"class",
								"border",
								"default-sort",
								"store",
								"append-filter-panel-to",
								"onSetDragVisible"
							])) : createCommentVNode("v-if", true),
							createVNode(unref(table_body_default), {
								context: unref(context),
								highlight: __props.highlightCurrentRow,
								"row-class-name": __props.rowClassName,
								"tooltip-effect": computedTooltipEffect.value,
								"tooltip-options": computedTooltipOptions.value,
								"row-style": __props.rowStyle,
								store: unref(store),
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
							__props.showSummary && unref(tableLayout) === "auto" ? (openBlock(), createBlock(unref(table_footer_default), {
								key: 1,
								class: normalizeClass(unref(ns).e("body-footer")),
								border: __props.border,
								"default-sort": __props.defaultSort,
								store: unref(store),
								"sum-text": computedSumText.value,
								"summary-method": __props.summaryMethod
							}, null, 8, [
								"class",
								"border",
								"default-sort",
								"store",
								"sum-text",
								"summary-method"
							])) : createCommentVNode("v-if", true)
						], 6),
						isEmpty.value ? (openBlock(), createElementBlock("div", {
							key: 0,
							ref: "emptyBlock",
							style: normalizeStyle(unref(emptyBlockStyle)),
							class: normalizeClass(unref(ns).e("empty-block"))
						}, [createElementVNode("span", { class: normalizeClass(unref(ns).e("empty-text")) }, [renderSlot(_ctx.$slots, "empty", {}, () => [createTextVNode(toDisplayString(computedEmptyText.value), 1)])], 2)], 6)) : createCommentVNode("v-if", true),
						_ctx.$slots.append ? (openBlock(), createElementBlock("div", {
							key: 1,
							ref: "appendWrapper",
							class: normalizeClass(unref(ns).e("append-wrapper"))
						}, [renderSlot(_ctx.$slots, "append")], 2)) : createCommentVNode("v-if", true)
					]),
					_: 3
				}, 8, [
					"view-style",
					"wrap-style",
					"always",
					"tabindex",
					"native"
				])], 2),
				__props.showSummary && unref(tableLayout) === "fixed" ? withDirectives((openBlock(), createElementBlock("div", {
					key: 1,
					ref: "footerWrapper",
					class: normalizeClass(unref(ns).e("footer-wrapper"))
				}, [createElementVNode("table", {
					class: normalizeClass(unref(ns).e("footer")),
					cellspacing: "0",
					cellpadding: "0",
					border: "0",
					style: normalizeStyle(unref(tableBodyStyles))
				}, [createVNode(unref(hColgroup), {
					columns: unref(store).states.columns.value,
					"table-layout": unref(tableLayout)
				}, null, 8, ["columns", "table-layout"]), createVNode(unref(table_footer_default), {
					border: __props.border,
					"default-sort": __props.defaultSort,
					store: unref(store),
					"sum-text": computedSumText.value,
					"summary-method": __props.summaryMethod
				}, null, 8, [
					"border",
					"default-sort",
					"store",
					"sum-text",
					"summary-method"
				])], 6)], 2)), [[vShow, !isEmpty.value], [unref(Mousewheel), unref(handleHeaderFooterMousewheel)]]) : createCommentVNode("v-if", true),
				__props.border || unref(isGroup) ? (openBlock(), createElementBlock("div", {
					key: 2,
					class: normalizeClass(unref(ns).e("border-left-patch"))
				}, null, 2)) : createCommentVNode("v-if", true)
			], 2), withDirectives(createElementVNode("div", {
				ref: "resizeProxy",
				class: normalizeClass(unref(ns).e("column-resize-proxy"))
			}, null, 2), [[vShow, unref(resizeProxyVisible)]])], 46, _hoisted_1);
		};
	}
});
//#endregion
export { table_vue_vue_type_script_setup_true_lang_default as default };

//# sourceMappingURL=table.vue_vue_type_script_setup_true_lang.mjs.map