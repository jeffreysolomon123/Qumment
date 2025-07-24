import { ThreadForm } from "@/components/ThreadForm";
import { type Metadata } from "next";

export default function NewSectionPage({
                                           params,
                                       }: {
    params: { projectSlug: string };
}) {
    const projectId = params.projectSlug;

    return (
        <div className="flex flex-col justify-center items-center h-1/3 md:h-full">
            <h1 className="">Enter Comment Section name:</h1>
            <ThreadForm projectId={projectId} />
        </div>
    );
}
