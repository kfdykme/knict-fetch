"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpMethod = exports.FetchClientBuilder = exports.FetchDemoService = exports.Knict = void 0;
// const KnictM = require('knict').default
const FetchClientBuilder_1 = require("./client/FetchClientBuilder");
Object.defineProperty(exports, "FetchClientBuilder", { enumerable: true, get: function () { return FetchClientBuilder_1.FetchClientBuilder; } });
const FetchDemoService_1 = require("./demo/FetchDemoService");
Object.defineProperty(exports, "FetchDemoService", { enumerable: true, get: function () { return FetchDemoService_1.FetchDemoService; } });
const HttpMethod = require("./methods/HttpMethod");
exports.HttpMethod = HttpMethod;
const knict_1 = require("knict");
Object.defineProperty(exports, "Knict", { enumerable: true, get: function () { return knict_1.Knict; } });
