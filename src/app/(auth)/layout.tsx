import type { Metadata } from "next";
import {Menu} from "@/components/shared/Menu/Menu";

export const metadata: Metadata = {
    title: "Записная Книжка",
    description: "Приложение для хранения заметок",
};

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <main className="flex flex-row justify-center w-full h-screen bg-fon bg-cover">
          <div className="flex relative flex-row xl:ml-[150px] xl:w-[1024px] ml-[50px] w-[720px] h-full">
              <Menu/>
              {children}
          </div>
      </main>
  );
}
