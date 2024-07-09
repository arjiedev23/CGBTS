import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { CreateContributionDto } from './dto/create-contribution.dto';
export declare class ContributionsService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
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
    getContributions(user: number, agency: number): Promise<{
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
    userContributions(userid: number, agencyid: number): Promise<any>;
    updateContri(id: number, updateContributionDto: Prisma.contributionsUpdateInput): Promise<{
        contribution_id: number;
        amount: Prisma.Decimal;
        post_date: Date;
        status: string;
        userID: number;
        agency_id: number;
    }>;
    createContri(data: CreateContributionDto): Promise<any>;
    getUserContribution(userId: number, agency: string, postDate: string): Promise<any>;
}
