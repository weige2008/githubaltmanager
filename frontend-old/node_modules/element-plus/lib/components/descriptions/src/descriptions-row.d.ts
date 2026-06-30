import { EpPropFinalized } from "../../../utils/vue/props/types.js";
import { DescriptionItemVNode } from "./description-item.js";

//#region ../../packages/components/descriptions/src/descriptions-row.d.ts
interface DescriptionsRowProps {
  row?: DescriptionItemVNode[];
}
/**
 * @deprecated Removed after 3.0.0, Use `DescriptionsRowProps` instead.
 */
declare const descriptionsRowProps: {
  readonly row: EpPropFinalized<(new (...args: any[]) => DescriptionItemVNode[]) | (() => DescriptionItemVNode[]) | (((new (...args: any[]) => DescriptionItemVNode[]) | (() => DescriptionItemVNode[])) | null)[], unknown, unknown, () => never[], boolean>;
};
//#endregion
export { DescriptionsRowProps, descriptionsRowProps };