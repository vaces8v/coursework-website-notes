'use client'

import {SearchInput} from "@/components/shared/SearchInput/SearchInput";
import {ScrollArea} from "@/components/ui/scroll-area";
import {usePathname, useRouter} from "next/navigation";
import {ArrowLeft, CircleX, Cross, CrosshairIcon} from "lucide-react";
import {motion} from "framer-motion";
import {Button, Select, SelectItem} from "@nextui-org/react";
import React, {useEffect, useState} from "react";
import {ITag} from "@/types/tag.types";
import {Api} from "@/service/api-client";
import {Badge} from "@/components/ui/badge";
import {useTagFilterStore} from "@/store/tagFilter.store";
import {useAnimateStore} from "@/store/animated.store";

export default function NoteLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {

    const path = usePathname(),
        router = useRouter(),
        [tags, setTags] = useState<ITag[]>([]),
        [selectedTags, setSelectedTags] = useState<string>(''),
        {setTagsFilter, tagsFilter} = useTagFilterStore(),
        {disabledAnimate} = useAnimateStore()


    const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedTags(e.target.value);
    };

    useEffect(() => {
        setTagsFilter(selectedTags.split(",").map(Number).slice(1))
    }, [selectedTags]);

    useEffect(() => {
        Api.tag.getAll().then(data => setTags(data))
    }, [])



    return (
        <div
            className="flex flex-col xl:w-[1024px] w-[768px] h-[95%] mt-[20px] shrink-0 rounded-2xl bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-100 bordear-none border-1 border-gray-100/50 bg-transparent">
            <header
                className="pr-[22px] pl-[10px] absolute bg-white-900 h-[70px] overflow-hidden shrink-0 bg-clip-padding backdrop-filter backdrop-blur-2xl bg-opacity-100 z-20 top-0 flex flex-row items-center justify-between w-full">
                <div className="flex flex-row mt-[10px]">
                    <motion.button
                        initial={{
                            scale: 0,
                            rotate: "45deg",
                        }}
                        animate={{
                            scale: path !== '/' ? 1 : 0,
                            rotate: path !== '/' ? "0deg" : "45deg",
                        }}
                        transition={{
                            duration: disabledAnimate ? 0 : .25,
                        }}
                        onClick={() => router.back()}
                        className="bg-transparent outline-none active:outline-none focus-visible:outline-[3px] focus-visible:outline-[#00bfff] focus-visible:outline-offset-[5px]">
                        <ArrowLeft style={{scale: path !== '/' ? 1 : 0}} className={`${disabledAnimate ? "" : "transition-all"}`} size={32}
                                   color="#FFF"/>
                    </motion.button>

                    <motion.h1
                        initial={{
                            marginLeft: 0,
                            translateX: -30
                        }}
                        animate={{
                            marginLeft: path !== '/' ? 10 : 0,
                            translateX: path !== '/' ? 0 : -30
                        }}
                        transition={{
                            duration: disabledAnimate ? 0 : 0.25
                        }}
                        className="text-white text-3xl">Заметки
                    </motion.h1>
                </div>
                <div className="flex flex-row w-[580px] items-center justify-end space-x-3">
                    <div>
                        <motion.div
                            className="flex items-center"
                            initial={{
                                scale: 0,
                                display: "none",
                            }}
                            animate={{
                                scale: path === "/" ? 1 : 0,
                                display: path === "/" ? "flex" : "none",
                            }}
                            transition={{
                                duration: disabledAnimate ? 0 : 0.25
                            }}
                        >
                            <motion.button
                                initial={{
                                    height: 0,
                                    display: "none",
                                    overflow: "hidden",
                                    scale: 0,
                                    rotate: "360deg"
                                }}
                                animate={{
                                    height: "auto",
                                    display: tagsFilter.length > 0 ? "block" : "none",
                                    overflow: tagsFilter.length > 0 ? "visible" : "hidden",
                                    scale: tagsFilter.length > 0 ? 1 : 0,
                                    rotate: tagsFilter.length > 0 ? "0deg" : "360deg"
                                }}
                                transition={{
                                    duration: disabledAnimate ? 0 : 0.25
                                }}
                                className="mt-[10px] mr-[10px] bg-transparent border-none rounded-full">
                                <CircleX onClick={() => setSelectedTags('')} color="#FFF" size={24} strokeWidth={1.75}/>
                            </motion.button>

                            <Select
                                items={tags}
                                placeholder="Фильтр тегов"
                                aria-label="filter-tag"
                                selectionMode="multiple"
                                variant="bordered"
                                showScrollIndicators
                                selectedKeys={selectedTags?.split(',')}
                                onChange={handleSelectionChange}
                                classNames={{
                                    label: "group-data-[filled=true]:-translate-y-5 bg-transparent",
                                    trigger: "flex justify-between items-center min-h-[30px] w-[300px] white-select focus:white-select bg-transparent text-white rounded-xl focus:border-white outline-none outline-offset-0 border-white placeholder:text-white",
                                    mainWrapper: "items-end border-white focus:border-white bg-transparent rounded-xl",
                                    listboxWrapper: "max-h-[400px]",
                                    value: "flex space-x-1 text-white border-white focus:border-white focus:text-white",
                                    base: "text-white focus:text-white hover:text-white bg-transparent rounded-xl focus:border-white",
                                    listbox: "text-white focus:text-white hover:text-white bg-transparent rounded-xl",
                                    innerWrapper: "text-white focus:text-white hover:text-white border-white focus:border-white bg-transparent",
                                }}
                                listboxProps={{
                                    itemClasses: {
                                        base: [
                                            "focus:border-white",
                                            "bg-transparent",
                                            "rounded-md",
                                            "text-white",
                                            "transition-opacity",
                                            "data-[hover=true]:text-white bg-transparent",
                                            "data-[hover=true]:bg-transparent",
                                            "dark:data-[hover=true]:bg-transparent",
                                            "dark:data-[hover=true]:border-white",
                                            "data-[selectable=true]:focus:bg-transparent",
                                            "data-[selectable=true]:focus:border-transparent",
                                            "data-[pressed=true]:opacity-70",
                                            "data-[focus-visible=true]:ring-white",
                                        ],
                                    },
                                }}
                                popoverProps={{
                                    classNames: {
                                        base: "before:bg-transparent bg-transparent rounded-xl focus:border-white",
                                        arrow: "text-[rgba(0,0,0,0)]",
                                        content: "p-0 border-small border-divider bg-[rgba(255,255,255,0.1)] focus:border-white",
                                    },
                                }}
                                renderValue={(items) => {
                                    return items.map((item) => (
                                        <span
                                            key={item.key}
                                            className="text-white rounded-xl px-2"
                                            style={{backgroundColor: item.data ? item.data.color : "#FFF"}}>
                                    {item.textValue}
                                </span>
                                    ));
                                }}
                                className="max-w-xs bg-transparent white-select mt-[10px]"
                            >
                                {(tag) => (
                                    <SelectItem key={tag.id} textValue={tag.name}>
                                        <div className="flex justify-between items-center">
                                            <div className="flex gap-2 items-center">
                                                <div className="flex flex-col">
                                                    <Badge style={{backgroundColor: tag.color}}>{tag.name}</Badge>
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
                                    </SelectItem>
                                )}
                            </Select>
                        </motion.div>
                    </div>
                    <SearchInput placeholder="Искать заметку..."/>
                </div>
            </header>
            <ScrollArea className="flex flex-col items-center mx-[2px] mt-[70px] mb-[5px] h-full">
                <div className="relative flex flex-col w-[90%] h-full">
                    <section className="relative flex flex-col mx-[10px] w-[97%] h-full">
                        {children}
                    </section>
                </div>
            </ScrollArea>
        </div>
);
}
