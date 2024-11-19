'use client'
import React, {useState} from 'react';
import Image from "next/image";
import Link from "next/link";
import {Api} from "@/service/api-client";
import {useSnackbar} from "notistack";
import {useRouter} from "next/navigation";
import {useTokenStore} from "@/store/token.store";

export default function Login() {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const {enqueueSnackbar} = useSnackbar();
    const router = useRouter();
    const {setToken} = useTokenStore()

    async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!email || !password) {
            enqueueSnackbar("Поля должны быть все заполнены!", {variant: "error"});
            return;
        }
        await Api.user.login({email, password})
            .then((data) => {
                if (!data.token) {
                    enqueueSnackbar("Неверный логин или пароль!", {variant: "error"});
                    return
                }
                setToken(data.token)
                enqueueSnackbar("Успешный вход!", {variant: "success"})
                router.push("/")
            })
    }

    return (
        <>
            <h3 className="text-white text-2xl text-center  w-full">
                Вход
            </h3>
            <div className="ml-[10px] mt-[10px] flex items-center justify-center w-full">
                <h2 className="text-3xl text-center text-white mr-2">Записаня Книжка</h2>
                <Image src="/logo.png" draggable={false} width={38} height={38} alt="logo"/>
            </div>
            <form onSubmit={handleLogin} className="flex flex-col px-[30px] mt-[35px] w-full h-full">
                <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder="Логин"
                       className="text-white placeholder:text-gray-100 border-2 border-gray-100 focus:outline-none text-xl bg-transparent py-[15px] pl-[10px] rounded-2xl"/>
                <input onChange={(e) => setPassword(e.target.value)} value={password} type="password"
                       placeholder="Пароль"
                       className="mt-[15px] text-white placeholder:text-gray-100 border-2 border-gray-100 focus:outline-none text-xl bg-transparent py-[15px] pl-[10px] rounded-2xl"/>
                <button className="mt-[20px] bg-gray-100 text-black text-xl py-[15px] rounded-2xl" type="submit">Войти
                </button>
                <Link className="text-white underline text-lg w-full text-center mt-[20px] mr-[10px]" href="register">У
                    меня еще нет аккаунта</Link>
            </form>
        </>
    );
};
