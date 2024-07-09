import { Injectable } from '@nestjs/common';
import { CreateBenefitClaimDto } from './dto/create-benefit-claim.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BenefitClaimsService {
  constructor(private readonly prismaService: PrismaService) {}
  async saveBenefitClaims(createBenefitClaimDto: CreateBenefitClaimDto) {
    try {
      const saveClaims = this.createBenefitClaims(createBenefitClaimDto);

      if (!saveClaims) {
        return { respCode: 0, respMessage: 'Something went wrong!' };
      }

      return {
        respCode: 1,
        respMessage: 'Benefit claims successfully saved!',
        claims: saveClaims,
      };
    } catch (ex) {
      throw new Error(ex);
    }
  }

  async viewClaimDetails(claimid: number, userid: number) {
    try {
      const claims = this.viewBenefitsDetails(claimid, userid);

      if (!claims) {
        return { respCode: 0, respMessage: 'Something went wrong!' };
      }

      return { respCode: 1, respMessage: 'success', claimDetails: claims };
    } catch (ex) {
      throw new Error(ex);
    }
  }

  async viewBenefitsDetails(claim_id: number, user_id: number): Promise<any> {
    try {
      return await this.prismaService.benefit_claims.findUnique({
        where: {
          claim_id: claim_id,
          userID: user_id,
        },
        select: {
          claim_amount: true,
          claim_status: true,
          remarks: true,
        },
      });
    } catch (ex) {
      throw new Error(ex);
    }
  }

  async createBenefitClaims(data: CreateBenefitClaimDto): Promise<any> {
    try {
      const saveClaims = await this.prismaService.benefit_claims.create({
        data: {
          claim_amount: data.claim_amount,
          claim_status: data.claim_status,
          remarks: data.remarks,
          userID: data.user_id,
          benefit_type: data.benefit_type,
        },
      });

      return saveClaims;
    } catch (ex) {
      throw new Error(ex);
    }
  }
}
