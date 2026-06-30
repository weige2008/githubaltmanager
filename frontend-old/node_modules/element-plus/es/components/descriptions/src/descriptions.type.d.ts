import { ComponentSize } from "../../../constants/size.js";
import { ColumnAlignment } from "../../../constants/column-alignment.js";

//#region ../../packages/components/descriptions/src/descriptions.type.d.ts
interface IDescriptionsInject {
  border: boolean;
  column: number;
  direction: 'horizontal' | 'vertical';
  size: ComponentSize;
  title: string;
  extra: string;
  labelWidth: string | number;
}
interface IDescriptionsItemInject {
  label: string;
  span: number;
  rowspan: number;
  width: string | number;
  minWidth: string | number;
  labelWidth: string | number;
  align: ColumnAlignment;
  labelAlign?: ColumnAlignment;
  className: string;
  labelClassName: string;
}
//#endregion
export { IDescriptionsInject, IDescriptionsItemInject };