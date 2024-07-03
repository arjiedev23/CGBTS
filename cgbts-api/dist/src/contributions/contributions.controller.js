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
exports.ContributionsController = void 0;
const common_1 = require("@nestjs/common");
const contributions_service_1 = require("./contributions.service");
const create_contribution_dto_1 = require("./dto/create-contribution.dto");
const update_contribution_dto_1 = require("./dto/update-contribution.dto");
const auth_guard_1 = require("../auth/auth.guard");
let ContributionsController = class ContributionsController {
    constructor(contributionsService) {
        this.contributionsService = contributionsService;
    }
    create(createContributionDto) {
        return this.contributionsService.createContribution(createContributionDto);
    }
    findAll() {
        return this.contributionsService.contributionAll();
    }
    getContributions(user, agency) {
        return this.contributionsService.getContributions(user, agency);
    }
    updateContri(id, updateContributionDto) {
        return this.contributionsService.updateContri(+id, updateContributionDto);
    }
};
exports.ContributionsController = ContributionsController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_contribution_dto_1.CreateContributionDto]),
    __metadata("design:returntype", void 0)
], ContributionsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(auth_guard_1.JwtAuthGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ContributionsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('/getContribution'),
    (0, common_1.UseGuards)(auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Query)('userid')),
    __param(1, (0, common_1.Query)('agencyid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], ContributionsController.prototype, "getContributions", null);
__decorate([
    (0, common_1.Patch)('updateContri/:id'),
    (0, common_1.UseGuards)(auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_contribution_dto_1.UpdateContributionDto]),
    __metadata("design:returntype", void 0)
], ContributionsController.prototype, "updateContri", null);
exports.ContributionsController = ContributionsController = __decorate([
    (0, common_1.Controller)('contributions'),
    __metadata("design:paramtypes", [contributions_service_1.ContributionsService])
], ContributionsController);
//# sourceMappingURL=contributions.controller.js.map