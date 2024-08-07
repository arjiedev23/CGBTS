import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { CreateContributionDto } from './dto/create-contribution.dto';
import { UtilityService } from 'src/utility/utility.service';
export declare class ContributionsService {
    private readonly prismaService;
    private readonly utilityService;
    constructor(prismaService: PrismaService, utilityService: UtilityService);
    createContribution(createContributionDto: CreateContributionDto): Promise<{
        respCode: number;
        respMessage: string;
        data?: undefined;
    } | {
        respCode: number;
        respMessage: string;
        data: any;
    }>;
    contributionAll(): Promise<{
        contribution_id: number;
        amount: Prisma.Decimal;
        post_date: Date;
        status: string;
        userID: number;
        agency_id: number;
    }[]>;
    getContributions(user: number): Promise<{
        respCode: number;
        respMessage: string;
        respMesssage?: undefined;
        totalContributions?: undefined;
        contributions?: undefined;
    } | {
        respCode: number;
        respMesssage: string;
        totalContributions: any;
        contributions: any;
        respMessage?: undefined;
    }>;
    userContributions(userid: number): Promise<any>;
    updateContri(id: number, updateContributionDto: Prisma.contributionsUpdateInput): Promise<{
        contribution_id: number;
        amount: Prisma.Decimal;
        post_date: Date;
        status: string;
        userID: number;
        agency_id: number;
    }>;
    getLastUpdate(userId: number, agencyId: number): Promise<any>;
    createContri(data: CreateContributionDto): Promise<any>;
    getUserContribution(userId: number, agency: string, postDate: string): Promise<any>;
}
