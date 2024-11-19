'use client'

import {useEffect, useState, use} from "react";
import axios from 'axios';
import {RootResNotes} from "@/types/note.types";
import {Spinner} from "@nextui-org/spinner";
import {Badge} from "@/components/ui/badge";
import {useRouter} from "next/navigation";
import {useSnackbar} from "notistack";
import {Button} from "@nextui-org/button";
import {Archive, ArchiveIcon, ArchiveRestore, ArchiveXIcon, FolderArchive, Trash2Icon} from "lucide-react";
import {Api} from "@/service/api-client";
import {useTokenStore} from "@/store/token.store";

export default function Archives({
                                  params,
                              }: {
    params: Promise<{ id: string }>
}) {
    const [note, setNote] = useState<RootResNotes | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const { enqueueSnackbar } = useSnackbar();
    const router = useRouter();
    const {id} = use(params);
    const {token} = useTokenStore()

    async function deleteNote() {
        await Api.note.deleteNote(Number(id), token).finally(() => {
            enqueueSnackbar("Запись успешно удалена", {variant: "success"});
            router.push("/archives");
        });
    }

    async function removeArchive() {
            await Api.note.removeFromArchive(Number(id), token).finally(() => {
                enqueueSnackbar("Запись удалена из архива", {variant: "success"});
                router.push(`/note/${id}`);
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
                                <div className="mr-[200px] xl:mr-[50px] flex ml-[5px] xl:flex-nowrap flex-wrap xl:justify-start justify-end items-center space-x-1 space-y-0.5">
                                    <Button onClick={deleteNote} variant="flat" color="danger" className="text-gray-200" startContent={<Trash2Icon strokeWidth={1.75} size={20} className="mr-[5px] min-w-[20px] text-gray-200"/>}>
                                        Удалить запись
                                    </Button>
                                    <Button onClick={removeArchive} variant="flat" color="default" className="text-gray-200" startContent={<ArchiveRestore strokeWidth={1.75} size={20} className="mr-[5px] min-w-[20px] text-gray-200"/>}>
                                        Убрать из архива
                                    </Button>
                                </div>
                            </div>

                            <h1 className="text-white text-4xl mt-[20px]">
                                Тема: {note.title}
                            </h1>
                            <h2 className="text-white text-2xl mt-[20px]">
                                Описание: {note.description}
                            </h2>
                        </>
                    ) : (
                        <div>Нет такой заметки в архиве</div>
                    )}
                </>
            )}
        </>
    );
}
