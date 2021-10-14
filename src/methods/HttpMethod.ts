
const isLogOpen = false

const logger: any = (() => {
    if (isLogOpen) {
        return console
    } else {
        return { log: () => { }, info: () => { }, error: () => { } }
    }
})()

interface IDataTargetMethod {
    knict?: any
}

interface IFunctionAnnotation {
    (targetMethod: IDataTargetMethod, propertyKey: string): any
}


interface IFunctionAnnotationRes {
    (target: any, propertyKey: string, descriptor: PropertyDescriptor): void
}

function BaseAnotaionForFunction(f?: IFunctionAnnotation): IFunctionAnnotationRes {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        let targetMethod = target[propertyKey]
        if (targetMethod !== undefined && targetMethod instanceof Function) {
            f && f(targetMethod, propertyKey)
        } else {
            throw new Error('anotaionForFunction error')
        }
    }
}
function GET(url: string): IFunctionAnnotationRes {
    return BaseAnotaionForFunction((targetMethod: IDataTargetMethod, propertyKey: string) => {
        targetMethod.knict = {
            ...targetMethod.knict,
            url: url,
            name: propertyKey,
            http: {
                method: 'GET'
            }
        }
    })
}

enum PostType {
    urlencoded = 'x-www-form-urlencoded',
    // TODO: 
}

function POST(url: string, type: PostType = PostType.urlencoded) {
    logger.log('Knict POST(): evaluated')
    return BaseAnotaionForFunction((targetMethod: IDataTargetMethod, propertyKey: string) => {
        targetMethod.knict = {
            ...targetMethod.knict,
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

function PostData(name: string) {
    logger.log('Knict PostData() : evaluated')
    return function (target: any, propertyKey: string | symbol, parameterIndex: number) {
        let targetMethod = target[propertyKey]
        if (targetMethod !== undefined && targetMethod instanceof Function) {
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
        }
        logger.log('Knict PostData(): called', target, propertyKey, parameterIndex)
    }
}


function Path(path: string) {
    logger.log('Knict Path() : evaluated')
    return function (target: any, propertyKey: string | symbol, parameterIndex: number) {
        let targetMethod = target[propertyKey]
        if (targetMethod !== undefined && targetMethod instanceof Function) {
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
        }
        logger.log('Knict Path(): called', target, propertyKey, parameterIndex)
    }
}

const OnUnsupport = (() => Promise.reject('Unsupport'))


declare interface Response<T = any> {
    data: T;
    status: number;
    statusText: string;
    headers: any;
    request?: any;
}
export { GET, Path, POST, PostData, OnUnsupport, Response, PostType }