'use client';

import { useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useAuthStore } from "@/store/useAuthStore"

export function SupabaseUserProvider() {
    const setUser = useAuthStore((state) => state.setUser);

    useEffect(() => {
        const getUser = async () => {
            const supabase = createClient();
            const { data } = await supabase.auth.getUser();
            if (data?.user) setUser(data.user);
        };

        getUser();
    }, []);

    return null; // No UI rendered
}
