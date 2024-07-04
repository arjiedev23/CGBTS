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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const prisma_service_1 = require("../prisma/prisma.service");
const users_service_1 = require("../users/users.service");
let AuthService = class AuthService {
    constructor(prismaService, jwtService, userService) {
        this.prismaService = prismaService;
        this.jwtService = jwtService;
        this.userService = userService;
    }
    async login(loginDTO) {
        const { username, password } = loginDTO;
        const users = await this.prismaService.users.findUnique({
            where: { username: username },
        });
        if (!users) {
            throw new common_1.NotFoundException('Invalid username and password!');
        }
        if (users.password != password) {
            throw new common_1.NotFoundException('Invalid password');
        }
        const date = new Date();
        const dateFormat = date.toISOString();
        const lastLogin = await this.prismaService.users.update({
            where: {
                userID: users.userID,
            },
            data: {
                last_login: dateFormat,
            },
        });
        if (users.status === '0') {
            return {
                respCode: 0,
                respMessage: 'User is inactive!',
                status: users.status,
            };
        }
        if (users.status === '-1') {
            return {
                respCode: -1,
                respMessage: 'User is suspended!',
                status: users.status,
            };
        }
        return {
            data: {
                userid: users.userID,
                fullname: users.first_name + ' ' + users.middle_name + ' ' + users.last_name,
            },
            token: this.jwtService.sign({ username }),
            last_login: lastLogin.last_login.toLocaleString(),
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService,
        users_service_1.UsersService])
], AuthService);
//# sourceMappingURL=auth.service.js.map