"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const prisma_module_1 = require("./prisma/prisma.module");
const users_module_1 = require("./users/users.module");
const contributions_module_1 = require("./contributions/contributions.module");
const auth_module_1 = require("./auth/auth.module");
const dashboard_module_1 = require("./dashboard/dashboard.module");
const benefit_claims_module_1 = require("./benefit-claims/benefit-claims.module");
const faq_module_1 = require("./faq/faq.module");
const utility_service_1 = require("./utility/utility.service");
const utility_module_1 = require("./utility/utility.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            prisma_module_1.PrismaModule,
            users_module_1.UsersModule,
            contributions_module_1.ContributionsModule,
            auth_module_1.AuthModule,
            dashboard_module_1.DashboardModule,
            benefit_claims_module_1.BenefitClaimsModule,
            faq_module_1.FaqModule,
            utility_module_1.UtilityModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, utility_service_1.UtilityService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map