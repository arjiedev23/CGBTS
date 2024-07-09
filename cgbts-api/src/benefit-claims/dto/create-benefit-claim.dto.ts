import { Decimal } from '@prisma/client/runtime/library';

export class CreateBenefitClaimDto {
  claim_amount: Decimal;
  claim_status: string;
  remarks: string;
  user_id: number;
  benefit_type: number;
}
