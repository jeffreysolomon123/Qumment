"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { createClient } from "@/lib/supabase/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChevronRight, Plus } from "lucide-react";
import Link from "next/link";

interface Project {
  id: string;
  name: string;
  slug: string;
  user_id: string;
}

export default function Projects() {
  const user = useAuthStore((state) => state.user);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchProjects = async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("user_id", user.id);

      if (error) {
        console.error("Error fetching projects:", error.message);
      } else if (data) {
        setProjects(data);
      }

      setLoading(false);
    };

    fetchProjects();
  }, [user]);

  return (
    <div className="mt-3 md:mt-6 text-white space-y-2">
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[1, 2, 3].map((_, i) => (
            <Card
              key={i}
              className="h-[150px] w-full rounded-lg border-[#2F2F2F] border-2 bg-[#252525] p-4 animate-pulse"
            >
              <div className="h-4 bg-[#3a3a3a] rounded w-2/3 mb-2" />
              <div className="h-3 bg-[#3a3a3a] rounded w-1/3 mb-4" />
              <div className="h-3 bg-green-800 rounded w-1/4 mt-auto" />
            </Card>
          ))}
        </div>
      ) : (
        <>
          {projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {projects.map((project) => (
                <Link
                  href={`/dashboard/projects/${project.slug}/section`}
                  key={project.id}
                >
                  <Card className="group w-full rounded-lg border-[#2F2F2F] border-2 mona-sans-regular cursor-pointer bg-[#252525] hover:bg-[#292929] hover:border-[#353535] transition-all duration-200">
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <CardTitle className="mona-sans-semibold">
                          {project.name}
                        </CardTitle>
                        <ChevronRight className="text-[#868686] group-hover:text-white group-hover:translate-x-1 transition-all duration-200" />
                      </div>
                      <CardDescription>
                        <p>{project.slug}</p>
                      </CardDescription>
                    </CardHeader>
                    <CardFooter>
                      <p className="mona-sans-regular text-sm text-green-300">
                        Active
                      </p>
                    </CardFooter>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <Link href="/new-project">
              <Card className="group pt-7 pb-6 w-full md:w-1/3 rounded-lg border-[#2F2F2F] border-2 mona-sans-regular cursor-pointer bg-[#252525] hover:bg-[#292929] hover:border-[#353535] transition-all duration-200">
                <div className="flex items-center justify-center gap-3 flex-col">
                  <Plus className="text-3xl scale-110" />
                  <CardContent>Create a new Project</CardContent>
                </div>
              </Card>
            </Link>
          )}
        </>
      )}
    </div>
  );
}
