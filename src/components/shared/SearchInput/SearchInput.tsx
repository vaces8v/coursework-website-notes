'use client'

import React, {useEffect, useState} from 'react';
import {Search} from "lucide-react";
import {motion} from "framer-motion";
import {useNotesStore} from "@/store/notes.store";
import {useSortedNotesStore} from "@/store/sortedNotes.store";
import {usePathname, useRouter} from "next/navigation";
import {useTagFilterStore} from "@/store/tagFilter.store";
import {useAnimateStore} from "@/store/animated.store";
import {SearchInputProps} from "@/components/shared/SearchInput/SearchInput.interface";

export const SearchInput: React.FC<SearchInputProps> = ({placeholder, route = ""}) => {
    const [isFocus, setIsFocus] = useState<boolean>(false)
    const [searchText, setSearchText] = useState<string>('')
    const {notes} = useNotesStore()
    const {setNotesSorted} = useSortedNotesStore()
    const path = usePathname()
    const router = useRouter()
    const {tagsFilter} = useTagFilterStore()
    const {disabledAnimate} = useAnimateStore()


    useEffect(() => {
        if (path !== `/${route}`) router.push( `/${route}`);
        const filteredNotes = notes.filter(note => {
            if (tagsFilter.length === 0) {
                return note.title.toLowerCase().includes(searchText.toLowerCase()) || note.description.toLowerCase().includes(searchText.toLowerCase());
            } else {
                const matchesSearchText = note.title.toLowerCase().includes(searchText.toLowerCase()) || note.description.toLowerCase().includes(searchText.toLowerCase());
                const matchesTags = note.tags.some(tag => tagsFilter.includes(tag.id));
                return matchesSearchText && matchesTags;
            }
        });
        setNotesSorted(filteredNotes);
    }, [searchText, notes, setNotesSorted, tagsFilter]);



    return (
        <div className="relative mt-[10px] min-w-[250px] w-[250px] h-[40px] rounded-xl overflow-hidden">
            <motion.span
                initial={{
                    translateX: -30
                }}
                animate={{
                    translateX: isFocus ? 0 : -35
                }}
                transition={{
                    duration: disabledAnimate ? 0 : .25,
                }}
                className="absolute z-20 left-[10px] top-[7px]">
                <Search size={24} className={"text-white"}/>
            </motion.span>
            <input
                onChange={e => setSearchText(e.target.value)}
                value={searchText}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                style={{
                    paddingLeft: isFocus ? "37px" : "10px",
                    paddingRight: isFocus ? "0px" : "32px",
                }}
                className={`${disabledAnimate ? "" : "transition-all"} w-full  text-[18px] text-white focus:text-white h-full border-2 border-white focus:border-white focus:placeholder:text-white placeholder:text-white outline-none rounded-xl bg-transparent`}
                type="text" placeholder={placeholder}/>
            <motion.span
                initial={{
                    translateX: 0
                }}
                animate={{
                    translateX: isFocus ? 35 : 0
                }}
                transition={{
                    duration: disabledAnimate ? 0 : .25,
                }}
                className="absolute z-20 right-[10px] top-[7px]">
                <Search size={24} color={"#FFF"}/>
            </motion.span>
        </div>
    );
};
