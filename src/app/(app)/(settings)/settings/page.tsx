'use client'

import React from 'react';
import Image from 'next/image';
import {useWallpaperStore} from "@/store/wallpaper.store";
import {Button} from "@nextui-org/button";
import {LogOut, WandSparkles} from "lucide-react";
import {useRouter} from "next/navigation";
import {useAnimateStore} from "@/store/animated.store";

export default function Setting() {
    const {changeWallpaper} = useWallpaperStore()
    const {disabledAnimate, setDisabledAnimate} = useAnimateStore()
    const router = useRouter()

    function logout() {
        localStorage.removeItem("token");
        router.push('/login')
    }

    function handleAnimate() {
        if(disabledAnimate) {
            setDisabledAnimate(false)
        } else {
            setDisabledAnimate(true)
        }
    }

    return (
        <div className="flex flex-col w-full h-full px-[40px]">
            <h2 className="text-2xl text-white">Выберите обои</h2>
            <div className="flex flex-row mt-[10px] items-center flex-wrap">

                <button onClick={() => changeWallpaper("bg-coast")} className="mt-[5px] rounded-xl">
                    <Image
                        draggable={false}
                        alt="bg"
                        className="object-cover rounded-xl"
                        height={200}
                        src="/coast.jpg"
                        width={200}
                    />
                </button>
                <button onClick={() => changeWallpaper("bg-darkForest")} className="mt-[5px] ml-[10px] rounded-xl">
                    <Image
                        draggable={false}
                        alt="bg"
                        className="object-cover rounded-xl"
                        height={200}
                        src="/darkForest.jpg"
                        width={200}
                    />
                </button>
                <button onClick={() => changeWallpaper("bg-earthNight")} className="mt-[5px] ml-[10px] rounded-xl">
                    <Image
                        draggable={false}
                        alt="bg"
                        className="object-cover rounded-xl"
                        height={200}
                        src="/earthNight.jpg"
                        width={200}
                    />
                </button>
                <button onClick={() => changeWallpaper("bg-forest")} className="xl:ml-[10px] ml-[0px] mt-[5px] rounded-xl">
                    <Image
                        draggable={false}
                        alt="bg"
                        className="object-cover rounded-xl"
                        height={200}
                        src="/forest.jpg"
                        width={200}
                    />
                </button>
                <button onClick={() => changeWallpaper("bg-water")} className="mt-[5px] xl:ml-0 ml-[10px] rounded-xl">
                    <Image
                        draggable={false}
                        alt="bg"
                        className="object-cover rounded-xl"
                        height={200}
                        src="/water.jpg"
                        width={200}
                    />
                </button>
                <button onClick={() => changeWallpaper("bg-coast2")} className="mt-[5px] ml-[10px] rounded-xl">
                    <Image
                        draggable={false}
                        alt="bg"
                        className="object-cover rounded-xl"
                        height={200}
                        src="/coast2.jpg"
                        width={200}
                    />
                </button>
                <button onClick={() => changeWallpaper("bg-planet")} className="xl:ml-[10px] ml-[0px] mt-[5px] rounded-xl">
                    <Image
                        draggable={false}
                        alt="bg"
                        className="object-cover rounded-xl"
                        height={200}
                        src="/planet.jpg"
                        width={200}
                    />
                </button>
            </div>
            <div className="flex space-x-3 mt-[20px]">
                <Button onClick={logout} variant="shadow" color="danger" endContent={<LogOut size={22} color={"#FFF"} strokeWidth={1.75}/>} className="text-white text-lg mt-[10px] w-[230px]">Выйти из аккаунта</Button>
                <Button onClick={handleAnimate} variant="flat" color={disabledAnimate ? "warning" : "default"} endContent={<WandSparkles size={22} color={"#FFF"} strokeWidth={1.75}/>} className="text-white text-lg mt-[10px] w-[240px]">{disabledAnimate ? "Включить анимации" : "Отключить анимации"}</Button>
            </div>
        </div>
    );
};