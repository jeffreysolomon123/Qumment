import Link from "next/link";
import { Button } from "./ui/button";
import { createClient } from "@/lib/supabase/server";
import { LogoutButton } from "./logout-button";

export async function AuthButton() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user ? (
    <div className="flex items-center gap-4">
      Hey, {user.email}!
      <LogoutButton />
    </div>
  ) : (
    <div className="flex gap-2">
      <Button asChild size="sm" className="bg-transparent hover:bg-transparent text-white">
        <Link href="/auth/login">Sign in</Link>
      </Button>
      <Button asChild size="sm" className="main-color-bg hover:bg-[#6C0E82]">
        <Link href="/auth/sign-up" className="text-white">Get Started</Link>
      </Button>
    </div>
  );
}
