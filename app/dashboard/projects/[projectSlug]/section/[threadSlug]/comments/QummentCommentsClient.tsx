// app/dashboard/projects/[projectSlug]/section/[threadSlug]/comments/QummentCommentsClient.tsx
"use client";

import { Qumment } from "qumment";

export default function QummentCommentsClient({
  projectSlug,
  threadSlug,
}: {
  projectSlug: string;
  threadSlug: string;
}) {
  return (
    <div className="m-0 bg-white">
      <Qumment projectSlug={projectSlug} threadSlug={threadSlug} />
    </div>
  );
}
