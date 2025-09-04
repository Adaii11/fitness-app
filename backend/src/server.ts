/// <reference path='types.d.ts' />

import express, { Application } from 'express';
import authRoutes from './routes/authRoutes';
import cors from 'cors';
import dotenv from 'dotenv';
import dashboardRoutes from './routes/dashboardRoutes';


// Load environmental variables here and call express.js
dotenv.config();
const app: Application = express();

console.log('JWT_SECRET:', process.env.JWT_SECRET);

// Middleware
app.use(cors({origin: 'http://localhost:3000'}));
app.use(express.json());

// Routes
app.use('/api', authRoutes);
app.use('/dashboard', dashboardRoutes);


//Error Handling
app.use((err: any, req: any, res: any, next: any) => {
    console.error(err);
    res.status(500).json({ error: 'Internal server error'});
})


// Shows server is running on port 5000 within our terminal
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

























































//old version below
/*

import express, { Request, Response } from "express";
import cors from 'cors';
import bcrypt from 'bcrypt';
import { ZodError } from 'zod';
import { PrismaClient } from "@prisma/client";
import { registerSchema } from "../schemas/userSchema";
import jwt from 'jsonwebtoken';

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 5000;

app.use(cors({origin: 'http://localhost:3000'}));
app.use(express.json());

//create-acocunt endpoint
app.post('/api/create-account', async (req: Request, res: Response) => {
    try {
        const validatedData = registerSchema.parse(req.body);
        const {
            email,
            password,
            firstName,
            lastName,
            age,
            sex,
            weight,
            height,
            goal,
        } = validatedData;

        //double check password and confirm password, then hash.
        const hashedPassword = await bcrypt.hash(password, 10);

        //take height and convert to cm
        const [feet, inches] = height.split("'").map((val) => parseInt(val));
        const heightInInches = feet * 12 + inches;
        const heightInCM = heightInInches * 2.54;

        //take weight in lbs and convert to kg
        const weightInKg = weight * 0.453592;

        //calculate BMR numbers using converted data
        let bmr: number;
        if (sex === 'Male') {
            bmr = (10 * weightInKg) + (6.25 * heightInCM) - (5 * age) + 5;
        } else {
            bmr = (10 * weightInKg) + (6.25 * heightInCM) - (5 * age) - 161;
        }
        
        let tdee = bmr * 1.2;

        let dailyCalories: number;
        switch (goal.toLowerCase()) {
            case '- 2lbs per week | cutting':
                dailyCalories = tdee - 1000;
                break;
            case '- 1lb per week | cutting':
                dailyCalories = tdee - 500;
                break;
            case '+ 1lb per week | bulking':
                dailyCalories = tdee + 400;
                break;
            case '+ 2lbs per week | bulking':
                dailyCalories = tdee + 800;
                break;
            default:
                dailyCalories = tdee;
        }  

        dailyCalories = Math.round(dailyCalories);
        console.log('BMR:', bmr);
        console.log('Daily Calories (rounded):', dailyCalories);
        
        const newUser = await prisma.user.create({
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
                dailyCalories,
            },
        });

        const token = jwt.sign(
            {id: newUser.id, email: newUser.email},
            process.env.JWT_SECRET || 'supersecretkey',
            { expiresIn: '1hr'}
        );

        const { password: _, ...userWithoutPassword } = newUser;
        res.status(201).json({
            message: 'User created successfully',
            token,
            user: userWithoutPassword,
        });

    } catch (err) {

        console.log("error creating account: ", err);

        if(err instanceof ZodError) {
            res.status(400).json ({ message: 'Validation failed', issues: err.errors })
        } else {
            res.status(500).json({message: 'Internal Server Error'});
        }
    }
})


// login endpoint
app.post('/api/login', async (req: Request, res: Response) => {
    try {
        const {email, password} = req.body;
        
        const user = await prisma.user.findUnique({where: { email },});

        if(!user) {
            res.status(401).json({error: "Invalid email or password"});
            return;
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if(!isPasswordValid) {
            res.status(401).json({error: "Invalid email or password"});
            return;
        }

        const token = jwt.sign(
            {userId: user.id, email: user.email },
            process.env.JWT_SECRET || 'supersecret',
            {expiresIn: "1hr"}
        );

        const { password: _, ...userWithoutPassword } = user;
        res.json({ token, user: userWithoutPassword });
    } catch {
        res.status(500).json({ error: "Internal server error" });
    }

});

//displays that the server is up and running on local port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

*/