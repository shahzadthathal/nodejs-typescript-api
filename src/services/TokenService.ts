import jwt from 'jsonwebtoken';
import { config } from '../config/config';
import {ITokenGenerator, TokenPayload} from '../interfaces/ITokenGenerator';

const environment = process.env.NODE_ENV || 'development';
const envConfig = config[environment as 'development' | 'production'];


class TokenService implements ITokenGenerator {
    generateToken(payload: TokenPayload): string {
        return jwt.sign(payload, envConfig.jwt.secret, { expiresIn: envConfig.jwt.exp });
    }
}

export default new TokenService();