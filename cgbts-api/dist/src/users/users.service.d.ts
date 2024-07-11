import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserInfoDto } from './dto/create-user.dto';
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
    saveMoreInfo(createUserInfoDto: CreateUserInfoDto): Promise<{
        respCode: number;
        respMessage: string;
        user_id: number;
        data?: undefined;
    } | {
        respCode: number;
        respMessage: string;
        user_id?: undefined;
        data?: undefined;
    } | {
        respCode: number;
        respMessage: string;
        data: any;
        user_id?: undefined;
    }>;
    findUser(user: number): Promise<any>;
    findAgency(agencyId: number): Promise<any>;
    viewUsers(): Promise<{
        userID: number;
        username: string;
        password: string;
        email: string;
        phone_number: string;
        first_name: string;
        middle_name: string | null;
        last_name: string;
        date_of_birth: Date;
        address: string | null;
        create_at: Date;
        updated_at: Date | null;
        status: string;
        last_login: Date | null;
        workStartDate: Date | null;
        suffix: string | null;
        sex: string | null;
        barangay: string | null;
        city_municipal: string | null;
        postal_code: number | null;
        country: string | null;
        province: string | null;
        sss_id: string | null;
        pagibig_id: string | null;
        philhealth_id: string | null;
        role_Id: number | null;
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
            middle_name: string | null;
            last_name: string;
            date_of_birth: Date;
            address: string | null;
            create_at: Date;
            updated_at: Date | null;
            status: string;
            last_login: Date | null;
            workStartDate: Date | null;
            suffix: string | null;
            sex: string | null;
            barangay: string | null;
            city_municipal: string | null;
            postal_code: number | null;
            country: string | null;
            province: string | null;
            sss_id: string | null;
            pagibig_id: string | null;
            philhealth_id: string | null;
            role_Id: number | null;
        }[];
    }>;
    updateUser(id: number, updateUserDto: UpdateUserDto): Promise<{
        respCode: number;
        respMessage: string;
        agency: number;
        updatedDetails?: undefined;
    } | {
        respCode: number;
        respMessage: string;
        agency?: undefined;
        updatedDetails?: undefined;
    } | {
        respCode: number;
        respMessage: string;
        updatedDetails: any;
        agency?: undefined;
    }>;
    saveUserInfo(createUserInfoDto: CreateUserInfoDto): Promise<any>;
    saveUserUpdate(user: number, data: UpdateUserDto): Promise<any>;
    createData(data: Prisma.UsersCreateInput): Promise<any>;
}
