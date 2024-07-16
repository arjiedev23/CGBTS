import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ChangeUserPasswordDto,
  CreateUserInfoDto,
} from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createUserDto: Prisma.UsersCreateInput) {
    try {
      const dob = new Date(createUserDto.date_of_birth);
      createUserDto.date_of_birth = dob.toISOString();

      const checkUser = await this.prismaService.users.findMany({
        where: {
          username: createUserDto.username,
        },
      });

      if (checkUser.length != 0) {
        return {
          respCode: 0,
          respMessage: 'Username already exist.',
          username: createUserDto.username,
        };
      }

      const res = await this.createData(createUserDto);

      if (!res) {
        return { respCode: 0, respMessage: 'User does not exist!' };
      }

      return {
        respCode: 1,
        respMessage: 'User successfully added.',
        data: res,
      };
    } catch (ex) {
      throw new Error(ex);
    }
  }

  async saveMoreInfo(createUserInfoDto: CreateUserInfoDto) {
    try {
      const checkUser = await this.findUser(createUserInfoDto.user_id);

      if (!checkUser) {
        return {
          respCode: 0,
          respMessage: 'User does not exist!',
          user_id: createUserInfoDto.user_id,
        };
      }

      const res = await this.saveUserInfo(createUserInfoDto);

      if (!res) {
        return { respCode: 0, respMessage: 'User does not exist!' };
      }

      return {
        respCode: 1,
        respMessage: 'User successfully updated!',
        data: res,
      };
    } catch (ex) {
      throw new Error(ex);
    }
  }

  async findUser(user: number): Promise<any> {
    try {
      const userCheck = this.prismaService.users.findFirst({
        where: {
          userID: user,
        },
      });

      return userCheck;
    } catch (ex) {
      throw new Error(ex);
    }
  }

  async findAgency(agencyId: number): Promise<any> {
    try {
      const agency = this.prismaService.agency_information.findUnique({
        where: {
          agency_id: agencyId,
        },
      });

      return agency;
    } catch (ex) {
      throw new Error(ex);
    }
  }

  async viewUsers() {
    try {
      const res = await this.prismaService.users.findMany();
      return res;
    } catch (ex) {
      throw new Error(ex);
    }
  }

  async findAll() {
    try {
      const res = await this.viewUsers();
      if ((await res).length === 0) {
        return { respCode: 0, respMessage: 'No data found!' };
      }

      return { respCode: 1, respMessage: 'success', data: res };
    } catch (ex) {
      throw new Error();
    }
  }

  async userDetails(userId: number) {
    try {
      const res = await this.getUserDetails(userId);

      if (!res) {
        return { respCode: 0, respMessage: 'User not found' };
      }

      return { respCode: 1, respMessage: 'success', data: res };
    } catch (ex) {
      console.log(ex);

      throw new Error();
    }
  }

  async changePassword(changeUserPasswordDto: ChangeUserPasswordDto) {
    try {
      const checkUser = await this.prismaService.users.findUnique({
        where: {
          userID: changeUserPasswordDto.user_id,
        },
      });

      if (!checkUser) {
        return { respCode: 0, respMessage: 'User not found!' };
      }

      if (checkUser.password !== changeUserPasswordDto.current_password) {
        return { respCode: 0, respMessage: 'Incorrect password!' };
      }

      const updatePass = await this.updateUserPassword(changeUserPasswordDto);

      if (!updatePass) {
        return { respCode: 0, respMessage: 'Error update' };
      }

      return {
        respCode: 1,
        respMessage: 'User password successfully updated',
      };
    } catch (ex) {
      throw new Error();
    }
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    try {
      const checkSSS = await this.prismaService.users.findMany({
        where: {
          sss_id: updateUserDto.sss_id,
        },
      });

      if (checkSSS.length != 0) {
        return { respCode: 0, respMessage: 'Invalid ID', agency: 2 };
      }

      const checkPagibig = await this.prismaService.users.findMany({
        where: {
          pagibig_id: updateUserDto.pagibig_id,
        },
      });

      if (checkPagibig.length != 0) {
        return { respCode: 0, respMessage: 'Invalid ID', agency: 3 };
      }

      const checkPhilH = await this.prismaService.users.findMany({
        where: {
          philhealth_id: updateUserDto.philhealth_id,
        },
      });

      if (checkPhilH.length != 0) {
        return { respCode: 0, respMessage: 'Invalid ID', agency: 4 };
      }

      const update = await this.saveUserUpdate(id, updateUserDto);

      if (!update) {
        return { respCode: 0, respMessage: 'Something went wrong!' };
      }

      return {
        respCode: 1,
        respMessage: 'User Successfully updated!',
        updatedDetails: update,
      };
    } catch (ex) {
      throw new Error(ex);
    }
  }

  async updateUserPassword(data: ChangeUserPasswordDto): Promise<any> {
    try {
      const password = this.prismaService.users.update({
        where: {
          userID: data.user_id,
        },
        data: {
          password: data.new_password,
        },
      });

      return password;
    } catch (ex) {
      throw new Error(ex);
    }
  }

  async getUserDetails(user: number): Promise<any> {
    try {
      const viewUser = this.prismaService.users.findUnique({
        where: {
          userID: Number(user),
        },
        include: {
          user_info: true,
        },
      });

      return viewUser;
    } catch (ex) {
      throw new Error(ex);
    }
  }

  async saveUserInfo(createUserInfoDto: CreateUserInfoDto): Promise<any> {
    try {
      const dob = new Date(createUserInfoDto.DOB);
      createUserInfoDto.DOB = dob.toISOString();
      const saveInfo = await this.prismaService.user_info.create({
        data: {
          first_name: createUserInfoDto.first_name,
          last_name: createUserInfoDto.last_name,
          middle_name: createUserInfoDto.middle_name,
          suffix: createUserInfoDto.suffix,
          DOB: createUserInfoDto.DOB,
          relationship: createUserInfoDto.relationship,
          users_id: createUserInfoDto.user_id,
          contact_number: createUserInfoDto.contact_number,
        },
      });

      return saveInfo;
    } catch (ex) {
      throw new Error(ex);
    }
  }

  async saveUserUpdate(user: number, data: UpdateUserDto): Promise<any> {
    try {
      const now = new Date();
      const update = await this.prismaService.users.update({
        where: {
          userID: user,
        },
        data: {
          address: data.address,
          sex: data.sex,
          province: data.province,
          city_municipal: data.city_municipal,
          barangay: data.barangay,
          postal_code: data.postal_code,
          country: data.country,
          sss_id: data.sss_id,
          pagibig_id: data.pagibig_id,
          philhealth_id: data.philhealth_id,
          updated_at: now.toISOString(),
          civil_status: data.civil_status,
          tin: data.tin,
          nationality: data.nationality,
          placeof_birth: data.placeof_birth,
          telephone_number: data.telephone_number,
          religion: data.religion,
          subdivision: data.subdivision,
          street: data.street,
          house: data.house,
          room: data.room,
        },
      });

      return update;
    } catch (ex) {
      throw new Error(ex);
    }
  }

  async createData(data: Prisma.UsersCreateInput): Promise<any> {
    try {
      const createdData = await this.prismaService.users.create({
        data: {
          first_name: data.first_name,
          last_name: data.last_name,
          middle_name: data.middle_name,
          sex: data.sex,
          date_of_birth: data.date_of_birth,
          email: data.email,
          phone_number: data.phone_number,
          password: data.password,
          username: data.username,
        },
      });

      return createdData;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
