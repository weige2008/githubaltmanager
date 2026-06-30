import Node from "./node.js";

//#region ../../packages/components/tree/src/model/useNodeExpandEventBroadcast.d.ts
interface Props {
  node?: Node;
  accordion: boolean;
}
declare function useNodeExpandEventBroadcast(props: Props): {
  broadcastExpanded: (node?: Node) => void;
};
//#endregion
export { useNodeExpandEventBroadcast };