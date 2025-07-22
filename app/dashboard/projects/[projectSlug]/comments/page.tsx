//import { useParams } from 'next/navigation'; // For client component
// OR for server components:
import { notFound } from 'next/navigation';

interface Props {
    params: { projectSlug: string };
}

export default function CommentsPage({ params }: Props) {
    const { projectSlug } = params;

    // You can now fetch comments or data for this project using projectSlug
    return (
        <div className="text-white p-4">
            <h1 className="text-xl font-bold">Comments for Project: {projectSlug}</h1>
            {/* Render your comment section here */}
        </div>
    );
}
