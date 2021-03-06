import { AxiosResponse } from 'axios';
export declare class FetchDemoService {
    github(user: string): Promise<AxiosResponse<any>>;
    githubAsStream(user: string): Promise<AxiosResponse<any>>;
}
