import { HttpMethod } from '../../index'
import { AxiosResponse } from 'axios'
import { get } from 'knict/bin/Knict'


const { GET, Path, OnUnsupport } = HttpMethod

export enum CategoryType {
    article = 'Article',
    ganhuo = 'GanHuo',
    girl = 'Girl'
}


export class GankService {

    @GET("/banners")
    banners(): Promise<AxiosResponse<any>> {
        return OnUnsupport()
    }


    @GET("/categories/{category_type}")
    categories(@Path('category_type') categoryType: CategoryType): Promise<AxiosResponse<any>> {
        return OnUnsupport()
    }

    @GET("/data/category/{category_type}/type/{type}/page/{page}/count/{count}")
    data(@Path('category_type') CategoryType: CategoryType, @Path('type') type: string, @Path('page') page: number, @Path('count') count: number): Promise<AxiosResponse<any>> {
        return OnUnsupport()
    }


}