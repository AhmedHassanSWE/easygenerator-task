import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getProfile(user: User): Promise<{
        id: string;
        name: string;
        email: string;
    }>;
    updateProfile(user: User, updateUserDto: UpdateUserDto): Promise<{
        id: string;
        name: string;
        email: string;
    }>;
}
