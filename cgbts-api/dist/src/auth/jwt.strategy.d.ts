import { Strategy } from 'passport-jwt';
import { PrismaService } from 'src/prisma/prisma.service';
declare const JwtStrategy_base: new (...args: any[]) => InstanceType<typeof Strategy>;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    validate(payload: {
        username: string;
    }): Promise<{
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
export {};
