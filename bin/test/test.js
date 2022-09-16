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
try {
    (() => __awaiter(void 0, void 0, void 0, function* () {
        const demo = index_1.Knict.builder(new index_1.FetchClientBuilder()
            // .baseUrl('https://api.github.com/')
            .baseUrl('http://9.135.18.111:5174')).create(new GankService_1.GankService());
        // let res:any = await demo.bannersAsStream()
        // // console.info('stream result res', res.data)
        // res.data.on('data', (data: any) => {
        //     console.info('on stream data: ', data + '')
        // })
        // // console.info(res.data)
        // console.info(CategoryType)
        // // res = await demo.categories(CategoryType.article)
        // // console.info(res.data)
        // res = await demo.categories(CategoryType.girl)
        // // console.info(res.data)
        // // res = await demo.categories(CategoryType.girl)
        // console.info(res.data)
        // if (res.data && res.data.data instanceof Array) {
        //     res.data.data.forEach(async (i: any) => {
        //         const resd = await demo.data(CategoryType.girl, i.type, 0, 3)
        //         console.info(resd.data)
        //     })
        // } 
        demo.home()
            .then(res => {
            console.info(res.data);
            demo.uploadFile({ name: 'a' });
            // .catch((err) => {
            //     console.error(err)
            // })
        })
            .catch(console.error);
    }))();
}
catch (err) {
    console.error(err);
}
