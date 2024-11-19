'use client'
import { getCookie } from 'cookies-next'
import {Menu} from "@/components/shared/Menu/Menu";
import {useRouter} from "next/navigation";
import {useEffect} from "react";
import {useWallpaperStore} from "@/store/wallpaper.store";
import {useTokenStore} from "@/store/token.store";

export default function NotesLayout({
                                        children,
                                    }: Readonly<{
    children: React.ReactNode;
}>) {

    const router = useRouter();
    const {value} = useWallpaperStore()
    const {token} = useTokenStore()

    useEffect(() => {
            if(!token) {
                console.log(token)
                router.push("/login");
        }
    }, []);

    if(!token) {
        return null;
    }

    return (
        <main className={`flex flex-row justify-center transition-all w-full h-screen bg-cover ${value}`}>
            <div className="flex relative flex-row xl:ml-[150px] xl:w-[1024px] ml-[50px] w-[720px] h-full">
                <Menu/>
                {children}
            </div>
        </main>
    );
}
