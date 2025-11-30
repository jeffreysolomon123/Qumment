import { ThreadForm } from "@/components/ThreadForm";

type Props = { params: { projectSlug: string } };

export default async function NewSectionPage(props: Props | Promise<Props>) {
  const { params } = await props;
  const projectId = params.projectSlug;
  return (
    <div className="flex flex-col justify-center items-center h-1/3 md:h-full">
      <h1 className="">Enter Comment Section name: </h1>
      <h2>{projectId}</h2>
      <ThreadForm projectId={projectId} />
    </div>
  );
}
