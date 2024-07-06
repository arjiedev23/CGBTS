import { PartialType } from '@nestjs/mapped-types';
import { CreateBenefitClaimDto } from './create-benefit-claim.dto';

export class UpdateBenefitClaimDto extends PartialType(CreateBenefitClaimDto) {}
