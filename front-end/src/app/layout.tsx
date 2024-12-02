import type { Metadata } from "next";
import "./globals.css";

import { cn } from "../lib/utils";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 

export const metadata: Metadata = {
  title: "Gerenciador de Tarefas",
  description: "Gerencie suas tarefas de forma simples e eficiente.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="pt-br">
      <body
        className={
          cn("h-screen w-screen  bg-background font-sans antialiased")
        }
      >
        {children}
        <ToastContainer />
      </body>
    </html>
  );
}
