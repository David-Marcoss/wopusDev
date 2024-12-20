"use client";

import Link from "next/link";
import { Button } from "../button";
import { Sheet, SheetTrigger, SheetContent } from "../sheet";
import { ClipboardList, Home, LayoutDashboard, ListCheck, LogOut, MenuIcon, User } from "lucide-react";
import { TooltipProvider } from "../tooltip";
import { signOut } from "next-auth/react";

export function AssideBar() {
    return (
        <div className="flex w-full flex-col bg-muted/40">
            {/* Menu descktop */}
            <aside className="fixed inset-y-0 left-0 z-10 hidden w-56 border-r bg-background sm:flex flex-col">

                <div className="flex items-center justify-center border-b gap-4 px-4 py-5 text-blue-600">
                    <ClipboardList className="w-10 h-10 text-blue-600" />
                    <h1 className="text-lg font-semibold">Gerenciador de Tarefas</h1>
                </div>

                <nav className="flex flex-col gap-4 px-4 py-5">
                    <TooltipProvider>
                        <Link
                            className="flex items-center gap-3 px-2 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/20"
                            href="/"
                        >
                            <ListCheck className="w-6 h-6" />
                            <span className="text-sm font-medium">Dashboard</span>
                        </Link>

                        <Link
                            className="flex items-center gap-3 px-2 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/20"
                            href="/profile"
                        >
                            <User className="w-6 h-6" />
                            <span className="text-sm font-medium">Perfil</span>
                        </Link>
                    </TooltipProvider>
                </nav>

                <nav className="mt-auto px-4 py-5">
                    <TooltipProvider>
                        <button
                            className="flex items-center gap-3 px-2 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/20"
                            onClick={() => signOut()}
                        >
                            <LogOut className="w-6 h-6" />
                            <span className="text-sm font-medium">Sair</span>
                        </button>
                    </TooltipProvider>
                </nav>
            </aside>


            {/* Menu mobile */}
            {/* Menu mobile */}
            <div className="sm:hidden flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
                <header
                    className="sticky top-0 z-30 h-14 flex items-center px-4 border-b bg-background gap-4 sm:static
    sm:h-auto sm:border-0 sm:bg-transparent sm:px-6"
                >
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button size="icon" variant="outline" className="sm:hidden hover:bg-muted/10">
                                <MenuIcon className="w-5 h-5" />
                                <span className="sr-only">Abrir/Fechar Menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="sm:max-w-xs">
                            <div className="flex items-center justify-center border-b gap-4 px-4 py-5 text-blue-600">
                                <ClipboardList className="w-10 h-10 text-blue-600" />
                                <h1 className="text-lg font-semibold">Gerenciador de Tarefas</h1>
                            </div>
                            <nav className="grid gap-6 text-lg font-medium mt-3">
                                <Link
                                    className="flex items-center gap-4 px-3 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/20 transition"
                                    href="/"
                                >
                                    <ListCheck className="w-6 h-6" />
                                    <span className="text-sm font-medium">Dashboard</span>
                                </Link>

                                <Link
                                    className="flex items-center gap-4 px-3 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/20 transition"
                                    href="/profile"
                                >
                                    <User className="w-6 h-6" />
                                    <span className="text-sm font-medium">Perfil</span>
                                </Link>

                                <button
                                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/20 transition"
                                    onClick={() => signOut()}
                                >
                                    <LogOut className="w-6 h-6" />
                                    <span className="text-sm font-medium">Sair</span>
                                </button>
                            </nav>
                        </SheetContent>
                    </Sheet>
                    <h1>Menu</h1>
                </header>
            </div>
        </div>
    );
}