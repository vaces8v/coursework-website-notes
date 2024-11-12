'use client'

import {Button} from "@nextui-org/button";
import {Pencil} from "lucide-react";
import {useRouter} from "next/navigation";

export default function NotesLayout({
                                        children,
                                    }: Readonly<{
    children: React.ReactNode;
}>) {

    const router = useRouter();

    return (
        <>
            {children}
            <Button title="Создать заметку" onPress={() => router.push("/create")} onClick={() => router.push("/create")} isIconOnly variant="flat" size="lg" className="absolute right-[50px] bottom-[80px]">
                <Pencil color="white" fontSize="large" size={24} strokeWidth={2}/>
            </Button>
        </>
    );
}
