"use client"

import { AssideBar } from "@/components/ui/assidebar"
import Dashboard from "./layouts/dashboard"

export default function Home() {

  return (
    <main className="sm:ml-56 p-4">
      <AssideBar />
      <Dashboard />
    </main>
  )
}

