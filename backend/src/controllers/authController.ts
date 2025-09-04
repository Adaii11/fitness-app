import { Request, Response, NextFunction } from 'express';
import {z, ZodError } from 'zod';
import { registerSchema, loginSchema } from '../schemas/userSchema';
import { loginUser , createUser } from '../services/authService';
import jwt from 'jsonwebtoken';

type RegisterBody = z.infer<typeof registerSchema>;
type LoginBody = z.infer<typeof loginSchema>;

export async function registerUser (
    req: Request<{}, {}, RegisterBody>,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const data = registerSchema.parse(req.body);
        const user = await createUser(data);

        const token = jwt.sign(
            {id: user.id, email: user.email},
            process.env.JWT_SECRET || 'supersecretkey',
            { expiresIn: '1h'}
        )

        const { password, ...userWithoutPassword } = user;

        res.status(201).json({
            message: 'User created successfully',
            token,
            user: userWithoutPassword,
        });
    } catch(err) {
        
        if(err instanceof ZodError) {
            res
                .status(400)
                .json({ message: 'Validation failed', issues: err.errors })
            
                return;
        }

        console.error('Error in registerUser: ', err);
        next(err);
    }
}

export async function login (
    req: Request<{}, {}, LoginBody>,
    res: Response,
    next: NextFunction
): Promise<void> {
    
    try {
        const data = loginSchema.parse(req.body);
        const { user, token } = await loginUser(data);

        res.status(200).json({
            message: 'Login successful',
            user: { id: user.id, email: user.email },
            token,
        });
    } catch(err) {
        next(err);
    }
}