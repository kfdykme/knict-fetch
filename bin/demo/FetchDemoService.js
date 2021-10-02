"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FetchDemoService = void 0;
const HttpMethod_1 = require("../methods/HttpMethod");
const onUnsupport = (() => Promise.reject('Unsupport'));
class FetchDemoService {
    // Call<List<Repo>> listRepos(@Path("user") String user);')
    github(user) { return onUnsupport(); }
}
__decorate([
    (0, HttpMethod_1.GET)('users/{user}/repos'),
    __param(0, (0, HttpMethod_1.Path)('user')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FetchDemoService.prototype, "github", null);
exports.FetchDemoService = FetchDemoService;
