import {prisma} from "@/client-prisma";
import {NextRequest, NextResponse} from "next/server";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import {serialize} from "cookie";

export async function GET() {
    const users = await prisma.user.findMany()

    return NextResponse.json(users)
}


export async function POST(req: NextRequest) {
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

        // @ts-ignore
        const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET);
        const jwtCookie = serialize("token", token, {
            path: "/",
            maxAge: 3600,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
        });

        const response = NextResponse.json({token: token});  // Возвращаем токен
        response.headers.append("Set-Cookie", jwtCookie);  // Устанавливаем cookie

        return response;
    } catch (error: unknown) {
        return NextResponse.json({ ok: false, message: (error as Error).message });
    }
}