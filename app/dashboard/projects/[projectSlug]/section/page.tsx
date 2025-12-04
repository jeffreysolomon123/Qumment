// app/dashboard/projects/[projectSlug]/section/page.tsx
import Sections from "@/components/getSections";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type ParamsShape = {
  params: {
    projectSlug: string;
  };
};

export default async function CommentsPage(
  paramsPromise: Promise<ParamsShape>
) {
  const { params } = await paramsPromise; // await the Promise param
  const { projectSlug } = params;

  return (
    <div className="text-white">
      <div className="flex justify-between items-center">
        <Link href={`/dashboard/projects/${projectSlug}/section/new-section`}>
          <Button className="shadow-inner-lg mona-sans-semibold main-color-bg text-white rounded-lg hover:scale-95 transition-transform duration-150 hover:bg-[#6C0E82]">
            New Comment Section
          </Button>
        </Link>
      </div>
      <Sections projectSlug={projectSlug} />
    </div>
  );
}
