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
                message : "Missing field : Name of the project"
            }), {
                status: 400
            })
        }



            const random4Digit = Math.floor(1000 + Math.random() * 9000);
            let slugName='';
            let isUnique = false;

            while (!isUnique) {
                const random4Digit = Math.floor(1000 + Math.random() * 9000);
                const candidate = (name.toLowerCase() + random4Digit).replace(/\s/g, '');

                const { data: existing } = await supabase
                    .from("projects")
                    .select("id")
                    .eq("slug", candidate)
                    .single();

                if (!existing) {
                    slugName = candidate;
                    isUnique = true;
                }
            }


            const {error : insertError} = await supabase.from("projects").insert({
                user_id : data?.user?.id,
                name : name,
                slug : slugName,
            })

            if(insertError) return new Response(JSON.stringify({
                message : "Error in pushing new project to database",
                error : insertError.message,
            }), {
                status : 500,
            })

            return new Response(JSON.stringify({
                message : "Successfully created project",
                slug: slugName,
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