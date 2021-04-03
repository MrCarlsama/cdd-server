import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
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
