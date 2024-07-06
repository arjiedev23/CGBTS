import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { JwtAuthGuard } from 'src/auth/auth.guard';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('/notification')
  @UseGuards(JwtAuthGuard)
  notification(@Query('userid') user: string) {
    return this.dashboardService.notification(+user);
  }
}
