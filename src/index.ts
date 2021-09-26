// const KnictM = require('knict').default
import { FetchClientBuilder } from './client/FetchClientBuilder'
import { FetchDemoService } from './demo/FetchDemoService'

import { Knict } from 'knict'


(async () => {
    Knict.builder(new FetchClientBuilder().baseUrl('https://api.github.com/')) 
    const demo = Knict.create(new FetchDemoService()) 

    const res = await demo.github('kfdykme')
    
    // console.info(res.headers)
})()