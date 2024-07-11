import { Injectable } from '@nestjs/common';
import { CreateBenefitClaimDto } from './dto/create-benefit-claim.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class BenefitClaimsService {
  constructor(private readonly prismaService: PrismaService) {}
  async saveBenefitClaims(createBenefitClaimDto: CreateBenefitClaimDto) {
    try {
      const checkContribution = await this.prismaService.contributions.findMany(
        {
          where: {
            userID: createBenefitClaimDto.user_id,
            agency_id: createBenefitClaimDto.agency_id,
          },
        },
      );

      const benefitType = await this.prismaService.benefits_types.findFirst({
        where: {
          btypes_id: createBenefitClaimDto.benefit_type,
        },
        select: {
          required_month: true,
        },
      });

      console.log(checkContribution.length + ' ' + benefitType.required_month);

      if (checkContribution.length < benefitType.required_month) {
        return {
          respCode: 0,
          respMessage:
            'User has to paid at least ' +
            benefitType.required_month +
            ' month/s of contributions',
        };
      }

      const saveClaims = this.createBenefitClaims(createBenefitClaimDto);

      if (!saveClaims) {
        return { respCode: 0, respMessage: 'createBenefitClaims save error' };
      }

      return {
        respCode: 1,
        respMessage: 'Benefit claims successfully saved!',
        claims: saveClaims,
      };
    } catch (ex) {
      if (ex instanceof Prisma.PrismaClientKnownRequestError) {
        return { respCode: 0, respMessage: ex.name, errorType: 'Prisma' };
      } else if (ex instanceof Prisma.PrismaClientUnknownRequestError) {
        return { respCode: 0, respMessage: ex.name, errorType: 'Prisma' };
      } else if (ex instanceof Prisma.PrismaClientValidationError) {
        return { respCode: 0, respMessage: ex.name, errorType: 'Prisma' };
      } else {
        throw new Error(ex);
      }
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
      return await this.prismaService.benefit_claims.findMany({
        where: {
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
          remarks: data.remarks,
          userID: data.user_id,
          btype_id: data.benefit_type,
          agency_id: data.agency_id,
        },
      });

      return saveClaims;
    } catch (ex) {
      throw new Error(ex);
    }
  }
}
