'use client'

import React, {useEffect, useState, use} from "react";
import axios from 'axios';
import {RootResNotes} from "@/types/note.types";
import {Spinner} from "@nextui-org/spinner";
import {Badge} from "@/components/ui/badge";
import {useRouter} from "next/navigation";
import {useSnackbar} from "notistack";
import {Button} from "@nextui-org/button";
import {
    Archive,
    ArchiveIcon,
    ArchiveRestore,
    ArchiveXIcon,
    Check,
    Edit2Icon,
    FolderArchive,
    Trash2,
    Trash2Icon,
    X
} from "lucide-react";
import {Api} from "@/service/api-client";
import {useTokenStore} from "@/store/token.store";
import {Input} from "@nextui-org/input";
import {Textarea} from "@nextui-org/input";
import {Autocomplete, AutocompleteItem} from "@nextui-org/autocomplete";
import {ITag} from "@/types/tag.types";

export default function Notes({
                                  params,
                              }: {
    params: Promise<{ id: string }>
}) {
    const [note, setNote] = useState<RootResNotes | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [editTitle, setEditTitle] = useState<string>("");
    const [editDescription, setEditDescription] = useState<string>("");
    const [selectedTags, setSelectedTags] = useState<number[]>([]);
    const [tags, setTags] = useState<ITag[]>([])
    const [tagId, setTagId] = useState<number>()
    const [testArray, setTestArray] = useState<number[]>([])
    const {enqueueSnackbar} = useSnackbar();
    const router = useRouter();
    const {id} = use(params);
    const {token} = useTokenStore();

    async function deleteNote() {
        await Api.note.deleteNote(Number(id), token).finally(() => {
            enqueueSnackbar("Запись успешно удалена", {variant: "success"});
            router.push("/");
        });
    }

    const removeTag = (tagId: number) => {
        setTestArray(prevState => prevState.filter((el) => el !== tagId)); // Удаляем тег из testArray
        setSelectedTags(prevTags => prevTags.filter((el) => el !== tagId)); // Удаляем тег из selectedTags
    };


    async function removeArchive() {
        await Api.note.removeFromArchive(Number(id), token)
            .catch(() => {
                enqueueSnackbar("Ошибка добавления! Попробуйте еще раз.", {variant: "warning"});
            })
            .then((data) => {
                enqueueSnackbar("Запись добавлена в архив", {variant: "success"});
                router.push(`/archives/${id}`);
            });
    }

    async function handleEdit() {
        if (!isEditing) {
            setEditTitle(note?.title || "");
            setEditDescription(note?.description || "");
            setSelectedTags(note?.tags.map(tag => tag.id) || []);
            setIsEditing(true);
        } else {
            try {
                await Api.note.update(Number(id), {
                    title: editTitle,
                    description: editDescription,
                    tags: selectedTags
                }, token);

                const {data} = await Api.note.getAllMy(token)
                setNote(data);
                setIsEditing(false);
                enqueueSnackbar("Заметка успешно обновлена", {variant: "success"});
                router.back()
            } catch (error) {
                enqueueSnackbar("Ошибка при обновлении заметки", {variant: "error"});
            }
        }
    }

    useEffect(() => {
        if (!tagId) return;
        if (!testArray.includes(tagId)) {
            setTestArray(prevState => [...prevState, tagId]);
        }
    }, [tagId]);

    async function handleCancel() {
        setIsEditing(false);
        setEditTitle("");
        setEditDescription("");
        setSelectedTags([]);
    }

    useEffect(() => {
        async function fetchData() {
            try {
                const [{data: noteResponse}, {data: tagsResponse }] = await Promise.all([
                    axios.get<RootResNotes>(`${process.env.NEXT_PUBLIC_API}/notes/${id}`),
                    axios.get<ITag[]>(`${process.env.NEXT_PUBLIC_API}/tags`)
                ]);
                setNote(noteResponse as RootResNotes);
                setTags(tagsResponse as ITag[]);
                setTagId(tags.map(item => item.id) | undefined)
                if ("tags" in noteResponse) {
                    setTestArray(noteResponse.tags.map(tag => tag.id));
                } else {
                    setTestArray([]);
                }
            } catch (error) {
                enqueueSnackbar("Ошибка при загрузке данных!", {variant: "error"});
            } finally {
                setIsLoading(false);
            }
        }
        fetchData();
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
                            <div className="flex xl:w-[93%] w-[83%] items-center justify-between">
                                <div className="flex flex-wrap w-[700px] items-center space-x-1 space-y-0.5">
                                    {!isEditing ? (
                                        note.tags && note.tags.length > 0 ? (
                                            note.tags.map(tag => (
                                                <span key={tag.id}>
                                                    <Badge style={{backgroundColor: tag.color}}>{tag.name}</Badge>
                                                </span>
                                            ))
                                        ) : (
                                            <></>
                                        )
                                    ) : (
                                        <Autocomplete
                                            label="Теги"
                                            variant="bordered"
                                            className="mt-[10px]"
                                            color="default"
                                            classNames={{
                                                base: "max-w-xs",
                                                listboxWrapper: "max-h-[320px]",
                                                selectorButton: "text-white-500"
                                            }}
                                            inputProps={{
                                                classNames: {
                                                    input: "ml-1 placeholder:text-white focus:border-white",
                                                    inputWrapper: "h-[48px] focus:border-white",
                                                },
                                            }}
                                            listboxProps={{
                                                hideSelectedIcon: true,
                                                itemClasses: {
                                                    base: [
                                                        "rounded-medium",
                                                        "text-gray-400",
                                                        "transition-opacity",
                                                        "data-[hover=true]:text-foreground",
                                                        "dark:data-[hover=true]:bg-transparent",
                                                        "data-[pressed=true]:opacity-70",
                                                        "data-[hover=true]:bg-transparent",
                                                        "data-[hover=true]:border-1",
                                                        "data-[hover=true]:border-white",
                                                        "data-[selectable=true]:focus:bg-white",
                                                        "data-[focus-visible=true]:ring-white",
                                                        "data-[focus-visible=true]:border-white",
                                                    ],
                                                },
                                            }}
                                            aria-label="Выберите тег"
                                            placeholder="Выберите тег"
                                            popoverProps={{
                                                offset: 10,
                                                classNames: {
                                                    base: "rounded-large",
                                                    content: "p-1 border-small border-white bg-transparent",
                                                },
                                            }}
                                            defaultItems={tags}
                                            onSelectionChange={(value) => {
                                                if (value !== null) {
                                                    const newTagId = +value;

                                                    if (!testArray.includes(newTagId)) {
                                                        setTestArray(prevState => [...prevState, newTagId]);
                                                        setSelectedTags(prevTags => [...prevTags, newTagId]);
                                                    }
                                                }
                                            }}
                                            multiple
                                        >
                                            {(item: ITag) => (
                                                <AutocompleteItem key={item.id} textValue={item.name}>
                                                    <div className="flex justify-between items-center">
                                                        <div className="flex gap-2 items-center">
                                                            <div className="flex flex-col">
                                                                <Badge
                                                                    style={{backgroundColor: item.color}}>{item.name}</Badge>
                                                            </div>
                                                        </div>
                                                        <Button
                                                            className="border-small mr-0.5 font-medium shadow-small"
                                                            radius="full"
                                                            size="sm"
                                                            variant="bordered"
                                                        >
                                                            Добавить
                                                        </Button>
                                                    </div>
                                                </AutocompleteItem>
                                            )}
                                        </Autocomplete>
                                    )}
                                </div>
                                <div
                                    className="flex ml-[10px] xl:flex-nowrap flex-wrap xl:justify-start justify-end items-center space-x-1 space-y-0.5">
                                    <Button onClick={handleEdit} variant="flat" color="default"
                                            className="text-gray-200"
                                            startContent={isEditing ?
                                                <Check size={20} className="mr-[5px] min-w-[20px] text-gray-200"/> :
                                                <Edit2Icon strokeWidth={1.75} size={20}
                                                           className="mr-[5px] min-w-[20px] text-gray-200"/>}>
                                        {isEditing ? "Сохранить" : "Редактировать"}
                                    </Button>
                                    {isEditing && (
                                        <Button onClick={handleCancel} variant="flat" color="danger"
                                                className="text-gray-200"
                                                startContent={<X size={20}
                                                                 className="mr-[5px] min-w-[20px] text-gray-200"/>}>
                                            Отменить
                                        </Button>
                                    )}
                                    {!isEditing && (
                                        <>
                                            <Button onClick={deleteNote} variant="flat" color="danger"
                                                    className="text-gray-200"
                                                    startContent={<Trash2Icon strokeWidth={1.75} size={20}
                                                                              className="mr-[5px] min-w-[20px] text-gray-200"/>}>
                                                Удалить запись
                                            </Button>
                                            <Button onClick={removeArchive} variant="flat" color="default"
                                                    className="text-gray-200"
                                                    startContent={<ArchiveRestore strokeWidth={1.75} size={20}
                                                                                  className="mr-[5px] min-w-[20px] text-gray-200"/>}>
                                                Убарть из архива
                                            </Button>
                                        </>
                                    )}
                                </div>
                            </div>
                            <div className="flex flex-wrap space-x-1 space-y-0.5 mt-[5px]">
                                {isEditing && testArray.map((tagId) => {
                                    const tag = tags.find(t => t.id === tagId);
                                    return tag ? (
                                        <div className="flex items-center space-x-0.5 rounded-full border-1"
                                             style={{borderColor: tag.color}} key={tag.id}>
                                            <Badge style={{backgroundColor: tag.color, height: "100%"}}>
                                                {tag.name}
                                            </Badge>
                                            <Button
                                                onClick={() => removeTag(tag?.id | 0)}
                                                className="h-[30px] w-[30px]" variant="light" color="danger"
                                                isIconOnly>
                                                <Trash2 strokeWidth={1.5} size={18} color="#FFF"/>
                                            </Button>
                                        </div>
                                    ) : null;
                                })}
                            </div>
                            <div className="xl:w-[93%] w-[83%] mt-[20px]">
                                {isEditing ? (
                                    <Input
                                        type="text"
                                        label="Тема"
                                        variant="bordered"
                                        value={editTitle}
                                        onChange={(e) => setEditTitle(e.target.value)}
                                        className="mb-4"
                                    />
                                ) : (
                                    <h1 className="text-white break-words text-4xl">
                                        Тема: {note.title}
                                    </h1>
                                )}
                            </div>

                            <div className="xl:w-[93%] w-[83%] mt-[20px]">
                                {isEditing ? (
                                    <Textarea
                                        label="Описание"
                                        variant="bordered"
                                        value={editDescription}
                                        onChange={(e) => setEditDescription(e.target.value)}
                                        className="mb-4"
                                    />
                                ) : (
                                    <h2 className="text-white break-words text-2xl">
                                        Описание: {note.description}
                                    </h2>
                                )}
                            </div>
                        </>
                    ) : (
                        <div className="flex flex-col w-full h-full items-center justify-center">
                            <h1 className="text-white text-2xl">Запись не найдена</h1>
                        </div>
                    )}
                </>
            )}
        </>
    );
}
