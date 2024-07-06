import { Injectable } from '@nestjs/common';
import { CreateBenefitClaimDto } from './dto/create-benefit-claim.dto';
import { UpdateBenefitClaimDto } from './dto/update-benefit-claim.dto';

@Injectable()
export class BenefitClaimsService {
  create(createBenefitClaimDto: CreateBenefitClaimDto) {
    return 'This action adds a new benefitClaim';
  }

  findAll() {
    return `This action returns all benefitClaims`;
  }

  findOne(id: number) {
    return `This action returns a #${id} benefitClaim`;
  }

  update(id: number, updateBenefitClaimDto: UpdateBenefitClaimDto) {
    return `This action updates a #${id} benefitClaim`;
  }

  remove(id: number) {
    return `This action removes a #${id} benefitClaim`;
  }
}
