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
const utility_service_1 = require("../utility/utility.service");
let ContributionsService = class ContributionsService {
    constructor(prismaService, utilityService) {
        this.prismaService = prismaService;
        this.utilityService = utilityService;
    }
    async createContribution(createContributionDto) {
        try {
            const checkUser = await this.utilityService.findUser(createContributionDto.userID);
            const checkAgency = await this.utilityService.findAgency(createContributionDto.agency_id);
            if (!checkAgency) {
                return { respCode: 0, respMessage: 'Agency not found!' };
            }
            if (!checkUser) {
                return { respCode: 0, respMessage: 'User not found!' };
            }
            const postDate = new Date(createContributionDto.post_date);
            const getMonth = postDate.getMonth() + 1;
            const getYear = postDate.getFullYear();
            const checkContri = await this.prismaService.contributions.findMany({
                where: {
                    post_date: {
                        gte: new Date(getYear, getMonth - 1, 1),
                        lt: new Date(getYear, getMonth, 1),
                    },
                    agency_id: createContributionDto.agency_id,
                    userID: createContributionDto.userID,
                },
            });
            if (checkContri.length != 0) {
                return {
                    respCode: 0,
                    respMessage: 'Contribution month posting already exist!',
                };
            }
            const res = await this.createContri({
                amount: createContributionDto.amount,
                post_date: postDate,
                status: createContributionDto.status,
                userID: createContributionDto.userID,
                agency_id: createContributionDto.agency_id,
            });
            return {
                respCode: 1,
                respMessage: 'Contribution successfully added.',
                data: res,
            };
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
    async getContributions(user) {
        try {
            if (user.toString().length === 0) {
                return { respCode: 0, respMessage: 'Something went wrong!' };
            }
            const checkUser = await this.utilityService.findUser(user);
            if (!checkUser) {
                return { respCode: 0, respMessage: 'User not found!' };
            }
            const res = await this.userContributions(Number(user));
            if (res === 404) {
                return { respCode: 0, respMessage: 'No contribution' };
            }
            if (res === null) {
                return { respCode: 0, respMessage: 'No existing contribution!' };
            }
            if (res.respCode === 30) {
                return { respCode: 0, respMessage: 'No existing contribution!' };
            }
            const count = res.length;
            return {
                respCode: 1,
                respMesssage: 'success',
                totalContributions: count,
                contributions: res,
            };
        }
        catch (ex) {
            throw new Error(ex);
        }
    }
    async userContributions(userid) {
        try {
            let sssTotal = 0;
            let pagibigTotal = 0;
            let philhealthTotal = 0;
            const contList = [];
            const hireDate = await this.prismaService.contributions.findFirst({
                where: {
                    userID: userid,
                },
                select: {
                    post_date: true,
                },
                orderBy: {
                    post_date: 'asc',
                },
            });
            if (!hireDate) {
                return 404;
            }
            const latestSSS = await this.getLastUpdate(userid, Number(process.env.CGBTS_SSS));
            const latestPagibig = await this.getLastUpdate(userid, Number(process.env.CGBTS_PAGIBIG));
            const latestPhilhealth = await this.getLastUpdate(userid, Number(process.env.CGBTS_PHILHEALTH));
            console.log(latestSSS + ' ' + latestPagibig + ' ' + latestPhilhealth);
            const getPostMonth = getMonthsAndYears(hireDate.post_date.toString());
            const postMonth = getPostMonth.length;
            const data = await this.prismaService.contributions.findMany({
                where: {
                    userID: userid,
                },
                select: {
                    post_date: true,
                },
            });
            if (data.length === 0) {
                return null;
            }
            for (let i = 0; i <= postMonth - 1; i++) {
                const sss = await this.getUserContribution(userid, process.env.CGBTS_SSS, getPostMonth[i]);
                const pagibig = await this.getUserContribution(userid, process.env.CGBTS_PAGIBIG, getPostMonth[i]);
                const philhealth = await this.getUserContribution(userid, process.env.CGBTS_PHILHEALTH, getPostMonth[i]);
                sssTotal = sssTotal + Number(sss);
                pagibigTotal = pagibigTotal + Number(pagibig);
                philhealthTotal = philhealthTotal + Number(philhealth);
                const totalContri = Number(sss) + Number(pagibig) + Number(philhealth);
                const [monthStr, yearStr] = getPostMonth[i].split('/');
                const postMonth = parseInt(monthStr, 10);
                const postYear = parseInt(yearStr, 10);
                contList.push({
                    post_month: getMonthName(postMonth) + ' ' + postYear,
                    sss: sss,
                    pagibig: pagibig,
                    philhealth: philhealth,
                    totalContribution: totalContri,
                });
            }
            return {
                sss: {
                    total: sssTotal,
                    lastUpdate: latestSSS === null ? '' : latestSSS.post_date,
                },
                pagibig: {
                    total: pagibigTotal,
                    lastUpdate: latestPagibig === null ? '' : latestPagibig.post_date,
                },
                philhealth: {
                    total: philhealthTotal,
                    lastUpdate: latestPhilhealth === null ? '' : latestPhilhealth.post_date,
                },
                totalContributions: data.length,
                contributions: contList,
            };
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
    async getLastUpdate(userId, agencyId) {
        try {
            const update = this.prismaService.contributions.findFirst({
                where: {
                    userID: userId,
                    agency_id: agencyId,
                },
                select: {
                    post_date: true,
                },
                orderBy: {
                    post_date: 'desc',
                },
            });
            return update;
        }
        catch (ex) {
            throw new Error();
        }
    }
    async createContri(data) {
        try {
            const pDate = data.post_date.toISOString();
            const monthYear = getMonthName(data.post_date.getMonth() + 1) +
                ' ' +
                data.post_date.getFullYear();
            const addContri = this.prismaService.contributions.create({
                data: {
                    amount: data.amount,
                    post_date: pDate,
                    status: data.status,
                    userID: data.userID,
                    agency_id: data.agency_id,
                    notifications: {
                        create: {
                            message: 'Your contribution payment for the applicable month of ' +
                                monthYear +
                                ' amounting to ' +
                                data.amount +
                                ' has been posted',
                            is_read: 0,
                            user_id: data.userID,
                            agency_id: data.agency_id,
                        },
                    },
                },
                include: {
                    notifications: true,
                },
            });
            return addContri;
        }
        catch (err) {
            throw new Error(err);
        }
    }
    async getUserContribution(userId, agency, postDate) {
        try {
            const [monthStr, yearStr] = postDate.split('/');
            const month = parseInt(monthStr, 10);
            const year = parseInt(yearStr, 10);
            const userContri = await this.prismaService.contributions.findFirst({
                where: {
                    userID: userId,
                    agency_id: Number(agency),
                    post_date: {
                        gte: new Date(year, month - 1, 1),
                        lt: new Date(year, month, 1),
                    },
                },
                select: {
                    amount: true,
                },
            });
            const res = userContri === null ? 0 : userContri.amount;
            return res;
        }
        catch (err) {
            throw new Error();
        }
    }
};
exports.ContributionsService = ContributionsService;
exports.ContributionsService = ContributionsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        utility_service_1.UtilityService])
], ContributionsService);
const getMonthsAndYears = (givenDateTime) => {
    const createdDate = new Date(givenDateTime);
    createdDate.setDate(1);
    const currentDate = new Date();
    const dateAndYearList = [
        createdDate.toLocaleString('en', { month: '2-digit', year: 'numeric' }),
    ];
    while (createdDate.setMonth(createdDate.getMonth() + 1) < currentDate.getTime()) {
        dateAndYearList.unshift(createdDate.toLocaleString('en', { month: '2-digit', year: 'numeric' }));
    }
    return dateAndYearList;
};
const getMonthName = (monthNumber) => {
    switch (monthNumber) {
        case 1:
            return 'Jan';
        case 2:
            return 'Feb';
        case 3:
            return 'Mar';
        case 4:
            return 'Apr';
        case 5:
            return 'May';
        case 6:
            return 'Jun';
        case 7:
            return 'Jul';
        case 8:
            return 'Aug';
        case 9:
            return 'Sep';
        case 10:
            return 'Oct';
        case 11:
            return 'Nov';
        case 12:
            return 'Dec';
        default:
            return 'Invalid month number';
    }
};
//# sourceMappingURL=contributions.service.js.map