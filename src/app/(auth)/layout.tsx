'use client'

import {useWallpaperStore} from "@/store/wallpaper.store";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

    const {value} = useWallpaperStore()

  return (
      <main className={`flex flex-row justify-center w-full h-screen bg-cover ${value}`}>
          <div className="flex relative flex-row justify-center items-center xl:w-[1024px] w-[720px] h-full">
              <div className="mb-[100px] px-[30px] py-[20px] flex flex-col w-[500px] h-[500px] bg-white-900 overflow-hidden shrink-0 rounded-2xl bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-100 border-1 border-gray-100/50">
                  {children}
              </div>
          </div>
      </main>
  );
}
