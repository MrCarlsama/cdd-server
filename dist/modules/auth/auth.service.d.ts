import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private readonly jwtService;
    constructor(jwtService: JwtService);
    login({ username, id }: {
        username: any;
        id: any;
    }): Promise<{
        accessToken: string;
    }>;
}
