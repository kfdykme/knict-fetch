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
        if (k.http.type === HttpMethod.PostType.multipartformdata) {
            var formData = undefined;
            try {
                formData = new FormData();
            }
            catch (err) {
                try {
                    formData = new window.FormData();
                }
                catch (err2) {
                    formData = new (require('form-data'))();
                }
            }
            if (formData != undefined) {
                if (k.data.postFile !== undefined) {
                    var fileParam = k.args[k.data.postFile];
                    console.info(fileParam);
                    formData.append('file', fileParam, fileParam.name);
                }
                else {
                    console.error(k.data.postFile);
                }
                k.http.data = formData;
            }
        }
        Logger_1.logger.info('handlePost', k.http.data);
        if (k.http && k.http.responseType) {
            return this.axios_({
                method: 'post',
                url: url,
                data: k.http.data,
                responseType: k.http.responseType,
                headers: k.http.headers
            });
        }
        else {
            return this.axios_({
                method: 'post',
                url: url,
                data: k.http.data,
                headers: k.http.headers
            });
        }
    }
    handleGet(k) {
        // resolve Get path
        let url = this.baseUrl_ + k.url;
        if (k.http && k.http.responseType) {
            return this.axios_.get(url, {
                responseType: k.http.responseType,
                headers: k.http.headers
            });
        }
        else {
            return this.axios_.get(url, {
                headers: k.http.headers
            });
        }
    }
    build(k) {
        k.res = undefined;
        if (this.baseUrl_ === '') {
            throw new Error(`FetchClientBuilder Error: you need set a base url by FetchClientBuilderInstance.baseUrl(url)`);
        }
        Logger_1.logger.info('Build Fetch', k);
        if (this.hasPath(k)) {
            const path = k.data.path;
            for (let x in path) {
                const pathx = k.args[path[x]];
                const reg = new RegExp(`\{${x}\}`);
                k.url = k.url.replace(reg, pathx);
            }
        }
        return (() => {
            if (this.isPost(k)) {
                return this.handlePost(k);
            }
            else if (this.isGet(k)) {
                return this.handleGet(k);
            }
            else {
                console.error('not post & get');
                return Promise.reject(new Error('Unsupport'));
            }
        })();
    }
}
exports.FetchClientBuilder = FetchClientBuilder;
