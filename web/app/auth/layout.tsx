'use client'
import Link from "next/link"

import { usePathname } from "next/navigation"


export default function auth({children}: {children: React.ReactNode}) {
    const pathname = usePathname();

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary via-tertiary3 to-secondary flex flex-col items-center justify-center">
            <div className="w-[18rem] sm:w-[20rem] md:w-[24rem] lg:w-[28rem] xl:w-[32rem] h-auto">
                <img 
                    src='/peak-logo.svg'
                    alt="Logo"
                    width={1024}
                    height="auto"
                />
            </div>
            <div className="w-[22rem] sm:w-[24rem] md:w-[26rem] lg:w-[28rem] xl:w-[30rem] 2xl:w-[32rem] h-auto bg-gray-700 mb-[0.5rem] rounded-lg px-4">
                <h4 className="text-center mt-[1rem] mb-[1rem] font-bold text-[1.5rem] leading-snug sm:leading-tight sm:text-[1.875rem] pl-8 pr-8">Climb The Steps To Better Health</h4>
                {children}
            </div>
            {pathname === '/auth/login' ? (
                <>
                <div>
                    <Link href="/auth/password-recovery" className="hover:text-primaryHover">Forgot Password?</Link>
                </div>
                </>
            ) : pathname === '/auth/password-recovery' ? (
                <>
                <div>
                    <Link href="/auth/login" className="hover:text-primaryHover">Back To Login</Link>
                </div>
                </>
            ) : pathname === '/auth/create-account' ? (
                <>
                <div>
                    <Link href='/auth/login' className="hover:text-primaryHover">Back To Login</Link>
                </div>
                </>
            ) : null}
            
        </div>
    )

}