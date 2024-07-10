import { Injectable } from '@nestjs/common';
import { Prisma, Users } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserInfoDto } from './dto/create-user.dto';
import { agent } from 'supertest';

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
      const checkUser = await this.prismaService.users.findMany({
        where: {
          userID: createUserInfoDto.user_id,
        },
      });

      if (checkUser.length === 0) {
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

  async findOne(user: string): Promise<Users> {
    return await this.prismaService.users.findFirst({
      where: {
        username: user,
      },
    });
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

  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    try {
      const checkSSS = await this.prismaService.users.findMany({
        where: {
          sss_id: updateUserDto.sss_id,
        },
      });

      if (checkSSS.length != 0) {
        return { respCode: 0, respMessage: 'Invalid', agency: 2 };
      }

      const checkPagibig = await this.prismaService.users.findMany({
        where: {
          pagibig_id: updateUserDto.pagibig_id,
        },
      });

      if (checkPagibig.length != 0) {
        return { respCode: 0, respMessage: 'Invalid', agency: 3 };
      }

      const checkPhilH = await this.prismaService.users.findMany({
        where: {
          philhealth_id: updateUserDto.philhealth_id,
        },
      });

      if (checkPhilH.length != 0) {
        return { respCode: 0, respMessage: 'Invalid', agency: 4 };
      }

      const update = await this.saveUserUpdate(id, updateUserDto);

      console.log(update);

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
