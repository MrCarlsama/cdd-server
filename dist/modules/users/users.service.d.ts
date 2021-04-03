import { AuthService } from '../auth/auth.service';
import { Users } from './entity/users.entity';
import { Repository } from 'typeorm';
export declare class UsersService {
    private readonly authService;
    private readonly usersRepository;
    constructor(authService: AuthService, usersRepository: Repository<Users>);
    login(data: {
        username: string;
        password: string;
    }): Promise<{
        username: string;
        id: number;
        token: string;
    }>;
    register(data: {
        username: string;
        password: string;
    }): Promise<{
        username: string;
        id: number;
        token: string;
    }>;
}
