'use client'

import React from 'react';
import {SnackbarProvider} from "notistack";

interface Props {
    children: React.ReactNode;
}

export const NotistackProvider: React.FC<Props> = ({children}) => {
    return (
        <SnackbarProvider
            maxSnack={5}
            autoHideDuration={5000}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
            {children}
        </SnackbarProvider>
    );
};