"use client";

import { cookies } from "next/headers";
import { api } from "../ApiConfig"

export interface IAuthRegister {
    name: string,
    email: string,
    password: string
}

export interface IAuthLogin {
    email: string,
    password: string
}

export interface IAuthResponse {
    success: boolean,
    message: string,
    data: {
        id: string,
        email: string,
        name: string,
        token: string
    } | null
}

export const AuthService = {
    
    update: async (userData:IAuthRegister):Promise<IAuthResponse> => {
        const routeName = "user/register"
        
        try {
    
            const {data} = await api().post(routeName, userData);
    
            return {
                success: true,
                message: "Cadastro efetuado com sucesso, faça login para acessar sua conta",
                data: null
            }
    
        } catch (error:any) {
    
            console.log(error.response)
    
            return {
                success: false,
                message: error.response ? error.response.data.message : "Erro no servidor",
                data: null
            }
        
        }
    }
}