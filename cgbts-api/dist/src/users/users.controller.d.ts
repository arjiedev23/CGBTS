import { UsersService } from './users.service';
import { CreateUserDto, CreateUserInfoDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): Promise<{
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
            isVerified: number;
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
            tin: string | null;
            nationality: string | null;
            civil_status: string | null;
            placeof_birth: string | null;
            role_Id: number | null;
        }[];
    }>;
    userDetails(user: number): Promise<{
        respCode: number;
        respMessage: string;
        data?: undefined;
    } | {
        respCode: number;
        respMessage: string;
        data: any;
    }>;
    updateUser(user: string, updateUserDto: UpdateUserDto): Promise<{
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
    saveInfo(createUserDto: CreateUserInfoDto): Promise<{
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
}
