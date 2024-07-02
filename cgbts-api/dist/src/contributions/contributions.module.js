"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContributionsModule = void 0;
const common_1 = require("@nestjs/common");
const contributions_service_1 = require("./contributions.service");
const contributions_controller_1 = require("./contributions.controller");
const prisma_module_1 = require("../prisma/prisma.module");
let ContributionsModule = class ContributionsModule {
};
exports.ContributionsModule = ContributionsModule;
exports.ContributionsModule = ContributionsModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule],
        controllers: [contributions_controller_1.ContributionsController],
        providers: [contributions_service_1.ContributionsService],
    })
], ContributionsModule);
//# sourceMappingURL=contributions.module.js.map