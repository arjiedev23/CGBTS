import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { BenefitClaimsService } from './benefit-claims.service';
import { CreateBenefitClaimDto } from './dto/create-benefit-claim.dto';

@Controller('benefit-claims')
export class BenefitClaimsController {
  constructor(private readonly benefitClaimsService: BenefitClaimsService) {}

  @Post()
  saveBenefits(@Body() createBenefitClaimDto: CreateBenefitClaimDto) {
    return this.benefitClaimsService.saveBenefitClaims(createBenefitClaimDto);
  }

  @Get('/getContribution')
  getContributions(
    @Query('userid') user: number,
    @Query('claimid') claim: number,
  ) {
    return this.benefitClaimsService.viewClaimDetails(claim, user);
  }
}
