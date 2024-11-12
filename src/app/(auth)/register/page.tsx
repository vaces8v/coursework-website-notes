import React from 'react';
import Image from "next/image";
import Link from "next/link";

export default function Login() {
    return (
        <>
            <h3 className="text-white text-2xl text-center  w-full">
                Вход
            </h3>
            <div className="ml-[10px] mt-[10px] flex items-center justify-center w-full">
                <h2 className="text-3xl text-center text-white mr-2">Записаня Книжка</h2>
                <Image src="/logo.png" draggable={false} width={38} height={38} alt="logo"/>
            </div>
            <form className="flex flex-col px-[30px] mt-[35px] w-full h-full">
                <input type="email" placeholder="Логин" className="text-white placeholder:text-gray-100 border-2 border-gray-100 focus:outline-none text-xl bg-transparent py-[15px] pl-[10px] rounded-2xl"/>
                <input type="password" placeholder="Пароль" className="mt-[15px] text-white placeholder:text-gray-100 border-2 border-gray-100 focus:outline-none text-xl bg-transparent py-[15px] pl-[10px] rounded-2xl"/>
                <button className="mt-[40px] bg-gray-100 text-black text-xl py-[15px] rounded-2xl" type="submit">Войти</button>
            </form>
            <Link href="register">У меня еще нет аккаунта</Link>
        </>
    );
};
