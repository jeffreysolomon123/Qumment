import Projects from "@/components/getProjects"
import {Button} from "@/components/ui/button";
import Link from "next/link";

export default async function ProjectsPage() {
    return (
        <div>
            <Link href="/dashboard/projects/new-project"><Button className="shadow-inner-lg mona-sans-semibold main-color-bg text-white rounded-lg hover:scale-95 transition-transform duration-150 hover:bg-[#6C0E82] ">New Project</Button></Link>
            <Projects />
        </div>
    );
}
