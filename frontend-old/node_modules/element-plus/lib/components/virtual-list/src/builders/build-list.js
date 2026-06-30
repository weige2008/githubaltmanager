Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
require("../../../../_virtual/_rolldown/runtime.js");
const require_types = require("../../../../utils/types.js");
const require_numbers = require("../../../../utils/numbers.js");
const require_index = require("../../../../hooks/use-namespace/index.js");
const require_use_cache = require("../hooks/use-cache.js");
const require_defaults = require("../defaults.js");
const require_use_wheel = require("../hooks/use-wheel.js");
const require_props = require("../props.js");
const require_utils = require("../utils.js");
const require_scrollbar = require("../components/scrollbar.js");
let _vueuse_core = require("@vueuse/core");
let vue = require("vue");
let _vue_shared = require("@vue/shared");
//#region ../../packages/components/virtual-list/src/builders/build-list.ts
const createList = ({ name, getOffset, getItemSize, getItemOffset, getEstimatedTotalSize, getStartIndexForOffset, getStopIndexForStartIndex, initCache, clearCache, validateProps }) => {
	return (0, vue.defineComponent)({
		name: name ?? "ElVirtualList",
		props: require_props.virtualizedListProps,
		emits: [
			require_defaults.ITEM_RENDER_EVT,
			require_defaults.SCROLL_EVT,
			require_defaults.END_REACHED_EVT
		],
		setup(props, { emit, expose }) {
			validateProps(props);
			const instance = (0, vue.getCurrentInstance)();
			const ns = require_index.useNamespace("vl");
			const dynamicSizeCache = (0, vue.ref)(initCache(props, instance));
			const getItemStyleCache = require_use_cache.useCache();
			const windowRef = (0, vue.ref)();
			const innerRef = (0, vue.ref)();
			const scrollbarRef = (0, vue.ref)();
			const states = (0, vue.ref)({
				isScrolling: false,
				scrollDir: require_defaults.FORWARD,
				scrollOffset: require_types.isNumber(props.initScrollOffset) ? props.initScrollOffset : 0,
				updateRequested: false,
				isScrollbarDragging: false
			});
			const itemsToRender = (0, vue.computed)(() => {
				const { total, cache } = props;
				const { isScrolling, scrollDir, scrollOffset } = (0, vue.unref)(states);
				if (total === 0) return [
					0,
					0,
					0,
					0
				];
				const startIndex = getStartIndexForOffset(props, scrollOffset, (0, vue.unref)(dynamicSizeCache));
				const stopIndex = getStopIndexForStartIndex(props, startIndex, scrollOffset, (0, vue.unref)(dynamicSizeCache));
				const cacheBackward = !isScrolling || scrollDir === "backward" ? Math.max(1, cache) : 1;
				const cacheForward = !isScrolling || scrollDir === "forward" ? Math.max(1, cache) : 1;
				return [
					Math.max(0, startIndex - cacheBackward),
					Math.max(0, Math.min(total - 1, stopIndex + cacheForward)),
					startIndex,
					stopIndex
				];
			});
			const estimatedTotalSize = (0, vue.computed)(() => getEstimatedTotalSize(props, (0, vue.unref)(dynamicSizeCache)));
			const _isHorizontal = (0, vue.computed)(() => require_utils.isHorizontal(props.layout));
			const windowStyle = (0, vue.computed)(() => [
				{
					position: "relative",
					[`overflow-${_isHorizontal.value ? "x" : "y"}`]: "scroll",
					WebkitOverflowScrolling: "touch",
					willChange: "transform"
				},
				{
					direction: props.direction,
					height: require_types.isNumber(props.height) ? `${props.height}px` : props.height,
					width: require_types.isNumber(props.width) ? `${props.width}px` : props.width
				},
				props.style
			]);
			const innerStyle = (0, vue.computed)(() => {
				const size = (0, vue.unref)(estimatedTotalSize);
				const horizontal = (0, vue.unref)(_isHorizontal);
				const innerWidth = props.innerWidth;
				return {
					height: horizontal ? "100%" : `${size}px`,
					pointerEvents: (0, vue.unref)(states).isScrolling ? "none" : void 0,
					width: horizontal ? `${size}px` : innerWidth !== void 0 ? require_types.isNumber(innerWidth) ? `${innerWidth}px` : innerWidth : "100%",
					margin: 0,
					boxSizing: "border-box"
				};
			});
			const clientSize = (0, vue.computed)(() => _isHorizontal.value ? props.width : props.height);
			const maxOffset = (0, vue.computed)(() => Math.max(0, estimatedTotalSize.value - clientSize.value));
			const normalizeOffset = (offset) => (0, _vueuse_core.clamp)(offset, 0, maxOffset.value);
			const EDGE_TOLERANCE = 1;
			const getEdgeState = (normalizedOffset) => ({
				start: !require_numbers.isGreaterThan(normalizedOffset, 0, EDGE_TOLERANCE),
				end: !require_numbers.isGreaterThan(maxOffset.value, normalizedOffset, EDGE_TOLERANCE)
			});
			const normalizedScrollOffset = (0, vue.computed)(() => normalizeOffset(states.value.scrollOffset));
			const currentEdgeState = (0, vue.computed)(() => getEdgeState(normalizedScrollOffset.value));
			let edgeState = currentEdgeState.value;
			const { onWheel } = require_use_wheel.default({
				atStartEdge: (0, vue.computed)(() => currentEdgeState.value.start),
				atEndEdge: (0, vue.computed)(() => currentEdgeState.value.end),
				layout: (0, vue.computed)(() => props.layout)
			}, (offset) => {
				scrollbarRef.value.onMouseUp?.();
				scrollTo(Math.min(states.value.scrollOffset + offset, maxOffset.value));
			});
			(0, _vueuse_core.useEventListener)(windowRef, "wheel", onWheel, { passive: false });
			const emitEvents = () => {
				const { total } = props;
				if (total > 0) {
					const [cacheStart, cacheEnd, visibleStart, visibleEnd] = (0, vue.unref)(itemsToRender);
					emit(require_defaults.ITEM_RENDER_EVT, cacheStart, cacheEnd, visibleStart, visibleEnd);
				}
				const { scrollDir, scrollOffset, updateRequested } = (0, vue.unref)(states);
				emit(require_defaults.SCROLL_EVT, scrollDir, scrollOffset, updateRequested);
			};
			const emitEndReached = (direction, offset) => {
				const nextEdgeState = getEdgeState(offset);
				const horizontalEnd = props.direction === "rtl" ? "left" : "right";
				const horizontalStart = props.direction === "rtl" ? "right" : "left";
				if (direction === "forward" && nextEdgeState.end && !edgeState.end) emit(require_defaults.END_REACHED_EVT, _isHorizontal.value ? horizontalEnd : "bottom");
				if (direction === "backward" && nextEdgeState.start && !edgeState.start) emit(require_defaults.END_REACHED_EVT, _isHorizontal.value ? horizontalStart : "top");
				edgeState = nextEdgeState;
			};
			const updateScrollOffset = (offset, { isScrolling, updateRequested }) => {
				const currentState = (0, vue.unref)(states);
				const nextOffset = Math.max(offset, 0);
				if (nextOffset === currentState.scrollOffset) return;
				const scrollDir = require_utils.getScrollDir(currentState.scrollOffset, nextOffset);
				states.value = {
					...currentState,
					isScrolling,
					scrollDir,
					scrollOffset: nextOffset,
					updateRequested
				};
				emitEndReached(scrollDir, normalizeOffset(nextOffset));
				(0, vue.nextTick)(resetIsScrolling);
			};
			const scrollVertically = (e) => {
				const { clientHeight, scrollHeight, scrollTop } = e.currentTarget;
				if ((0, vue.unref)(states).scrollOffset === scrollTop) return;
				updateScrollOffset(Math.min(scrollTop, scrollHeight - clientHeight), {
					isScrolling: true,
					updateRequested: false
				});
			};
			const scrollHorizontally = (e) => {
				const { clientWidth, scrollLeft, scrollWidth } = e.currentTarget;
				if ((0, vue.unref)(states).scrollOffset === scrollLeft) return;
				const { direction } = props;
				let scrollOffset = scrollLeft;
				if (direction === "rtl") switch (require_utils.getRTLOffsetType()) {
					case require_defaults.RTL_OFFSET_NAG:
						scrollOffset = -scrollLeft;
						break;
					case require_defaults.RTL_OFFSET_POS_DESC:
						scrollOffset = scrollWidth - clientWidth - scrollLeft;
						break;
				}
				updateScrollOffset(Math.min(scrollOffset, scrollWidth - clientWidth), {
					isScrolling: true,
					updateRequested: false
				});
			};
			const onScroll = (e) => {
				(0, vue.unref)(_isHorizontal) ? scrollHorizontally(e) : scrollVertically(e);
				emitEvents();
			};
			const onScrollbarScroll = (distanceToGo, totalSteps) => {
				const offset = maxOffset.value / totalSteps * distanceToGo;
				scrollTo(Math.min(maxOffset.value, offset));
			};
			const scrollTo = (offset) => {
				updateScrollOffset(offset, {
					isScrolling: (0, vue.unref)(states).isScrolling,
					updateRequested: true
				});
			};
			const scrollToItem = (idx, alignment = require_defaults.AUTO_ALIGNMENT) => {
				const { scrollOffset } = (0, vue.unref)(states);
				idx = Math.max(0, Math.min(idx, props.total - 1));
				scrollTo(getOffset(props, idx, alignment, scrollOffset, (0, vue.unref)(dynamicSizeCache)));
			};
			const getItemStyle = (idx) => {
				const { direction, itemSize, layout } = props;
				const itemStyleCache = getItemStyleCache.value(clearCache && itemSize, clearCache && layout, clearCache && direction);
				let style;
				if ((0, _vue_shared.hasOwn)(itemStyleCache, String(idx))) style = itemStyleCache[idx];
				else {
					const offset = getItemOffset(props, idx, (0, vue.unref)(dynamicSizeCache));
					const size = getItemSize(props, idx, (0, vue.unref)(dynamicSizeCache));
					const horizontal = (0, vue.unref)(_isHorizontal);
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
				(0, vue.nextTick)(() => {
					getItemStyleCache.value(-1, null, null);
				});
			};
			const resetScrollTop = () => {
				const window = windowRef.value;
				if (window) window.scrollTop = 0;
			};
			(0, vue.onMounted)(() => {
				if (!_vueuse_core.isClient) return;
				const { initScrollOffset } = props;
				const windowElement = (0, vue.unref)(windowRef);
				if (require_types.isNumber(initScrollOffset) && windowElement) if ((0, vue.unref)(_isHorizontal)) windowElement.scrollLeft = initScrollOffset;
				else windowElement.scrollTop = initScrollOffset;
				emitEvents();
			});
			(0, vue.onUpdated)(() => {
				const { direction, layout } = props;
				const { scrollOffset, updateRequested } = (0, vue.unref)(states);
				const windowElement = (0, vue.unref)(windowRef);
				if (updateRequested && windowElement) if (layout === "horizontal") if (direction === "rtl") switch (require_utils.getRTLOffsetType()) {
					case require_defaults.RTL_OFFSET_NAG:
						windowElement.scrollLeft = -scrollOffset;
						break;
					case require_defaults.RTL_OFFSET_POS_ASC:
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
			(0, vue.onActivated)(() => {
				(0, vue.unref)(windowRef).scrollTop = (0, vue.unref)(states).scrollOffset;
			});
			(0, vue.watch)(maxOffset, () => {
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
			const Container = (0, vue.resolveDynamicComponent)(containerElement);
			const Inner = (0, vue.resolveDynamicComponent)(innerElement);
			const children = [];
			if (total > 0) for (let i = start; i <= end; i++) children.push((0, vue.h)(vue.Fragment, { key: i }, $slots.default?.({
				data,
				index: i,
				isScrolling: useIsScrolling ? states.isScrolling : void 0,
				style: getItemStyle(i)
			})));
			const InnerNode = [(0, vue.h)(Inner, (0, vue.mergeProps)(ctx.innerProps, {
				style: innerStyle,
				ref: "innerRef"
			}), !(0, _vue_shared.isString)(Inner) ? { default: () => children } : children)];
			const scrollbar = (0, vue.h)(require_scrollbar.default, {
				ref: "scrollbarRef",
				clientSize,
				layout,
				onScroll: onScrollbarScroll,
				ratio: clientSize * 100 / this.estimatedTotalSize,
				scrollFrom: states.scrollOffset / (this.estimatedTotalSize - clientSize),
				total,
				alwaysOn: scrollbarAlwaysOn
			});
			const listContainer = (0, vue.h)(Container, {
				class: [ns.e("window"), className],
				style: windowStyle,
				onScroll,
				ref: "windowRef",
				key: 0
			}, !(0, _vue_shared.isString)(Container) ? { default: () => [InnerNode] } : [InnerNode]);
			return (0, vue.h)("div", {
				key: 0,
				class: [ns.e("wrapper"), scrollbarAlwaysOn ? "always-on" : ""]
			}, [listContainer, scrollbar]);
		}
	});
};
//#endregion
exports.default = createList;

//# sourceMappingURL=build-list.js.map