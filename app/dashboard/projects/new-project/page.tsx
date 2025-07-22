import {ProjectForm} from "@/components/ProjectForm";

export default function NewProjectPage () {
    return (
        <div className="flex flex-col justify-center items-center h-1/2 md:h-full">
            <h1 className="mona-sans-semibold mb-5">Create a new project</h1>
            <ProjectForm />
        </div>
    )
}