import { Qumment } from "@/components/Comments";
import { Button } from "@/components/ui/button";
interface Props {
  params: {
    projectSlug: string;
    threadSlug: string;
  };
}

export default async function CommentsPage({ params }: Props) {
  const { projectSlug, threadSlug } = await params; // ← Add await
  return (
    <div className="m-0">
      <Qumment projectSlug={projectSlug} threadSlug={threadSlug} />
    </div>
  );
}
