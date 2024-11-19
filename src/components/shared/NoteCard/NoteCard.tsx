'use client'
import React from 'react';
import {Badge} from "@/components/ui/badge";
import {PropsNoteCard} from "@/components/shared/NoteCard/NoteCard.interface";
import {useRouter} from "next/navigation";
import { format } from 'date-fns';

export const NoteCard: React.FC<PropsNoteCard> = ({id, title, description, tags, createDate, route ="note"}) => {
    const router = useRouter()

    return (
        <button onClick={() => router.push(process.env.NEXT_PUBLIC_DOMAIN + `${route}/${id}`)} className="w-full h-auto py-[10px] outline-none active:outline-none focus-visible:outline-[3px] focus-visible:outline-[#00bfff] focus-visible:outline-offset-[5px] bg-transparent my-[10px] overflow-hidden shrink-0 rounded-xl bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-100 bordear-none border-1 border-gray-100/50">
            <div className="flex flex-col items-start mx-[10px]">
                <div className="flex flex-wrap space-x-1 space-y-0.5">
                    {
                        tags.map(el => (
                            <span key={el.id}>
                                <Badge style={{backgroundColor: el.color}}>{el.name}</Badge>
                            </span>
                        ))
                    }
                </div>
                <div className="flex justify-between items-end w-full mt-[10px]">
                    <div className="flex flex-col items-start">
                        <h2 className="text-white text-2xl">Тема: {title.length > 40 ? title.slice(0, 30) + '...' : title }</h2>
                        <p className="text-white text-lg">Описание: {description.length > 50 ? description.slice(0, 30) + '...' : description }</p>
                    </div>
                    <div className="flex flex-row">
                        <p className="text-lg text-gray-200">Создано: {format(createDate, "yyyy.MM.dd")} в {format(createDate, "HH:mm")}</p>
                    </div>
                </div>
            </div>
        </button>
    );
};

