import { WatermarkProps } from "./watermark.js";

//#region ../../packages/components/watermark/src/useClips.d.ts
/**
 * Get the clips of text content.
 * This is a lazy hook function since SSR no need this
 */
declare function useClips(): (content: NonNullable<WatermarkProps["content"]> | HTMLImageElement, rotate: number, ratio: number, width: number, height: number, font: Required<NonNullable<WatermarkProps["font"]>>, gapX: number, gapY: number, space: number) => [dataURL: string, finalWidth: number, finalHeight: number];
//#endregion
export { useClips as default };