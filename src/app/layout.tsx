import type {Metadata} from "next";
import localFont from "next/font/local";
import "./globals.css";
import {NextUiProviderForRoot} from "@/components/Providers/NextUiProvider";
import {NotistackProvider} from "@/components/Providers/NotistackProvider";

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

export const metadata: Metadata = {
    title: "Записная Книжка",
    description: "Приложение для хранения заметок",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
            <NextUiProviderForRoot>
                <NotistackProvider>
                    {children}
                </NotistackProvider>
            </NextUiProviderForRoot>
        </body>
        </html>
    );
}
