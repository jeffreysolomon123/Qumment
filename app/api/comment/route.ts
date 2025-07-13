import { supabaseAdmin } from "@/lib/supabase/service";

const CORS_HEADERS = {
    "Access-Control-Allow-Origin": "*", // Change to your frontend domain in production
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
};

export async function OPTIONS(req: Request) {
    return new Response(null, {
        status: 204,
        headers: CORS_HEADERS,
    });
}

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const project_id = searchParams.get("project_id");
        const thread_id = searchParams.get("thread_id");

        if (!project_id || !thread_id) {
            return new Response(
                JSON.stringify({ message: "Missing required query parameters: project_id or thread_id" }),
                {
                    status: 400,
                    headers: {
                        ...CORS_HEADERS,
                        "Content-Type": "application/json",
                    },
                }
            );
        }

        const { data, error } = await supabaseAdmin
            .from("comments")
            .select("id, parent_id, author_name, content, likes, dislikes, created_at")
            .eq("project_id", project_id)
            .eq("thread_id", thread_id)
            .order("created_at", { ascending: true });

        if (error) {
            console.error("Supabase error:", error);
            return new Response(JSON.stringify({ message: "Error in fetching comments" }), {
                status: 500,
                headers: {
                    ...CORS_HEADERS,
                    "Content-Type": "application/json",
                },
            });
        }

        return new Response(JSON.stringify({ message: "Successfully fetched comments", comments: data }), {
            status: 200,
            headers: {
                ...CORS_HEADERS,
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.error("Catch error:", error);
        return new Response(JSON.stringify({ message: "Error in Get comments" }), {
            status: 500,
            headers: {
                ...CORS_HEADERS,
                "Content-Type": "application/json",
            },
        });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { project_id, thread_id, parent_id, author_name, content } = body;

        if (!thread_id || !project_id || !author_name || !content) {
            return new Response(JSON.stringify({ message: "Missing field(s) in post comment" }), {
                status: 400,
                headers: {
                    ...CORS_HEADERS,
                    "Content-Type": "application/json",
                },
            });
        }

        const { error } = await supabaseAdmin.from("comments").insert({
            thread_id,
            project_id,
            parent_id,
            author_name,
            content,
        });

        if (error) {
            console.error("Supabase insert error:", error);
            return new Response(JSON.stringify({ message: error.message, error }), {
                status: 500,
                headers: {
                    ...CORS_HEADERS,
                    "Content-Type": "application/json",
                },
            });
        }

        return new Response(
            JSON.stringify({
                message: "Successfully posted comment",
                thread_id,
                project_id,
                parent_id,
                author_name,
                content,
            }),
            {
                status: 200,
                headers: {
                    ...CORS_HEADERS,
                    "Content-Type": "application/json",
                },
            }
        );
    } catch (error) {
        console.error("Catch error:", error);
        return new Response(JSON.stringify({ message: "Error in posting comment", error }), {
            status: 500,
            headers: {
                ...CORS_HEADERS,
                "Content-Type": "application/json",
            },
        });
    }
}
