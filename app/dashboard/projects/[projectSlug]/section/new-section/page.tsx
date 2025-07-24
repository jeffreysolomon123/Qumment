
import {ThreadForm} from "@/components/ThreadForm";

interface Props {
    params : {
        projectSlug : string
    }
}

export default function NewSectionPage({ params }: Props) {
    const projectId  = params.projectSlug;
    return(
        <div className="flex flex-col justify-center items-center h-1/3 md:h-full">
            <h1 className="">Enter Comment Section name: </h1>
            <ThreadForm projectId={projectId} />
        </div>
    )
}