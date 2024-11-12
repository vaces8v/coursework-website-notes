"use client"

import React from 'react';
import {NextUIProvider} from "@nextui-org/react";

interface Props {
    children: React.ReactNode;
}

export const NextUiProviderForRoot: React.FC<Props> = ({children}) => {
    return (
        <NextUIProvider>
            {children}
        </NextUIProvider>
    );
};