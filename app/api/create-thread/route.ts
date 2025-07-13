import {createClient} from "@/lib/supabase/server";


export async function POST (request :Request) {
    try {
        const body = await request.json();
        const supabase = await createClient();
        const {data, error} = await supabase.auth.getUser();
        if (error || !data?.user) {
            return new Response(JSON.stringify(
                {message: "Unauthorized - User not logged in"}
            ));
        }
        const {title, projectId} = body;
        if (!title || !projectId) {
            return new Response(JSON.stringify({
                message: "Missing field : Title or projectId of the thread"
            }), {
                status: 400
            })
        }

        let identifierName = ''
        let isUnique = false;

        while (!isUnique) {
            const random4Digit = Math.floor(1000 + Math.random() * 9000);
            const candidate = (title.toLowerCase() + random4Digit).replace(/\s/g, '');

            const {data: existing} = await supabase
                .from("threads")
                .select("id")
                .eq("identifier", candidate)
                .single();

            if (!existing) {
                identifierName = candidate;
                isUnique = true;
            }

        }
        const {error: insertError} = await supabase.from("threads").insert({
            project_id: projectId,
            identifier: identifierName,
            title: title,
        })

        if (insertError) return new Response(JSON.stringify({
            message: "Error in pushing new thread to database",
            error: insertError.message,
        }), {
            status: 500,
            headers: {"Content-Type": "application/json"}
        })
        return new Response(JSON.stringify({
            message: "Successfully created thread",
            project_id : projectId,
            identifier: identifierName,
            title: title,
        }), {
            status: 200,
            headers: {"Content-Type": "application/json"}
        })
    }
    catch (error) {
        return new Response(JSON.stringify({
            message: error instanceof Error ? error.message : String(error),

        }), {
            headers: { "Content-Type": "application/json" }
        })
    }
}