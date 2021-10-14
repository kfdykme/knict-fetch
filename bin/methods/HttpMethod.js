"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostType = exports.OnUnsupport = exports.PostData = exports.POST = exports.Path = exports.GET = void 0;
const isLogOpen = false;
const logger = (() => {
    if (isLogOpen) {
        return console;
    }
    else {
        return { log: () => { }, info: () => { }, error: () => { } };
    }
})();
function BaseAnotaionForFunction(f) {
    return function (target, propertyKey, descriptor) {
        let targetMethod = target[propertyKey];
        if (targetMethod !== undefined && targetMethod instanceof Function) {
            f && f(targetMethod, propertyKey);
        }
        else {
            throw new Error('anotaionForFunction error');
        }
    };
}
function GET(url) {
    return BaseAnotaionForFunction((targetMethod, propertyKey) => {
        targetMethod.knict = Object.assign(Object.assign({}, targetMethod.knict), { url: url, name: propertyKey, http: {
                method: 'GET'
            } });
    });
}
exports.GET = GET;
var PostType;
(function (PostType) {
    PostType["urlencoded"] = "x-www-form-urlencoded";
    // TODO: 
})(PostType || (PostType = {}));
exports.PostType = PostType;
function POST(url, type = PostType.urlencoded) {
    logger.log('Knict POST(): evaluated');
    return BaseAnotaionForFunction((targetMethod, propertyKey) => {
        targetMethod.knict = Object.assign(Object.assign({}, targetMethod.knict), { url: url, name: propertyKey, http: {
                method: 'POST',
                type: type,
                data: {}
            } });
    });
}
exports.POST = POST;
function PostData(name) {
    logger.log('Knict PostData() : evaluated');
    return function (target, propertyKey, parameterIndex) {
        let targetMethod = target[propertyKey];
        if (targetMethod !== undefined && targetMethod instanceof Function) {
            targetMethod.knict = Object.assign({}, targetMethod.knict);
            if (targetMethod.knict.data == undefined) {
                targetMethod.knict.data = new Object();
            }
            if (targetMethod.knict.data.post == undefined) {
                targetMethod.knict.data.post = new Object();
            }
            targetMethod.knict.data.post[name] = parameterIndex;
        }
        logger.log('Knict PostData(): called', target, propertyKey, parameterIndex);
    };
}
exports.PostData = PostData;
function Path(path) {
    logger.log('Knict Path() : evaluated');
    return function (target, propertyKey, parameterIndex) {
        let targetMethod = target[propertyKey];
        if (targetMethod !== undefined && targetMethod instanceof Function) {
            targetMethod.knict = Object.assign({}, targetMethod.knict);
            if (targetMethod.knict.data == undefined) {
                targetMethod.knict.data = new Object();
            }
            if (targetMethod.knict.data.path == undefined) {
                targetMethod.knict.data.path = new Object();
            }
            targetMethod.knict.data.path[path] = parameterIndex;
        }
        logger.log('Knict Path(): called', target, propertyKey, parameterIndex);
    };
}
exports.Path = Path;
const OnUnsupport = (() => Promise.reject('Unsupport'));
exports.OnUnsupport = OnUnsupport;
