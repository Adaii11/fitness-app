'use client';

import { Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import Link from "next/link";




export default function LoginPage() {

    const validationSchema = Yup.object({
        email: Yup.string().email('Wrong email').required('Email is required'),
        password: Yup.string().required('password is required')
    });

    return (
        <Formik
            initialValues={{
                email: '',
                password: '',
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
                console.log("Login submit: ", values); 
            }}
        >
            {({ handleBlur , values}) => (
                <Form className="flex flex-col items-center justify-center gap-[0.5rem]">
                    <InputField label="Email" name="email" type="email" />
                    <InputField label="Password" name="password" type="password" />
                        
                    
                    <div className="mt-[0.5rem] flex justify-center w-full pl-3 pr-3 md:pl-4 md:pr-4 lg:pl-6 lg:pr-6 xl:pl-8 xl:pr-8 2xl:pl-10 2xl-pr-10">
                        <button type='submit' className="text-shadow-lg/30 text-shadow-black w-full bg-primary hover:bg-primaryHover rounded-2xl pt-2 pb-2">Login</button>
                    </div>
                    <div className="mt-[0.5rem] mb-[1.275rem] flex justify-center w-full pl-3 pr-3 md:pl-4 md:pr-4 lg:pl-6 lg:pr-6 xl:pl-8 xl:pr-8 2xl:pl-10 2xl-pr-10">
                        <Link href="/auth/create-account" className="text-shadow-lg/30 text-shadow-black text-center w-full border border-secondary hover:bg-secondary rounded-2xl pt-2 pb-2">Create Account</Link>
                    </div>        
                </Form>
            )}
        </Formik>
    );
}

const InputField = ({ 
    label, 
    name, 
    type= "text"
}: {
    label: string;
    name: string;
    type?: string;
}) => (
    <Field name={name}>
        {({ field, meta} : any) => (
            <div className="w-full pl-2 pr-2 md:pl-4 md:pr-4 lg:pl-6 lg:pr-6 xl:pl-8 xl:pr-8 2xl:pl-10 2xl:pr-10">
                <p className="ml-[0.5rem] mb-[0.25rem] text-[1.375rem] font-light">{label}</p>
                <input
                    {...field} 
                    type={type}
                    className={`w-full rounded-lg p-[0.25rem] text-black text-[1.125rem] pl-[1rem] ${meta.touched && meta.error ? 'border-[2px] border-red-500 focus:border-none' : 'border border-gray-300'}`}
                />
                {meta.touched && meta.error && (
                    <div className="text-red-500 text-[.75rem] mt-1 ml-2">{meta.error}</div>
                )}
            </div>
        )}
    </Field>
);