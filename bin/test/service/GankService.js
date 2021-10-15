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
exports.GankService = exports.CategoryType = void 0;
const index_1 = require("../../index");
const { GET, Path, OnUnsupport, ResponseType } = index_1.HttpMethod;
var CategoryType;
(function (CategoryType) {
    CategoryType["article"] = "Article";
    CategoryType["ganhuo"] = "GanHuo";
    CategoryType["girl"] = "Girl";
})(CategoryType = exports.CategoryType || (exports.CategoryType = {}));
class GankService {
    banners() {
        return OnUnsupport();
    }
    bannersAsStream() {
        return OnUnsupport();
    }
    categories(categoryType) {
        return OnUnsupport();
    }
    data(CategoryType, type, page, count) {
        return OnUnsupport();
    }
}
__decorate([
    GET("/banners"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GankService.prototype, "banners", null);
__decorate([
    GET("/banners"),
    ResponseType('stream'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GankService.prototype, "bannersAsStream", null);
__decorate([
    GET("/categories/{category_type}"),
    __param(0, Path('category_type')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GankService.prototype, "categories", null);
__decorate([
    GET("/data/category/{category_type}/type/{type}/page/{page}/count/{count}"),
    __param(0, Path('category_type')),
    __param(1, Path('type')),
    __param(2, Path('page')),
    __param(3, Path('count')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Number, Number]),
    __metadata("design:returntype", Promise)
], GankService.prototype, "data", null);
exports.GankService = GankService;
