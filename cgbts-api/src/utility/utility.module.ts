import { Module } from '@nestjs/common';
import { UtilityService } from './utility.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersService } from 'src/users/users.service';
import { ContributionsService } from 'src/contributions/contributions.service';

@Module({
  exports: [UtilityService],
  imports: [PrismaModule],
  providers: [UtilityService, UsersService, ContributionsService],
})
export class UtilityModule {}
