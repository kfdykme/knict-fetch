interface IFunctionAnnotationRes {
    (target: any, propertyKey: string, descriptor: PropertyDescriptor): void;
}
declare function GET(url: string): IFunctionAnnotationRes;
declare enum PostType {
    urlencoded = "x-www-form-urlencoded"
}
declare function POST(url: string, type?: PostType): IFunctionAnnotationRes;
declare function PostData(name: string): (target: any, propertyKey: string | symbol, parameterIndex: number) => void;
declare function Path(path: string): (target: any, propertyKey: string | symbol, parameterIndex: number) => void;
declare const OnUnsupport: () => Promise<never>;
declare interface Response<T = any> {
    data: T;
    status: number;
    statusText: string;
    headers: any;
    request?: any;
}
export { GET, Path, POST, PostData, OnUnsupport, Response, PostType };
