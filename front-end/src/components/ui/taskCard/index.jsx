import { Edit, Trash2, EllipsisVertical, ClipboardList, Delete } from 'lucide-react'; // Importação dos ícones
import { Card, CardHeader, CardDescription, CardContent, CardTitle } from '../card';
import { Button } from "@/components/ui/button"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
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
import { CreateTaskModal } from '../createTaskModal';
import { DeleteTaskModal } from '../deleteTaskModal';

export function TaskCard({ task }) {
    return (
        <Card className={clsx(
            "flex flex-col h-full",
            {
                "bg-red-200": task.status === "Pendente",
                "bg-yellow-200": task.status === "Em Progresso",
                "bg-green-200": task.status === "Concluida",
            }
        )}>
            <CardHeader>
                <div className="flex items-center justify-between mb-3">

                    <CardTitle className="flex items-center justify-center text-lg sm:text-xl text-gray-800 select-none">
                        <ClipboardList className="mr-2 w-10 h-10" />
                        <div className='flex flex-col'>
                            <h5>{task.title}</h5>
                            <span className="text-base sm:text-xs text-gray-500">
                                Criado em : {task.createdAt}
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
                                <DeleteTaskModal taskId={task.id} />
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                {/* Descrição da tarefa */}
                <CardDescription className='mt-5'>
                    {task.description}
                </CardDescription>
            </CardHeader>

            <CardContent className='mt-auto'>
                <Select value={task.status}>
                    <SelectTrigger className="w-full border-black bg-transparent">
                        <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Status</SelectLabel>
                            <SelectItem
                                value="Pendente"
                                className="text-red-500"
                            >
                                Pendente
                            </SelectItem>
                            <SelectItem
                                value="Em Progresso"
                                className="text-yellow-500"
                            >
                                Em Progresso
                            </SelectItem>
                            <SelectItem
                                value="Concluida"
                                className="text-green-500"
                            >
                                Concluída
                            </SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </CardContent>
        </Card>
    );
}
