import { TransferPropsAlias } from "../transfer.js";
import * as _$vue from "vue";

//#region ../../packages/components/transfer/src/composables/use-props-alias.d.ts
declare const usePropsAlias: (props: {
  props?: TransferPropsAlias;
}) => _$vue.ComputedRef<{
  label: string;
  key: string;
  disabled: string;
}>;
//#endregion
export { usePropsAlias };