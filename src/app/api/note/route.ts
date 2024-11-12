import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { prisma } from "@/client-prisma";

export async function GET(req: NextRequest) {
    const token = req.headers.get('Authorization');

    if (!token) {
        return NextResponse.json({ error: 'Токен не предоставлен' });
    }

    const decoded = jwt.verify(token.split(' ')[1],  "secre123");
    // @ts-ignore
    const userId = decoded.userId;

    const notes = await prisma.notes.findMany({
        where: {
            authorId: userId
        },
        include: {
            noteTags: {
                include: {
                    tag: true
                }
            }
        }
    });

    return NextResponse.json(notes)
}


export async function POST(req: NextRequest) {
    const { token, title, description, noteTags} = await req.json();

    if (!token) {
        return NextResponse.redirect("http://localhost:3000/login");
    }

    try {
        const decoded = jwt.verify(token, "secre123");
        // @ts-ignore
        const userId = decoded.userId;

        const newNote = await prisma.notes.create({
            data: {
                title,
                description,
                authorId: userId,
                noteTags: {
                    create: noteTags
                }
            }
        });

        return NextResponse.json(newNote);
    } catch (error) {
        return NextResponse.redirect(new URL("/login", req.url)); // Используем абсолютный URL
    }
}
