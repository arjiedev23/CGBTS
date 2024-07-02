import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
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
    update(id: string, updateUserDto: UpdateUserDto): Promise<{
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
