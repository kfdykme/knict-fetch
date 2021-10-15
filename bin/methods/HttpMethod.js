"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseType = exports.PostType = exports.OnUnsupport = exports.PostData = exports.POST = exports.Path = exports.GET = void 0;
const knict_1 = require("knict");
const isLogOpen = false;
const logger = (() => {
    if (isLogOpen) {
        return console;
    }
    else {
        return { log: () => { }, info: () => { }, error: () => { } };
    }
})();
function GET(url) {
    return (0, knict_1.BaseAnotaionForFunction)((targetMethod, propertyKey) => {
        targetMethod.knict = Object.assign(Object.assign({}, targetMethod.knict), { url: url, name: propertyKey });
        if (!targetMethod.knict.http) {
            targetMethod.knict.http = new Object();
        }
        targetMethod.knict.http.method = 'GET';
    });
}
exports.GET = GET;
/**
 * Change ResponseType
 */
function ResponseType(type) {
    return (0, knict_1.BaseAnotaionForFunction)(() => {
        return {
            http: {
                responseType: type
            }
        };
    });
}
exports.ResponseType = ResponseType;
var PostType;
(function (PostType) {
    PostType["urlencoded"] = "x-www-form-urlencoded";
    // TODO: 
})(PostType || (PostType = {}));
exports.PostType = PostType;
function POST(url, type = PostType.urlencoded) {
    logger.log('Knict POST(): evaluated');
    return (0, knict_1.BaseAnotaionForFunction)((targetMethod, propertyKey) => {
        return {
            url: url,
            name: propertyKey,
            http: {
                method: 'POST',
                type: type,
                data: {}
            }
        };
    });
}
exports.POST = POST;
function PostData(name) {
    logger.log('Knict PostData() : evaluated');
    return (0, knict_1.BaseAnotaionForParam)((targetMethod, propertyKey, parameterIndex) => {
        targetMethod.knict = Object.assign({}, targetMethod.knict);
        if (targetMethod.knict.data == undefined) {
            targetMethod.knict.data = new Object();
        }
        if (targetMethod.knict.data.post == undefined) {
            targetMethod.knict.data.post = new Object();
        }
        targetMethod.knict.data.post[name] = parameterIndex;
    });
}
exports.PostData = PostData;
function Path(path) {
    logger.log('Knict Path() : evaluated');
    return (0, knict_1.BaseAnotaionForParam)((targetMethod, propertyKey, parameterIndex) => {
        targetMethod.knict = Object.assign({}, targetMethod.knict);
        if (targetMethod.knict.data == undefined) {
            targetMethod.knict.data = new Object();
        }
        if (targetMethod.knict.data.path == undefined) {
            targetMethod.knict.data.path = new Object();
        }
        targetMethod.knict.data.path[path] = parameterIndex;
    });
}
exports.Path = Path;
const OnUnsupport = (() => Promise.reject('Unsupport'));
exports.OnUnsupport = OnUnsupport;
