import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import NavBar from "@/components/NavBar";
import Sidebar from "@/components/Sidebar";




export default async function SeetingsPage() {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.getUser();

    if (error || !data?.user) {
        redirect("/auth/login");
    }

    return (
        <div className="min-h-screen flex flex-col">
            <NavBar isLogoutVisible={true} pushSideway={true}/>

            <div className="flex-1 flex justify-center ">
                <div className="flex w-full">
                    {/* Sidebar */}
                    <aside className="w-16 sm:w-64 bg-[#121212] border-[#212121]  transition-all duration-300">
                        <Sidebar isActivePage={"projects"} />
                    </aside>

                    {/* Main content */}
                    <main className="flex-1 p-6 bg-[#121212] border-[#212121] border-l-2 w-16">
                        Settings
                    </main>
                </div>
            </div>
        </div>
    );
}
