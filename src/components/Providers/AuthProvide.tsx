import React, { useEffect, useState } from 'react';
import { useTokenStore } from "@/store/token.store";
import {redirect, usePathname, useRouter} from "next/navigation";

interface IAuthProps {
    children: React.ReactNode;
}

export const AuthProvide: React.FC<IAuthProps> = ({ children }) => {
    const { token } = useTokenStore();
    const path = usePathname();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (token) {
            setIsLoading(false);
        } else {
            redirect("/login");
        }
    }, [path, token]);

    if (isLoading) {
        return null;
    }

    return <>{children}</>;
};
