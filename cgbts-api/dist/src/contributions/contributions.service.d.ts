import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { CreateContributionDto } from './dto/create-contribution.dto';
export declare class ContributionsService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    createContribution(createContributionDto: CreateContributionDto): Promise<{
        contribution_id: number;
        amount: Prisma.Decimal;
        post_date: Date;
        status: string;
        userID: number;
        agency_id: number;
    }>;
    contributionAll(): Promise<{
        contribution_id: number;
        amount: Prisma.Decimal;
        post_date: Date;
        status: string;
        userID: number;
        agency_id: number;
    }[]>;
    getContributions(id: number): Promise<{
        contribution_id: number;
        amount: Prisma.Decimal;
        post_date: Date;
        status: string;
        userID: number;
        agency_id: number;
    }[] | {
        respCode: number;
        respMessage: string;
    }>;
    updateContri(id: number, updateContributionDto: Prisma.contributionsUpdateInput): Promise<{
        contribution_id: number;
        amount: Prisma.Decimal;
        post_date: Date;
        status: string;
        userID: number;
        agency_id: number;
    }>;
}
