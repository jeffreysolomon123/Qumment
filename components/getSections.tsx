"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { createClient } from "@/lib/supabase/client";
import getTimeAgo from "@/utils/getDate";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight, Plus } from "lucide-react";
import Link from "next/link";

interface Section {
  id: string;
  title: string;
  identifier: string;
  user_id?: string;
  project_id?: string;
  project_slug?: string;
  created_at: string;
}

export default function Sections({ projectSlug }: { projectSlug: string }) {
  const user = useAuthStore((state) => state.user);
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // DEBUG: show what projectSlug and user look like
    console.log("[Sections] mount — projectSlug:", projectSlug, "user:", user);

    const fetchSections = async () => {
      setLoading(true);
      setError(null);

      try {
        const supabase = createClient();

        // 1) Try querying by project_slug (if that column exists)
        console.log("[Sections] trying project_slug query with", projectSlug);
        let { data, error } = await supabase
          .from("threads")
          .select("*")
          .eq("project_slug", projectSlug);

        // If we got rows, use them
        if (data && data.length > 0) {
          console.log("[Sections] found via project_slug:", data);
          setSections(data as Section[]);
          setLoading(false);
          return;
        }

        // If there was an error that's not "no rows", log it (but continue to try project lookup)
        if (error) {
          console.warn(
            "[Sections] project_slug query returned error (will try project lookup):",
            error
          );
        } else {
          console.log(
            "[Sections] no rows with project_slug, will try project lookup by slug..."
          );
        }

        // 2) Look up the project UUID by slug in `projects` table
        const projectRes = await supabase
          .from("projects")
          .select("id")
          .eq("slug", projectSlug)
          .limit(1)
          .single();

        if (projectRes.error) {
          // If the project doesn't exist or permission error
          console.warn("[Sections] project lookup error:", projectRes.error);
          setError(projectRes.error.message ?? "Project lookup failed");
          setSections([]);
          setLoading(false);
          return;
        }

        const projectId = projectRes.data?.id;
        if (!projectId) {
          console.log("[Sections] project not found for slug:", projectSlug);
          setSections([]);
          setLoading(false);
          return;
        }

        console.log(
          "[Sections] found projectId:",
          projectId,
          "– querying threads.project_id..."
        );
        const threadsRes = await supabase
          .from("threads")
          .select("*")
          .eq("project_id", projectId);

        if (threadsRes.error) {
          console.error(
            "[Sections] error querying threads by project_id:",
            threadsRes.error
          );
          setError(threadsRes.error.message ?? "Error fetching sections");
          setSections([]);
        } else if (threadsRes.data) {
          console.log(
            "[Sections] fetched threads via project_id:",
            threadsRes.data
          );
          setSections(threadsRes.data as Section[]);
        } else {
          console.log("[Sections] no threads found for projectId:", projectId);
          setSections([]);
        }
      } catch (err: any) {
        console.error("[Sections] unexpected error:", err);
        setError(err?.message ?? String(err));
        setSections([]);
      } finally {
        setLoading(false);
      }
    };

    // Decide whether to fetch:
    // - If sections are public, fetch immediately
    // - If sections require an authenticated user, wait until user exists
    // Here we fetch regardless (but if your backend requires cookies/session,
    // you can gate by user presence)
    fetchSections();
  }, [projectSlug, user]);

  return (
    <div className="mt-4 text-white">
      {loading ? (
        <div className="flex w-full flex-col gap-5">
          {[1, 2, 3].map((_, i) => (
            <Card
              key={i}
              className="h-[73px] w-full rounded-lg border-[#2F2F2F] border-2 bg-[#252525] p-4 animate-pulse"
            >
              <div className="flex flex-col h-full justify-between space-y-3">
                <div className="h-2 bg-[#3a3a3a] rounded w-2/3" />
                <div className="flex items-center gap-2">
                  <div className="h-2 bg-[#3a3a3a] rounded w-1/3" />
                  <div className="h-2 bg-[#3a3a3a] rounded w-12" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : error ? (
        <div className="text-red-400">Error: {error}</div>
      ) : (
        <>
          {sections.length > 0 ? (
            <div className="flex flex-col w-full gap-4">
              {sections.map((section) => (
                <Link
                  href={`/dashboard/projects/${projectSlug}/section/${section.identifier}/comments`}
                  key={section.id}
                >
                  <Card className="group w-full rounded-lg border-[#2F2F2F] border-2 mona-sans-regular cursor-pointer bg-[#252525] hover:bg-[#292929] hover:border-[#353535] transition-all duration-200">
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <CardTitle className="mona-sans-regular text-md flex flex-col md:flex-row items-start justify-between w-full">
                          <p>{section.title}</p>

                          <div className="flex items-center gap-2">
                            <p className="text-left ">{section.identifier}</p>
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                navigator.clipboard.writeText(
                                  section.identifier
                                );
                              }}
                              className="text-sm text-blue-400 hover:text-blue-500 transition"
                            >
                              Copy
                            </button>
                          </div>

                          <p>Created at: {getTimeAgo(section.created_at)}</p>
                        </CardTitle>

                        <ChevronRight className="ml-5 text-[#868686] group-hover:text-white group-hover:translate-x-1 transition-all duration-200" />
                      </div>
                    </CardHeader>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <Link href={`/dashboard/projects/${projectSlug}/new-section`}>
              <Card className="group pt-7 pb-6 w-full rounded-lg border-[#2F2F2F] border-2 mona-sans-regular cursor-pointer bg-[#252525] hover:bg-[#292929] hover:border-[#353535] transition-all duration-200">
                <div className="flex items-center justify-center gap-3 flex-col">
                  <Plus className="text-3xl scale-110" />
                  <CardContent>Create a new Comment Section</CardContent>
                </div>
              </Card>
            </Link>
          )}
        </>
      )}
    </div>
  );
}
