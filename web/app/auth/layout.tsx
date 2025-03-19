'use client'

import { usePathname } from "next/navigation";
import Link from 'next/link'

export default function auth({children}: {children: React.ReactNode}) {

    const pathname = usePathname();


    return (
        <div className="flex min-h-screen min-w-screen bg-gradient-to-t from-sky-800 to-black">
            <div className="flex flex-col justify-center items-center w-full md:w-1/2 p-8">
                <div className="w-1/2 max-w-md flex">
                    <img className="mr-auto ml-auto mb-20" src="/optimal-logo.svg" alt="app-name-logo"/>
                </div>
                <div className="w-1/2 max-w-md p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md">
                    {children}
                </div>
                <div className="mt-2 flex flex-row w-1/2 max-w-md justify-between">
                    { pathname === "/auth/login" ? (
                        <>
                            <Link href="/auth/forgot-pw">Forgot Password?</Link>
                            <Link href="/auth/register">Create Account</Link>
                        </>
                    ) : pathname === '/auth/register' ? (
                        <>
                            <Link href="/auth/forgot-pw">Forgot Password?</Link>
                            <Link href="/auth/login">Login</Link>
                        </>
                    ) :
                    null}
                </div>
            </div>
            
            <div className="w-1/2 max-w hidden md:block p-6 bg-[url('/images/background-photo.jpg')] bg-cover bg-center">
            </div>
        </div>
    )

}