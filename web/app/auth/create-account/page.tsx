'use client';
import { useRouter } from 'next/navigation';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import {motion, AnimatePresence } from "framer-motion";
import next from 'next';

export default function CreateAccount () {
    const [step, setStep] = useState(1);
    const totalSteps = 3; //number of steps in the form
    const router = useRouter()


    const validationSchemas = [
        Yup.object({
            email: Yup.string().email('Invalid email').required('Required'),
            password: Yup.string().required('password is required')
                .min(8, 'password must be at least 8 characters')
                .matches(/[a-z]/, 'Must contain a lowercase letter')
                .matches(/[A-Z]/, 'Must contain an uppercase letter')
                .matches(/[0-9]/, 'Must contain an number')
                .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Must contain a special character'),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref('password')], 'Passwords must match')
                .required('Please confirm your password'),
        }),
        Yup.object({
            firstName: Yup.string().required('Required'),
            lastName: Yup.string().required('Required'),
            age: Yup.number().min(10).max(100).required('Required'),
            sex: Yup.string().oneOf(['Male', 'Female'], 'Invalid sex').required('Required'),
        }),
        Yup.object({
            weight: Yup.number().min(50).max(600).required('Required'),
            height: Yup.string().required('Required'),
            goal: Yup.string().required('Required'),
        }),
    ];


    const generateHeightOptions = () => {
    const options: string[] = [];
    for(let feet = 4; feet <= 7; feet++) {
        for (let inches = 0; inches <= 11; inches++) {
            const totalInches = feet * 12 + inches;
            if (totalInches > 58 && totalInches <= 84) {
                options.push(`${feet}'${inches}`)
            }
        }
    }
    return options;
    }
    const heightOptions = generateHeightOptions();

    return (
        <Formik 
            initialValues={{
                email: '',
                password: '',
                confirmPassword: '',
                firstName: '',
                lastName: '',
                age: '',
                sex: '',
                weight: '',
                height: '',
                goal: '',

            }}
            validationSchema={validationSchemas[step - 1]}
            validateOnBlur={true}
            validateOnChange={false}
            validateOnMount={false}
            onSubmit={(values) => {
            console.log("Final submit:", values);
        }}>
            {({ handleSubmit, validateForm, setTouched, touched, values}) => {
                const handleNext = async () => {
                    const errors = await validateForm();
                    const fields = Object.keys(validationSchemas[step - 1].fields);
                    const stepErrors = fields.filter(
                        (field) => (errors as Record<string, any>)[field]
                    );

                    if(stepErrors.length > 0) {
                        const touchedFields = fields.reduce((acc, key) => {
                            acc[key] = true;
                            return acc;
                        }, {} as Record<string, boolean>);
                        setTouched(touchedFields);
                        return;
                    }
                    const nextStep = step + 1;
                    setStep(nextStep);

                    const nextFields = Object.keys(validationSchemas[nextStep - 1]?.fields || {});
                    const touchedReset = nextFields.reduce((acc, key) => {
                        acc[key] = false;
                        return acc;
                    }, {} as Record<string, boolean>);
                    setTouched(touchedReset, true);

                };     
                const handlePrev = () => setStep((prev) => prev - 1);

                const handleFinalSubmit = async (e: React.FormEvent) => {
                    e.preventDefault(); // prevent default form submission
                    const errors = await validateForm();
                    const fields = Object.keys(validationSchemas[step - 1].fields);
                    const stepErrors = fields.filter(
                        (field) => (errors as Record<string, any>)[field]
                    );
                
                    if (stepErrors.length > 0) {
                        const touchedFields = fields.reduce((acc, key) => {
                            acc[key] = true;
                            return acc;
                        }, {} as Record<string, boolean>);
                        setTouched(touchedFields);
                        return;
                    }

                    //submit form data
                    try {
                        const response = await fetch('http://localhost:5000/api/create-account', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(values),
                        });

                        const result = await response.json();
                        if (!response.ok) throw new Error(result.message);

                        console.log('Account created:', result);

                        localStorage.setItem("token", result.token);

                        if (!result.token) {
                            console.log("token generation failed")
                        } else {
                            router.push('/dashboard/home');
                        }

                    } catch (err) {
                        console.log('submission failed:', err);
                    }

                    handleSubmit();
                };

                return (
                    <div className="flex flex-col items-center justify-center gap-[0.5rem] px-3 md:px-4 lg:px-6 xl:px-8 2xl:px-10">
                        {/* Progress bar and step counter */}
                        <div className="w-full">
                            <div className="w-full h-2 bg-gray-200 rounded-full mt-4">
                            <div
                                className="h-full bg-primary rounded-full transition-all"
                                style={{ width: `${(step / totalSteps) * 100}%` }}
                            ></div>
                            </div>
                            <p className="text-[1.125rem] text-center mt-2">{`Step ${step} of ${totalSteps}`}</p>
                        </div>

                        {/* Formik Form */}
                        <Form className="flex flex-col items-center justify-center gap-[0.5rem] w-full">
                            <AnimatePresence mode="wait">
                            {step === 1 && (
                                <motion.div
                                key="step1"
                                initial={{ opacity: 0, x: 100 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -100 }}
                                transition={{ duration: 0.4 }}
                                className="w-full"
                                >
                                <InputField label="Email" name="email" type="email" />
                                <InputField label="Password" name="password" type="password" />
                                <InputField label="Confirm Password" name="confirmPassword" type="password" />
                                </motion.div>
                            )}

                            {step === 2 && (
                                <motion.div
                                key="step2"
                                initial={{ opacity: 0, x: 100 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -100 }}
                                transition={{ duration: 0.4 }}
                                className="w-full"
                                >
                                <InputField label="First Name" name="firstName" />
                                <InputField label="Last Name" name="lastName" />
                                <div className="flex gap-[1rem]">
                                    <InputField label="Age" name="age" type="number" />
                                    <SelectField label="Sex" name="sex" options={['Male', 'Female']} />
                                </div>
                                </motion.div>
                            )}

                            {step === 3 && (
                                <motion.div
                                key="step3"
                                initial={{ opacity: 0, x: 100 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -100 }}
                                transition={{ duration: 0.4 }}
                                className="w-full"
                                >
                                <div className="flex gap-[1rem]">
                                    <InputField label="Weight" name="weight" type="number" customLabel='Weight (lbs)'/>
                                    <SelectField label="Height" name="height" options={heightOptions}/>
                                </div>
                                <SelectField
                                    label="Goal"
                                    name="goal"
                                    options={['- 2lbs per week | Cutting', '- 1lb per week | Cutting', 'Maintainance', '+ 1lb per week | Bulking', '+ 2lbs per week | Bulking']}
                                />
                                </motion.div>
                            )}
                            </AnimatePresence>
                        </Form>

                        {/* Navigation Buttons */}
                        <div className="mt-[0.5rem] mb-[1.275rem] flex flex-col gap-[1rem] justify-center w-full">
                            {step === 1 ? (
                            <button
                                type="button"
                                onClick={handleNext}
                                className="text-shadow-lg/30 text-shadow-black w-full bg-primary hover:bg-primaryHover rounded-2xl pt-2 pb-2"
                            >
                                Next
                            </button>
                            ) : step === 2 ? (
                            <>
                                <button
                                type="button"
                                onClick={handleNext}
                                className="text-shadow-lg/30 text-shadow-black w-full bg-primary hover:bg-primaryHover rounded-2xl pt-2 pb-2"
                                >
                                Next
                                </button>
                                <button
                                type="button"
                                onClick={handlePrev}
                                className="text-shadow-lg/30 text-shadow-black w-full border border-secondary hover:bg-secondary rounded-2xl pt-2 pb-2"
                                >
                                Prev
                                </button>
                            </>
                            ) : step === 3 ? (
                            <>
                                <button
                                type="button"
                                onClick={handleFinalSubmit}
                                className="text-shadow-lg/30 text-shadow-black w-full bg-primary hover:bg-primaryHover rounded-2xl pt-2 pb-2"
                                >
                                Submit
                                </button>
                                <button
                                type="button"
                                onClick={handlePrev}
                                className="text-shadow-lg/30 text-shadow-black w-full border border-secondary hover:bg-secondary rounded-2xl pt-2 pb-2"
                                >
                                Prev
                                </button>
                            </>
                            ) : null}
                        </div>
                    </div>
                );
            }
        }
        </Formik>
    )
}

