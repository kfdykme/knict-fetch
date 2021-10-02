import { KnictBasicClientBuilder } from 'knict';
import { AxiosInstance } from 'axios';
export declare class FetchClientBuilder extends KnictBasicClientBuilder {
    private baseUrl_;
    private axios_;
    baseUrl(url: string): this;
    axios(axiosInstanc: AxiosInstance): this;
    hasPath(k: any): any;
    hasPostData(k: any): any;
    isPost(k: any): boolean;
    isGet(k: any): boolean;
    handlePost(k: any): import("axios").AxiosPromise<any>;
    handleGet(k: any): Promise<import("axios").AxiosResponse<any>>;
    build(k: any): any;
}
