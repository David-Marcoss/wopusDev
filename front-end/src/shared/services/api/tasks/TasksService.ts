import { api } from "../ApiConfig"

export interface ITask {
    id?: string,
    title: string,
    description?: string,
    status: "Pendente" | "Concluída" | "Em Progresso",
    createdAt?: string,
    completedAt?: string,
    userId: string
}

export interface ITasksResponse {
    success: boolean,
    message: string,
    data: { tasks: ITask[] } | { task: ITask } | null
}

export class TasksService {

    authToken: string = ""
    routeName: string = "tasks"

    constructor(authToken: string) {
        this.authToken = authToken
    }

    getAll = async (): Promise<ITasksResponse> => {
        try {
            const { data } = await api().get(`${this.routeName}/get-all-tasks`, {
                headers: {
                    Authorization: `Bearer ${this.authToken}`
                }
            })
            return data
        } catch (error: any) {
            if (!error.response) {
                return {
                    success: false,
                    message: "Falha ao buscar tarefas",
                    data: null
                }
            }
            return error.response.data
        }
    }

    getById = async (id: string): Promise<ITasksResponse> => {
        try {
            const { data } = await api().get(`${this.routeName}/get-one-task/${id}`, {
                headers: {
                    Authorization: `Bearer ${this.authToken}`
                }
            })
            return data
        } catch (error: any) {
            if (!error.response) {
                return {
                    success: false,
                    message: "Falha ao buscar tarefa",
                    data: null
                }
            }
            return error.response.data
        }
    }

    create = async (createData: ITask): Promise<ITasksResponse> => {
        try {
            const { data } = await api().post(`${this.routeName}/create-task`, createData, {
                headers: {
                    Authorization: `Bearer ${this.authToken}`
                }
            })
            return data
        } catch (error: any) {
            if (!error.response.data) {
                return {
                    success: false,
                    message: "Falha ao criar tarefa",
                    data: null
                }
            }
            return error.response.data
        }
    }

    updateById = async (id: string, updateData: ITask): Promise<undefined | ITasksResponse> => {
        try {
            const { data } = await api().patch(`${this.routeName}/update-task/${id}`, updateData, {
                headers: {
                    Authorization: `Bearer ${this.authToken}`
                }
            })
            return undefined
        } catch (error: any) {
            if (!error.response.data) {
                return {
                    success: false,
                    message: "Falha ao atualizar tarefa",
                    data: null
                }
            }
            return error.response.data
        }
    }

    deleteById = async (id: string): Promise<undefined | ITasksResponse> => {
        try {
            await api().delete(`${this.routeName}/delete-task/${id}`, {
                headers: {
                    Authorization: `Bearer ${this.authToken}`
                }
            })
            return undefined
        } catch (error: any) {
            if (!error.response.data) {
                return {
                    success: false,
                    message: "Falha ao deletar tarefa",
                    data: null
                }
            }
            return error.response.data
        }
    }
}
