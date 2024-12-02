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
import { Edit } from "lucide-react";
import { DropdownMenuItem } from "../dropdown-menu";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "../textarea";
import { useState } from "react";

interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  createdAt: string;
  completedAt?: string;
}

export function EditTaskModal({ task }: { task: Task }) {
  const [error, setError] = useState<string | null>(null);

  const handleEditTask = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    const formData = new FormData(event.currentTarget);
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const status = formData.get("status") as string;
    const completedAt = formData.get("completedAt") as string;

    // Validações
    if (!title.trim()) {
      setError("O título é obrigatório.");
      return;
    }

    if (!description.trim()) {
      setError("A descrição é obrigatória.");
      return;
    }

    if (!["Pendente", "Em Progresso", "Concluida"].includes(status)) {
      setError("Selecione um status válido.");
      return;
    }

    if (status === "Concluida" && !completedAt) {
      setError("Data de conclusão é obrigatória para tarefas concluídas.");
      return;
    }

    console.log({ title, description, status, completedAt });
    // Aqui você pode enviar os dados para a API ou realizar outras ações.
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <DropdownMenuItem onSelect={(event) => event.preventDefault()}>
          <Edit className="mr-2 w-4 h-4 text-gray-500" />
          <span>Editar</span>
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] rounded-lg bg-white shadow-lg p-6">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-gray-800">Editar Tarefa</DialogTitle>
          <DialogDescription className="text-sm text-gray-600">
            Atualize as informações da tarefa abaixo e clique em "Salvar Alterações".
          </DialogDescription>
        </DialogHeader>
        <form className="grid gap-4 mt-4" onSubmit={handleEditTask}>
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
            <Select defaultValue={task.status} name="status">
              <SelectTrigger id="status" className="mt-1">
                <SelectValue placeholder="Selecione o status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="Pendente">Pendente</SelectItem>
                  <SelectItem value="Em Progresso">Em Progresso</SelectItem>
                  <SelectItem value="Concluida">Concluída</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Campo de data de conclusão */}
          {task.status === "Concluida" && (
            <div className="flex flex-col">
              <Label htmlFor="completedAt" className="text-sm font-medium text-gray-700">
                Data de Conclusão
              </Label>
              <Input
                id="completedAt"
                name="completedAt"
                type="date"
                placeholder="Selecione a data de conclusão"
                defaultValue={task.completedAt || ""}
                className="mt-1"
              />
            </div>
          )}

          <DialogFooter>
            <Button type="submit" className="bg-blue-600 text-white hover:bg-blue-700">
              Salvar Alterações
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
