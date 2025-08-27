import bcrypt, { hash } from 'bcrypt';
import { PrismaClient, User } from '@prisma/client';
import { prisma } from '../utilities/prisma';
import jwt from 'jsonwebtoken';

interface CreateUserInput {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    age: number;
    sex: string;
    weight: number;
    height: string;
    goal: string;
}

interface loginUserInput {
    email: string;
    password: string;
}

export const createUser = async ({
    email,
    password,
    firstName,
    lastName,
    age,
    sex,
    weight,
    height,
    goal,
}: CreateUserInput): Promise<User> => {
    const existingUser = await prisma.user.findUnique({
        where: { email },
    });

    if (existingUser) {
        throw new Error('Email is already taken');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user= await prisma.user.create({
        data: {
            email,
            password: hashedPassword,
            firstName,
            lastName,
            age,
            sex,
            weight,
            height,
            goal,
        },
    });

    return user;
};

export const loginUser = async ({
    email,
    password,
}: loginUserInput): Promise<{ user: User; token: string}> => {
    const user = await prisma.user.findUnique({
        where: { email }
    })

    if (!user) {
        throw new Error('Invalid credentials');
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if(!validPassword) {
        throw new Error('Invalid credentials')
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
        throw new Error('JWT_SECRET is not set in environment variables');
    }

    const token = jwt.sign(
        { userId: user.id, email: user.email},
        process.env.JWT_SECRET as string,
        {expiresIn: '1hr'}
    );

    console.log('token generated: ', token);

    return { user, token };
}