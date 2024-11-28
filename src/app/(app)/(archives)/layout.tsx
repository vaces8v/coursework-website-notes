'use client'

import {Button} from "@nextui-org/button";
import {FileSpreadsheet, Pencil} from "lucide-react";
import {useRouter} from "next/navigation";
import {useTokenStore} from "@/store/token.store";
import {Api} from "@/service/api-client";

export default function ArchivesLayout({
                                        children,
                                    }: Readonly<{
    children: React.ReactNode;
}>) {

    const router = useRouter();
    const {token} = useTokenStore()

    async function downloadExcel() {
        await Api.note.exportToExcel(token)
    }

    return (
        <>
            {children}
            <Button title="Создать заметку" onPress={() => router.push("/create")} onClick={() => router.push("/create")} isIconOnly variant="flat" size="lg" className="xl:right-[80px] right-[20px] absolute bottom-[80px]">
                <Pencil color="white" fontSize="large" size={24} strokeWidth={2}/>
            </Button>
            <Button title="Экспорт в excel файл" onClick={downloadExcel} isIconOnly variant="flat" size="lg" className="xl:right-[20px] right-[-35px] absolute bottom-[80px]">
                <FileSpreadsheet color="white" fontSize="large" size={24} strokeWidth={2}/>
            </Button>
        </>
    );
}
