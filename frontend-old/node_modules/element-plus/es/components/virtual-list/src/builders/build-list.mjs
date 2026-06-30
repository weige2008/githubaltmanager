import { isClient as isClient$1 } from "../../../../utils/browser.mjs";
import { isNumber, isString } from "../../../../utils/types.mjs";
import { hasOwn } from "../../../../utils/objects.mjs";
import { isGreaterThan } from "../../../../utils/numbers.mjs";
import { useNamespace } from "../../../../hooks/use-namespace/index.mjs";
import { useCache } from "../hooks/use-cache.mjs";
import { AUTO_ALIGNMENT, END_REACHED_EVT, FORWARD, ITEM_RENDER_EVT, RTL_OFFSET_NAG, RTL_OFFSET_POS_ASC, RTL_OFFSET_POS_DESC, SCROLL_EVT } from "../defaults.mjs";
import useWheel from "../hooks/use-wheel.mjs";
import { virtualizedListProps } from "../props.mjs";
import { getRTLOffsetType, getScrollDir, isHorizontal } from "../utils.mjs";
import ScrollBar from "../components/scrollbar.mjs";
import { clamp, useEventListener } from "@vueuse/core";
import { Fragment, computed, defineComponent, getCurrentInstance, h, mergeProps, nextTick, onActivated, onMounted, onUpdated, ref, resolveDynamicComponent, unref, watch } from "vue";
//#region ../../packages/components/virtual-list/src/builders/build-list.ts
const createList = ({ name, getOffset, getItemSize, getItemOffset, getEstimatedTotalSize, getStartIndexForOffset, getStopIndexForStartIndex, initCache, clearCache, validateProps }) => {
	return defineComponent({
		name: name ?? "ElVirtualList",
		props: virtualizedListProps,
		emits: [
			ITEM_RENDER_EVT,
			SCROLL_EVT,
			END_REACHED_EVT
		],
		setup(props, { emit, expose }) {
			validateProps(props);
			const instance = getCurrentInstance();
			const ns = useNamespace("vl");
			const dynamicSizeCache = ref(initCache(props, instance));
			const getItemStyleCache = useCache();
			const windowRef = ref();
			const innerRef = ref();
			const scrollbarRef = ref();
			const states = ref({
				isScrolling: false,
				scrollDir: FORWARD,
				scrollOffset: isNumber(props.initScrollOffset) ? props.initScrollOffset : 0,
				updateRequested: false,
				isScrollbarDragging: false
			});
			const itemsToRender = computed(() => {
				const { total, cache } = props;
				const { isScrolling, scrollDir, scrollOffset } = unref(states);
				if (total === 0) return [
					0,
					0,
					0,
					0
				];
				const startIndex = getStartIndexForOffset(props, scrollOffset, unref(dynamicSizeCache));
				const stopIndex = getStopIndexForStartIndex(props, startIndex, scrollOffset, unref(dynamicSizeCache));
				const cacheBackward = !isScrolling || scrollDir === "backward" ? Math.max(1, cache) : 1;
				const cacheForward = !isScrolling || scrollDir === "forward" ? Math.max(1, cache) : 1;
				return [
					Math.max(0, startIndex - cacheBackward),
					Math.max(0, Math.min(total - 1, stopIndex + cacheForward)),
					startIndex,
					stopIndex
				];
			});
			const estimatedTotalSize = computed(() => getEstimatedTotalSize(props, unref(dynamicSizeCache)));
			const _isHorizontal = computed(() => isHorizontal(props.layout));
			const windowStyle = computed(() => [
				{
					position: "relative",
					[`overflow-${_isHorizontal.value ? "x" : "y"}`]: "scroll",
					WebkitOverflowScrolling: "touch",
					willChange: "transform"
				},
				{
					direction: props.direction,
					height: isNumber(props.height) ? `${props.height}px` : props.height,
					width: isNumber(props.width) ? `${props.width}px` : props.width
				},
				props.style
			]);
			const innerStyle = computed(() => {
				const size = unref(estimatedTotalSize);
				const horizontal = unref(_isHorizontal);
				const innerWidth = props.innerWidth;
				return {
					height: horizontal ? "100%" : `${size}px`,
					pointerEvents: unref(states).isScrolling ? "none" : void 0,
					width: horizontal ? `${size}px` : innerWidth !== void 0 ? isNumber(innerWidth) ? `${innerWidth}px` : innerWidth : "100%",
					margin: 0,
					boxSizing: "border-box"
				};
			});
			const clientSize = computed(() => _isHorizontal.value ? props.width : props.height);
			const maxOffset = computed(() => Math.max(0, estimatedTotalSize.value - clientSize.value));
			const normalizeOffset = (offset) => clamp(offset, 0, maxOffset.value);
			const EDGE_TOLERANCE = 1;
			const getEdgeState = (normalizedOffset) => ({
				start: !isGreaterThan(normalizedOffset, 0, EDGE_TOLERANCE),
				end: !isGreaterThan(maxOffset.value, normalizedOffset, EDGE_TOLERANCE)
			});
			const normalizedScrollOffset = computed(() => normalizeOffset(states.value.scrollOffset));
			const currentEdgeState = computed(() => getEdgeState(normalizedScrollOffset.value));
			let edgeState = currentEdgeState.value;
			const { onWheel } = useWheel({
				atStartEdge: computed(() => currentEdgeState.value.start),
				atEndEdge: computed(() => currentEdgeState.value.end),
				layout: computed(() => props.layout)
			}, (offset) => {
				scrollbarRef.value.onMouseUp?.();
				scrollTo(Math.min(states.value.scrollOffset + offset, maxOffset.value));
			});
			useEventListener(windowRef, "wheel", onWheel, { passive: false });
			const emitEvents = () => {
				const { total } = props;
				if (total > 0) {
					const [cacheStart, cacheEnd, visibleStart, visibleEnd] = unref(itemsToRender);
					emit(ITEM_RENDER_EVT, cacheStart, cacheEnd, visibleStart, visibleEnd);
				}
				const { scrollDir, scrollOffset, updateRequested } = unref(states);
				emit(SCROLL_EVT, scrollDir, scrollOffset, updateRequested);
			};
			const emitEndReached = (direction, offset) => {
				const nextEdgeState = getEdgeState(offset);
				const horizontalEnd = props.direction === "rtl" ? "left" : "right";
				const horizontalStart = props.direction === "rtl" ? "right" : "left";
				if (direction === "forward" && nextEdgeState.end && !edgeState.end) emit(END_REACHED_EVT, _isHorizontal.value ? horizontalEnd : "bottom");
				if (direction === "backward" && nextEdgeState.start && !edgeState.start) emit(END_REACHED_EVT, _isHorizontal.value ? horizontalStart : "top");
				edgeState = nextEdgeState;
			};
			const updateScrollOffset = (offset, { isScrolling, updateRequested }) => {
				const currentState = unref(states);
				const nextOffset = Math.max(offset, 0);
				if (nextOffset === currentState.scrollOffset) return;
				const scrollDir = getScrollDir(currentState.scrollOffset, nextOffset);
				states.value = {
					...currentState,
					isScrolling,
					scrollDir,
					scrollOffset: nextOffset,
					updateRequested
				};
				emitEndReached(scrollDir, normalizeOffset(nextOffset));
				nextTick(resetIsScrolling);
			};
			const scrollVertically = (e) => {
				const { clientHeight, scrollHeight, scrollTop } = e.currentTarget;
				if (unref(states).scrollOffset === scrollTop) return;
				updateScrollOffset(Math.min(scrollTop, scrollHeight - clientHeight), {
					isScrolling: true,
					updateRequested: false
				});
			};
			const scrollHorizontally = (e) => {
				const { clientWidth, scrollLeft, scrollWidth } = e.currentTarget;
				if (unref(states).scrollOffset === scrollLeft) return;
				const { direction } = props;
				let scrollOffset = scrollLeft;
				if (direction === "rtl") switch (getRTLOffsetType()) {
					case RTL_OFFSET_NAG:
						scrollOffset = -scrollLeft;
						break;
					case RTL_OFFSET_POS_DESC:
						scrollOffset = scrollWidth - clientWidth - scrollLeft;
						break;
				}
				updateScrollOffset(Math.min(scrollOffset, scrollWidth - clientWidth), {
					isScrolling: true,
					updateRequested: false
				});
			};
			const onScroll = (e) => {
				unref(_isHorizontal) ? scrollHorizontally(e) : scrollVertically(e);
				emitEvents();
			};
			const onScrollbarScroll = (distanceToGo, totalSteps) => {
				const offset = maxOffset.value / totalSteps * distanceToGo;
				scrollTo(Math.min(maxOffset.value, offset));
			};
			const scrollTo = (offset) => {
				updateScrollOffset(offset, {
					isScrolling: unref(states).isScrolling,
					updateRequested: true
				});
			};
			const scrollToItem = (idx, alignment = AUTO_ALIGNMENT) => {
				const { scrollOffset } = unref(states);
				idx = Math.max(0, Math.min(idx, props.total - 1));
				scrollTo(getOffset(props, idx, alignment, scrollOffset, unref(dynamicSizeCache)));
			};
			const getItemStyle = (idx) => {
				const { direction, itemSize, layout } = props;
				const itemStyleCache = getItemStyleCache.value(clearCache && itemSize, clearCache && layout, clearCache && direction);
				let style;
				if (hasOwn(itemStyleCache, String(idx))) style = itemStyleCache[idx];
				else {
					const offset = getItemOffset(props, idx, unref(dynamicSizeCache));
					const size = getItemSize(props, idx, unref(dynamicSizeCache));
					const horizontal = unref(_isHorizontal);
					const isRtl = direction === "rtl";
					const offsetHorizontal = horizontal ? offset : 0;
					itemStyleCache[idx] = style = {
						position: "absolute",
						left: isRtl ? void 0 : `${offsetHorizontal}px`,
						right: isRtl ? `${offsetHorizontal}px` : void 0,
						top: !horizontal ? `${offset}px` : 0,
						height: !horizontal ? `${size}px` : "100%",
						width: horizontal ? `${size}px` : "100%"
					};
				}
				return style;
			};
			const resetIsScrolling = () => {
				states.value.isScrolling = false;
				nextTick(() => {
					getItemStyleCache.value(-1, null, null);
				});
			};
			const resetScrollTop = () => {
				const window = windowRef.value;
				if (window) window.scrollTop = 0;
			};
			onMounted(() => {
				if (!isClient$1) return;
				const { initScrollOffset } = props;
				const windowElement = unref(windowRef);
				if (isNumber(initScrollOffset) && windowElement) if (unref(_isHorizontal)) windowElement.scrollLeft = initScrollOffset;
				else windowElement.scrollTop = initScrollOffset;
				emitEvents();
			});
			onUpdated(() => {
				const { direction, layout } = props;
				const { scrollOffset, updateRequested } = unref(states);
				const windowElement = unref(windowRef);
				if (updateRequested && windowElement) if (layout === "horizontal") if (direction === "rtl") switch (getRTLOffsetType()) {
					case RTL_OFFSET_NAG:
						windowElement.scrollLeft = -scrollOffset;
						break;
					case RTL_OFFSET_POS_ASC:
						windowElement.scrollLeft = scrollOffset;
						break;
					default: {
						const { clientWidth, scrollWidth } = windowElement;
						windowElement.scrollLeft = scrollWidth - clientWidth - scrollOffset;
						break;
					}
				}
				else windowElement.scrollLeft = scrollOffset;
				else windowElement.scrollTop = scrollOffset;
			});
			onActivated(() => {
				unref(windowRef).scrollTop = unref(states).scrollOffset;
			});
			watch(maxOffset, () => {
				edgeState = currentEdgeState.value;
			});
			const api = {
				ns,
				clientSize,
				estimatedTotalSize,
				windowStyle,
				windowRef,
				innerRef,
				innerStyle,
				itemsToRender,
				scrollbarRef,
				states,
				getItemStyle,
				onScroll,
				onScrollbarScroll,
				onWheel,
				scrollTo,
				scrollToItem,
				resetScrollTop
			};
			expose({
				windowRef,
				innerRef,
				getItemStyleCache,
				scrollTo,
				scrollToItem,
				resetScrollTop,
				states
			});
			return api;
		},
		render(ctx) {
			const { $slots, className, clientSize, containerElement, data, getItemStyle, innerElement, itemsToRender, innerStyle, layout, scrollbarAlwaysOn, total, onScroll, onScrollbarScroll, states, useIsScrolling, windowStyle, ns } = ctx;
			const [start, end] = itemsToRender;
			const Container = resolveDynamicComponent(containerElement);
			const Inner = resolveDynamicComponent(innerElement);
			const children = [];
			if (total > 0) for (let i = start; i <= end; i++) children.push(h(Fragment, { key: i }, $slots.default?.({
				data,
				index: i,
				isScrolling: useIsScrolling ? states.isScrolling : void 0,
				style: getItemStyle(i)
			})));
			const InnerNode = [h(Inner, mergeProps(ctx.innerProps, {
				style: innerStyle,
				ref: "innerRef"
			}), !isString(Inner) ? { default: () => children } : children)];
			const scrollbar = h(ScrollBar, {
				ref: "scrollbarRef",
				clientSize,
				layout,
				onScroll: onScrollbarScroll,
				ratio: clientSize * 100 / this.estimatedTotalSize,
				scrollFrom: states.scrollOffset / (this.estimatedTotalSize - clientSize),
				total,
				alwaysOn: scrollbarAlwaysOn
			});
			const listContainer = h(Container, {
				class: [ns.e("window"), className],
				style: windowStyle,
				onScroll,
				ref: "windowRef",
				key: 0
			}, !isString(Container) ? { default: () => [InnerNode] } : [InnerNode]);
			return h("div", {
				key: 0,
				class: [ns.e("wrapper"), scrollbarAlwaysOn ? "always-on" : ""]
			}, [listContainer, scrollbar]);
		}
	});
};
//#endregion
export { createList as default };

//# sourceMappingURL=build-list.mjs.map