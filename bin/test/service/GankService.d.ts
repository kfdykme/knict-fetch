import { AxiosResponse } from 'axios';
export declare enum CategoryType {
    article = "Article",
    ganhuo = "GanHuo",
    girl = "Girl"
}
export declare class GankService {
    banners(): Promise<AxiosResponse<any>>;
    categories(categoryType: CategoryType): Promise<AxiosResponse<any>>;
    data(CategoryType: CategoryType, type: string, page: number, count: number): Promise<AxiosResponse<any>>;
}
