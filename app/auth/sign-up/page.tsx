import { SignUpForm } from "@/components/sign-up-form";
import {createClient} from "@/lib/supabase/server";
import {redirect} from "next/navigation";

export default async function Page() {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.getUser();
    if (data?.user) {
        redirect("/");
    }

    return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <SignUpForm />
      </div>
    </div>
  );
}
