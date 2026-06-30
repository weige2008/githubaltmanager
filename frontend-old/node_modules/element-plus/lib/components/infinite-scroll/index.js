Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
//#region ../../packages/components/infinite-scroll/index.ts
const _InfiniteScroll = require("./src/index.js").default;
_InfiniteScroll.install = (app) => {
	app.directive("InfiniteScroll", _InfiniteScroll);
};
const ElInfiniteScroll = _InfiniteScroll;
//#endregion
exports.ElInfiniteScroll = ElInfiniteScroll;
exports.default = _InfiniteScroll;

//# sourceMappingURL=index.js.map