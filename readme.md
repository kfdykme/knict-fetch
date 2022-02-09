# knict-fetch

基于axios， 尝试让fetch 更清晰

# How to use

## 0. create you node project 

``` bash
mkdir my-fetch-project
cd my-fetch-project
npm init 
```

## 1. add to your project

``` bash

npm install knict-fetch 

# or yarn add knict-fetch
```

## 2. set up typescrit

``` bash
# make sure you can use tsc  
npm install -g tsc 

# generate a tsconfig.json 
tsc --init
```

## 3. edit tsconfig.json

修改tsconfig.json的以下字段， 其余保持不变

``` json

{
  "compilerOptions": {
    "module": "commonjs",
    "target": "es6", 
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
  }
}
```

## 4. create files with content

### 4.1 GithubService.ts

``` typescript 
import { HttpMethod } from 'knict-fetch'

const { GET, Path } = HttpMethod

const UnSupportPromise = () => {
    return Promise.resolve("Not Support")
}
export class GitHubService {

    @GET("/users/{user}/repos")
    repos(@Path('user') user: string): Promise<any> {
        return UnSupportPromise()
    }
}
```

### 4.2 index.ts
``` typescript
import { Knict, FetchClientBuilder } from 'knict-fetch'

import { GitHubService } from './GitHubService'


(async () => {

    const demo = Knict.builder(new FetchClientBuilder()
        .baseUrl('https://api.github.com')
    ).create(new GitHubService())

    let res:any = await demo.repos("yourusername").catch(console.error);
    console.info('repos result res', res)
    
})()
```

### 5 test knict-fetch

``` bash
tsc && node index.js
```