import React, { useEffect, useState } from 'react';
import { useTokenStore } from "@/store/token.store";
import {redirect, usePathname, useRouter} from "next/navigation";

interface ILoginProvide {
    children: React.ReactNode;
}

export const LoginProvide: React.FC<ILoginProvide> = ({ children }) => {
    const { token } = useTokenStore();
    const path = usePathname();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (token) redirect("/");
    }, [path, token]);


    return <>{children}</>;
};
