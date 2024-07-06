import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { ContributionsModule } from './contributions/contributions.module';
import { AuthModule } from './auth/auth.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { BenefitClaimsModule } from './benefit-claims/benefit-claims.module';

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    ContributionsModule,
    AuthModule,
    DashboardModule,
    BenefitClaimsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
