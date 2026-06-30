import { ComponentSize } from "../../../../constants/size.js";
import * as _$vue from "vue";
import { MaybeRef } from "vue";

//#region ../../packages/components/form/src/hooks/use-form-common-props.d.ts
declare const useFormSize: (fallback?: MaybeRef<ComponentSize | undefined>, ignore?: Partial<Record<"prop" | "form" | "formItem" | "global", boolean>>) => _$vue.ComputedRef<"" | "default" | "large" | "small">;
declare const useFormDisabled: (fallback?: MaybeRef<boolean | undefined>) => _$vue.ComputedRef<boolean>;
declare const useSize: (fallback?: MaybeRef<ComponentSize | undefined>, ignore?: Partial<Record<"prop" | "form" | "formItem" | "global", boolean>>) => _$vue.ComputedRef<"" | "default" | "large" | "small">;
declare const useDisabled: (fallback?: MaybeRef<boolean | undefined>) => _$vue.ComputedRef<boolean>;
//#endregion
export { useDisabled, useFormDisabled, useFormSize, useSize };