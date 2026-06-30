import { EpPropMergeType } from "../../../utils/vue/props/types.js";
import { Arrayable } from "../../../utils/typescript.js";
import { SpaceProps } from "./space.js";
import * as _$vue from "vue";
import { StyleValue } from "vue";

//#region ../../packages/components/space/src/use-space.d.ts
declare function useSpace(props: SpaceProps): {
  classes: _$vue.ComputedRef<EpPropMergeType<(new (...args: any[]) => string | Record<string, boolean> | (string | Record<string, boolean>)[]) | (() => Arrayable<string | Record<string, boolean>>) | (((new (...args: any[]) => string | Record<string, boolean> | (string | Record<string, boolean>)[]) | (() => Arrayable<string | Record<string, boolean>>)) | null)[], unknown, unknown>[]>;
  containerStyle: _$vue.ComputedRef<StyleValue>;
  itemStyle: _$vue.ComputedRef<StyleValue>;
};
//#endregion
export { useSpace };