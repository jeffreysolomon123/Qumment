import { LoginForm } from "@/components/login-form";
import {redirect} from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function Page() {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.getUser();
    if (data?.user) {
        redirect("/");
    }

    return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}
