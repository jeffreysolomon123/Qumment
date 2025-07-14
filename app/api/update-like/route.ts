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
        const { comment_id, field, increment, reverseField, decrement } = await request.json();

        // ✅ Validate input
        const validFields = ["likes", "dislikes"];
        if (
            !comment_id ||
            !validFields.includes(field) ||
            typeof increment !== "number" ||
            (reverseField && !validFields.includes(reverseField)) ||
            (reverseField && typeof decrement !== "number")
        ) {
            return new Response(JSON.stringify({ message: "Invalid request" }), {
                status: 400,
                headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
            });
        }

        // ✅ Build update object
        const updateFields: Record<string, number> = {};
        updateFields[field] = increment;

        if (reverseField) {
            updateFields[reverseField] = -decrement;
        }

        // ✅ Run atomic update using Postgres math
        const { error } = await supabaseAdmin.rpc("increment_fields", {
            comment_id,
            likes_inc: field === "likes" ? increment : reverseField === "likes" ? -decrement : 0,
            dislikes_inc: field === "dislikes" ? increment : reverseField === "dislikes" ? -decrement : 0,
        });

        if (error) {
            console.error("Update error:", error);
            return new Response(JSON.stringify({ message: "Failed to update counts" }), {
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
