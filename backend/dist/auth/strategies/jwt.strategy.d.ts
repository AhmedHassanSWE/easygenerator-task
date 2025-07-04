import { Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../../users/users.service';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private configService;
    private usersService;
    constructor(configService: ConfigService, usersService: UsersService);
    validate(payload: any): Promise<import("mongoose").Document<unknown, {}, import("../../users/schemas/user.schema").User, {}> & import("../../users/schemas/user.schema").User & Required<{
        _id: string;
    }> & {
        __v: number;
    }>;
}
export {};
