'use client'

import React, {useEffect, useState} from 'react';
import {Avatar} from "@nextui-org/avatar";
import {motion} from "framer-motion";
import {ItemMenu} from "@/components/shared/Menu/ItemMenu";
import {Archive, BellRing, NotebookPen, Pencil, Settings} from "lucide-react";
import {IUser} from "@/types/user.types";
import {Api} from "@/service/api-client";
import {useRouter} from "next/navigation";

export const Menu: React.FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [user, setUser] = useState<IUser>()

    useEffect(() => {
        const token = localStorage.getItem("token") || '';
        Api.user.getProfile({token}).then(data => setUser(data))
    }, [])

    return (
        <motion.nav
            initial={{
                width: 80,
            }}
            animate={{
                width: isOpen ? 350 : 75,
            }}
            onHoverStart={() => setIsOpen(true)}
            onHoverEnd={() => setIsOpen(false)}
                className="absolute z-30 left-[-120px] flex flex-col min-h-[400px] bg-white-900 ml-[30px] mt-[20px] overflow-hidden shrink-0 rounded-2xl bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-100 bordear-none border-1 border-gray-100/50 h-[95%] px-[12px]">
           <div className="flex items-center w-full min-w-[350px] min-h-[50px] mt-[30px]">
               <Avatar showFallback color="primary" className="shrink-0 w-[50px] h-[50px]" src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
               <div className="ml-[13px] w-full">
                   <p className="text-xl text-white text-nowrap">{`${user?.lastName} ` + `${user?.name}`}</p>
                   <p className="text-md text-gray-200 text-nowrap">{`${user?.email}`}</p>
               </div>
           </div>

            <div className="flex relative flex-col ml-[5px] mt-[25px] h-full">
                <ItemMenu route="" icon={<NotebookPen color="#FFF" className="min-w-[40px]" strokeWidth={1.25} size={40}/>} children={"Заметки"} isOpen={isOpen} />
                <ItemMenu route="" className="mt-[20px]" icon={<BellRing color="#FFF" className="min-w-[40px]" strokeWidth={1.25} size={40}/>} children={"Уведомления"} isOpen={isOpen} />
                <ItemMenu route="" className="mt-[20px]" icon={<Archive color="#FFF" className="min-w-[40px]" strokeWidth={1.25} size={36}/>} children={"Архив заметок"} isOpen={isOpen} />
                <ItemMenu route="create" className="mt-[20px]" icon={<Pencil color="#FFF" className="min-w-[40px]" strokeWidth={1.25} size={36}/>} children={"Создать заметку"} isOpen={isOpen} />
                <ItemMenu route="settings" className="absolute bottom-[20px]" icon={<Settings color="#FFF" className="min-w-[40px]" strokeWidth={1.25} size={40}/>} children={"Настройки"} isOpen={isOpen} />
            </div>

        </motion.nav>
    );
};