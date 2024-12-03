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
import TasksService from "@/shared/services/api/tasks/TasksService";

import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { Trash2 } from "lucide-react";
import { toast } from "react-toastify";


export function DeleteTaskModal({ taskId }: { taskId: string }) {

    const handleDeleteTask = () => {

        TasksService.deleteById(taskId).then((data) => {
            if (data instanceof Error) {
                console.log(data.message)
            } else {
                toast.success("Tarefa excluída com sucesso")
                window.location.reload()
            }
        })
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <DropdownMenuItem onSelect={(event) => event.preventDefault()}>
                    <Trash2 className="mr-2 w-4 h-4 text-red-500" />
                    <span className='text-red-500'>Excluir</span>
                </DropdownMenuItem>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] rounded-lg bg-white shadow-lg p-6">
                <DialogHeader>
                    <DialogTitle className="text-lg font-semibold text-gray-800">Excluir Tarefa</DialogTitle>
                    <DialogDescription className="text-sm text-gray-600">
                        Você tem certeza que deseja excluir essa tarefa?
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter className="flex items-center justify-center">
                    <Button 
                        type="submit" 
                        className="bg-blue-600 text-white hover:bg-blue-700"
                        onClick={handleDeleteTask}
                    >
                        Excluir
                    </Button>

                    <Button
                        type="button"
                        className="bg-red-600 text-white hover:bg-red-700"
                        onClick={ () => window.location.reload() }
                    >
                        Cancelar
                    </Button>
                </DialogFooter>

            </DialogContent>
        </Dialog>
    );
}
