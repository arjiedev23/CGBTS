import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private readonly prismaService: PrismaService) {}

  async notification(user: number) {
    try {
      const res = await this.prismaService.contributions.findMany({
        where: {
          userID: user,
        },
      });

      return res;
    } catch (ex) {
      throw new Error(ex);
    }
  }
}
