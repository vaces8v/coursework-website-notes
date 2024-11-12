import {NextRequest, NextResponse} from "next/server";
import { prisma } from "@/client-prisma";

export async function POST(req: NextRequest) {
    const { id } = await req.json();
    const idNote = Number(id);

    if (!idNote || isNaN(Number(idNote))) {
        return NextResponse.json({ ok: false, message: "Invalid ID" });
    }

    try {
        const note = await prisma.notes.findUnique({
            where: { id: idNote },
            include: {
                noteTags: {
                    include: {
                        tag: true,
                    },
                },
            },
        });

        if (!note) {
            return NextResponse.json({ ok: false, message: "Note not found" });
        }

        return NextResponse.json(note);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ ok: false, message: "An error occurred" });
    }
}
