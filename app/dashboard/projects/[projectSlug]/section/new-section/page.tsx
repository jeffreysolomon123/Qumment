import { ThreadForm } from "@/components/ThreadForm";

type ParamsShape = {
  params: {
    projectSlug: string;
  };
};

export default async function NewSectionPage({
  params,
}: {
  params: Promise<{ projectSlug: string }>;
}) {
  const { projectSlug } = await params;

  return (
    <div className="flex flex-col justify-center items-center h-1/3 md:h-full">
      <h1>Enter Comment Section name: </h1>
      <h2>{projectSlug}</h2>
      <ThreadForm projectId={projectSlug} />
    </div>
  );
}
