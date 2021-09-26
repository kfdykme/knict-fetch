import { KnictBasicClientBuilder } from 'knict'
import axios from 'axios';


 

export class FetchClientBuilder extends KnictBasicClientBuilder {

    private baseUrl_ = ''

    baseUrl(url: string) {
        this.baseUrl_ = url
        return this
    }

    build(k: any): any {
        // console.info('Build Fetch', k)

        // resolve Get path
        const path = k.data.path
        for (let x in path) {
            const pathx = k.args[path[x]]
            const reg = new RegExp(`\{${x}\}`)
            k.url = k.url.replace(reg, pathx)
        }


        return (() => {
            const url = this.baseUrl_ + k.url
            console.info('Fetch', url)
            return axios.get(url)

        })()
    }
}
