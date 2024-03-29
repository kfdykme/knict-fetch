import { BaseAnotaionForFunction, BaseAnotaionForParam } from 'knict'
import { ResponseType as AxiosResponseType } from 'axios'
const isLogOpen = false

const logger: any = (() => {
    if (isLogOpen) {
        return console
    } else {
        return { log: () => { }, info: () => { }, error: () => { } }
    }
})()

function GET(url: string) {
    return BaseAnotaionForFunction((targetMethod, propertyKey: string) => {
        targetMethod.knict = {
            ...targetMethod.knict,
            url: url,
            name: propertyKey,
        }

        if (!targetMethod.knict.http) {
            targetMethod.knict.http = new Object()
        }
        targetMethod.knict.http.method = 'GET'
    })
}

/**
 * Change ResponseType
 */
function ResponseType(type: AxiosResponseType) {
    return BaseAnotaionForFunction(() => {
        return {
            http: {
                responseType: type
            }
        }
    })
}

function Headers(headers: any) {
    return BaseAnotaionForFunction(() => {
        return {
            http: {
                headers
            }
        }
    })
}

enum PostType {
    urlencoded = 'x-www-form-urlencoded',
    multipartformdata = 'multipart/form-data'
    // TODO: 
}

function POST(url: string, type: PostType = PostType.urlencoded) {
    logger.log('Knict POST(): evaluated')
    return BaseAnotaionForFunction((targetMethod, propertyKey: string) => {
        return {
            url: url,
            name: propertyKey,
            http: {
                method: 'POST',
                type: type,
                data: {

                }
            }
        }
    })
}

function PostFile() {
    logger.log('Knict PostFile')
    return BaseAnotaionForParam((targetMethod, propertyKey: string | symbol, parameterIndex: number) => {
        return {
           data: {
               postFile: parameterIndex
           }
        }
    });
}

function PostData(name: string) {
    logger.log('Knict PostData() : evaluated')

    return BaseAnotaionForParam((targetMethod, propertyKey: string | symbol, parameterIndex: number) => {
        targetMethod.knict = {
            ...targetMethod.knict
        }
        if (targetMethod.knict.data == undefined) {
            targetMethod.knict.data = new Object()
        }
        if (targetMethod.knict.data.post == undefined) {
            targetMethod.knict.data.post = new Object()
        }
        targetMethod.knict.data.post[name] = parameterIndex
        
    })
}


function Path(path: string) {
    logger.log('Knict Path() : evaluated')

    return BaseAnotaionForParam((targetMethod, propertyKey: string | symbol, parameterIndex: number) => {
        targetMethod.knict = {
            ...targetMethod.knict
        }
        if (targetMethod.knict.data == undefined) {
            targetMethod.knict.data = new Object()
        }
        if (targetMethod.knict.data.path == undefined) {
            targetMethod.knict.data.path = new Object()
        }
        targetMethod.knict.data.path[path] = parameterIndex
    })
}

const OnUnsupport = () => {
    return Promise.reject('NOT IMPL')}


declare interface Response<T = any> {
    data: T;
    status: number;
    statusText: string;
    headers: any;
    request?: any;
}
export { GET, Path, POST, PostData, OnUnsupport, Response, PostType, ResponseType, Headers, PostFile }