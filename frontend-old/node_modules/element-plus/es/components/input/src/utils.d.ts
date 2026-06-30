//#region ../../packages/components/input/src/utils.d.ts
type TextAreaHeight = {
  height: string;
  minHeight?: string;
};
declare const looseToNumber: (val: any) => any;
declare function calcTextareaHeight(targetElement: HTMLTextAreaElement, minRows?: number, maxRows?: number): TextAreaHeight;
//#endregion
export { calcTextareaHeight, looseToNumber };