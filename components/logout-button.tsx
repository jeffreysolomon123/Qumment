"use client";

import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();

  const logout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/auth/login");
  };

  return <Button className="bg-red-700 hover:bg-red-700 shadow-inner-lg h-8 text-white mona-sans-regular text-md" onClick={logout}>Logout</Button>;
}
