import { ContributionsService } from './contributions.service';
import { CreateContributionDto } from './dto/create-contribution.dto';
import { UpdateContributionDto } from './dto/update-contribution.dto';
export declare class ContributionsController {
    private readonly contributionsService;
    constructor(contributionsService: ContributionsService);
    create(createContributionDto: CreateContributionDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateContributionDto: UpdateContributionDto): string;
    remove(id: string): string;
}
