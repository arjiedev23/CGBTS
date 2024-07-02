import { CreateContributionDto } from './dto/create-contribution.dto';
import { UpdateContributionDto } from './dto/update-contribution.dto';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class ContributionsService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    create(createContributionDto: CreateContributionDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateContributionDto: UpdateContributionDto): string;
    remove(id: number): string;
}
