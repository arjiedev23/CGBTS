import { ContributionsService } from './contributions.service';
import { CreateContributionDto } from './dto/create-contribution.dto';
import { UpdateContributionDto } from './dto/update-contribution.dto';
export declare class ContributionsController {
    private readonly contributionsService;
    constructor(contributionsService: ContributionsService);
    create(createContributionDto: CreateContributionDto): Promise<{
        contribution_id: number;
        amount: import("@prisma/client/runtime/library").Decimal;
        post_date: Date;
        status: string;
        userID: number;
        agency_id: number;
    }>;
    findAll(): Promise<{
        contribution_id: number;
        amount: import("@prisma/client/runtime/library").Decimal;
        post_date: Date;
        status: string;
        userID: number;
        agency_id: number;
    }[]>;
    getContributions(id: string): Promise<{
        contribution_id: number;
        amount: import("@prisma/client/runtime/library").Decimal;
        post_date: Date;
        status: string;
        userID: number;
        agency_id: number;
    }[] | {
        respCode: number;
        respMessage: string;
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
