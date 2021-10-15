"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const isLogOpen = true;
const logger = (() => {
    if (isLogOpen) {
        return console;
    }
    else {
        return { log: () => { }, info: () => { }, error: () => { } };
    }
})();
exports.logger = logger;
