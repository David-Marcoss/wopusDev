"use client"

import type { Metadata } from "next";
import "./globals.css";

import { cn } from "../lib/utils";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 


import { AssideBar } from "@/components/ui/assidebar"
import { getSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { Suspense, useEffect, useState } from "react"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    getSession().then((session) => {
      if (!session) {
        setIsAuthenticated(false)
        redirect("/login")
      }
      setIsAuthenticated(true)
    })
  }, [])

  return (
    <html lang="pt-br">
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />
        <meta name="theme-color" content="#000000" />
        <meta
          name="description"
          content="Gerencie suas tarefas de forma simples e eficiente."
        />
        <title>Gerenciador de Tarefas</title>
        <link
          rel="icon"
          href="/favicon.ico"
        />
      </head>
      <body
        className={
          cn("h-screen w-screen  bg-background font-sans antialiased")
        }
      >
        <Suspense>
          {isAuthenticated && <AssideBar />}
          {children}
          <ToastContainer />
        </Suspense>

      </body>
    </html>
  );
}
