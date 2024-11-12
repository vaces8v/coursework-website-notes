'use client'
import { motion } from "framer-motion";
import {useEffect, useState} from "react";
import {Api} from "@/service/api-client";
import {useSortedNotesStore} from "@/store/sortedNotes.store";
import {useNotesStore} from "@/store/notes.store";
import {Spinner} from "@nextui-org/spinner";
import {NoteCard} from "@/components/shared/NoteCard/NoteCard";

export default function Home() {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const { notes, setNotes } = useNotesStore();
    const { notesSorted, setNotesSorted } = useSortedNotesStore();

    useEffect(() => {
        const token = localStorage.getItem('token') || '';
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
                    <div className="flex flex-col w-full h-full items-center justify-center">
                        <Spinner className="mr-[30px] mb-[100px]" label="Загрузка" size="lg" color="primary" />
                    </div>
                ) : (
                    <>
                        {
                            notesSorted.length > 0 ? (
                                <motion.div layout>
                                    {notesSorted.map((note) => {
                                        const tags = note.noteTags.map(tag => ({
                                            id: tag.tag.id,
                                            name: tag.tag.name,
                                            color: tag.tag.color,
                                        }));

                                        return (
                                            <motion.div
                                                key={note.id}
                                                layout
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0, height: 0 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <NoteCard id={note.id} title={note.title} description={note.description} tags={tags} />
                                            </motion.div>
                                        );
                                    }).reverse()}
                                </motion.div>
                            ) : (
                                <div className="flex flex-col w-full h-full items-center justify-center">
                                    <h1 className="text-white text-2xl mr-[30px] mb-[100px]">Нету заметок</h1>
                                </div>
                            )
                        }
                    </>
                )
            }
        </>
    );
}
