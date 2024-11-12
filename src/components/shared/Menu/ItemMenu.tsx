'use client'

import React from 'react';
import {motion} from "framer-motion";
import clsx from "clsx";
import {useRouter} from "next/navigation";

interface MenuProps {
    children: React.ReactNode;
    isOpen: boolean;
    icon: React.ReactNode;
    className?: string;
    route: string;
}

export const ItemMenu: React.FC<MenuProps> = ({isOpen, icon, children, className, route}) => {
    const router = useRouter();

    return (
        <motion.button
            initial={{
                width: 40,
                justifyContent: "center"
            }}
            animate={{
                width: isOpen ? 300 : 40,
                justifyContent: isOpen ? "flex-start" : "center"
            }}
            transition={{
                duration: 0
            }}
            onClick={() => router.push('/' + route)}
            className={clsx("h-[40px] flex items-center justify-center bg-transparent border-none rounded-2xl outline-none active:outline-none focus-visible:outline-[3px] focus-visible:outline-[#00bfff] focus-visible:outline-offset-[5px]", className)}>
            {icon}
            <motion.p
                initial={{
                    display: "none",
                }}
                animate={{
                    display: isOpen ? "flex" : "none",
                }}
                transition={{
                    duration: 0
                }}
                className="ml-[16px] text-xl text-white">{children}
            </motion.p>
        </motion.button>
    );
};