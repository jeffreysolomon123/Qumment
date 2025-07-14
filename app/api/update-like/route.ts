import { supabaseAdmin } from "@/lib/supabase/service";

const CORS_HEADERS = {
    "Access-Control-Allow-Origin": "*", // Replace with your frontend domain in production
    "Access-Control-Allow-Methods": "GET,POST,PATCH,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
};

// CORS preflight handler
export async function OPTIONS() {
    return new Response(null, {
        status: 204,
        headers: CORS_HEADERS,
    });
}

// PATCH handler: update likes or dislikes
export async function PATCH(request: Request) {
    try {
        const { comment_id, field, increment } = await request.json();

        // ✅ Validate input
        if (
            !comment_id ||
            (field !== "likes" && field !== "dislikes") ||
            typeof increment !== "number"
        ) {
            return new Response(JSON.stringify({ message: "Invalid request" }), {
                status: 400,
                headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
            });
        }

        // ✅ Fetch current value
        const { data, error: fetchError } = await supabaseAdmin
            .from("comments")
            .select(field)
            .eq("id", comment_id)
            .single();

        if (fetchError || !data) {
            return new Response(JSON.stringify({ message: "Comment not found" }), {
                status: 404,
                headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
            });
        }

        const currentValue = data[field] || 0;
        const updatedValue = Number(currentValue) + increment;

        // ✅ Update field
        const { error: updateError } = await supabaseAdmin
            .from("comments")
            .update({ [field]: updatedValue })
            .eq("id", comment_id);

        if (updateError) {
            return new Response(JSON.stringify({ message: "Failed to update" }), {
                status: 500,
                headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
            });
        }

        return new Response(JSON.stringify({ message: "Updated successfully" }), {
            status: 200,
            headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
        });
    } catch (err) {
        console.error("PATCH error:", err);
        return new Response(JSON.stringify({ message: "Server error" }), {
            status: 500,
            headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
        });
    }
}
