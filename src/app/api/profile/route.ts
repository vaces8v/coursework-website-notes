import {prisma} from "@/client-prisma";
import {NextResponse} from "next/server";
import argon2 from "argon2";

export async function GET() {
    const users = await prisma.user.findMany()

    return NextResponse.json(users)
}


export async function POST(req) {
    try {
        const {email, name, lastName, password } = await req.json();

        const existingCategory = await prisma.user.findFirst({
            where: {
                "email": email,
            }
        });

        if (existingCategory) {
            return NextResponse.json({
                ok: false,
                message: 'Пользователь с таким email!',
            });
        }

        const newUser = await prisma.user.create({
            data: {
                email,
                name,
                lastName,
                passwordHash: await argon2.hash(password),
            }
        });

        return NextResponse.json({ ok: true, message: "Пользователь создан" });
    } catch (e) {
        return NextResponse.json({ ok: false, error: e.message });
    }
}