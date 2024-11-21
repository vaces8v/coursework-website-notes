'use client'
import Image from 'next/image'
import {Menu} from "@/components/shared/Menu/Menu";
import {useRouter} from "next/navigation";
import {useEffect} from "react";
import {useWallpaperStore} from "@/store/wallpaper.store";
import {useTokenStore} from "@/store/token.store";
import {AuthProvide} from "@/components/Providers/AuthProvide";

export default function NotesLayout({
                                        children,
                                    }: Readonly<{
    children: React.ReactNode;
}>) {
    const {value} = useWallpaperStore()

    return (
        <AuthProvide>
            <main className={`flex flex-row justify-center transition-all w-full h-screen bg-cover`}>
                <Image
                    priority
                    src={`/${value}.jpg`}
                    fill
                    alt="Background"
                    objectFit="cover"
                />
                <div className="flex relative flex-row xl:ml-[150px] xl:w-[1024px] ml-[50px] w-[720px] h-full">
                    <Menu/>
                    {children}
                </div>
            </main>
        </AuthProvide>
    );
}
