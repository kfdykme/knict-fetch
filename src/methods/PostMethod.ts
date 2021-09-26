
const isLogOpen = false

const logger: any = (() => {
    if (isLogOpen) {
        return console
    } else {
        return { log: () => { }, info: () => { }, error: () => { } }
    }
})()


function GET(url: string) {
    logger.log('Knict GET(): evaluated')
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        let targetMethod = target[propertyKey]
        if (targetMethod !== undefined && targetMethod instanceof Function) {
            targetMethod.knict = {
                ...targetMethod.knict,
                url: url,
                name: propertyKey,
                http: {
                    method: 'GET'
                }
            }
        }
        logger.log('Knict GET(): called', target, propertyKey, descriptor)
    }
}

function POST(url: string) {
    logger.log('Knict POST(): evaluated')
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        let targetMethod = target[propertyKey]
        if (targetMethod !== undefined && targetMethod instanceof Function) {
            targetMethod.knict = {
                ...targetMethod.knict,
                url: url,
                name: propertyKey,
                http: {
                    method: 'POST'
                }
            }
        }
        logger.log('Knict POST(): called', target, propertyKey, descriptor)
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
        console.log('Knict Path(): called', target, propertyKey, parameterIndex)
    }
}

export { GET, Path, POST }