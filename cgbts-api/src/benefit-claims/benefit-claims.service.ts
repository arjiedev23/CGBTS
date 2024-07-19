import { Injectable } from '@nestjs/common';
import { CreateBenefitClaimDto } from './dto/create-benefit-claim.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UtilityService } from 'src/utility/utility.service';

@Injectable()
export class BenefitClaimsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly utilityService: UtilityService,
  ) {}
  async saveBenefitClaims(createBenefitClaimDto: CreateBenefitClaimDto) {
    try {
      const checkUser = await this.utilityService.findUser(
        Number(createBenefitClaimDto.user_id),
      );

      if (!checkUser) {
        return { respCode: 0, respMessage: 'User not found!' };
      }

      const checkAgency = await this.utilityService.findAgency(
        Number(createBenefitClaimDto.agency_id),
      );

      if (!checkAgency) {
        return { respCode: 0, respMessage: 'Agency not found!' };
      }

      const verify = await this.utilityService.checkIsVerified(
        createBenefitClaimDto.user_id,
      );

      if (verify === null) {
        return { respCode: 0, respMessage: 'User is not verified!' };
      }

      const checkContribution = await this.prismaService.contributions.findMany(
        {
          where: {
            userID: Number(createBenefitClaimDto.user_id),
            agency_id: Number(createBenefitClaimDto.agency_id),
          },
        },
      );

      const benefitType = await this.prismaService.benefits_types.findFirst({
        where: {
          btypes_id: Number(createBenefitClaimDto.benefit_type),
        },
        select: {
          required_month: true,
        },
      });

      console.log(checkContribution.length + ' ' + benefitType.required_month);

      if (checkContribution.length < benefitType.required_month) {
        return {
          respCode: 0,
          respMessage: `User has to paid at least ${benefitType.required_month} month/s of contributions`,
        };
      }

      const saveClaims = await this.createBenefitClaims(createBenefitClaimDto);

      if (!saveClaims) {
        return { respCode: 0, respMessage: 'createBenefitClaims save error' };
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
      const checkUser = await this.utilityService.findUser(userid);

      if (!checkUser) {
        return { respCode: 0, respMessage: 'User not found!' };
      }

      const claims = await this.viewBenefitsDetails(claimid, userid);

      if (claims.length === 0) {
        return { respCode: 0, respMessage: 'No data found!' };
      }

      return { respCode: 1, respMessage: 'success', claimDetails: claims };
    } catch (ex) {
      throw new Error(ex);
    }
  }

  async viewBenefitsDetails(claim_id: number, user_id: number): Promise<any> {
    try {
      const res = this.prismaService.benefit_claims.findMany({
        where: {
          userID: Number(user_id),
          claim_id: Number(claim_id),
        },
        include: {
          users: {
            include: {
              user_info: true,
            },
          },
          agency: true,
        },
      });

      return res;
    } catch (ex) {
      throw new Error(ex);
    }
  }

  async createBenefitClaims(data: CreateBenefitClaimDto): Promise<any> {
    try {
      const saveClaims = this.prismaService.benefit_claims.create({
        data: {
          claim_amount: data.claim_amount,
          remarks: data.remarks,
          userID: Number(data.user_id),
          btype_id: Number(data.benefit_type),
          agency_id: Number(data.agency_id),
        },
      });

      return saveClaims;
    } catch (ex) {
      throw new Error(ex);
    }
  }
}
