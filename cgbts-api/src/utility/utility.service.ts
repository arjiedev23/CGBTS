import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UtilityService {
  constructor(private readonly prismaService: PrismaService) {}

  async findUser(user: number): Promise<any> {
    try {
      const userCheck = this.prismaService.users.findFirst({
        where: {
          userID: Number(user),
        },
      });

      return userCheck;
    } catch (ex) {
      throw new Error(ex);
    }
  }

  async findAgency(agencyId: number): Promise<any> {
    try {
      const agency = this.prismaService.agency_information.findUnique({
        where: {
          agency_id: agencyId,
        },
      });

      return agency;
    } catch (ex) {
      throw new Error(ex);
    }
  }

  async checkIsVerified(userId: number): Promise<any> {
    try {
      const isVerified = this.prismaService.users.findUnique({
        where: {
          userID: userId,
        },
      });

      if ((await isVerified).isVerified === 0) {
        return null;
      }

      return isVerified;
    } catch (ex) {
      throw new Error(ex);
    }
  }
}
