// const { Knict, FetchClientBuilder, FetchDemoService} = require('../dist/index')
// const A = require('../dist/index')

import { Knict, FetchClientBuilder, HttpMethod } from '../index'

import { GankService, CategoryType } from './service/GankService'


(async () => {

    const demo = Knict.builder(new FetchClientBuilder()
        // .baseUrl('https://api.github.com/')
        .baseUrl('https://gank.io/api/v2')
    ).create(new GankService())

    let res:any = await demo.bannersAsStream()
    // console.info('stream result res', res.data)
    res.data.on('data', (data: any) => {
        console.info('on stream data: ', data + '')
    })

    // console.info(res.data)
    console.info(CategoryType)
    // res = await demo.categories(CategoryType.article)
    // console.info(res.data)
    res = await demo.categories(CategoryType.girl)
    // console.info(res.data)
    // res = await demo.categories(CategoryType.girl)
    console.info(res.data)
    if (res.data && res.data.data instanceof Array) {
        res.data.data.forEach(async (i: any) => {
            const resd = await demo.data(CategoryType.girl, i.type, 0, 3)
            console.info(resd.data)
        })
    }
})()
