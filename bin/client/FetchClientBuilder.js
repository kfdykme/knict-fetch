"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FetchClientBuilder = void 0;
const knict_1 = require("knict");
const HttpMethod = require("../methods/HttpMethod");
const axios_1 = require("axios");
const Logger_1 = require("../common/Logger");
class FetchClientBuilder extends knict_1.KnictBasicClientBuilder {
    constructor() {
        super(...arguments);
        this.baseUrl_ = '';
        this.axios_ = axios_1.default;
    }
    baseUrl(url) {
        this.baseUrl_ = url;
        return this;
    }
    axios(axiosInstanc) {
        this.axios_ = axiosInstanc;
        return this;
    }
    hasPath(k) {
        return k.data && k.data.path;
    }
    hasPostData(k) {
        return k.data && k.data.post;
    }
    isPost(k) {
        return k.http && k.http.method === 'POST';
    }
    isGet(k) {
        return k.http && k.http.method === 'GET';
    }
    handlePost(k) {
        const url = this.baseUrl_ + k.url;
        Logger_1.logger.info('handlePost', url);
        if (this.hasPostData(k)) {
            const post = k.data.post;
            for (let x in post) {
                const postx = k.args[post[x]];
                if (!k.http.data || typeof k.http.data !== 'object')
                    k.http.data = new Object();
                k.http.data[x] = postx;
            }
        }
        if (k.http.type === HttpMethod.PostType.urlencoded) {
            // convert as urlencoded post data
            const res = [];
            const data = k.http.data;
            for (let x in data) {
                res.push(`${x}=${data[x]}`);
            }
            k.http.data = res.join('&');
        }
        Logger_1.logger.info('handlePost', k.http.data);
        return this.axios_({
            method: 'post',
            url: url,
            data: k.http.data
        });
    }
    handleGet(k) {
        // resolve Get path
        const url = this.baseUrl_ + k.url;
        Logger_1.logger.info('handleGet', url);
        if (this.hasPath(k)) {
            const path = k.data.path;
            for (let x in path) {
                const pathx = k.args[path[x]];
                const reg = new RegExp(`\{${x}\}`);
                k.url = k.url.replace(reg, pathx);
            }
        }
        return this.axios_.get(url);
    }
    build(k) {
        if (this.baseUrl_ === '') {
            throw new Error(`FetchClientBuilder Error: you need set a base url by FetchClientBuilderInstance.baseUrl(url)`);
        }
        Logger_1.logger.info('Build Fetch', k);
        return (() => {
            if (this.isPost(k)) {
                return this.handlePost(k);
            }
            else if (this.isGet(k)) {
                return this.handleGet(k);
            }
            return Promise.reject(new Error('Unsupport'));
        })();
    }
}
exports.FetchClientBuilder = FetchClientBuilder;
