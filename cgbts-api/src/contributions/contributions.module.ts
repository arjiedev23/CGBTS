import { Module } from '@nestjs/common';
import { ContributionsService } from './contributions.service';
import { ContributionsController } from './contributions.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersService } from 'src/users/users.service';
import { UtilityService } from 'src/utility/utility.service';

@Module({
  imports: [PrismaModule],
  controllers: [ContributionsController],
  providers: [ContributionsService, UsersService, UtilityService],
})
export class ContributionsModule {}
