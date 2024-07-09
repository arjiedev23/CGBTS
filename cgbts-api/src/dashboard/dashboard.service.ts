import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private readonly prismaService: PrismaService) {}

  async notification(user: number) {
    try {
      const res = await this.prismaService.notifications.findMany({
        where: {
          user_id: user,
          is_read: 0,
        },
        select: {
          message: true,
        },
      });

      return res;
    } catch (ex) {
      throw new Error(ex);
    }
  }

  async readNotifications(user: number) {
    try {
      const res = await this.prismaService.notifications.updateMany({
        where: {
          user_id: user,
        },
        data: {
          is_read: 1,
        },
      });

      return res;
    } catch (ex) {
      throw new Error();
    }
  }
}
