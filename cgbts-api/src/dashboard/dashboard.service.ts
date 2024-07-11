import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class DashboardService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly userService: UsersService,
  ) {}

  async notification(user: number) {
    try {
      const res = await this.notif(user);

      const checkUser = await this.userService.findUser(user);

      if (!checkUser) {
        return { respCode: 0, respMessage: 'User does not exist!' };
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
