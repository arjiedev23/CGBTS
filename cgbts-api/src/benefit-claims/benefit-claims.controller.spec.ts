import { Test, TestingModule } from '@nestjs/testing';
import { BenefitClaimsController } from './benefit-claims.controller';
import { BenefitClaimsService } from './benefit-claims.service';

describe('BenefitClaimsController', () => {
  let controller: BenefitClaimsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BenefitClaimsController],
      providers: [BenefitClaimsService],
    }).compile();

    controller = module.get<BenefitClaimsController>(BenefitClaimsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
