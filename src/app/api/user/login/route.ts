import {prisma} from "@/client-prisma";
import {NextRequest, NextResponse} from "next/server";
import jwt from "jsonwebtoken";
import argon2 from "argon2";

export async function POST(req: NextRequest) {
    try {
        const {email, password} = await req.json();
        const user = await prisma.user.findUnique({where: {email}});

        console.log("User found:", user);

        if (!user) {
            return NextResponse.json({ok: false, error: "Пользователь не найден"});
        }

        // @ts-ignore
        const passwordMatches = await argon2.verify(user.passwordHash, password);
        if (!passwordMatches) {
            return NextResponse.json({ok: false, error: "Неверный логин или пароль"});
        }

        // @ts-ignore
        const token = jwt.sign({userId: user.id}, "secre123");

// Логирование токена для отладки
        console.log("Generated token:", token);

// Убедитесь, что токен действительно существует
        if (!token) {
            return NextResponse.json({ok: false, error: "Ошибка генерации токена"});
        }

        return  NextResponse.json({token});
    } catch (error: unknown) {
        return NextResponse.json({ok: false, message: (error as Error).message});
    }
}

