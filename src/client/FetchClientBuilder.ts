import { KnictBasicClientBuilder } from 'knict'
import * as HttpMethod from '../methods/HttpMethod'
import axios, { AxiosInstance } from 'axios';
import { logger } from '../common/Logger'

export class FetchClientBuilder extends KnictBasicClientBuilder {

    private baseUrl_ = ''
    private axios_: AxiosInstance = axios
    baseUrl(url: string) {
        this.baseUrl_ = url
        return this
    }

    axios(axiosInstanc: AxiosInstance) {
        this.axios_ = axiosInstanc
        return this
    }

    hasPath(k: any) {
        return k.data && k.data.path
    }

    hasPostData(k: any) {
        return k.data && k.data.post
    }

    isPost(k: any) {
        return k.http && k.http.method === 'POST'
    }

    isGet(k: any) {
        return k.http && k.http.method === 'GET'
    }

    handlePost(k: any) {

        const url = this.baseUrl_ + k.url
        logger.info('handlePost', url)
        if (this.hasPostData(k)) {
            const post = k.data.post
            for (let x in post) {
                const postx = k.args[post[x]]
                if (!k.http.data || typeof k.http.data !== 'object') k.http.data = new Object()
                k.http.data[x] = postx
            }
        }

        if (k.http.type === HttpMethod.PostType.urlencoded) {
            // convert as urlencoded post data
            const res = []
            const data: any = k.http.data
            for (let x in data) {
                res.push(`${x}=${data[x]}`)
            }
            k.http.data = res.join('&')
        }


        logger.info('handlePost', k.http.data)
        if (k.http && k.http.responseType) {
            return this.axios_({
                method: 'post',
                url: url,
                data: k.http.data,
                responseType: k.http.responseType,
                headers: k.http.headers
            })
        } else {
            return this.axios_({
                method: 'post',
                url: url,
                data: k.http.data,
                headers: k.http.headers
            })
        }
    }

    handleGet(k: any) {

        // resolve Get path

        let url = this.baseUrl_ + k.url

        if (k.http && k.http.responseType) {

            return this.axios_.get(url, {
                responseType: k.http.responseType,
                headers: k.http.headers
            })
        } else {
            return this.axios_.get(url, {
                headers: k.http.headers
            })
        }

    }

    build(k: any): any {
        if (this.baseUrl_ === '') {
            throw new Error(`FetchClientBuilder Error: you need set a base url by FetchClientBuilderInstance.baseUrl(url)`)
        }
        logger.info('Build Fetch', k)
 
        if (this.hasPath(k)) {
            const path = k.data.path
            for (let x in path) {
                const pathx = k.args[path[x]]
                const reg = new RegExp(`\{${x}\}`)
                k.url = k.url.replace(reg, pathx)
            }
        }
        return (() => {
            if (this.isPost(k)) {
                return this.handlePost(k)
            } else if (this.isGet(k)) {
                return this.handleGet(k)
            }
            return Promise.reject(new Error('Unsupport'))

        })()
    }
}
