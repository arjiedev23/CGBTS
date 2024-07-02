import { Decimal } from '@prisma/client/runtime/library';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

export class CreateContributionDto {
  amount: Decimal;
  post_date: Date;
  status: string;
  userID: number;
  agency_id: number;
}

export class ViewContributionDto {
  amount: Decimal;
  post_date: Date;
  status: string;
  user: CreateUserDto;
  source: AgencyCreateDto;
}

export class AgencyCreateDto {
  agency_name: string;
  description: string;
  contact_info: string;
}
