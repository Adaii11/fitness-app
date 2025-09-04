import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

interface CustomJwtPayload extends JwtPayload {
    id: number;
    email: string;
}

export const authenticateToken = (
    req: Request,
    res: Response,
    next: NextFunction, 
): void => {

    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        res.status(401).json({message: 'No token provided' });
        return;
    }

    const jwtSecret = process.env.JWT_SECRET;
    if(!jwtSecret) {
        throw new Error('JWT_SECRET not set');
    }

    jwt.verify(token, jwtSecret, (err, decoded) => {
        if(err) {
            res.status(403).json({message: 'Invalid token'});
            return;
        }


        req.user = decoded as CustomJwtPayload;
        next();
    })
}
