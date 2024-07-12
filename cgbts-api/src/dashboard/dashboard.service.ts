import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UtilityService } from 'src/utility/utility.service';

@Injectable()
export class DashboardService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly utilityService: UtilityService,
  ) {}

  async notification(user: number) {
    try {
      const checkUser = await this.utilityService.findUser(Number(user));
      if (!checkUser) {
        return { respCode: 0, respMessage: 'User not found!' };
      }

      const res = await this.notif(user);

      if (!res) {
        return { respCode: 0, respMessage: 'No data found!' };
      }

      return { respCode: 1, respMessage: 'success', notifications: res };
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

  async notif(user_id: number): Promise<any> {
    try {
      const res = this.prismaService.notifications.findMany({
        where: {
          user_id: user_id,
          is_read: 0,
        },
        include: {
          agency: {
            select: {
              agency_id: true,
              agency_name: true,
            },
          },
        },
      });

      return res;
    } catch (ex) {
      throw new Error(ex);
    }
  }
}
