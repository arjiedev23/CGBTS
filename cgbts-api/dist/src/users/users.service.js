"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let UsersService = class UsersService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async create(createUserDto) {
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
        }
        catch (ex) {
            throw new Error(ex);
        }
    }
    async findOne(user) {
        return await this.prismaService.users.findFirst({
            where: {
                username: user,
            },
        });
    }
    async createData(data) {
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
        }
        catch (error) {
            throw new Error(`Error creating data: ${error.message}`);
        }
    }
    async findAll() {
        try {
            const res = this.prismaService.users.findMany();
            if ((await res).length == 0) {
                return { respCode: 0, respMessage: 'No data found!' };
            }
            return { respCode: 1, respMessage: 'successs', data: res };
        }
        catch (ex) {
            throw new Error(ex);
        }
    }
    async update(id, updateUserDto) {
        try {
            return await this.prismaService.users.update({
                where: {
                    userID: id,
                },
                data: updateUserDto,
            });
        }
        catch (ex) {
            throw new Error(ex);
        }
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsersService);
//# sourceMappingURL=users.service.js.map