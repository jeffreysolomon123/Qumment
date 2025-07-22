'use client'
import NavBar from "@/components/NavBar";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import Image from 'next/image'
import commentsection from "../public/high-quality-comment.jpg"
import {useAuthStore} from "@/store/useAuthStore";


export default function Home() {
    const user = useAuthStore((state) => state.user);
    return (

      <main className="min-h-screen w-full flex flex-col mona-sans-regular">
        <NavBar />

        <div className="gradient-bg relative w-full flex-1 overflow-hidden">

          <div className="flex flex-col relative z-10 items-center justify-center h-full">


              <h1 className="text-center mona-sans-extrabold text-2xl mx-5 sm:mx-0 sm:text-5xl leading-snug mt-20 text-gray-300">Super Lightweight, Blazing Fast
                  <br />Comment Section</h1>

                <h2 className="mona-sans-regular text-md mt-6 text-center mx-7 sm:mx-0 text-gray-200">Qumment is a plug-and-play comment widget with built-in
                    AI profanity filtering, privacy-centered with no ads</h2>
              <div className="flex gap-4 mt-10">
                  {!user ? (
                      <Button asChild size="sm" className="main-color-bg text-md hover:bg-[#6C0E82]">
                          <Link href="/auth/sign-up" className="shadow-inner-lg text-white text-md">Get Started</Link>
                      </Button>
                  ) : (
                      <Button asChild size="sm" className="main-color-bg text-md hover:bg-[#6C0E82]">
                          <Link href="/dashboard" className="shadow-inner-lg text-white text-md">Dashboard</Link>
                      </Button>
                  )}
                  <Button asChild size="sm" className="bg-transparent text-md px-5 py-3 hover:bg-transparent border-2 border-[#592166]">
                      <Link href="/docs" className="text-white">Docs</Link>
                  </Button>
              </div>


          </div>
            <div className="flex justify-center w-full mt-16 overflow-hidden">
                <div className="w-full max-w-2xl h-[70vh] translate-x-10 sm:h-[54vh] relative overflow-hidden">
                    <Image
                        className="opacity-90 rounded-t-3xl rounded-b-xl object-left object-cover sm:object-top "
                        src={commentsection}
                        alt="comment section"
                        fill // keep this
                        // REMOVE style={{ position: "relative" }}
                    />
                </div>

            </div>
        </div>


      </main>
  );
}

