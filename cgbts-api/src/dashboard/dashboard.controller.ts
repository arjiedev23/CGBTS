import { Controller, Get, Patch, Query } from '@nestjs/common';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('/notification')
  notification(@Query('userid') user: string) {
    return this.dashboardService.notification(+user);
  }

  @Patch('/notification')
  readNotification(@Query('userid') user: string) {
    return this.dashboardService.readNotifications(+user);
  }
}
