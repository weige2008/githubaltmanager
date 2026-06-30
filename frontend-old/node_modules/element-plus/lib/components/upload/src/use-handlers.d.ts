import { UploadAjaxError } from "./ajax.js";
import { UploadFile, UploadProgressEvent, UploadProps, UploadRawFile, UploadStatus } from "./upload.js";
import { UploadContentInstance } from "./upload-content.js";
import * as _$vue from "vue";
import { ShallowRef } from "vue";

//#region ../../packages/components/upload/src/use-handlers.d.ts
declare const useHandlers: (props: UploadProps & Required<Pick<UploadProps, "listType" | "onChange" | "onError" | "onProgress" | "onSuccess" | "onRemove">>, uploadRef: ShallowRef<UploadContentInstance | undefined>) => {
  /** @description two-way binding ref from props `fileList` */uploadFiles: _$vue.Ref<{
    name: string;
    percentage?: number | undefined;
    status: UploadStatus;
    size?: number | undefined;
    response?: unknown;
    uid: number;
    url?: string | undefined;
    raw?: {
      uid: number;
      isDirectory?: boolean | undefined;
      readonly lastModified: number;
      readonly name: string;
      readonly webkitRelativePath: string;
      readonly size: number;
      readonly type: string;
      arrayBuffer: () => Promise<ArrayBuffer>;
      bytes: () => Promise<Uint8Array<ArrayBuffer>>;
      slice: (start?: number, end?: number, contentType?: string) => Blob;
      stream: () => ReadableStream<Uint8Array<ArrayBuffer>>;
      text: () => Promise<string>;
    } | undefined;
  }[], {
    name: string;
    percentage?: number | undefined;
    status: UploadStatus;
    size?: number | undefined;
    response?: unknown;
    uid: number;
    url?: string | undefined;
    raw?: {
      uid: number;
      isDirectory?: boolean | undefined;
      readonly lastModified: number;
      readonly name: string;
      readonly webkitRelativePath: string;
      readonly size: number;
      readonly type: string;
      arrayBuffer: () => Promise<ArrayBuffer>;
      bytes: () => Promise<Uint8Array<ArrayBuffer>>;
      slice: (start?: number, end?: number, contentType?: string) => Blob;
      stream: () => ReadableStream<Uint8Array<ArrayBuffer>>;
      text: () => Promise<string>;
    } | undefined;
  }[]>;
  abort: (file?: UploadFile) => void;
  clearFiles: (states?: UploadStatus[]) => void;
  handleError: (err: UploadAjaxError, rawFile: UploadRawFile) => void;
  handleProgress: (evt: UploadProgressEvent, rawFile: UploadRawFile) => void;
  handleStart: (rawFile: UploadRawFile) => void;
  handleSuccess: (response: any, rawFile: UploadRawFile) => unknown;
  handleRemove: (file: UploadFile | UploadRawFile) => void;
  submit: () => void;
  revokeFileObjectURL: (file: UploadFile) => void;
};
//#endregion
export { useHandlers };