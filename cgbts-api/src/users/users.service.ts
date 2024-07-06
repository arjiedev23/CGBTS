import { Injectable } from '@nestjs/common';
import { Prisma, Users } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

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
        return { respCode: 0, respMessage: 'Something went wrong!' };
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

  async findOne(user: string): Promise<Users> {
    return await this.prismaService.users.findFirst({
      where: {
        username: user,
      },
    });
  }

  async createData(data: Prisma.UsersCreateInput): Promise<any> {
    try {
      const createdData = await this.prismaService.users.create({
        data: {
          first_name: data.first_name,
          last_name: data.last_name,
          middle_name: data.middle_name,
          address: data.address,
          sex: data.sex,
          date_of_birth: data.date_of_birth,
          email: data.email,
          phone_number: data.phone_number,
          password: data.phone_number,
          username: data.username,
          province: data.province,
          city_municipal: data.city_municipal,
          barangay: data.barangay,
          postal_code: data.postal_code,
          country: data.country,
          status: data.status,
        },
      });

      return createdData;
    } catch (error) {
      throw new Error(`Error creating data: ${error.message}`);
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

  async update(id: number, updateUserDto: Prisma.UsersUpdateInput) {
    try {
      return await this.prismaService.users.update({
        where: {
          userID: id,
        },
        data: updateUserDto,
      });
    } catch (ex) {
      throw new Error(ex);
    }
  }
}
