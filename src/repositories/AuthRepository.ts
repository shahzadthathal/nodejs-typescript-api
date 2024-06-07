import { IAuth } from '../interfaces/IAuth';
import db from '../models';

class AuthRepository implements IAuth {
    async getByEmail(email: string): Promise<any | null> {
        return await db.User.findOne({ where: { email } });
    }

    async register(userData: any): Promise<any> {
        return await db.User.create(userData);
    }
}

export default new AuthRepository();
