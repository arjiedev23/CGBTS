import { ContributionsService } from './contributions.service';
import { CreateContributionDto } from './dto/create-contribution.dto';
import { UpdateContributionDto } from './dto/update-contribution.dto';
export declare class ContributionsController {
    private readonly contributionsService;
    constructor(contributionsService: ContributionsService);
    create(createContributionDto: CreateContributionDto): Promise<{
        respCode: number;
        respMessage: string;
        data?: undefined;
    } | {
        respCode: number;
        respMessage: string;
        data: any;
    }>;
    findAll(): Promise<{
        contribution_id: number;
        amount: import("@prisma/client/runtime/library").Decimal;
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
        totalContributions: number;
        contributions: {
            contribution_id: number;
            amount: import("@prisma/client/runtime/library").Decimal;
            post_date: Date;
            status: string;
            userID: number;
            agency_id: number;
        }[];
        respMessage?: undefined;
    }>;
    updateContri(id: string, updateContributionDto: UpdateContributionDto): Promise<{
        contribution_id: number;
        amount: import("@prisma/client/runtime/library").Decimal;
        post_date: Date;
        status: string;
        userID: number;
        agency_id: number;
    }>;
}
