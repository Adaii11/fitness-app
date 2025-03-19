'use client'
import {useState} from 'react';

export default function signin() {

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value})
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch("/api/signin", {
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify(formData),
            });

            if (!response.ok) throw new Error("signup failed");

            console.log("user signed up successfully")
        } catch (error) {
            console.log(error)
        }
    };


    return (
        <div className="flex flex-col gap-4 items-center justify-center">
            <h1 className="text-white text-2xl">Welcome</h1>
            <h5 className="text-white text-sm">Enter your email and password</h5>
            <div className="mt-5 flex flex-col size-full justify-center items-center">
                <label className="w-full 2xl:w-3/4">Email</label>
                <input type="text" name="email" onChange={handleChange} className="bg-transparent border-b-2 pb-1 focus:outline-none w-full 2xl:w-3/4">
                </input>
            </div>
            <div className="flex flex-col size-full justify-center items-center">
                <label className="transition duration-100 ease w-full 2xl:w-3/4">Password</label>
                <input type="text" name="password" onChange={handleChange} className="bg-transparent border-b-2 pb-1 focus:outline-none transition w-full 2xl:w-3/4"></input>
            </div>
            
            <button className="mt-4 rounded-full px-4 py-1 bg-sky-600 hover:bg-sky-500">Sign In</button>
        </div>
    );
}


//bg-white dark:bg-gray-900