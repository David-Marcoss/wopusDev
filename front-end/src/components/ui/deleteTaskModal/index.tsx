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

import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { Trash2 } from "lucide-react";


export function DeleteTaskModal({ taskId }: { taskId: number }) {

    const handleDeleteTask = () => {

        console.log('idTask', taskId);
        // Aqui você pode enviar os dados para a API ou realizar outras ações.
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
                    <Button type="submit" className="bg-blue-600 text-white hover:bg-blue-700">
                        Excluir
                    </Button>

                    <Button
                        type="button"
                        className="bg-red-600 text-white hover:bg-red-700"
                        onClick={handleDeleteTask}
                    >
                        Cancelar
                    </Button>
                </DialogFooter>

            </DialogContent>
        </Dialog>
    );
}
