import { focusNode, getSibling } from "../../../utils/dom/aria.mjs";
import { EVENT_CODE } from "../../../constants/aria.mjs";
import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from "../../../constants/event.mjs";
import { isClient as isClient$1 } from "../../../utils/browser.mjs";
import { getEventCode } from "../../../utils/dom/event.mjs";
import { isNumber, isPromise } from "../../../utils/types.mjs";
import { NOOP } from "../../../utils/functions.mjs";
import { useLocale } from "../../../hooks/use-locale/index.mjs";
import { useNamespace } from "../../../hooks/use-namespace/index.mjs";
import { useFocusController } from "../../../hooks/use-focus-controller/index.mjs";
import { useComposition } from "../../../hooks/use-composition/index.mjs";
import { useEmptyValues } from "../../../hooks/use-empty-values/index.mjs";
import { ElIcon } from "../../icon/index.mjs";
import { useFormDisabled, useFormSize } from "../../form/src/hooks/use-form-common-props.mjs";
import { useFormItem } from "../../form/src/hooks/use-form-item.mjs";
import { ElTooltip } from "../../tooltip/index.mjs";
import { ElInput } from "../../input/index.mjs";
import { ElScrollbar } from "../../scrollbar/index.mjs";
import ClickOutside from "../../../directives/click-outside/index.mjs";
import { ElTag } from "../../tag/index.mjs";
import FixedSizeList from "../../virtual-list/src/components/fixed-size-list.mjs";
import { ElCascaderPanel } from "../../cascader-panel/index.mjs";
import { cascaderEmits, cascaderProps } from "./cascader.mjs";
import { useCssVar, useDebounceFn, useResizeObserver } from "@vueuse/core";
import { clamp as clamp$1, cloneDeep } from "lodash-unified";
import { ArrowDown, Check } from "@element-plus/icons-vue";
import { Fragment, computed, createBlock, createCommentVNode, createElementBlock, createElementVNode, createSlots, createVNode, defineComponent, nextTick, normalizeClass, normalizeStyle, onMounted, openBlock, ref, renderList, renderSlot, resolveDynamicComponent, toDisplayString, unref, useAttrs, useSlots, vModelText, vShow, watch, withCtx, withDirectives, withKeys, withModifiers } from "vue";
//#region ../../packages/components/cascader/src/cascader.vue?vue&type=script&setup=true&lang.ts
const _hoisted_1 = ["placeholder"];
const _hoisted_2 = ["onClick"];
const _hoisted_3 = [
	"id",
	"data-suggestion-index",
	"onClick"
];
const SUGGESTION_ITEM_EXTRA_WIDTH = 34;
var cascader_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	name: "ElCascader",
	__name: "cascader",
	props: cascaderProps,
	emits: cascaderEmits,
	setup(__props, { expose: __expose, emit: __emit }) {
		const popperOptions = { modifiers: [{
			name: "arrowPosition",
			enabled: true,
			phase: "main",
			fn: ({ state }) => {
				const { modifiersData, placement } = state;
				if ([
					"right",
					"left",
					"bottom",
					"top"
				].includes(placement)) return;
				if (modifiersData.arrow) modifiersData.arrow.x = 35;
			},
			requires: ["arrow"]
		}] };
		const props = __props;
		const emit = __emit;
		const attrs = useAttrs();
		const slots = useSlots();
		let inputInitialHeight = 0;
		let pressDeleteCount = 0;
		const nsCascader = useNamespace("cascader");
		const nsInput = useNamespace("input");
		const sizeMapPadding = {
			small: 7,
			default: 11,
			large: 15
		};
		const { t } = useLocale();
		const { formItem } = useFormItem();
		const isDisabled = useFormDisabled();
		const { valueOnClear } = useEmptyValues(props);
		const { isComposing, handleComposition } = useComposition({ afterComposition(event) {
			const text = event.target?.value;
			handleInput(text);
		} });
		const tooltipRef = ref();
		const tagTooltipRef = ref();
		const inputRef = ref();
		const tagWrapper = ref();
		const cascaderPanelRef = ref();
		const suggestionPanel = ref();
		const suggestionVirtualListRef = ref();
		const popperVisible = ref(false);
		const inputHover = ref(false);
		const filtering = ref(false);
		const inputValue = ref("");
		const searchInputValue = ref("");
		const tags = ref([]);
		const suggestions = ref([]);
		const suggestionListWidth = ref("100%");
		const hasCustomSuggestionItemSlot = computed(() => !!slots["suggestion-item"]);
		const clampedSuggestionListHeight = computed(() => clamp$1(suggestions.value.length * props.itemSize, props.itemSize, props.height));
		const showTagList = computed(() => {
			if (!props.props.multiple) return [];
			return props.collapseTags ? tags.value.slice(0, props.maxCollapseTags) : tags.value;
		});
		const collapseTagList = computed(() => {
			if (!props.props.multiple) return [];
			return props.collapseTags ? tags.value.slice(props.maxCollapseTags) : [];
		});
		const cascaderStyle = computed(() => {
			return attrs.style;
		});
		const inputPlaceholder = computed(() => props.placeholder ?? t("el.cascader.placeholder"));
		const currentPlaceholder = computed(() => searchInputValue.value || tags.value.length > 0 || isComposing.value ? "" : inputPlaceholder.value);
		const realSize = useFormSize();
		const tagSize = computed(() => realSize.value === "small" ? "small" : "default");
		const multiple = computed(() => !!props.props.multiple);
		const readonly = computed(() => !props.filterable || multiple.value);
		const searchKeyword = computed(() => multiple.value ? searchInputValue.value : inputValue.value);
		const checkedNodes = computed(() => cascaderPanelRef.value?.checkedNodes || []);
		const { wrapperRef, isFocused, handleBlur } = useFocusController(inputRef, {
			disabled: isDisabled,
			beforeBlur(event) {
				return tooltipRef.value?.isFocusInsideContent(event) || tagTooltipRef.value?.isFocusInsideContent(event);
			},
			afterBlur() {
				if (props.validateEvent) formItem?.validate?.("blur").catch(NOOP);
			}
		});
		const clearBtnVisible = computed(() => {
			if (!props.clearable || isDisabled.value || filtering.value || !inputHover.value && !isFocused.value) return false;
			return !!checkedNodes.value.length;
		});
		const presentText = computed(() => {
			const { showAllLevels, separator } = props;
			const nodes = checkedNodes.value;
			return nodes.length ? multiple.value ? "" : nodes[0].calcText(showAllLevels, separator) : "";
		});
		const validateState = computed(() => formItem?.validateState || "");
		const checkedValue = computed({
			get() {
				return cloneDeep(props.modelValue);
			},
			set(val) {
				const value = val ?? valueOnClear.value;
				emit(UPDATE_MODEL_EVENT, value);
				emit(CHANGE_EVENT, value);
				if (props.validateEvent) formItem?.validate("change").catch(NOOP);
			}
		});
		const cascaderKls = computed(() => {
			return [
				nsCascader.b(),
				nsCascader.m(realSize.value),
				nsCascader.is("disabled", isDisabled.value),
				attrs.class
			];
		});
		const cascaderIconKls = computed(() => {
			return [
				nsInput.e("icon"),
				"icon-arrow-down",
				nsCascader.is("reverse", popperVisible.value)
			];
		});
		const inputClass = computed(() => nsCascader.is("focus", isFocused.value));
		const contentRef = computed(() => {
			return tooltipRef.value?.popperRef?.contentRef;
		});
		const handleClickOutside = (event) => {
			if (isFocused.value) handleBlur(new FocusEvent("blur", event));
			togglePopperVisible(false);
		};
		const togglePopperVisible = (visible) => {
			if (isDisabled.value) return;
			visible = visible ?? !popperVisible.value;
			if (visible !== popperVisible.value) {
				popperVisible.value = visible;
				inputRef.value?.input?.setAttribute("aria-expanded", `${visible}`);
				if (visible) {
					updatePopperPosition();
					cascaderPanelRef.value && nextTick(cascaderPanelRef.value.scrollToExpandingNode);
				} else if (props.filterable) syncPresentTextValue();
				emit("visibleChange", visible);
			}
		};
		const updatePopperPosition = () => {
			nextTick(() => {
				tooltipRef.value?.updatePopper();
			});
		};
		const hideSuggestionPanel = () => {
			filtering.value = false;
		};
		const genTag = (node) => {
			const { showAllLevels, separator } = props;
			return {
				node,
				key: node.uid,
				text: node.calcText(showAllLevels, separator),
				hitState: false,
				closable: !isDisabled.value && !node.isDisabled
			};
		};
		const deleteTag = (tag) => {
			const node = tag.node;
			node.doCheck(false);
			cascaderPanelRef.value?.calculateCheckedValue();
			emit("removeTag", node.valueByOption);
		};
		const getStrategyCheckedNodes = () => {
			switch (props.showCheckedStrategy) {
				case "child": return checkedNodes.value;
				case "parent": {
					const clickedNodes = getCheckedNodes(false);
					const clickedNodesValue = clickedNodes.map((o) => o.value);
					return clickedNodes.filter((o) => !o.parent || !clickedNodesValue.includes(o.parent.value));
				}
				default: return [];
			}
		};
		const calculatePresentTags = () => {
			if (!multiple.value) return;
			const nodes = getStrategyCheckedNodes();
			const allTags = [];
			nodes.forEach((node) => allTags.push(genTag(node)));
			tags.value = allTags;
		};
		const calculateSuggestions = () => {
			const { filterMethod, showAllLevels, separator } = props;
			const res = cascaderPanelRef.value?.getFlattedNodes(!props.props.checkStrictly)?.filter((node) => {
				if (node.isDisabled) return false;
				node.calcText(showAllLevels, separator);
				return filterMethod(node, searchKeyword.value);
			});
			if (multiple.value) tags.value.forEach((tag) => {
				tag.hitState = false;
			});
			filtering.value = true;
			suggestions.value = res;
			nextTick(() => {
				if (props.virtualScroll && suggestions.value.length > 0) suggestionVirtualListRef.value?.scrollToItem(0);
				updateStyle();
			});
			updatePopperPosition();
		};
		const getSuggestionPanelEl = (selector) => {
			const el = suggestionPanel.value;
			return selector ? el?.querySelector(selector) ?? void 0 : el;
		};
		const focusFirstNode = () => {
			let firstNode;
			if (filtering.value && suggestionPanel.value) firstNode = getSuggestionPanelEl(`.${nsCascader.e("suggestion-item")}`);
			else firstNode = cascaderPanelRef.value?.$el.querySelector(`.${nsCascader.b("node")}[tabindex="-1"]`);
			if (firstNode) {
				firstNode.focus();
				if (!filtering.value && firstNode.getAttribute("aria-haspopup") === "true") firstNode.click();
			}
		};
		const updateSuggestionPanelWidth = (inputWidth) => {
			const suggestionPanelEl = getSuggestionPanelEl();
			if (!suggestionPanelEl) return;
			const panelWidth = isNumber(props.fitInputWidth) ? `${props.fitInputWidth}px` : `${inputWidth}px`;
			const setPanelStyle = (el) => {
				if (props.fitInputWidth !== false) {
					el.style.width = panelWidth;
					el.style.minWidth = "";
				} else {
					el.style.width = "";
					el.style.minWidth = panelWidth;
				}
			};
			setPanelStyle(suggestionPanelEl);
			if (props.virtualScroll) {
				suggestionListWidth.value = props.fitInputWidth !== false ? panelWidth : hasCustomSuggestionItemSlot.value ? `${inputWidth}px` : `${Math.max(inputWidth, calculateSuggestionMaxWidth())}px`;
				return;
			}
			const suggestionList = getSuggestionPanelEl(`.${nsCascader.e("suggestion-list")}`);
			if (suggestionList) setPanelStyle(suggestionList);
		};
		const getTagWrapperLeft = () => {
			if (!slots.prefix) return 0;
			const prefix = inputRef.value?.$el.querySelector(`.${nsInput.e("prefix")}`);
			if (!prefix) return 0;
			const prefixWidth = prefix.getBoundingClientRect().width;
			if (prefixWidth <= 0) return 0;
			return prefixWidth + sizeMapPadding[realSize.value || "default"];
		};
		const updateStyle = () => {
			const inputInner = inputRef.value?.input;
			const inputWrapper = inputRef.value?.$el;
			if (!isClient$1 || !inputInner || !inputWrapper) return;
			if (suggestionPanel.value) updateSuggestionPanelWidth(inputWrapper.getBoundingClientRect().width);
			const tagWrapperEl = tagWrapper.value;
			if (tagWrapperEl) {
				const height = tags.value.length > 0 ? `${Math.max(tagWrapperEl.offsetHeight, inputInitialHeight) - 2}px` : `${inputInitialHeight}px`;
				inputInner.style.height = height;
				tagWrapperEl.style.left = `${getTagWrapperLeft()}px`;
				updatePopperPosition();
			}
		};
		const calculateSuggestionMaxWidth = () => {
			if (hasCustomSuggestionItemSlot.value) return 0;
			if (!suggestions.value.length) return 0;
			const ctx = document.createElement("canvas").getContext("2d");
			if (!ctx) return 0;
			const renderedSuggestion = getSuggestionPanelEl(`.${nsCascader.e("suggestion-item")}`);
			if (!renderedSuggestion || !isClient$1) return 0;
			const style = getComputedStyle(renderedSuggestion);
			const padding = Number.parseFloat(style.paddingLeft) + Number.parseFloat(style.paddingRight);
			ctx.font = `bold ${style.fontSize} ${style.fontFamily}`;
			let maxWidth = 0;
			let hasChecked = false;
			for (const suggestion of suggestions.value) {
				const text = suggestion.text || "";
				const metrics = ctx.measureText(text);
				maxWidth = Math.max(maxWidth, metrics.width);
				if (suggestion.checked && !hasChecked) hasChecked = true;
			}
			return maxWidth + padding + (hasChecked ? SUGGESTION_ITEM_EXTRA_WIDTH : 0);
		};
		const getCheckedNodes = (leafOnly) => {
			return cascaderPanelRef.value?.getCheckedNodes(leafOnly);
		};
		const handleExpandChange = (value) => {
			updatePopperPosition();
			emit("expandChange", value);
		};
		const handleKeyDown = (e) => {
			if (isComposing.value) return;
			switch (getEventCode(e)) {
				case EVENT_CODE.enter:
				case EVENT_CODE.numpadEnter:
					togglePopperVisible();
					break;
				case EVENT_CODE.down:
					togglePopperVisible(true);
					nextTick(focusFirstNode);
					e.preventDefault();
					break;
				case EVENT_CODE.esc:
					if (popperVisible.value === true) {
						e.preventDefault();
						e.stopPropagation();
						togglePopperVisible(false);
					}
					break;
				case EVENT_CODE.tab:
					togglePopperVisible(false);
					break;
			}
		};
		const handleClear = () => {
			cascaderPanelRef.value?.clearCheckedNodes();
			if (!popperVisible.value && props.filterable) syncPresentTextValue();
			togglePopperVisible(false);
			emit("clear");
		};
		const syncPresentTextValue = () => {
			const { value } = presentText;
			inputValue.value = value;
			searchInputValue.value = value;
		};
		const handleSuggestionClick = (node) => {
			const { checked } = node;
			if (multiple.value) cascaderPanelRef.value?.handleCheckChange(node, !checked, false);
			else {
				!checked && cascaderPanelRef.value?.handleCheckChange(node, true, false);
				togglePopperVisible(false);
			}
		};
		const getSuggestionIndexFromTarget = (target) => {
			const indexStr = target.closest("[data-suggestion-index]")?.dataset.suggestionIndex;
			if (!indexStr) return -1;
			const index = Number.parseInt(indexStr, 10);
			if (Number.isNaN(index) || index < 0 || index >= suggestions.value.length) return -1;
			return index;
		};
		const handleSuggestionKeyDown = (e) => {
			const target = e.target;
			const code = getEventCode(e);
			switch (code) {
				case EVENT_CODE.up:
				case EVENT_CODE.down: {
					e.preventDefault();
					const distance = code === EVENT_CODE.up ? -1 : 1;
					if (props.virtualScroll && suggestionVirtualListRef.value) {
						const currentIndex = getSuggestionIndexFromTarget(target);
						if (currentIndex >= 0) {
							const length = suggestions.value.length;
							const targetIndex = (currentIndex + distance + length) % length;
							suggestionVirtualListRef.value.scrollToItem(targetIndex);
							nextTick(() => {
								const targetItem = getSuggestionPanelEl(`#suggestion-${suggestions.value[targetIndex].uid}`);
								targetItem && focusNode(targetItem);
							});
							return;
						}
					}
					focusNode(getSibling(target, distance, `.${nsCascader.e("suggestion-item")}[tabindex="-1"]`));
					break;
				}
				case EVENT_CODE.enter:
				case EVENT_CODE.numpadEnter:
					target.click();
					break;
			}
		};
		const handleDelete = () => {
			const lastTag = tags.value[tags.value.length - 1];
			pressDeleteCount = searchInputValue.value ? 0 : pressDeleteCount + 1;
			if (!lastTag || !pressDeleteCount || props.collapseTags && tags.value.length > 1) return;
			if (lastTag.hitState) deleteTag(lastTag);
			else lastTag.hitState = true;
		};
		const handleFilter = useDebounceFn(() => {
			const { value } = searchKeyword;
			if (!value) return;
			const passed = props.beforeFilter(value);
			if (isPromise(passed)) passed.then(calculateSuggestions).catch(() => {});
			else if (passed !== false) calculateSuggestions();
			else hideSuggestionPanel();
		}, computed(() => props.debounce));
		const handleInput = (val, e) => {
			!popperVisible.value && togglePopperVisible(true);
			if (e?.isComposing) return;
			if (val) handleFilter();
			else {
				const passed = props.beforeFilter("");
				if (isPromise(passed)) passed.catch(() => {});
				hideSuggestionPanel();
			}
		};
		const getInputInnerHeight = (inputInner) => Number.parseFloat(useCssVar(nsInput.cssVarName("input-height"), inputInner).value) - 2;
		const focus = () => {
			inputRef.value?.focus();
		};
		const blur = () => {
			inputRef.value?.blur();
		};
		watch(filtering, updatePopperPosition);
		watch([
			checkedNodes,
			isDisabled,
			() => props.collapseTags,
			() => props.maxCollapseTags
		], calculatePresentTags);
		watch(tags, () => {
			nextTick(() => updateStyle());
		});
		watch(realSize, async () => {
			await nextTick();
			const inputInner = inputRef.value.input;
			inputInitialHeight = getInputInnerHeight(inputInner) || inputInitialHeight;
			updateStyle();
		});
		watch(presentText, syncPresentTextValue, { immediate: true });
		watch(() => popperVisible.value, (val) => {
			if (val && props.props.lazy && props.props.lazyLoad) cascaderPanelRef.value?.loadLazyRootNodes();
		});
		onMounted(() => {
			const inputInner = inputRef.value.input;
			const inputWrapper = inputRef.value.$el;
			const inputInnerHeight = getInputInnerHeight(inputInner);
			inputInitialHeight = inputInner.offsetHeight || inputInnerHeight;
			useResizeObserver(inputWrapper, updateStyle);
		});
		__expose({
			/**
			* @description get an array of currently selected node,(leafOnly) whether only return the leaf checked nodes, default is `false`
			*/
			getCheckedNodes,
			/**
			* @description cascader panel ref
			*/
			cascaderPanelRef,
			/**
			* @description toggle the visible of popper
			*/
			togglePopperVisible,
			/**
			* @description cascader content ref
			*/
			contentRef,
			/**
			* @description selected content text
			*/
			presentText,
			/** @description focus the input element */
			focus,
			/** @description blur the input element */
			blur
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(ElTooltip), {
				ref_key: "tooltipRef",
				ref: tooltipRef,
				visible: popperVisible.value,
				teleported: __props.teleported,
				"popper-class": [unref(nsCascader).e("dropdown"), __props.popperClass],
				"popper-style": __props.popperStyle,
				"popper-options": popperOptions,
				"fallback-placements": __props.fallbackPlacements,
				"stop-popper-mouse-event": false,
				"gpu-acceleration": false,
				placement: __props.placement,
				transition: `${unref(nsCascader).namespace.value}-zoom-in-top`,
				effect: __props.effect,
				pure: "",
				persistent: __props.persistent,
				onHide: hideSuggestionPanel
			}, {
				default: withCtx(() => [withDirectives((openBlock(), createElementBlock("div", {
					ref_key: "wrapperRef",
					ref: wrapperRef,
					class: normalizeClass(cascaderKls.value),
					style: normalizeStyle(cascaderStyle.value),
					onClick: _cache[8] || (_cache[8] = () => togglePopperVisible(readonly.value ? void 0 : true)),
					onKeydown: handleKeyDown,
					onMouseenter: _cache[9] || (_cache[9] = ($event) => inputHover.value = true),
					onMouseleave: _cache[10] || (_cache[10] = ($event) => inputHover.value = false)
				}, [createVNode(unref(ElInput), {
					ref_key: "inputRef",
					ref: inputRef,
					modelValue: inputValue.value,
					"onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => inputValue.value = $event),
					placeholder: currentPlaceholder.value,
					readonly: readonly.value,
					disabled: unref(isDisabled),
					"validate-event": false,
					size: unref(realSize),
					class: normalizeClass(inputClass.value),
					tabindex: multiple.value && __props.filterable && !unref(isDisabled) ? -1 : void 0,
					onCompositionstart: unref(handleComposition),
					onCompositionupdate: unref(handleComposition),
					onCompositionend: unref(handleComposition),
					onInput: handleInput
				}, createSlots({
					suffix: withCtx(() => [clearBtnVisible.value ? (openBlock(), createBlock(unref(ElIcon), {
						key: "clear",
						class: normalizeClass([unref(nsInput).e("icon"), "icon-circle-close"]),
						onClick: withModifiers(handleClear, ["stop"])
					}, {
						default: withCtx(() => [(openBlock(), createBlock(resolveDynamicComponent(__props.clearIcon)))]),
						_: 1
					}, 8, ["class"])) : (openBlock(), createBlock(unref(ElIcon), {
						key: "arrow-down",
						class: normalizeClass(cascaderIconKls.value),
						onClick: _cache[0] || (_cache[0] = withModifiers(($event) => togglePopperVisible(), ["stop"]))
					}, {
						default: withCtx(() => [createVNode(unref(ArrowDown))]),
						_: 1
					}, 8, ["class"]))]),
					_: 2
				}, [_ctx.$slots.prefix ? {
					name: "prefix",
					fn: withCtx(() => [renderSlot(_ctx.$slots, "prefix")]),
					key: "0"
				} : void 0]), 1032, [
					"modelValue",
					"placeholder",
					"readonly",
					"disabled",
					"size",
					"class",
					"tabindex",
					"onCompositionstart",
					"onCompositionupdate",
					"onCompositionend"
				]), multiple.value ? (openBlock(), createElementBlock("div", {
					key: 0,
					ref_key: "tagWrapper",
					ref: tagWrapper,
					class: normalizeClass([unref(nsCascader).e("tags"), unref(nsCascader).is("validate", Boolean(validateState.value))])
				}, [
					renderSlot(_ctx.$slots, "tag", {
						data: tags.value,
						deleteTag
					}, () => [(openBlock(true), createElementBlock(Fragment, null, renderList(showTagList.value, (tag) => {
						return openBlock(), createBlock(unref(ElTag), {
							key: tag.key,
							type: __props.tagType,
							size: tagSize.value,
							effect: __props.tagEffect,
							hit: tag.hitState,
							closable: tag.closable,
							"disable-transitions": "",
							onClose: ($event) => deleteTag(tag)
						}, {
							default: withCtx(() => [createElementVNode("span", null, toDisplayString(tag.text), 1)]),
							_: 2
						}, 1032, [
							"type",
							"size",
							"effect",
							"hit",
							"closable",
							"onClose"
						]);
					}), 128))]),
					__props.collapseTags && tags.value.length > __props.maxCollapseTags ? (openBlock(), createBlock(unref(ElTooltip), {
						key: 0,
						ref_key: "tagTooltipRef",
						ref: tagTooltipRef,
						disabled: popperVisible.value || !__props.collapseTagsTooltip,
						"fallback-placements": [
							"bottom",
							"top",
							"right",
							"left"
						],
						placement: "bottom",
						"popper-class": __props.popperClass,
						"popper-style": __props.popperStyle,
						effect: __props.effect,
						persistent: __props.persistent
					}, {
						default: withCtx(() => [createVNode(unref(ElTag), {
							closable: false,
							size: tagSize.value,
							type: __props.tagType,
							effect: __props.tagEffect,
							"disable-transitions": ""
						}, {
							default: withCtx(() => [createElementVNode("span", { class: normalizeClass(unref(nsCascader).e("tags-text")) }, " + " + toDisplayString(tags.value.length - __props.maxCollapseTags), 3)]),
							_: 1
						}, 8, [
							"size",
							"type",
							"effect"
						])]),
						content: withCtx(() => [createVNode(unref(ElScrollbar), { "max-height": __props.maxCollapseTagsTooltipHeight }, {
							default: withCtx(() => [createElementVNode("div", { class: normalizeClass(unref(nsCascader).e("collapse-tags")) }, [(openBlock(true), createElementBlock(Fragment, null, renderList(collapseTagList.value, (tag, idx) => {
								return openBlock(), createElementBlock("div", {
									key: idx,
									class: normalizeClass(unref(nsCascader).e("collapse-tag"))
								}, [(openBlock(), createBlock(unref(ElTag), {
									key: tag.key,
									class: "in-tooltip",
									type: __props.tagType,
									size: tagSize.value,
									effect: __props.tagEffect,
									hit: tag.hitState,
									closable: tag.closable,
									"disable-transitions": "",
									onClose: ($event) => deleteTag(tag)
								}, {
									default: withCtx(() => [createElementVNode("span", null, toDisplayString(tag.text), 1)]),
									_: 2
								}, 1032, [
									"type",
									"size",
									"effect",
									"hit",
									"closable",
									"onClose"
								]))], 2);
							}), 128))], 2)]),
							_: 1
						}, 8, ["max-height"])]),
						_: 1
					}, 8, [
						"disabled",
						"popper-class",
						"popper-style",
						"effect",
						"persistent"
					])) : createCommentVNode("v-if", true),
					__props.filterable && !unref(isDisabled) ? withDirectives((openBlock(), createElementBlock("input", {
						key: 1,
						"onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => searchInputValue.value = $event),
						type: "text",
						class: normalizeClass(unref(nsCascader).e("search-input")),
						placeholder: presentText.value ? "" : inputPlaceholder.value,
						onInput: _cache[3] || (_cache[3] = (e) => handleInput(searchInputValue.value, e)),
						onClick: _cache[4] || (_cache[4] = withModifiers(($event) => togglePopperVisible(true), ["stop"])),
						onKeydown: withKeys(handleDelete, ["delete"]),
						onCompositionstart: _cache[5] || (_cache[5] = (...args) => unref(handleComposition) && unref(handleComposition)(...args)),
						onCompositionupdate: _cache[6] || (_cache[6] = (...args) => unref(handleComposition) && unref(handleComposition)(...args)),
						onCompositionend: _cache[7] || (_cache[7] = (...args) => unref(handleComposition) && unref(handleComposition)(...args))
					}, null, 42, _hoisted_1)), [[vModelText, searchInputValue.value]]) : createCommentVNode("v-if", true)
				], 2)) : createCommentVNode("v-if", true)], 38)), [[
					unref(ClickOutside),
					handleClickOutside,
					contentRef.value
				]])]),
				content: withCtx(() => [
					_ctx.$slots.header ? (openBlock(), createElementBlock("div", {
						key: 0,
						class: normalizeClass(unref(nsCascader).e("header")),
						onClick: _cache[11] || (_cache[11] = withModifiers(() => {}, ["stop"]))
					}, [renderSlot(_ctx.$slots, "header")], 2)) : createCommentVNode("v-if", true),
					withDirectives(createVNode(unref(ElCascaderPanel), {
						ref_key: "cascaderPanelRef",
						ref: cascaderPanelRef,
						modelValue: checkedValue.value,
						"onUpdate:modelValue": _cache[12] || (_cache[12] = ($event) => checkedValue.value = $event),
						options: __props.options,
						props: props.props,
						border: false,
						"render-label": _ctx.$slots.default,
						"virtual-scroll": __props.virtualScroll,
						"item-size": __props.itemSize,
						height: __props.height,
						onExpandChange: handleExpandChange,
						onClose: _cache[13] || (_cache[13] = ($event) => _ctx.$nextTick(() => togglePopperVisible(false)))
					}, {
						empty: withCtx(() => [renderSlot(_ctx.$slots, "empty")]),
						_: 3
					}, 8, [
						"modelValue",
						"options",
						"props",
						"render-label",
						"virtual-scroll",
						"item-size",
						"height"
					]), [[vShow, !filtering.value]]),
					__props.filterable ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [!__props.virtualScroll ? withDirectives((openBlock(), createBlock(unref(ElScrollbar), {
						key: 0,
						ref: (ref) => suggestionPanel.value = ref?.$el,
						tag: "ul",
						class: normalizeClass(unref(nsCascader).e("suggestion-panel")),
						"wrap-class": unref(nsCascader).e("suggestion-wrap"),
						"view-class": unref(nsCascader).e("suggestion-list"),
						onKeydown: handleSuggestionKeyDown
					}, {
						default: withCtx(() => [suggestions.value.length ? (openBlock(true), createElementBlock(Fragment, { key: 0 }, renderList(suggestions.value, (item) => {
							return openBlock(), createElementBlock("li", {
								key: item.uid,
								class: normalizeClass([unref(nsCascader).e("suggestion-item"), unref(nsCascader).is("checked", item.checked)]),
								tabindex: -1,
								onClick: ($event) => handleSuggestionClick(item)
							}, [renderSlot(_ctx.$slots, "suggestion-item", { item }, () => [createElementVNode("span", null, toDisplayString(item.text), 1), item.checked ? (openBlock(), createBlock(unref(ElIcon), { key: 0 }, {
								default: withCtx(() => [createVNode(unref(Check))]),
								_: 1
							})) : createCommentVNode("v-if", true)])], 10, _hoisted_2);
						}), 128)) : renderSlot(_ctx.$slots, "empty", { key: 1 }, () => [createElementVNode("li", { class: normalizeClass(unref(nsCascader).e("empty-text")) }, toDisplayString(unref(t)("el.cascader.noMatch")), 3)])]),
						_: 3
					}, 8, [
						"class",
						"wrap-class",
						"view-class"
					])), [[vShow, filtering.value]]) : withDirectives((openBlock(), createElementBlock("div", {
						key: 1,
						ref_key: "suggestionPanel",
						ref: suggestionPanel,
						class: normalizeClass(unref(nsCascader).e("suggestion-panel")),
						onKeydown: handleSuggestionKeyDown
					}, [withDirectives(createVNode(unref(FixedSizeList), {
						ref_key: "suggestionVirtualListRef",
						ref: suggestionVirtualListRef,
						height: clampedSuggestionListHeight.value,
						"item-size": __props.itemSize,
						data: suggestions.value,
						total: suggestions.value.length,
						"class-name": unref(nsCascader).e("suggestion-list"),
						"inner-element": "ul",
						"inner-width": suggestionListWidth.value
					}, {
						default: withCtx(({ data, index, style }) => [(openBlock(), createElementBlock("li", {
							id: `suggestion-${data[index].uid}`,
							key: data[index].uid,
							"data-suggestion-index": index,
							class: normalizeClass([unref(nsCascader).e("suggestion-item"), unref(nsCascader).is("checked", data[index].checked)]),
							tabindex: -1,
							style: normalizeStyle(style),
							onClick: ($event) => handleSuggestionClick(data[index])
						}, [renderSlot(_ctx.$slots, "suggestion-item", { item: data[index] }, () => [createElementVNode("span", null, toDisplayString(data[index].text), 1), data[index].checked ? (openBlock(), createBlock(unref(ElIcon), { key: 0 }, {
							default: withCtx(() => [createVNode(unref(Check))]),
							_: 1
						})) : createCommentVNode("v-if", true)])], 14, _hoisted_3))]),
						_: 3
					}, 8, [
						"height",
						"item-size",
						"data",
						"total",
						"class-name",
						"inner-width"
					]), [[vShow, suggestions.value.length]]), !suggestions.value.length ? renderSlot(_ctx.$slots, "empty", { key: 0 }, () => [createElementVNode("ul", { class: normalizeClass(unref(nsCascader).e("suggestion-list")) }, [createElementVNode("li", { class: normalizeClass(unref(nsCascader).e("empty-text")) }, toDisplayString(unref(t)("el.cascader.noMatch")), 3)], 2)]) : createCommentVNode("v-if", true)], 34)), [[vShow, filtering.value]])], 64)) : createCommentVNode("v-if", true),
					_ctx.$slots.footer ? (openBlock(), createElementBlock("div", {
						key: 2,
						class: normalizeClass(unref(nsCascader).e("footer")),
						onClick: _cache[14] || (_cache[14] = withModifiers(() => {}, ["stop"]))
					}, [renderSlot(_ctx.$slots, "footer")], 2)) : createCommentVNode("v-if", true)
				]),
				_: 3
			}, 8, [
				"visible",
				"teleported",
				"popper-class",
				"popper-style",
				"fallback-placements",
				"placement",
				"transition",
				"effect",
				"persistent"
			]);
		};
	}
});
//#endregion
export { cascader_vue_vue_type_script_setup_true_lang_default as default };

//# sourceMappingURL=cascader.vue_vue_type_script_setup_true_lang.mjs.map