import NavBar from "@/components/NavBar";
import DarkVeil from "@/components/DarkVeil";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import Image from 'next/image'
import commentsection from "../public/high-quality-comment.jpg"


export default function Home() {
  return (
      <main className="min-h-screen w-full flex flex-col mona-sans-regular">
        <NavBar />

        <div className="relative w-full flex-1 overflow-hidden">
          {/* DarkVeil as background */}
            <div className="absolute inset-0 z-0">
                <DarkVeil hueShift={328} />
            </div>

          {/* Content on top of DarkVeil */}
          <div className="flex flex-col relative z-10 items-center justify-center h-full">


              <h1 className="text-center mona-sans-extrabold text-5xl leading-[1.2] mt-16 text-gray-300">Super Lightweight, Blazing Fast
                  <br />Comment Section</h1>

                <h2 className="mona-sans-light text-md mt-6">Qumment is a plug-and-play comment widget with built-in
                    AI profanity filtering, privacy-centered with no ads</h2>
              <div className="flex gap-4 mt-10">
                  <Button asChild size="sm" className="main-color-bg  text-md px-5 py-3 hover:bg-[#6C0E82]">
                      <Link href="/auth/sign-up" className="shadow-inner-lg text-white">Get Started</Link>
                  </Button>
                  <Button asChild size="sm" className="bg-transparent text-md px-5 py-3 hover:bg-transparent border-2 border-[#592166]">
                      <Link href="/docs" className="text-white">Docs</Link>
                  </Button>
              </div>



          </div>
            <div className="flex justify-center w-full mt-16 overflow-hidden">
                <div className="w-full max-w-2xl h-[50vh] relative overflow-hidden">
                    <Image
                        className="rounded-t-3xl rounded-b-xl object-top object-cover"
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

