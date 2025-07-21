import {createClient} from "@/lib/supabase/server";


export async function POST(request:Request) {
    try {
        const body = await request.json();
        const supabase = await createClient();

        const { data, error } = await supabase.auth.getUser();
        if (error || !data?.user) {
            return new Response(JSON.stringify({
                message : "Unauthorized - User not logged in"
            }))
        }

        const {name} = body;
        if(!name) {
            return new Response(JSON.stringify({
                message : "Missing field : Name "
            }), {
                status: 400
            })
        }

        const {error : insertError} = await supabase.from("projects").insert({
            name : name,
        })

        if(insertError) return new Response(JSON.stringify({
            message : "Error in pushing new name to database",
            error : insertError.message,
        }), {
            status : 500,
        })

        return new Response(JSON.stringify({
            message : "Successfully created project",
        }), {
            status : 200,
            headers: { "Content-Type": "application/json" }
        })
    }
    catch (error) {
        return new Response(JSON.stringify({
            message : error instanceof Error ? error.message : String(error),
        }),{
            headers: { "Content-Type": "application/json" }
        })
    }

}
