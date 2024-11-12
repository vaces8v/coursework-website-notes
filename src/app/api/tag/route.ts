import {prisma} from "@/client-prisma";
import {NextRequest, NextResponse} from "next/server";

export async function GET() {
    const tags = await prisma.tagNote.findMany()

    return NextResponse.json(tags)
}


export async function POST(req: NextRequest) {
    try {
        const {name, color } = await req.json();

        const existingTag = await prisma.tagNote.findFirst({
            where: {
                name,
            }
        });

        if (existingTag) {
            return NextResponse.json({
                ok: false,
                message: 'Tag с уже существет!',
            });
        }

        const newTag = await prisma.tagNote.create({
            data: {
                name,
                color,
            }
        });


        return NextResponse.json(newTag)
    } catch (error: unknown) {
        return NextResponse.json({ ok: false, message: (error as Error).message });
    }
}