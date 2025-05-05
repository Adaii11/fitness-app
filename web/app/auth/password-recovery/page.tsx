'use client'


export default function passwordRecovery () {
    return (
        <form className="flex flex-col items-center justify-center gap-[0.5rem]">
        <p className="text-[1.125rem] font-extrathin text-left pl-4 pr-4 sm:pl-5 sm:pr-5 md:pl-6 md:pr-6 lg:pl-7 lg:pr-7 xl:pl-8 xl:pr-8 2xl:pl-10 2xl:pr-10 mb-[0.5rem] font-medium">Enter the email associated with your account and we'll send you an email to reset your password</p>
        <div className="w-full pl-2 pr-2 md:pl-4 md:pr-4 lg:pl-6 lg:pr-6 xl:pl-8 xl:pr-8 2xl:pl-9 2xl-pr-9">
                <p className="ml-[0.5rem] mb-[0.25rem] text-[1.375rem] font-light">Email</p>
                <input className="w-full rounded-lg p-[0.25rem] text-black text-[1.125rem] pl-[1rem]"></input>
            </div>
            <div className="mt-[0.5rem] mb-[1.275rem] flex justify-center w-full pl-3 pr-3 md:pl-4 md:pr-4 lg:pl-6 lg:pr-6 xl:pl-8 xl:pr-8 2xl:pl-10 2xl-pr-10">
                <button className="text-shadow-lg/30 text-shadow-black w-full bg-primary hover:bg-primaryHover rounded-2xl pt-2 pb-2">Send Email</button>
            </div>      
        </form>
    );
}