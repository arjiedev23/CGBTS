import { Decimal } from '@prisma/client/runtime/library';

export class CreateBenefitClaimDto {
  claim_amount: Decimal;
  remarks: string;
  user_id: number;
  benefit_type: number;
  agency_id: number;
}
