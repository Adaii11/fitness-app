'use client'

import Link from 'next/link';
import {useState, useEffect} from 'react';
import { useRouter } from 'next/navigation';
import {Menu, X, User} from 'lucide-react';
import { getToken } from '@/app/utils/auth';


export default function dashboard({children}: {children: React.ReactNode}) {
    
    const [menuOpen, setMenuOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const token = getToken();

        if(!token) {
            router.replace('/auth/login');
            return;
        } 

        try {
            setLoading(false);
        } catch(err) {
            router.replace('/auth/login');
        }

    }, [router]);

    if(loading) {
        return (
            <div className="w-full min-h-screen flex items-center justify-center text-white text-lg">
                Checking Autorization...
            </div>
        )
    }

    return (

        <div className="w-full min-h-screen flex flex-col bg-gradient-to-b from-black via-black to-tertiary">
            {/* our navbar */}
            <nav className="w-full max-w-[62.5rem] left-0 right-0 mx-auto flex flex-row items-center place-content-between py-[0.5rem] px-[1rem] fixed">
                <div>
                    <img
                        src='/PEAK.svg'
                        alt="Logo"
                        width={120}
                        height="auto"
                    />
                </div>
                <div className="hidden md:flex flex-row items-center space-evenly text-[1.875rem] font-light gap-[1.5rem]">
                    <Link href="/dashboard/main">Home</Link>
                    <Link href="/dashboard/main/nutrition">Nutrition</Link>
                    <Link href="/dashboard/main/workout">Workouts</Link>
                    <div className="w-[0.1rem] h-[2rem] mx-[0.5rem] border border-white"></div>
                    <Link className="bg-[#111] px-[0.25rem] py-[0.25rem] border-[0.1rem] rounded-[50%]" href="dashboard/main/account-settings"><User size={24}/></Link>
                </div>

                <div className="md:hidden">
                    <button onClick={() => setMenuOpen(!menuOpen)}>
                        {menuOpen ? <X size={38} /> : <Menu size={38} />}
                    </button>
                </div>

                {menuOpen && (
                    <div className="absolute top-[4.5rem] left-0 w-full bg-black px-4 py-2 flex flex-col gap-4 md:hidden">
                        <Link href="/dashboard/main" onClick={() => setMenuOpen(false)}>Home</Link>
                        <Link href="/dashboard/main/nutrition" onClick={() => setMenuOpen(false)}>Nutrition</Link>
                        <Link href="/dashboard/main/workout" onClick={() => setMenuOpen(false)}>Workouts</Link>
                        <Link href="/dashboard/main/account-settings" onClick={() => setMenuOpen(false)}>SVG</Link>
                    </div>
                )}


                
            </nav>
            
            {/* This will display the children, only property needed here is the padding-top */}
            <div className="pt-[6rem] flex-grow">
                {children}
            </div>
            


            {/* Footer content*/}
            <footer className="w-full text-sm text-white text-center py-4 bg-black border-t border-white">
                <p>© {new Date().getFullYear()} Peak Fitness. All rights reserved.</p>
            </footer>
        </div>
    )
}