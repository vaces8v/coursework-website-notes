import React from 'react';
import {motion} from "framer-motion";
import {NotebookPen} from "lucide-react";


export const ItemMenu: React.FC = () => {
    return (
        <motion.button
            initial={{
                width: 40,
                justifyContent: "center"
            }}
            animate={{
                width: isOpen ? 350 : 40,
                justifyContent: isOpen ? "flex-start" : "center"
            }}
            transition={{
                duration: 0
            }}
            className="h-[40px] flex items-center justify-center" color="primary">
            <NotebookPen className="min-w-[40px]" strokeWidth={1.25} size={40}/>
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
                className="ml-[16px] text-xl text-white">Заметки
            </motion.p>
        </motion.button>
    );
};