//import { useParams } from 'next/navigation'; // For client component
// OR for server components:
import { notFound } from 'next/navigation';
import Sections from "@/components/getSections"
import {Button} from "@/components/ui/button";
import Link from "next/link";

interface Props {
    params: { projectSlug: string };
}

export default function CommentsPage({ params }: Props) {
    const { projectSlug } = params;

    return (
        <div className="text-white">
            <Link href='/dashboard/projects/${project.id}/section/new-section'><Button className="shadow-inner-lg mona-sans-semibold main-color-bg text-white rounded-lg hover:scale-95 transition-transform duration-150 hover:bg-[#6C0E82] ">New Comment Section</Button></Link>
            <Sections projectId={projectSlug} />
        </div>
    );
}
