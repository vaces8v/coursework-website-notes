import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { prisma } from "@/client-prisma";

export async function POST(req: NextRequest) {
    const { token } = await req.json();

    if (!token) {
        return NextResponse.redirect("http://localhost:3000/login");
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || '');
        // @ts-ignore
        const userId = decoded.userId;

        const profile = await prisma.user.findUnique({
            where: { id: userId }
        });

        return NextResponse.json(profile);
    } catch (error) {
        return NextResponse.redirect(new URL("/login", req.url)); // Используем абсолютный URL
    }
}
