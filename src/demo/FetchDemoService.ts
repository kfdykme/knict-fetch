import { GET, Path, ResponseType } from '../methods/HttpMethod'
import { AxiosResponse } from 'axios'

const onUnsupport = (() => Promise.reject('Unsupport'))


export class FetchDemoService {

    @GET('users/{user}/repos')
    // Call<List<Repo>> listRepos(@Path("user") String user);')
    github(@Path('user') user: string): Promise<AxiosResponse<any>> { return onUnsupport()}

    
    @GET('users/{user}/repos')
    @ResponseType('stream')
    // Call<List<Repo>> listRepos(@Path("user") String user);')
    githubAsStream(@Path('user') user: string): Promise<AxiosResponse<any>> { return onUnsupport()}
}