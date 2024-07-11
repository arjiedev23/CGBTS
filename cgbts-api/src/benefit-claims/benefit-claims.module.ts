import { Module } from '@nestjs/common';
import { BenefitClaimsService } from './benefit-claims.service';
import { BenefitClaimsController } from './benefit-claims.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UtilityService } from 'src/utility/utility.service';

@Module({
  imports: [PrismaModule],
  controllers: [BenefitClaimsController],
  providers: [BenefitClaimsService, UtilityService],
})
export class BenefitClaimsModule {}
