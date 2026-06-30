import { CSSProperties } from "vue";

//#region ../../packages/components/watermark/src/utils.d.ts
/** converting camel-cased strings to be lowercase and link it with Separator */
declare function toLowercaseSeparator(key: string): string;
declare function getStyleStr(style: CSSProperties): string;
/** Returns the ratio of the device's physical pixel resolution to the css pixel resolution */
declare function getPixelRatio(): number;
/** Whether to re-render the watermark */
declare const reRendering: (mutation: MutationRecord, watermarkElement?: HTMLElement) => boolean;
//#endregion
export { getPixelRatio, getStyleStr, reRendering, toLowercaseSeparator };