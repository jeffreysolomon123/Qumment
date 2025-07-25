import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import NavBar from "@/components/NavBar";
import Sidebar from "@/components/Sidebar";




export default async function CommentsPage() {

    return (
        <div className="min-h-screen flex flex-col">
            <NavBar isLogoutVisible={true}/>

            <div className="flex-1 flex justify-center ">
                <div className="flex w-full">
                    {/* Sidebar */}
                    <aside className="w-16 sm:w-64 bg-[#121212] border-[#212121]  transition-all duration-300">
                        <Sidebar isActivePage={"comments"} />
                    </aside>

                    {/* Main content */}
                    <main className="flex-1 p-6 bg-[#121212] border-[#212121] border-l-2 w-16">
                        Comments
                    </main>
                </div>
            </div>
        </div>
    );
}
