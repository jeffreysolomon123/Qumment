// app/dashboard/projects/[projectSlug]/section/[threadSlug]/comments/page.tsx

import QummentCommentsClient from "./QummentCommentsClient";

interface Props {
  params: Promise<{
    projectSlug: string;
    threadSlug: string;
  }>;
}

export default async function CommentsPage({ params }: Props) {
  const { projectSlug, threadSlug } = await params; // ✅ await params

  return (
    <div className="m-0 h-screen bg-white">
      <QummentCommentsClient
        projectSlug={projectSlug}
        threadSlug={threadSlug}
      />
    </div>
  );
}
