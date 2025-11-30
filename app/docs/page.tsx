import React from 'react'
import NavBar from "@/components/NavBar";
import Sidebar from "@/components/Sidebar";

const Page = () => {
    return (
        <div className="min-h-screen flex flex-col mona-sans-regular">
            <NavBar isLogoutVisible={true} />

            {/* Responsive wrapper with side space only on large screens */}
            <div className="flex-1 flex justify-center ">
                <div className="flex w-full">
                    <aside className="w-16 sm:w-64 bg-[#121212] border-[#212121]  transition-all duration-300">
                        <Sidebar />
                    </aside>

                    <main className="flex-1 p-6 bg-[#121212] border-[#212121] border-l-2 w-16">
                        <h1>How </h1>
                    </main>
                </div>
            </div>
        </div>
    )
}
export default Page
