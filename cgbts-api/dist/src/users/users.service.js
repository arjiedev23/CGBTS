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
                return { respCode: 0, respMessage: 'User does not exist!' };
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
    async saveMoreInfo(createUserInfoDto) {
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
        }
        catch (ex) {
            throw new Error(ex);
        }
    }
    async findUser(user) {
        try {
            const userCheck = this.prismaService.users.findFirst({
                where: {
                    userID: user,
                },
            });
            return userCheck;
        }
        catch (ex) {
            throw new Error(ex);
        }
    }
    async findAgency(agencyId) {
        try {
            const agency = this.prismaService.agency_information.findUnique({
                where: {
                    agency_id: agencyId,
                },
            });
            return agency;
        }
        catch (ex) {
            throw new Error(ex);
        }
    }
    async viewUsers() {
        try {
            const res = await this.prismaService.users.findMany();
            return res;
        }
        catch (ex) {
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
        }
        catch (ex) {
            throw new Error();
        }
    }
    async changePassword(userId, newPassword) {
        try {
            const updatePass = await this.updateUserPassword(userId, newPassword);
            if (!updatePass) {
                return { respCode: 0, respMessage: 'Error update' };
            }
            return {
                respCode: 1,
                respMessage: 'User password successfully updated',
                res: updatePass,
            };
        }
        catch (ex) {
            throw new Error();
        }
    }
    async updateUser(id, updateUserDto) {
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
        }
        catch (ex) {
            throw new Error(ex);
        }
    }
    async updateUserPassword(userId, newPasswordStr) {
        try {
            const password = this.prismaService.users.update({
                where: {
                    userID: userId,
                },
                data: {
                    password: newPasswordStr,
                },
            });
            return password;
        }
        catch (ex) {
            throw new Error(ex);
        }
    }
    async saveUserInfo(createUserInfoDto) {
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
        }
        catch (ex) {
            throw new Error(ex);
        }
    }
    async saveUserUpdate(user, data) {
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
        }
        catch (ex) {
            throw new Error(ex);
        }
    }
    async createData(data) {
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
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsersService);
//# sourceMappingURL=users.service.js.map