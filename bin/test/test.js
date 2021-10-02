"use strict";
// const { Knict, FetchClientBuilder, FetchDemoService} = require('../dist/index')
// const A = require('../dist/index')
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
const GankService_1 = require("./service/GankService");
(() => __awaiter(void 0, void 0, void 0, function* () {
    index_1.Knict.builder(new index_1.FetchClientBuilder()
        // .baseUrl('https://api.github.com/')
        .baseUrl('https://gank.io/api/v2'));
    const demo = index_1.Knict.create(new GankService_1.GankService());
    let res = yield demo.banners();
    // console.info(res.data)
    console.info(GankService_1.CategoryType);
    // res = await demo.categories(CategoryType.article)
    // console.info(res.data)
    res = yield demo.categories(GankService_1.CategoryType.girl);
    // console.info(res.data)
    // res = await demo.categories(CategoryType.girl)
    console.info(res.data);
    if (res.data && res.data.data instanceof Array) {
        res.data.data.forEach((i) => __awaiter(void 0, void 0, void 0, function* () {
            const resd = yield demo.data(GankService_1.CategoryType.girl, i.type, 0, 3);
            console.info(resd.data);
        }));
    }
}))();
