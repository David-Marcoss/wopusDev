import { api } from "../ApiConfig"

export interface ITask {
    id?: string,
    title: string,
    description: string,
    status: "PENDENTE" | "CONCLUIDA" | "EM_PROGRESSO",
    createdAt?: Date,
    completedAt?: Date,
    userId?: string
}


class TasksService {

    authToken: string = ""
    routeName: string = "tasks"

    constructor(authToken: string) {
        this.authToken = authToken
    }

    getAll = async (): Promise<ITask[] | Error > => {
        try {
            const { data } = await api().get(`${this.routeName}`)
            return data
        } catch (error: any) {

            return error
        }
    }

    // getById = async (id: string): Promise<ITasksResponse> => {
    //     try {
    //         const { data } = await api().get(`${this.routeName}/get-one-task/${id}`, {
    //             headers: {
    //                 Authorization: `Bearer ${this.authToken}`
    //             }
    //         })
    //         return data
    //     } catch (error: any) {
    //         if (!error.response) {
    //             return {
    //                 success: false,
    //                 message: "Falha ao buscar tarefa",
    //                 data: null
    //             }
    //         }
    //         return error.response.data
    //     }
    // }

    create = async (createData: ITask): Promise<ITask | Error> => {
        try {
            const { data } = await api().post(`${this.routeName}`, createData)
            return data
        } catch (error: any) {
            return error
        }
    }

    updateById = async (id: string, updateData: ITask): Promise<ITask | Error> => {
        try {
            const { data } = await api().put(`${this.routeName}/${id}`, updateData)
            return data
        } catch (error: any) {
        
            return error.mensage
        }
    }

    deleteById = async (id: string): Promise<null | Error> => {
        try {
            await api().delete(`${this.routeName}/${id}`)
            
            return null
        } catch (error: any) {
            return error.message
        }
    }
}


export default new TasksService("authToken")