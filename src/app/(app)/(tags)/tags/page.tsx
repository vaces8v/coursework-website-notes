'use client'

import React, {useEffect, useState} from 'react';
import {Api} from "@/service/api-client";
import {ITag} from "@/types/tag.types";
import {Badge} from "@/components/ui/badge";
import {Button, Input} from "@nextui-org/react";
import {Trash2} from "lucide-react";
import { useTokenStore } from '@/store/token.store';
import { useSnackbar } from 'notistack';


const TagsPage = () => {
    const [tags, setTags] = useState<ITag[]>([])
    const [name, setName] = useState("")
    const [color, setColor] = useState("#000000")
    const {token} = useTokenStore()
    const {enqueueSnackbar} = useSnackbar();
    
    useEffect(() => {
        loadTags()
    }, [])

    const loadTags = () => {
        Api.tag.getAll().then(data => setTags(data))
    }

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!token) return

        try {
            await Api.tag.createTag({name, color}, token)
            enqueueSnackbar("Тег создан", { variant: "success" })
            loadTags()
            setName("")
            setColor("#000000")
        } catch (error) {
            enqueueSnackbar("Ошибка при создании тега", { variant: "error" })
        }
    }

    const handleDelete = async (tagId: number) => {
        if (!token) return

        try {
            await Api.tag.removeTag(tagId, token)
            enqueueSnackbar("Тег удален", { variant: "success" })
            loadTags()
        } catch (error) {
            enqueueSnackbar("Ошибка при удалении тега", { variant: "error" })
        }
    }

    return (
        <div
            className="flex flex-col xl:w-[1024px] w-[768px] h-[95%] mt-[20px] shrink-0 rounded-2xl bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-100 bordear-none border-1 border-gray-100/50 bg-transparent">
            <header
                className="pr-[22px] pl-[10px] absolute bg-white-900 h-[70px] overflow-hidden shrink-0 bg-clip-padding backdrop-filter backdrop-blur-2xl bg-opacity-100 z-20 top-0 flex flex-row items-center justify-between w-full">
                <div className="flex flex-row mt-[10px]">
                    <h1
                        className="text-white text-3xl">Создание тегов
                    </h1>
                </div>
            </header>
            <div className="mt-[90px] px-[20px] mb-4">
                <form onSubmit={handleCreate} className="flex gap-4 items-end">
                    <Input
                        label="Название тега"
                        value={name}
                        variant="bordered"
                        color="warning"
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <div>
                        <h2>Цвет тега</h2>
                    <Input
                        type="color"
                        value={color}
                        variant="bordered"
                        onChange={(e) => setColor(e.target.value)}
                        className="w-[100px]"
                        required
                    />
                    </div>
                    <Button type="submit" color="success">
                        Создать
                    </Button>
                </form>
            </div>
            <div className="flex flex-wrap gap-2 px-[20px]">
                {tags.map((tag) => {
                    return tag ? (
                        <div className="flex items-center space-x-0.5 rounded-full border-1"
                             style={{borderColor: tag.color}} key={tag.id}>
                            <Badge style={{backgroundColor: tag.color, height: "100%"}}>
                                {tag.name}
                            </Badge>
                            <Button
                                className="h-[30px] w-[30px]"
                                variant="light"
                                color="danger"
                                isIconOnly
                                onClick={() => handleDelete(tag.id)}>
                                <Trash2 strokeWidth={1.5} size={18} color="#FFF"/>
                            </Button>
                        </div>
                    ) : null;
                })}
            </div>
        </div>
    );
};

export default TagsPage;