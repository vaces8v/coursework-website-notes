'use client'
import { getCookie } from 'cookies-next'
import {Menu} from "@/components/shared/Menu/Menu";
import {useRouter} from "next/navigation";
import {useEffect} from "react";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if(!token) {
            router.push("/login");
        }
    }, []);


    return (
      <main className="flex flex-row justify-center w-full h-screen bg-fon bg-cover">
          <div className="flex relative flex-row xl:ml-[150px] xl:w-[1024px] ml-[50px] w-[720px] h-full">
              <Menu/>
              {children}
          </div>
      </main>
  );
}
