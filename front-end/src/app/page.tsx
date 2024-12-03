"use client"

import { AssideBar } from "@/components/ui/assidebar"
import Dashboard from "./layouts/dashboard"
import { getSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { useEffect } from "react"

export default function Home() {

  useEffect(() => {
    getSession().then((session) => {
      console.log(session)
      if (!session) {
        redirect("/login")
      }
    })
  }, [])

  return (
    <main className="sm:ml-56 p-4">
      <AssideBar />
      <Dashboard />
    </main>
  )
}

