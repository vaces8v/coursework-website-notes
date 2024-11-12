import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/client-prisma";

export async function GET(req: NextRequest) {
    const { id } = req.nextUrl.searchParams;

    if (!id || isNaN(Number(id))) {
        return NextResponse.json({ ok: false, message: "Invalid ID" });
    }

    const idNote = Number(id);

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
