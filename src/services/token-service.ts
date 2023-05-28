import jwt from 'jsonwebtoken';
import TokenOutputDTO from '../dtos/auth/token-output-dto';

class TokenService {

    public makeToken(email: string, id: string): TokenOutputDTO {
        const accessToken = jwt.sign(
            {
                id,
                username: email
            },
            process.env.ACCESS_TOKEN_SECRET || '123',
            { expiresIn: '1d' }
        );
        return {
            access_token: accessToken
        }
    }
}

export default new TokenService;