import {EllipsisVertical, ClipboardList } from 'lucide-react'; // Importação dos ícones
import { Card, CardHeader, CardDescription, CardContent, CardTitle } from '../card';
import { Button } from "@/components/ui/button"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "../select";
import clsx from 'clsx';
import { EditTaskModal } from '../editTaskModal';
import { DeleteTaskModal } from '../deleteTaskModal';
import { useCallback } from 'react';
import TasksService from '@/shared/services/api/tasks/TasksService';
import { toast } from 'react-toastify';

import { ITask } from '@/shared/services/api/tasks/TasksService';

export function TaskCard({ task }: { task: ITask }) {

    const updateTaskStatus = useCallback((status: "PENDENTE" | "CONCLUIDA" | "EM_PROGRESSO") => {
        TasksService.updateById(task.id as string, {
            title: task.title,
            description: task.description,
            status: status,
            completedAt: task.completedAt
          }).then((data) => {
            if (data instanceof Error) {
              console.error(data.message);
            } else {
              toast.success("Tarefa criada com sucesso.");
              window.location.reload();
            }
          })
    }, [task]);
    
    return (
        <Card
            className={clsx(
                "flex flex-col min-h-[250px] max-h-auto h-full",
                {
                    "bg-red-200": task.status === "PENDENTE",
                    "bg-yellow-200": task.status === "EM_PROGRESSO",
                    "bg-green-200": task.status === "CONCLUIDA",
                }
            )}
        >
            <CardHeader className="flex-grow">
                <div className="flex items-center justify-between mb-3">
                    <CardTitle className="flex items-center justify-center text-lg sm:text-xl text-gray-800 select-none">
                        <ClipboardList className="mr-2 w-10 h-10" />
                        <div className="flex flex-col">
                            <h5>{task.title}</h5>
                            <span className="text-base sm:text-xs text-gray-500">
                                Criado em : {new Date(task.createdAt as Date).toLocaleDateString()}
                            </span>
                        </div>
                    </CardTitle>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="p-2 border-0 bg-transparent">
                                <EllipsisVertical className="w-5 h-5" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                            <DropdownMenuLabel>Ações</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuGroup>
                                <EditTaskModal task={task} />
                                <DeleteTaskModal taskId={task.id as string} />
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                {/* Descrição da tarefa */}
                <CardDescription
                    className="mt-5 flex-grow overflow-hidden text-ellipsis whitespace-normal break-words"
                >
                    {task.description}
                </CardDescription>
            </CardHeader>

            <CardContent className="mt-auto">
                <Select 
                    value={task.status}
                    onValueChange={updateTaskStatus}
                >
                    <SelectTrigger className="w-full border-black bg-transparent">
                        <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Status</SelectLabel>
                            <SelectItem value="PENDENTE" className="text-red-500">
                                Pendente
                            </SelectItem>
                            <SelectItem value="EM_PROGRESSO" className="text-yellow-500">
                                Em Progresso
                            </SelectItem>
                            <SelectItem value="CONCLUIDA" className="text-green-500">
                                Concluída
                            </SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </CardContent>
        </Card>
    );
}