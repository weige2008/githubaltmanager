import { Measurable } from "./constants.js";
import { PopperCoreConfigProps } from "./content.js";
import { Placement as Placement$1 } from "../index.js";
import { ComponentPublicInstance, MaybeRef } from "vue";
import * as _$_popperjs_core0 from "@popperjs/core";
import { Modifier } from "@popperjs/core";

//#region ../../packages/components/popper/src/utils.d.ts
declare const buildPopperOptions: (props: PopperCoreConfigProps, modifiers?: Modifier<any, any>[]) => {
  modifiers: (Modifier<any, any> | {
    name: string;
    options: {
      offset: number[];
      padding?: undefined;
      fallbackPlacements?: undefined;
      gpuAcceleration?: undefined;
    };
  } | {
    name: string;
    options: {
      padding: {
        top: number;
        bottom: number;
        left: number;
        right: number;
      };
      offset?: undefined;
      fallbackPlacements?: undefined;
      gpuAcceleration?: undefined;
    };
  } | {
    name: string;
    options: {
      padding: number;
      fallbackPlacements: Placement$1[] | undefined;
      offset?: undefined;
      gpuAcceleration?: undefined;
    };
  } | {
    name: string;
    options: {
      gpuAcceleration: boolean | undefined;
      offset?: undefined;
      padding?: undefined;
      fallbackPlacements?: undefined;
    };
  })[];
  placement: Placement$1 | undefined;
  strategy: _$_popperjs_core0.PositioningStrategy | undefined;
  onFirstUpdate?: (arg0: Partial<_$_popperjs_core0.State>) => void;
};
declare const unwrapMeasurableEl: ($el: MaybeRef<Measurable | undefined | ComponentPublicInstance>) => HTMLElement | undefined;
//#endregion
export { buildPopperOptions, unwrapMeasurableEl };