const InputField = ({ 
    label, 
    name, 
    type= "text",
    customLabel
}: {
    label: string;
    name: string;
    type?: string;
    customLabel?: string
}) => (
    <Field name={name}>
        {({ field, meta} : any) => {
            return (
                <div className="w-full ">
                    <p className="ml-[0.5rem] mb-[0.25rem] text-[1.375rem] font-light">{customLabel ? customLabel : label}</p>
                    <input
                        {...field} 
                        type={type}
                        className={`w-full rounded-lg p-[0.25rem] text-black text-[1.125rem] pl-[1rem] ${meta.touched && meta.error ? 'border-[2px] border-red-500 focus:border-none' : 'border border-gray-300'}`}
                    />
                    {meta.touched && meta.error && (
                        <div className="text-red-500 text-[.75rem] mt-1 ml-2">{meta.error}</div>
                    )}
                </div> 
            );
        }}
    </Field>
);

const SelectField = ({
    label,
    name,
    type = "text",
    options
}: {
    label: string;
    name: string;
    type?: string;
    options: string[];
}) => (
    <Field name={name}>
        {({ field, meta }: any) => {
            return (
                <div className="relative w-full">
                    <p className="ml-[0.5rem] mb-[0.25rem] text-[1.375rem] font-light">{label}</p>
                    <select
                        {...field}
                        name={name}
                        value={field.value}
                        className={`w-full rounded-lg p-[0.25rem] text-black text-[1.125rem] pl-[1rem] appearance-none ${meta.touched && meta.error ? 'border-[2px] border-red-500 focus:border-none' : 'border border-gray-300'}`}
                    >
            
                        <option value="">Select {label}</option>
                        {options.map((option, idx) => (
                            <option key={idx} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                    <div className="pointer-events-none absolute text-black right-3 top-[2.7rem] sm:right-5 md:right-7 lg:right-8 xl:right-12">
                    ▼
                    </div>
                    {meta.touched && meta.error && (
                        <div className="text-red-500 text-[.75rem] mt-1 ml-2">{meta.error}</div>
                    )}
                </div>
            )
        }}
    </Field>    
);