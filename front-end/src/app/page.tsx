"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Search } from 'lucide-react'

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



interface Task {
  id: string;
  title: string;
  description: string;
  status: "Pendente" | "Concluida" | "Em Progresso";
  createdAt: string;
  completedAt?: string;
}

const tasksMock: Task[] = [
  {
    id: "1",
    title: "Configurar ambiente de desenvolvimento",
    description: "Instalar todas as dependências necessárias para o projeto.",
    status: "Concluida",
    createdAt: "2024-11-01T10:00:00",
    completedAt: "2024-11-02T15:30:00",
  },
  {
    id: "2",
    title: "Implementar sistema de login",
    description: "Desenvolver a funcionalidade de autenticação com validação de credenciais.",
    status: "Em Progresso",
    createdAt: "2024-11-05T09:00:00",
  },
  {
    id: "3",
    title: "Escrever documentação inicial",
    description: "Criar uma documentação básica para o repositório do projeto.",
    status: "Pendente",
    createdAt: "2024-11-10T14:00:00",
  },
  {
    id: "4",
    title: "Testar endpoints da API",
    description: "Executar testes para verificar o funcionamento correto dos endpoints.",
    status: "Em Progresso",
    createdAt: "2024-11-12T11:30:00",
  },
  {
    id: "5",
    title: "Corrigir bugs relatados",
    description: "Resolver os bugs identificados no módulo de autenticação.",
    status: "Pendente",
    createdAt: "2024-11-15T16:45:00",
  },
  {
    id: "6",
    title: "Finalizar integração com banco de dados",
    description: "Conectar e testar as operações CRUD com o banco de dados.",
    status: "Concluida",
    createdAt: "2024-11-07T08:15:00",
    completedAt: "2024-11-08T12:00:00",
  },
  {
    id: "7",
    title: "Configurar ambiente de desenvolvimento",
    description: "Instalar todas as dependências necessárias para o projeto.",
    status: "Concluida",
    createdAt: "2024-11-01T10:00:00",
    completedAt: "2024-11-02T15:30:00",
  },
  {
    id: "8",
      title: "Implementar sistema de login",
        description: "Desenvolver a funcionalidade de autenticação com validação de credenciais.",
          status: "Em Progresso",
            createdAt: "2024-11-05T09:00:00",
  },
  {
    id: "9",
      title: "Escrever documentação inicial",
        description: "Criar uma documentação básica para o repositório do projeto.",
          status: "Pendente",
            createdAt: "2024-11-10T14:00:00",
  },
  {
    id: "10",
      title: "Testar endpoints da API",
        description: "Executar testes para verificar o funcionamento correto dos endpoints.",
          status: "Em Progresso",
            createdAt: "2024-11-12T11:30:00",
  },
  
];


export default function Home() {

  const [search, setSearch] = useState<string>("")
  const [status, setStatus] = useState<"Pendente" | "Concluida" | "Em Progresso" | "Todas" >("Todas")
  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => {
    setTasks(tasksMock)
  },[])

  useEffect(() => {
    const filteredTasks = tasksMock.filter((task) => {
      const matchesSearch = search ? task.title.toLowerCase().includes(search.toLowerCase()) : true;
      const matchesStatus = status === "Todas" || task.status === status;
      return matchesSearch && matchesStatus;
    });
  
    setTasks(filteredTasks)
  }, [search, status])

  return (
    <div className="container mx-auto py-6">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Gerenciador de Tarefas</h1>
          <CreateTaskModal />
        </div>

        <div className="flex items-center justify-between gap-10">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar tarefas..."
              className="pl-10"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-4">
          <Select 
              value={status}
              onValueChange={ value => setStatus(value as any) }
              >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filtrar pelo status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Todas">Todas</SelectItem>
                <SelectItem value="Pendente">Pendente</SelectItem>
                <SelectItem value="Concluida">Concluida</SelectItem>
                <SelectItem value="Em Progresso">Em Progresso</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Minhas Tarefas</CardTitle>
            <CardDescription>
              Gerencie suas tarefas diárias
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {tasks.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

