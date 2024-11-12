'use client'

import {useEffect, useState, use} from "react";
import axios from 'axios';
import {RootResNotes} from "@/types/note.types";
import {Spinner} from "@nextui-org/spinner";
import {Badge} from "@/components/ui/badge";

export default function Notes({
                                  params,
                              }: {
    params: Promise<{ id: string }>
}) {
    const [note, setNote] = useState<RootResNotes | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const {id} = use(params);

    useEffect(() => {
        async function fetchNotes() {
            const {data} = await axios.post<RootResNotes>( process.env.NEXT_PUBLIC_DOMAIN + "/api/note/getbyid", {id} )
            setNote(data)
        }

        fetchNotes().finally(() => setIsLoading(false))
    }, [id]);

    return (
        <>
            {isLoading ? (
                <div className="flex flex-col w-full h-full items-center justify-center">
                    <Spinner className="mr-[30px] mb-[100px]" label="Загрузка" size="lg" color="primary"/>
                </div>
            ) : (
                <>
                    {note ? (
                        <>
                            <div className="flex flex-wrap w-[700px] items-center space-x-1 space-y-0.5">
                                {note.noteTags && note.noteTags.length > 0 ? (
                                        note.noteTags.map(tag => (
                                            <span key={tag.tag.id}>
                                            <Badge style={{backgroundColor: tag.tag.color}}>{tag.tag.name}</Badge>
                                         </span>
                                        ))
                                    )
                                    :
                                    <></>
                                }
                            </div>
                            <h1 className="text-white text-4xl mt-[20px]">
                                Тема: {note.title}
                            </h1>
                            <h2 className="text-white text-2xl mt-[20px]">
                                Описание: {note.description}
                            </h2>
                        </>
                    ) : (
                        <div>Нет такой заметки</div>
                    )}
                </>
            )}
        </>
    );
}
