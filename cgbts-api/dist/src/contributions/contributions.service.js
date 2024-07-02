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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContributionsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ContributionsService = class ContributionsService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async createContribution(createContributionDto) {
        try {
            const postDate = new Date(createContributionDto.post_date);
            const pDate = postDate.toISOString();
            const res = await this.prismaService.contributions.create({
                data: {
                    amount: createContributionDto.amount,
                    post_date: pDate,
                    status: createContributionDto.status,
                    userID: createContributionDto.userID,
                    agency_id: createContributionDto.agency_id,
                },
            });
            return res;
        }
        catch (ex) {
            throw new Error(ex);
        }
    }
    async contributionAll() {
        try {
            return await this.prismaService.contributions.findMany();
        }
        catch (ex) {
            throw new Error(ex);
        }
    }
    async getContributions(id) {
        try {
            if (id === null) {
                return { respCode: 0, respMessage: 'Something went wrong!' };
            }
            return await this.prismaService.contributions.findMany({
                where: {
                    contribution_id: id,
                },
            });
        }
        catch (ex) {
            throw new Error(ex);
        }
    }
    async updateContri(id, updateContributionDto) {
        try {
            return await this.prismaService.contributions.update({
                where: {
                    contribution_id: id,
                },
                data: updateContributionDto,
            });
        }
        catch (ex) {
            throw new Error(ex);
        }
    }
    async remove(id) {
        return `This action removes a #${id} contribution`;
    }
};
exports.ContributionsService = ContributionsService;
exports.ContributionsService = ContributionsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ContributionsService);
//# sourceMappingURL=contributions.service.js.map