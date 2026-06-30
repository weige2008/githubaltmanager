import { SelectInstance } from "../../select/src/select.js";
import { TreeInstance } from "../../tree/src/instance.js";
import { Ref } from "vue";

//#region ../../packages/components/tree-select/src/select.d.ts
declare const useSelect: (props: any, {
  attrs,
  emit
}: {
  attrs: any;
  emit: any;
}, {
  select,
  tree,
  key
}: {
  select: Ref<SelectInstance | undefined>;
  tree: Ref<TreeInstance | undefined>;
  key: Ref<string>;
}) => any;
//#endregion
export { useSelect };