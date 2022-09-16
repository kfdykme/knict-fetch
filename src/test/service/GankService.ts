import { HttpMethod } from '../../index'
import { AxiosResponse } from 'axios'
import { POST, PostFile } from '../../methods/HttpMethod'

const { GET, Path, OnUnsupport, ResponseType } = HttpMethod

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

    
    @GET("/banners")
    @ResponseType('stream')
    bannersAsStream(): Promise<AxiosResponse<any> | any> {
        return OnUnsupport()
    }

    @GET("/categories/{category_type}")
    categories(@Path('category_type') categoryType: CategoryType): Promise<AxiosResponse<any> | any> {
        return OnUnsupport()
    }

    @GET("/data/category/{category_type}/type/{type}/page/{page}/count/{count}")
    data(@Path('category_type') CategoryType: CategoryType, @Path('type') type: string, @Path('page') page: number, @Path('count') count: number): Promise<AxiosResponse<any> | any> {
        return OnUnsupport()
    }

    @GET("/")
    home():Promise<any>{
        return OnUnsupport();
    }

    @POST('/upload',HttpMethod.PostType.multipartformdata)
    uploadFile(@PostFile() file:any): Promise<any> {
        return OnUnsupport();
    }
}