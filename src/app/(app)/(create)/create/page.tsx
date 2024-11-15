'use client'

import React, {useEffect, useState} from 'react';
import {Badge} from "@/components/ui/badge";
import {Autocomplete, AutocompleteItem, Button} from "@nextui-org/react";
import {SearchIcon, Trash2} from "lucide-react";
import {ITag} from "@/types/tag.types";
import {Api} from "@/service/api-client";
import {useSnackbar} from "notistack";
import {motion} from "framer-motion";
import {useAnimateStore} from "@/store/animated.store";

export default function Create() {
    const [tags, setTags] = useState<ITag[]>([])
    const [tagId, setTagId] = useState<number>()
    const [testArray, setTestArray] = useState<number[]>([])
    const [topic, setTopic] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const {enqueueSnackbar} = useSnackbar();
    const {disabledAnimate} = useAnimateStore()

    async function handleSave() {
        const token = await localStorage.getItem("token") || '';
        if(!topic || !description) {
            enqueueSnackbar("Поля должны быть все заполнены!", {variant: "error"});
            return;
        }
        await Api.note.create({description, title: topic, noteTags: testArray.map(tagId => (tagId))}, token)
            .finally(() => enqueueSnackbar("Заметка сохранена!", {variant: "success"}))
            .catch(() => enqueueSnackbar("Не удалось сохранить заметку!", {variant: "error"}))
        setTestArray([])
        setTopic('')
        setDescription('')
    }


    useEffect(() => {
        if (!tagId) return;
        if (!testArray.includes(tagId)) {
            setTestArray(prevState => [...prevState, tagId]);
        }
    }, [tagId]);


    useEffect(() => {
        Api.tag.getAll().then(data => setTags(data))
    }, [])


    return (
        <motion.div
            initial={{
                opacity: 0,
                translateY: 100
            }}
            animate={{
                opacity: 1,
                translateY: 0
            }}
            transition={{
                duration: disabledAnimate ? 0 : 0.4,
            }}
            className="flex flex-col w-full h-full items-center">
            <div className="flex items-center w-[470px]">
                <h2 className="text-white text-3xl underline-offset-5">Тема:</h2>
                <input
                    onChange={e => setTopic(e.target.value)}
                    value={topic}
                    className="ml-[5px] text-white text-3xl border-1 border-x-0 border-t-0 border-white outline-none border-b-2 bg-transparent w-[380px]"/>
            </div>
            <div className="flex flex-col mt-[20px]">
                <h2 className="text-white ml-[5px] text-2xl underline-offset-5">Описание:</h2>
                <textarea
                    onChange={e => setDescription(e.target.value)}
                    value={description}
                    className="ml-[5px] mt-[5px] pl-[5px] resize text-white text-2xl border-2 rounded-xl border-white outline-none border-b-2 bg-transparent py-[10px] max-w-[465px] min-h-[100px] min-w-[465px] max-h-[200px] h-auto w-[465px]"/>
            </div>
            <div className="flex flex-col w-[470px] mt-[20px] items-start">
                <h2 className="text-white ml-[5px] text-2xl underline-offset-5">Теги:</h2>
                <div>
                    <div className="flex flex-wrap space-x-1 space-y-0.5">
                        {testArray.map((tagId) => {
                            const tag = tags.find(t => t.id === tagId);
                            return tag ? (
                                <div className="flex items-center space-x-0.5 rounded-full border-1"
                                     style={{borderColor: tag.color}} key={tag.id}>
                                    <Badge style={{backgroundColor: tag.color, height: "100%"}}>
                                        {tag.name}
                                    </Badge>
                                    <Button
                                        onClick={() => setTestArray(prevState => prevState.filter((el) => el !== tag?.id))}
                                        className="h-[30px] w-[30px]" variant="light" color="danger" isIconOnly>
                                        <Trash2 strokeWidth={1.5} size={18} color="#FFF"/>
                                    </Button>
                                </div>
                            ) : null;
                        })}
                    </div>
                    <Autocomplete
                        className="mt-[10px]"
                        color="default"
                        classNames={{
                            base: "max-w-xs",
                            listboxWrapper: "max-h-[320px]",
                            selectorButton: "text-white-500"
                        }}
                        defaultItems={tags}
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
                        aria-label="Выбирите тег"
                        placeholder="Выбирите тег"
                        popoverProps={{
                            offset: 10,
                            classNames: {
                                base: "rounded-large",
                                content: "p-1 border-small border-white bg-transparent",
                            },
                        }}
                        startContent={<SearchIcon className="text-white" strokeWidth={2.5} size={24}/>}
                        radius="full"
                        variant="bordered"
                        onSelectionChange={(value) => {
                            if (value !== null) {
                                setTagId(+value);
                            }
                        }}
                    >
                        {(item) => (
                            <AutocompleteItem key={item.id} textValue={item.name}>
                                <div className="flex justify-between items-center">
                                    <div className="flex gap-2 items-center">
                                        <div className="flex flex-col">
                                            <Badge style={{backgroundColor: item.color}}>{item.name}</Badge>
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
                </div>
            </div>

            <div className="flex flex-col w-[470px] mt-[20px] items-end">
                <Button onClick={handleSave} color="success" variant="shadow" className="text-white text-lg  px-[20px]">Сохранить</Button>
            </div>
        </motion.div>
    );
};