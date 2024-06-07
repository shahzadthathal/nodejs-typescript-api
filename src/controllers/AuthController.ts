import { Request, Response } from 'express';
import authRepository from '../repositories/AuthRepository';
import tokenService from '../services/TokenService';
import { registerSchema, loginSchema } from '../validators/AuthValidator';
import { hashPassword, comparePassword } from '../utils/PasswordUtils';

class AuthController {
    
   
    async register(req: Request, res: Response) {
        try {
            const { error } = registerSchema.validate(req.body);
            if (error) {
                return res.status(400).json({ error: error.details[0].message });
            }
            
            const { name, email, password } = req.body;

            const hashedPassword = await hashPassword(password);
            const userData = {
                name: name,
                email: email,
                password: hashedPassword
            };
            const newUser = await authRepository.register(userData);
            res.status(201).json({user: newUser, message:"User register successfull"});

        } catch (err: any) {
            res.status(500).json({ error: 'User registration failed', err:err });
        }
    }

    async login(req: Request, res: Response) {
        try {
            const { error } = loginSchema.validate(req.body);
            if (error) {
                return res.status(400).json({ error: error.details[0].message });
            }
    
            const { email, password } = req.body;
            const user = await authRepository.getByEmail(email);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
    
            // Compare provided password with stored hashed password
            const passwordsMatch = await comparePassword(password, user.password);
            if (!passwordsMatch) {
                return res.status(401).json({ error: 'Invalid username/password.' });
            }
            
            // Generate JWT token
            const tokenPayload = { id: user.id, email: user.email };
            const token = tokenService.generateToken(tokenPayload);
    
            return res.json({user:user, token:token, message:"User login successfull" });
    
        } catch (err: any) {
            res.status(500).json({ error: err.message , err:err});
        }
    }


    async logout(req: Request, res: Response) {
        try {
            res.status(200).json({ message: 'User logged out successfully' });
        } catch (err: any) {
            res.status(500).json({ error: err.message });
        }
    }

    
}

export default new AuthController();
