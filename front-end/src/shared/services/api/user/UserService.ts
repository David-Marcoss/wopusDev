"use client";
import { api } from "../ApiConfig"

export interface IUserUpdate{
    name: string
    email: string
}

export interface IUserData {
    id: string
    name: string
    email: string
}
interface IUserResponse {
    success: boolean,
    message: string,
    data: null | IUserData
}

export const UserService = {

    find : async ():Promise<IUserResponse | Error> => {
        const routeName = "user"
        
        try {
            const {data} = await api().get(routeName);
    
            return {
                success: true,
                message: "Usuário encontrado com sucesso",
                data: data
            }
    
        } catch (error:any) {
            if (error.message) {
                return error.message;
            } else {
                throw new Error("Erro no servidor");
            }
        }
    },
    
    update: async (userData:IUserUpdate):Promise<IUserResponse | Error> => {
        const routeName = "user/update"
        
        try {
            const {data} = await api().put(routeName, userData);
    
            return {
                success: true,
                message: "Usuário atualizado com sucesso",
                data: null
            }
    
        } catch (error:any) {
            if (error.status === 404) {
                return new Error("Email já cadastrado por outro usuário");
            } else {
               return new Error("Erro no servidor");
            }
        }
    }
}
