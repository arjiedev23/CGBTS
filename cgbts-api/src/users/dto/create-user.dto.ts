export class CreateUserDto {
  password: string;
  username: string;
  email: string;
  phone_number: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  date_of_birth: Date;
  address: string;
  sex: string;
  province: string;
  city_municipal: string;
  barangay: string;
  postal_code: number;
  role_id: number;
  country: string;
  status: string;
  updated_at: Date;
  last_login: Date;
}

export class CreateUserInfoDto {
  first_name: string;
  middle_name: string;
  last_name: string;
  suffix: string;
  DOB: string;
  contact_number: string;
  relationship: string;
  user_id: number;
}
