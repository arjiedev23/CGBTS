import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ContributionsService } from './contributions.service';
import { CreateContributionDto } from './dto/create-contribution.dto';
import { UpdateContributionDto } from './dto/update-contribution.dto';
import { JwtAuthGuard } from 'src/auth/auth.guard';

@Controller('contributions')
export class ContributionsController {
  constructor(private readonly contributionsService: ContributionsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createContributionDto: CreateContributionDto) {
    return this.contributionsService.createContribution(createContributionDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.contributionsService.contributionAll();
  }

  @Get('getContribution/:id')
  @UseGuards(JwtAuthGuard)
  getContributions(@Param('id') id: string) {
    return this.contributionsService.getContributions(+id);
  }

  @Patch('updateContri/:id')
  @UseGuards(JwtAuthGuard)
  updateContri(
    @Param('id') id: string,
    @Body() updateContributionDto: UpdateContributionDto,
  ) {
    return this.contributionsService.updateContri(+id, updateContributionDto);
  }
}
