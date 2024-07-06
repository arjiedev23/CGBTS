import { Test, TestingModule } from '@nestjs/testing';
import { BenefitClaimsService } from './benefit-claims.service';

describe('BenefitClaimsService', () => {
  let service: BenefitClaimsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BenefitClaimsService],
    }).compile();

    service = module.get<BenefitClaimsService>(BenefitClaimsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
