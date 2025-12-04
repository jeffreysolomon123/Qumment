import { ThreadForm } from "@/components/ThreadForm";

type ParamsShape = {
  params: {
    projectSlug: string;
  };
};

export default async function NewSectionPage(
  paramsPromise: Promise<ParamsShape>
) {
  const { params } = await paramsPromise;
  const { projectSlug } = params;
  return (
    <div className="flex flex-col justify-center items-center h-1/3 md:h-full">
      <h1 className="">Enter Comment Section name: </h1>
      <h2>{projectSlug}</h2>
      <ThreadForm projectId={projectSlug} />
    </div>
  );
}
