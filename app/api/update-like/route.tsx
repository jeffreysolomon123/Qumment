import { supabaseAdmin } from "@/lib/supabase/service";

export async function PATCH(req: Request) {
    try {
        const body = await req.json();
        const { id, column } = body;

        // Validate inputs
        if (!id || !["likes", "dislikes"].includes(column)) {
            return new Response(JSON.stringify({ message: "Invalid request" }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }

        // Define the shape of the data explicitly
        type CommentStats = {
            likes: number | null;
            dislikes: number | null;
        };

        // Fetch current value of likes/dislikes
        const { data, error: fetchError } = await supabaseAdmin
            .from("comments")
            .select("likes, dislikes")
            .eq("id", id)
            .single<CommentStats>();

        if (fetchError || !data) {
            return new Response(JSON.stringify({ message: "Comment not found" }), {
                status: 404,
                headers: { "Content-Type": "application/json" },
            });
        }

        // Update the value
        const newCount = (data[column as keyof CommentStats] || 0) + 1;

        const { error: updateError } = await supabaseAdmin
            .from("comments")
            .update({ [column]: newCount })
            .eq("id", id);

        if (updateError) {
            return new Response(JSON.stringify({ message: "Failed to update" }), {
                status: 500,
                headers: { "Content-Type": "application/json" },
            });
        }

        return new Response(
            JSON.stringify({ message: "Updated successfully", [column]: newCount }),
            {
                status: 200,
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
            }
        );
    } catch (error) {
        return new Response(JSON.stringify({ message: "Server error", error }), {
            status: 500,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
        });
    }
}
