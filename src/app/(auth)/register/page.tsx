'use client'
import React, {useState} from 'react';
import Image from "next/image";
import Link from "next/link";
import {useSnackbar} from "notistack";
import {useRouter} from "next/navigation";
import {Api} from "@/service/api-client";

export default function Login() {
    const [nameUser, setNameUser] = useState<string>('')
    const [lastName, setLastName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const { enqueueSnackbar } = useSnackbar();
    const router = useRouter();

    async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if(!email || !password || !nameUser || !lastName) {
            enqueueSnackbar("Поля должны быть все заполнены!", {variant: "error"});
            return;
        }
        await Api.user.register({email, password, name: nameUser, last_name: lastName})
            .then((data) => {
                if(!data.token) {
                    enqueueSnackbar("Пользователь с такой почтой уже зарегестрирован!", {variant: "error"});
                    return
                }
                localStorage.setItem("token", data.token)
                enqueueSnackbar("Успешный регистрация!", {variant: "success"})
                router.push("/")
            })
    }

    return (
        <>
            <h3 className="text-white text-2xl text-center  w-full">
                Вход
            </h3>
            <div className="ml-[10px] mt-[5px] flex items-center justify-center w-full">
                <h2 className="text-3xl text-center text-white mr-2">Записаня Книжка</h2>
                <Image src="/logo.png" draggable={false} width={38} height={38} alt="logo"/>
            </div>
            <form onSubmit={handleRegister} className="flex flex-col px-[30px] mt-[10px] w-full h-full">
                <input onChange={e => setNameUser(e.target.value)} value={nameUser} type="text" placeholder="Имя" className="mt-[5px] text-white placeholder:text-gray-100 border-2 border-gray-100 focus:outline-none text-xl bg-transparent py-[15px] pl-[10px] rounded-2xl"/>
                <input onChange={e => setLastName(e.target.value)} value={lastName} type="text" placeholder="Фамилия" className="mt-[5px] text-white placeholder:text-gray-100 border-2 border-gray-100 focus:outline-none text-xl bg-transparent py-[15px] pl-[10px] rounded-2xl"/>
                <input onChange={e => setEmail(e.target.value)} value={email} type="email" placeholder="Email" className="mt-[5px] text-white placeholder:text-gray-100 border-2 border-gray-100 focus:outline-none text-xl bg-transparent py-[15px] pl-[10px] rounded-2xl"/>
                <input onChange={e => setPassword(e.target.value)} value={password} type="password" placeholder="Пароль" className="mt-[5px] text-white placeholder:text-gray-100 border-2 border-gray-100 focus:outline-none text-xl bg-transparent py-[15px] pl-[10px] rounded-2xl"/>
                <button className="mt-[10px] bg-gray-100 text-black text-xl py-[15px] rounded-2xl" type="submit">Зарегистрироваться</button>
            </form>
            <Link className="text-white underline text-lg w-full text-center mt-[5px] mr-[10px]" href="login">У меня уже есть аккаунт</Link>
        </>
    );
};
