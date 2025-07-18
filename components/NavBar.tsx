import Link from "next/link";
import {Button} from "@/components/ui/button";
import Image from "next/image";
import logo from "../public/fulllogo.png"

export default function NavBar() {
    return (
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16 overflow-hidden">
            <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
                <div className="flex items-center font-semibold">
                    <Image src={logo    } alt="Logo" />
                </div>
                {/*{!hasEnvVars ? <EnvVarWarning /> : <AuthButton />}*/}
            </div>
            <div className="flex gap-4 items-center">
                <Link href="/docs" className="shadow-inner-lg text-sm">Docs</Link>
                <Link href="/auth/login" className="hidden sm:block shadow-inner-lg text-sm">Sign in</Link>
                <Button asChild size="sm" className="main-color-bg text-sm hover:bg-[#6C0E82]">
                    <Link href="/auth/sign-up" className="shadow-inner-lg text-white">Get Started</Link>
                </Button>
            </div>
        </nav>

    )
}