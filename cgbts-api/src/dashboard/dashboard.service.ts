import { Injectable } from '@nestjs/common';
import { CreateDashboardDto } from './dto/create-dashboard.dto';
import { UpdateDashboardDto } from './dto/update-dashboard.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll() {
    return `This action returns all dashboard`;
  }

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

  async update(id: number, updateDashboardDto: UpdateDashboardDto) {
    return `This action updates a #${id} dashboard`;
  }
}
