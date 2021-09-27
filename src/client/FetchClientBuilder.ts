import { KnictBasicClientBuilder } from 'knict'
import axios from 'axios';


 

export class FetchClientBuilder extends KnictBasicClientBuilder {

    private baseUrl_ = ''

    baseUrl(url: string) {
        this.baseUrl_ = url
        return this
    }

    hasPath(k: any) {
        return k.data && k.data.path
    }

    build(k: any): any {
        if (this.baseUrl_ === '') {
            throw new Error(`FetchClientBuilder Error: you need set a base url by FetchClientBuilderInstance.baseUrl(url)`)
        }
        console.info('Build Fetch', k)


        // resolve Get path
        
        if (this.hasPath(k)) {
            const path = k.data.path
            for (let x in path) {
                const pathx = k.args[path[x]]
                const reg = new RegExp(`\{${x}\}`)
                k.url = k.url.replace(reg, pathx)
            }
        }


        return (() => {
            const url = this.baseUrl_ + k.url
            console.info('Fetch', url)
            return axios.get(url)

        })()
    }
}
