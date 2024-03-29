import { ResponseType as AxiosResponseType } from 'axios';
declare function GET(url: string): import("knict/bin/KnictBase").IFunctionAnnotationRes;
/**
 * Change ResponseType
 */
declare function ResponseType(type: AxiosResponseType): import("knict/bin/KnictBase").IFunctionAnnotationRes;
declare function Headers(headers: any): import("knict/bin/KnictBase").IFunctionAnnotationRes;
declare enum PostType {
    urlencoded = "x-www-form-urlencoded",
    multipartformdata = "multipart/form-data"
}
declare function POST(url: string, type?: PostType): import("knict/bin/KnictBase").IFunctionAnnotationRes;
declare function PostFile(): import("knict/bin/KnictBase").IParamAnnotationRes;
declare function PostData(name: string): import("knict/bin/KnictBase").IParamAnnotationRes;
declare function Path(path: string): import("knict/bin/KnictBase").IParamAnnotationRes;
declare const OnUnsupport: () => Promise<never>;
declare interface Response<T = any> {
    data: T;
    status: number;
    statusText: string;
    headers: any;
    request?: any;
}
export { GET, Path, POST, PostData, OnUnsupport, Response, PostType, ResponseType, Headers, PostFile };
