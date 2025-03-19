'use client'
import {useState, useEffect} from 'react';

export default function signUp() {

    const [stepState, setStepState] = useState(1);

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        age: "",
        sex: "",
        height: "",
        weight: "",
    });


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }


    const nextStep = () => setStepState(stepState + 1);
    const prevStep = () => setStepState(stepState - 1);


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        try {
          const response = await fetch("/api/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
          });
    
          if (!response.ok) throw new Error("Signup failed");
    
          console.log("User signed up successfully!");
        } catch (error) {
          console.error(error);
        }
      };



    return (
        <div className="flex flex-col gap-4 items-center justify-center">
            <h1 className="text-white text-2xl">Welcome</h1>
            <h5 className="text-white text-sm">Please fill out the information below</h5>
            {stepState === 1 && (
                <>
                    <div className="mt-5 flex flex-col size-full justify-center items-center">
                        <label className="w-full 2xl:w-3/4">First Name</label>
                        <input type="text" name="firstName" onChange={handleChange} className="text-center bg-transparent border-b-2 pb-1 focus:outline-none w-full 2xl:w-3/4"></input>
                    </div>
                    <div className="flex flex-col size-full justify-center items-center">
                        <label className="transition duration-100 ease w-full 2xl:w-3/4">Last Name</label>
                        <input type="text" name="lastName" onChange={handleChange} className="text-center bg-transparent border-b-2 pb-1 focus:outline-none transition w-full 2xl:w-3/4"></input>
                    </div>
                    <div className="flex flex-col size-full justify-center items-center">
                        <label className="transition duration-100 ease w-full 2xl:w-3/4">Email</label>
                        <input type="text" name="email" onChange={handleChange} className="text-center bg-transparent border-b-2 pb-1 focus:outline-none transition w-full 2xl:w-3/4"></input>
                    </div>
                    <div className="flex flex-col size-full justify-center items-center">
                        <label className="transition duration-100 ease w-full 2xl:w-3/4">Password</label>
                        <input type="text" name="password" onChange={handleChange} className="text-center bg-transparent border-b-2 pb-1 focus:outline-none transition w-full 2xl:w-3/4"></input>
                    </div>
                    <button onClick={nextStep} className="mt-4 rounded-full px-4 py-1 bg-sky-600 hover:bg-sky-500">Next</button>
                </>
            )}
            {stepState === 2 && (
                <>
                    <div className="mt-5 flex flex-col size-full justify-center items-center">
                        <label className="w-full 2xl:w-3/4">Age</label>
                        <input type="number" name="age" onChange={handleChange} className="text-center bg-transparent border-b-2 pb-1 focus:outline-none w-full 2xl:w-3/4"></input>
                    </div>
                    <div className="flex flex-col size-full justify-center items-center">
                        <label className="transition duration-100 ease w-full 2xl:w-3/4">Sex</label>
                        <input type="text" name="sex" onChange={handleChange} className="text-center bg-transparent border-b-2 pb-1 focus:outline-none transition w-full 2xl:w-3/4"></input>
                    </div>
                    <div className="flex flex-col size-full justify-center items-center">
                        <label className="transition duration-100 ease w-full 2xl:w-3/4">Height</label>
                        <input type="number" name="height" onChange={handleChange} className="text-center bg-transparent border-b-2 pb-1 focus:outline-none transition w-full 2xl:w-3/4"></input>
                    </div>
                    <div className="flex flex-col size-full justify-center items-center">
                        <label className="transition duration-100 ease w-full 2xl:w-3/4">Weight</label>
                        <input type="number" name="weight" onChange={handleChange} className="text-center bg-transparent border-b-2 pb-1 focus:outline-none transition w-full 2xl:w-3/4"></input>
                    </div>
                    <button onClick={prevStep} className="mt-4 rounded-full px-4 py-1 bg-sky-600 hover:bg-sky-500">Prev</button>
                    <button onClick={handleSubmit} className="mt-2 rounded-full px-4 py-1 bg-sky-600 hover:bg-sky-500">Create Account</button>
                </>
            )}
        </div>
    )
}