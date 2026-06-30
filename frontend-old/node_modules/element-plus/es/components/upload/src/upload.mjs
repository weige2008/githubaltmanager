import { buildProps, definePropType } from "../../../utils/vue/props/runtime.mjs";
import { NOOP } from "../../../utils/functions.mjs";
import { mutable } from "../../../utils/typescript.mjs";
import { ajaxUpload } from "./ajax.mjs";
//#region ../../packages/components/upload/src/upload.ts
/**
* @deprecated Removed after 3.0.0, Use `UploadProps` instead.
*/
const uploadListTypes = [
	"text",
	"picture",
	"picture-card"
];
let fileId = 1;
const genFileId = () => Date.now() + fileId++;
/**
* @deprecated Removed after 3.0.0, Use `UploadBaseProps` instead.
*/
const uploadBaseProps = buildProps({
	/**
	* @description request URL
	*/
	action: {
		type: String,
		default: "#"
	},
	/**
	* @description request headers
	*/
	headers: { type: definePropType(Object) },
	/**
	* @description set upload request method
	*/
	method: {
		type: String,
		default: "post"
	},
	/**
	* @description additions options of request
	*/
	data: {
		type: definePropType([
			Object,
			Function,
			Promise
		]),
		default: () => mutable({})
	},
	/**
	* @description whether uploading multiple files is permitted
	*/
	multiple: Boolean,
	/**
	* @description key name for uploaded file
	*/
	name: {
		type: String,
		default: "file"
	},
	/**
	* @description whether to activate drag and drop mode
	*/
	drag: Boolean,
	/**
	* @description whether cookies are sent
	*/
	withCredentials: Boolean,
	/**
	* @description whether to show the uploaded file list
	*/
	showFileList: {
		type: Boolean,
		default: true
	},
	/**
	* @description accepted [file types](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-accept), will not work when `thumbnail-mode === true`
	*/
	accept: {
		type: String,
		default: ""
	},
	/**
	* @description default uploaded files
	*/
	fileList: {
		type: definePropType(Array),
		default: () => mutable([])
	},
	/**
	* @description whether to auto upload file
	*/
	autoUpload: {
		type: Boolean,
		default: true
	},
	/**
	* @description type of file list
	*/
	listType: {
		type: String,
		values: uploadListTypes,
		default: "text"
	},
	/**
	* @description override default xhr behavior, allowing you to implement your own upload-file's request
	*/
	httpRequest: {
		type: definePropType(Function),
		default: ajaxUpload
	},
	/**
	* @description whether to disable upload
	*/
	disabled: {
		type: Boolean,
		default: void 0
	},
	/**
	* @description maximum number of uploads allowed
	*/
	limit: Number,
	/**
	* @description whether to support uploading directory
	*/
	directory: Boolean
});
/**
* @deprecated Removed after 3.0.0, Use `UploadProps` instead.
*/
const uploadProps = buildProps({
	...uploadBaseProps,
	/**
	* @description hook function before uploading with the file to be uploaded as its parameter. If `false` is returned or a `Promise` is returned and then is rejected, uploading will be aborted
	*/
	beforeUpload: {
		type: definePropType(Function),
		default: NOOP
	},
	/**
	* @description hook function before removing a file with the file and file list as its parameters. If `false` is returned or a `Promise` is returned and then is rejected, removing will be aborted
	*/
	beforeRemove: { type: definePropType(Function) },
	/**
	* @description hook function when files are removed
	*/
	onRemove: {
		type: definePropType(Function),
		default: NOOP
	},
	/**
	* @description hook function when select file or upload file success or upload file fail
	*/
	onChange: {
		type: definePropType(Function),
		default: NOOP
	},
	/**
	* @description hook function when clicking the uploaded files
	*/
	onPreview: {
		type: definePropType(Function),
		default: NOOP
	},
	/**
	* @description hook function when uploaded successfully
	*/
	onSuccess: {
		type: definePropType(Function),
		default: NOOP
	},
	/**
	* @description hook function when some progress occurs
	*/
	onProgress: {
		type: definePropType(Function),
		default: NOOP
	},
	/**
	* @description hook function when some errors occurs
	*/
	onError: {
		type: definePropType(Function),
		default: NOOP
	},
	/**
	* @description hook function when limit is exceeded
	*/
	onExceed: {
		type: definePropType(Function),
		default: NOOP
	},
	/**
	* @description set HTML attribute: crossorigin.
	*/
	crossorigin: { type: definePropType(String) }
});
const uploadBasePropsDefaults = {
	action: "#",
	method: "post",
	data: () => mutable({}),
	name: "file",
	showFileList: true,
	accept: "",
	fileList: () => mutable([]),
	autoUpload: true,
	listType: "text",
	httpRequest: ajaxUpload,
	disabled: void 0
};
const uploadPropsDefaults = {
	...uploadBasePropsDefaults,
	beforeUpload: NOOP,
	onRemove: NOOP,
	onChange: NOOP,
	onPreview: NOOP,
	onSuccess: NOOP,
	onProgress: NOOP,
	onError: NOOP,
	onExceed: NOOP
};
//#endregion
export { genFileId, uploadBaseProps, uploadBasePropsDefaults, uploadListTypes, uploadProps, uploadPropsDefaults };

//# sourceMappingURL=upload.mjs.map