'use client'

import {SearchInput} from "@/components/shared/SearchInput/SearchInput";
import {ScrollArea} from "@/components/ui/scroll-area";
import {usePathname, useRouter} from "next/navigation";
import {ArrowLeft} from "lucide-react";
import {motion} from "framer-motion";

export default function NoteLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    const path = usePathname(),
        router = useRouter();

    return (
        <div
            className="flex flex-col xl:w-[1024px] w-[768px] h-[95%] mt-[20px] shrink-0 rounded-2xl bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-100 bordear-none border-1 border-gray-100/50 bg-transparent">
            <header
                className="pr-[22px] pl-[10px] absolute bg-white-900 h-[70px] overflow-hidden shrink-0 bg-clip-padding backdrop-filter backdrop-blur-2xl bg-opacity-100 z-20 top-0 flex flex-row items-center justify-between w-full">
                <div className="flex flex-row mt-[10px]">
                    <motion.button
                        initial={{
                            scale: 0,
                            rotate: "45deg",
                        }}
                        animate={{
                            scale: path !== '/' ? 1 : 0,
                            rotate: path !== '/' ? "0deg" : "45deg",
                        }}
                        onClick={() => router.back()}
                        className="bg-transparent outline-none active:outline-none focus-visible:outline-[3px] focus-visible:outline-[#00bfff] focus-visible:outline-offset-[5px]">
                        <ArrowLeft style={{scale: path !== '/' ? 1 : 0}} className="transition-all" size={32}
                                   color="#FFF"/>
                    </motion.button>
                    <motion.h1
                        initial={{
                            marginLeft: 0,
                            translateX: -30
                        }}
                        animate={{
                            marginLeft: path !== '/' ? 10 : 0,
                            translateX: path !== '/' ? 0 : -30
                        }}
                        className="text-white text-3xl">Заметки
                    </motion.h1>
                </div>
                <SearchInput/>
            </header>
            <ScrollArea className="flex flex-col items-center mx-[2px] mt-[70px] mb-[5px] h-full">
                <section className="relative flex flex-col mx-[10px] w-[97%] h-full">
                    {children}
                </section>
            </ScrollArea>
        </div>
    );
}
