import { ButtonProps } from "./button.js";
import * as _$vue from "vue";
import { TinyColor } from "@ctrl/tinycolor";

//#region ../../packages/components/button/src/button-custom.d.ts
declare function darken(color: TinyColor, amount?: number): string;
declare function useButtonCustomStyle(props: ButtonProps): _$vue.ComputedRef<Record<string, string>>;
//#endregion
export { darken, useButtonCustomStyle };