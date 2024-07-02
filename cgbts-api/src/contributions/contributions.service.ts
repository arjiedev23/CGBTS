import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { CreateContributionDto } from './dto/create-contribution.dto';

@Injectable()
export class ContributionsService {
  constructor(private readonly prismaService: PrismaService) {}
  async createContribution(createContributionDto: CreateContributionDto) {
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
    } catch (ex) {
      throw new Error(ex);
    }
  }

  async contributionAll() {
    try {
      return await this.prismaService.contributions.findMany();
    } catch (ex) {
      throw new Error(ex);
    }
  }

  async getContributions(id: number) {
    try {
      if (id === null) {
        return { respCode: 0, respMessage: 'Something went wrong!' };
      }

      const res = await this.prismaService.contributions.findMany({
        where: {
          contribution_id: id,
        },
      });

      if (res.length === 0) {
        return { respCode: 0, respMessage: 'No data found!' };
      }

      return res;
    } catch (ex) {
      throw new Error(ex);
    }
  }

  async updateContri(
    id: number,
    updateContributionDto: Prisma.contributionsUpdateInput,
  ) {
    try {
      return await this.prismaService.contributions.update({
        where: {
          contribution_id: id,
        },
        data: updateContributionDto,
      });
    } catch (ex) {
      throw new Error(ex);
    }
  }
}
