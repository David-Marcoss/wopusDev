"use client"

import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Search } from 'lucide-react'

import { TaskCard } from "@/components/ui/taskCard"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useEffect, useState } from "react"
import { CreateTaskModal } from "@/components/ui/createTaskModal"
import TasksService, { ITask } from "@/shared/services/api/tasks/TasksService"




export default function Dashboard() {
  const [search, setSearch] = useState<string>("");
  const [status, setStatus] = useState<"PENDENTE" | "CONCLUIDA" | "EM_PROGRESSO" | "Todas">("Todas");
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [tasksFiltered, setTasksFiltered] = useState<ITask[]>([]);
  
  useEffect(() => {
    
    TasksService.getAll().then((data) => {
      if (data instanceof Error) {
        console.log(data.message)
      } else {
        setTasks(data)
        setTasksFiltered(data)
      }
    })

  }, []);

  useEffect(() => {
    const filteredTasks = tasks.filter((task) => {
      const matchesSearch = search ? task.title.toLowerCase().includes(search.toLowerCase()) : true;
      const matchesStatus = status === "Todas" || task.status === status;
      return matchesSearch && matchesStatus;
    });

    setTasksFiltered(filteredTasks);

  }, [search, status]);

  return (
    <div className="container mx-auto h-full min-h-screen py-6 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-center sm:text-left">
            Gerenciador de Tarefas
          </h1>
          <CreateTaskModal />
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar tarefas..."
              className="pl-10"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <Select
              value={status}
              onValueChange={(value) => setStatus(value as any)}
            >
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filtrar pelo status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Todas">Todas</SelectItem>
                <SelectItem value="PENDENTE">Pendente</SelectItem>
                <SelectItem value="CONCLUIDA">Concluida</SelectItem>
                <SelectItem value="EM_PROGRESSO">Em Progresso</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Task List */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">Minhas Tarefas</CardTitle>
            <CardDescription>
              Gerencie suas tarefas diárias
            </CardDescription>
          </CardHeader>
          <CardContent>
            {tasksFiltered.length === 0 ? (
              <div className="flex items-center justify-center m-10 p-10">
                <h1>Ainda Não há tarefas cadastradas :( !!!</h1>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-4">
                {tasksFiltered.map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

