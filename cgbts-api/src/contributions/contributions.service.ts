import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { CreateContributionDto } from './dto/create-contribution.dto';

@Injectable()
export class ContributionsService {
  constructor(private readonly prismaService: PrismaService) {}
  async createContribution(createContributionDto: CreateContributionDto) {
    try {
      const checkUser = await this.prismaService.users.findUnique({
        where: {
          userID: createContributionDto.userID,
        },
      });

      const checkAgency =
        await this.prismaService.agency_information.findUnique({
          where: {
            agency_id: createContributionDto.agency_id,
          },
        });

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
      console.log(checkContri.length);

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

  async getContributions(user: number, agency: number) {
    try {
      if (user.toString().length === 0 || agency.toString().length === 0) {
        return { respCode: 0, respMessage: 'Something went wrong!' };
      }

      const res = await this.userContributions(Number(user), Number(agency));
      const count = res.length;

      if (res.length === 0) {
        return { respCode: 0, respMessage: 'No data found!' };
      }

      return {
        respCode: 1,
        respMesssage: 'success',
        totalContributions: count,
        contributions: res,
      };
    } catch (ex) {
      throw new Error(ex);
    }
  }

  async userContributions(userid: number, agencyid: number) {
    try {
      const data = await this.prismaService.contributions.findMany({
        where: {
          userID: userid,
          agency_id: agencyid,
        },
      });

      return data;
    } catch (ex) {
      throw new Error();
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

  async createContri(data: CreateContributionDto): Promise<any> {
    try {
      const pDate = data.post_date.toISOString();
      const addContri = this.prismaService.contributions.create({
        data: {
          amount: data.amount,
          post_date: pDate,
          status: data.status,
          userID: data.userID,
          agency_id: data.agency_id,
        },
      });

      return addContri;
    } catch (err) {
      throw new Error(err);
    }
  }
}
