import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useAuthStore } from "@/store/useAuthStore";

export function useUserProjects() {
    const [projects, setProjects] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const user = useAuthStore((state) => state.user);

    useEffect(() => {
        const fetchProjects = async () => {
            if (!user?.id) return;
            const supabase = createClient();
            const { data, error } = await supabase
                .from("projects")
                .select("id, name, slug")
                .eq("user_id", user.id);

            if (error) {
                console.error("Error fetching projects:", error);
                setProjects([]);
            } else {
                setProjects(data);
            }

            setLoading(false);
        };

        fetchProjects();
    }, [user?.id]);

    return { projects, loading };
}
