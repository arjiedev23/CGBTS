import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BenefitClaimsService } from './benefit-claims.service';
import { CreateBenefitClaimDto } from './dto/create-benefit-claim.dto';
import { UpdateBenefitClaimDto } from './dto/update-benefit-claim.dto';

@Controller('benefit-claims')
export class BenefitClaimsController {
  constructor(private readonly benefitClaimsService: BenefitClaimsService) {}

  @Post()
  create(@Body() createBenefitClaimDto: CreateBenefitClaimDto) {
    return this.benefitClaimsService.create(createBenefitClaimDto);
  }

  @Get()
  findAll() {
    return this.benefitClaimsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.benefitClaimsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBenefitClaimDto: UpdateBenefitClaimDto) {
    return this.benefitClaimsService.update(+id, updateBenefitClaimDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.benefitClaimsService.remove(+id);
  }
}
