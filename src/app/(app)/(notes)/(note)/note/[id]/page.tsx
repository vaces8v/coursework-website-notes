'use client'

import {useEffect, useState, use} from "react";
import axios from 'axios';
import {RootResNotes} from "@/types/note.types";
import {Spinner} from "@nextui-org/spinner";
import {Badge} from "@/components/ui/badge";
import {useRouter} from "next/navigation";
import {useSnackbar} from "notistack";
import {Button} from "@nextui-org/button";
import {Trash2Icon} from "lucide-react";
import {Api} from "@/service/api-client";

export default function Notes({
                                  params,
                              }: {
    params: Promise<{ id: string }>
}) {
    const [note, setNote] = useState<RootResNotes | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const { enqueueSnackbar } = useSnackbar();
    const router = useRouter();
    const {id} = use(params);

    async function deleteNote() {
        const token = localStorage.getItem('token') || '';
        await Api.note.deleteNote(Number(id), token).finally(() => {
            enqueueSnackbar("Запись успешно удалена", {variant: "success"});
            router.push("/");
        });
    }

    useEffect(() => {
        async function fetchNotes() {
            const {data} = await axios.get<RootResNotes>( process.env.NEXT_PUBLIC_API + `/notes/${id}`)
            setNote(data)
        }

        fetchNotes().finally(() => setIsLoading(false)).catch(() => {
            enqueueSnackbar("Запись не найдена!", {variant: "error"});
        })
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
                            <div className="flex w-full items-center justify-between">
                                <div className="flex flex-wrap w-[700px] items-center space-x-1 space-y-0.5">
                                    {note.tags && note.tags.length > 0 ? (
                                            note.tags.map(tag => (
                                                <span key={tag.id}>
                                            <Badge style={{backgroundColor: tag.color}}>{tag.name}</Badge>
                                         </span>
                                            ))
                                        )
                                        :
                                        <></>
                                    }
                                </div>
                                    <Button onClick={deleteNote} variant="flat" color="danger" className="text-gray-200" startContent={<Trash2Icon strokeWidth={1.75} size={20} className="text-gray-200"/>}>
                                        Удалить запись
                                    </Button>
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
