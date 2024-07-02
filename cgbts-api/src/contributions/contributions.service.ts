import { Injectable } from '@nestjs/common';
import { CreateContributionDto } from './dto/create-contribution.dto';
import { UpdateContributionDto } from './dto/update-contribution.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ContributionsService {
  constructor(private readonly prismaService: PrismaService) {}
  create(createContributionDto: CreateContributionDto) {
    return 'This action adds a new contribution';
  }

  findAll() {
    return `This action returns all contributions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} contribution`;
  }

  update(id: number, updateContributionDto: UpdateContributionDto) {
    return `This action updates a #${id} contribution`;
  }

  remove(id: number) {
    return `This action removes a #${id} contribution`;
  }
}
