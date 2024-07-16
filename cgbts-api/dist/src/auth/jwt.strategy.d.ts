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
        middle_name: string | null;
        last_name: string;
        date_of_birth: Date;
        address: string | null;
        telephone_number: string | null;
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
        religion: string | null;
        subdivision: string | null;
        street: string | null;
        house: string | null;
        room: string | null;
        role_Id: number | null;
    }>;
}
export {};
