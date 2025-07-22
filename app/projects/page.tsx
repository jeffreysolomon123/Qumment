import NavBar from "@/components/NavBar";
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import {createClient} from "@/lib/supabase/server";
import {redirect} from "next/navigation";
import Link from "next/link";
import {
    Card, CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {ChevronRight, Plus} from "lucide-react";


export default async function ProjectsPage() {

    const supabase = await createClient();
    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError || !userData?.user) {
        redirect("/auth/login");
    }

    const { data: projects, error: projectsError } = await supabase
        .from("projects")
        .select("id, name, slug")
        .eq("user_id", userData.user.id);

    if(projectsError) {
        console.error("Error fetching projects:", projectsError);
    }


    return (
        <div className="min-h-screen flex flex-col">
            <NavBar isLogoutVisible={true} />
            <div className="flex-1 flex justify-center">
                <div className="flex w-full">
                    <aside className="w-16 sm:w-64 bg-[#121212] border-[#212121] transition-all duration-300">
                        <Sidebar isActivePage={"projects"} />
                    </aside>
                    <main className="flex-1 p-3 sm:p-10 bg-[#121212] border-[#212121] border-l-2 w-16">
                        <Button className="bg-[#6C0E82] text-white text-sm mona-sans-regular shadow-inner-lg rounded-sm hover:bg-[#540965] h-[32px]">
                            New Project
                        </Button>

                    </main>
                </div>
            </div>
        </div>
    );
}
