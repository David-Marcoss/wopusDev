import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "../textarea";
import { useState } from "react";
import TasksService, { ITask } from "@/shared/services/api/tasks/TasksService";
import { toast } from "react-toastify";



export function CreateTaskModal() {
    const [error, setError] = useState<string | null>(null);

    const [task, setTask] = useState<ITask>({
        title: "",
        description: "",
        status: "PENDENTE",
    });

    const handleCreateTask = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(null);

        const formData = new FormData(event.currentTarget);
        const title = formData.get("title") as string;
        const description = formData.get("description") as string;
        const status = formData.get("status") as string;
        const completedAt = formData.get("completedAt") as unknown as Date;

        // Validações
        if (!title.trim()) {
            setError("O título é obrigatório.");
            return;
        }

        if (!description.trim()) {
            setError("A descrição é obrigatória.");
            return;
        }

        if (status === "Concluida" && !completedAt) {
            setError("Data de conclusão é obrigatória para tarefas concluídas.");
            return;
        }

        console.log({ title, description, status, completedAt });

        TasksService.create({ 
            title, 
            description, 
            status: status.toUpperCase() as "PENDENTE" | "CONCLUIDA" | "EM_PROGRESSO", 
            completedAt: new Date(completedAt)
        }).then((data) => {
            if (data instanceof Error) {
                setError("Falha ao criar tarefa.");
                console.error(data.message);
            } else {
                toast.success("Tarefa criada com sucesso.");
                window.location.reload();
            }
        })
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Nova Tarefa
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] rounded-lg bg-white shadow-lg p-6">
                <DialogHeader>
                    <DialogTitle className="text-lg font-semibold text-gray-800">Criar Tarefa</DialogTitle>
                    <DialogDescription className="text-sm text-gray-600">
                        Preencha os campos abaixo para criar uma nova tarefa.
                    </DialogDescription>
                </DialogHeader>
                <form className="grid gap-4 mt-4" onSubmit={handleCreateTask}>
                    {error && <p className="text-sm text-red-600">{error}</p>}

                    {/* Campo de título */}
                    <div className="flex flex-col">
                        <Label htmlFor="title" className="text-sm font-medium text-gray-700">
                            Título
                        </Label>
                        <Input
                            id="title"
                            name="title"
                            placeholder="Digite o título da tarefa"
                            defaultValue={task.title}
                            className="mt-1"
                        />
                    </div>

                    {/* Campo de descrição */}
                    <div className="flex flex-col">
                        <Label htmlFor="description" className="text-sm font-medium text-gray-700">
                            Descrição
                        </Label>
                        <Textarea
                            id="description"
                            name="description"
                            placeholder="Digite a descrição da tarefa"
                            defaultValue={task.description}
                            className="mt-1"
                        />
                    </div>

                    {/* Campo de status */}
                    <div className="flex flex-col">
                        <Label htmlFor="status" className="text-sm font-medium text-gray-700">
                            Status
                        </Label>
                        <Select 
                            defaultValue={task.status}
                            onValueChange={(value) => setTask({ ...task, status: value as "PENDENTE" | "CONCLUIDA" | "EM_PROGRESSO" })}
                            name="status"
                        >
                            <SelectTrigger id="status" className="mt-1">
                                <SelectValue placeholder="Selecione o status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="PENDENTE">Pendente</SelectItem>
                                    <SelectItem value="EM_PROGRESSO">Em Progresso</SelectItem>
                                    <SelectItem value="CONCLUIDA">Concluída</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Campo de data de conclusão */}
                    {task.status === "CONCLUIDA" && (
                        <div className="flex flex-col">
                            <Label htmlFor="completedAt" className="text-sm font-medium text-gray-700">
                                Data de Conclusão
                            </Label>
                            <Input
                                id="completedAt"
                                name="completedAt"
                                type="date"
                                placeholder="Selecione a data de conclusão"
                                defaultValue={task.completedAt ? task.completedAt.toString() : ""}
                                className="mt-1"
                            />
                        </div>
                    )}

                    <DialogFooter>
                        <Button type="submit" className="bg-blue-600 text-white hover:bg-blue-700">
                            Criar Tarefa
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
