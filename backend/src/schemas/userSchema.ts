import { z } from 'zod';

export const registerSchema = z.object({
    email: z.string().email('Invalid email').min(1, 'Email is required'),
    password: z.string()
        .min(8, 'Password must be at least 8 characters')
        .regex(/[a-z]/, 'Must contain a lowercase letter')
        .regex(/[A-Z]/, 'Must contain an uppercase letter')
        .regex(/[0-9]/, 'Must contain a number')
        .regex(/[!@#$%^&*(),.?":{}|<>]/, 'Must contain a special character')
        .min(1, 'Password is required'),
    confirmPassword: z.string()
        .min(1, 'Confirm Password is required'),
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    age: z.coerce.number().min(10, 'You must be at least 10 years old').max(100, 'Age must be below 100'),
    sex: z.enum(['Male', 'Female']),
    weight: z.coerce.number().min(50, 'Weight must be at least 50').max(600, 'Weight must be under 600'),
    height: z.string().min(1, 'Height is required'),
    goal: z.string().min(1, 'Goal is required'),
    })
.superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
        ctx.addIssue({
            path: ['confirmPassword'],
            code: z.ZodIssueCode.custom,
            message: 'Passwords must match',
        });
    }
})

export const loginSchema = z.object({
    email: z.string().email('Invalid email').min(1, 'Email is required'),
    password: z.string()
        .min(8, 'Password must be at least 8 characters')
        .regex(/[a-z]/, 'Must contain a lowercase letter')
        .regex(/[A-Z]/, 'Must contain an uppercase letter')
        .regex(/[0-9]/, 'Must contain a number')
        .regex(/[!@#$%^&*(),.?":{}|<>]/, 'Must contain a special character')
        .min(1, 'Password is required'), 
})