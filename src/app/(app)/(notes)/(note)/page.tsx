'use client'
import { motion } from "framer-motion";
import {useEffect, useState} from "react";
import {Api} from "@/service/api-client";
import {useSortedNotesStore} from "@/store/sortedNotes.store";
import {useNotesStore} from "@/store/notes.store";
import {Spinner} from "@nextui-org/spinner";
import {NoteCard} from "@/components/shared/NoteCard/NoteCard";
import {useAnimateStore} from "@/store/animated.store";
import {useTokenStore} from "@/store/token.store";

export default function Home() {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const { notes, setNotes } = useNotesStore();
    const { notesSorted, setNotesSorted } = useSortedNotesStore();
    const {disabledAnimate} = useAnimateStore();
    const {token} = useTokenStore()

    useEffect(() => {
            Api.note.getAllMy(token)
                .then(data => {
                    setNotes(data);
                    setNotesSorted(notes);
                })
                .finally(() => setIsLoading(false));
    }, []);


    return (
        <>
            {
                isLoading ? (
                    <div className="flex flex-col w-full h-full">
                        <Spinner className="mx-auto mt-[200px]" label="Загрузка" size="lg" color="primary" />
                    </div>
                ) : (
                    <>
                        {
                            notesSorted.length > 0 ? (
                                <motion.div
                                    layout
                                    transition={{
                                        duration: disabledAnimate ? 0 : .25,
                                    }}
                                >
                                    {notesSorted.map((note) => {
                                        const tags = note.tags.map(tag => ({
                                            id: tag.id,
                                            name: tag.name,
                                            color: tag.color,
                                        }));

                                        return (
                                            <motion.div
                                                key={note.id}
                                                layout
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0, height: 0 }}
                                                transition={{
                                                    duration: disabledAnimate ? 0 : .3,
                                                }}
                                            >
                                                <NoteCard id={note.id} title={note.title} description={note.description} tags={tags} createDate={note.created_at} />
                                            </motion.div>
                                        );
                                    })}
                                </motion.div>
                            ) : (
                                <div className="flex flex-col w-full h-full">
                                    <h1 className="text-white text-2xl mx-auto mt-[200px]">Нет заметок</h1>
                                </div>
                            )
                        }
                    </>
                )
            }
        </>
    );
}
