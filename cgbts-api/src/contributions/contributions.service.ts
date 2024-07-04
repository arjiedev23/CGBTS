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
      const monthYear =
        getMonthName(data.post_date.getMonth() + 1) +
        ' ' +
        data.post_date.getFullYear();
      const addContri = this.prismaService.contributions.create({
        data: {
          amount: data.amount,
          post_date: pDate,
          status: data.status,
          userID: data.userID,
          agency_id: data.agency_id,
          notifications: {
            create: {
              message:
                'Your contribution payment for the applicable month of ' +
                monthYear +
                ' amounting to ' +
                data.amount +
                ' has been posted',
              is_read: 0,
              user_id: data.userID,
            },
          },
        },
        include: {
          notifications: true,
        },
      });

      return addContri;
    } catch (err) {
      throw new Error(err);
    }
  }
}

function getMonthName(monthNumber: number): string {
  switch (monthNumber) {
    case 1:
      return 'Jan';
    case 2:
      return 'Feb';
    case 3:
      return 'Mar';
    case 4:
      return 'Apr';
    case 5:
      return 'May';
    case 6:
      return 'Jun';
    case 7:
      return 'Jul';
    case 8:
      return 'Aug';
    case 9:
      return 'Sep';
    case 10:
      return 'Oct';
    case 11:
      return 'Nov';
    case 12:
      return 'Dec';
    default:
      return 'Invalid month number';
  }
}
