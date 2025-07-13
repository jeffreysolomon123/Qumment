import {supabaseAdmin} from "@/lib/supabase/service";


export async function GET(request: Request) {
    try {
        const {searchParams} = new URL(request.url);
        const project_id = searchParams.get("project_id");
        const thread_id = searchParams.get("thread_id");

        if (!project_id || !thread_id) {
            return new Response(JSON.stringify({
                message: "Missing required query parameters: project_id or thread_id"
            }), {
                status: 400,
                headers: { "Content-Type": "application/json" }
            });
        }

        const {data, error} = await supabaseAdmin.from("comments").select('id,parent_id, author_name,content,likes, dislikes, created_at').eq("project_id",project_id).eq("thread_id",thread_id).order("created_at", { ascending: true });

        if(error){
            console.error(error);
            return new Response(JSON.stringify({
                message: "Error in fetching comments"
            }), {
                status: 500,
                headers: { "Content-Type": "application/json" }
            })
        }

        return new Response(JSON.stringify({
            message : "Successfully fetched comments",
            comments : data,
        }), {
            status: 200,
            headers: { "Content-Type": "application/json" }
        })

    }
    catch (error) {
        return new Response(JSON.stringify({
            message : "Error in Get comments"
        }))
    }
}


export async function POST (request: Request) {
    try {
        const body = await request.json();
        const { project_id, thread_id, parent_id, author_name, content } = body;

        if(!thread_id || !project_id || !author_name || !content) {
            return new Response(JSON.stringify(
                {
                    message : "Missing field(s) in post comment"
                }
            ), {
                status: 400,
                headers: { "Content-Type": "application/json" }
            })
        }
        const {error} = await supabaseAdmin.from("comments").insert({
            thread_id : thread_id,
            project_id : project_id,
            parent_id : parent_id,
            author_name : author_name,
            content : content
        })

        if(error){
            return new Response(JSON.stringify({
                message : error.message,
                error : error
            }))
        }

        return new Response(JSON.stringify({
            message : "Successfully posted comment",
            thread_id : thread_id,
            project_id : project_id,
            parent_id : parent_id,
            author_name : author_name,
            content : content,
        }),{
            status : 200,
            headers: { "Content-Type": "application/json" }
        })



    }catch (error) {
        return new Response(JSON.stringify({
            message : "Error in posting comment",
            error : error,
        }))
    }
}