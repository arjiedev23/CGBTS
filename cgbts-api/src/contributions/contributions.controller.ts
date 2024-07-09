import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
} from '@nestjs/common';
import { ContributionsService } from './contributions.service';
import { CreateContributionDto } from './dto/create-contribution.dto';
import { UpdateContributionDto } from './dto/update-contribution.dto';

@Controller('contributions')
export class ContributionsController {
  constructor(private readonly contributionsService: ContributionsService) {}

  @Post()
  create(@Body() createContributionDto: CreateContributionDto) {
    return this.contributionsService.createContribution(createContributionDto);
  }

  @Get()
  findAll() {
    return this.contributionsService.contributionAll();
  }

  @Get('/getContribution')
  getContributions(@Query('userid') user: number) {
    return this.contributionsService.getContributions(user);
  }

  @Patch('updateContri/:id')
  updateContri(
    @Param('id') id: string,
    @Body() updateContributionDto: UpdateContributionDto,
  ) {
    return this.contributionsService.updateContri(+id, updateContributionDto);
  }
}
