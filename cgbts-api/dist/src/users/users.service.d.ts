import { Prisma, Users } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class UsersService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    create(createUserDto: Prisma.UsersCreateInput): Promise<{
        respCode: number;
        respMessage: string;
        username: string;
        data?: undefined;
    } | {
        respCode: number;
        respMessage: string;
        username?: undefined;
        data?: undefined;
    } | {
        respCode: number;
        respMessage: string;
        data: any;
        username?: undefined;
    }>;
    findOne(user: string): Promise<Users>;
    createData(data: Prisma.UsersCreateInput): Promise<any>;
    viewUsers(): Promise<{
        userID: number;
        username: string;
        password: string;
        email: string;
        phone_number: string;
        first_name: string;
        middle_name: string;
        last_name: string;
        date_of_birth: Date;
        address: string;
        create_at: Date;
        updated_at: Date | null;
        status: string;
        last_login: Date | null;
        sex: string;
        barangay: string;
        city_municipal: string;
        postal_code: number;
        country: string;
        province: string;
        role_Id: number;
    }[]>;
    findAll(): Promise<{
        respCode: number;
        respMessage: string;
        data?: undefined;
    } | {
        respCode: number;
        respMessage: string;
        data: {
            userID: number;
            username: string;
            password: string;
            email: string;
            phone_number: string;
            first_name: string;
            middle_name: string;
            last_name: string;
            date_of_birth: Date;
            address: string;
            create_at: Date;
            updated_at: Date | null;
            status: string;
            last_login: Date | null;
            sex: string;
            barangay: string;
            city_municipal: string;
            postal_code: number;
            country: string;
            province: string;
            role_Id: number;
        }[];
    }>;
    update(id: number, updateUserDto: Prisma.UsersUpdateInput): Promise<{
        userID: number;
        username: string;
        password: string;
        email: string;
        phone_number: string;
        first_name: string;
        middle_name: string;
        last_name: string;
        date_of_birth: Date;
        address: string;
        create_at: Date;
        updated_at: Date | null;
        status: string;
        last_login: Date | null;
        sex: string;
        barangay: string;
        city_municipal: string;
        postal_code: number;
        country: string;
        province: string;
        role_Id: number;
    }>;
}
