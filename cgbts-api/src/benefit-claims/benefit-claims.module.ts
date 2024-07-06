import { Module } from '@nestjs/common';
import { BenefitClaimsService } from './benefit-claims.service';
import { BenefitClaimsController } from './benefit-claims.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [BenefitClaimsController],
  providers: [BenefitClaimsService],
})
export class BenefitClaimsModule {}
