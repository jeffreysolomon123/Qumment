import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // or use anon key if appropriate
);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("=== CREATE THREAD START ===");
    console.log("Request body:", body);

    // Example of getting server-side user (if using service key, this will not reflect client cookie)
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      // If you rely on the currently signed-in user's cookies, use auth-helpers
      console.log("authError or no user:", authError);
      // return appropriate response
    }

        const { title, projectId: projectSlug } = body;  // Rename for clarity
        if (!title || !projectSlug) {
            return new Response(JSON.stringify({
                message: "Missing title or projectSlug"
            }), { status: 400, headers: { "Content-Type": "application/json" } });
        }

        // 🔑 FIX: Convert project slug → UUID
        const { data: project, error: projectError } = await supabase
            .from("projects")
            .select("id")
            .eq("slug", projectSlug)  // Assuming your projects table has a 'slug' column
            .single();

        if (projectError || !project) {
            console.log("Project lookup failed:", projectError);
            return new Response(JSON.stringify({
                message: `Project not found: ${projectSlug}`,
                error: projectError?.message
            }), { 
                status: 404, 
                headers: { "Content-Type": "application/json" } 
            });
        }

        const projectUuid = project.id;  // This is the UUID your threads table expects

        // Generate unique identifier...
        let identifierName = '';
        let isUnique = false;
        let attempts = 0;
        const maxAttempts = 50;

        while (!isUnique && attempts < maxAttempts) {
            attempts++;
            const random4Digit = Math.floor(1000 + Math.random() * 9000);
            const candidate = (title.toLowerCase() + random4Digit).replace(/\s/g, '');

            const { data: existing } = await supabase
                .from("threads")
                .select("id")
                .eq("identifier", candidate)
                .maybeSingle();

            if (!existing) {
                identifierName = candidate;
                isUnique = true;
            }
        }

        if (!isUnique) {
            return new Response(JSON.stringify({
                message: "Could not generate unique identifier"
            }), { status: 500, headers: { "Content-Type": "application/json" } });
        }

        // Use projectUuid instead of projectSlug
        const { error: insertError } = await supabase.from("threads").insert({
            project_id: projectUuid,  // ← UUID, not slug!
            identifier: identifierName,
            title: title,
        });

        if (insertError) {
            return new Response(JSON.stringify({
                message: "Database insert failed",
                error: insertError.message
            }), { 
                status: 500, 
                headers: { "Content-Type": "application/json" } 
            });
        }

        return new Response(JSON.stringify({
            message: "Thread created successfully",
            project_id: projectUuid,
            identifier: identifierName,
            title: title,
        }), { 
            status: 201, 
            headers: { "Content-Type": "application/json" } 
        });

    } catch (error) {
        console.error("CREATE THREAD ERROR:", error);
        return new Response(JSON.stringify({
            message: "Internal server error"
        }), { 
            status: 500, 
            headers: { "Content-Type": "application/json" } 
        });
    }
}
