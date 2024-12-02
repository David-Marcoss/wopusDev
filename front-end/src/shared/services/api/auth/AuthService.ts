"use client";

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
    data: {token: string} | null
}

const register = async (userData:IAuthRegister):Promise<IAuthResponse> => {
    
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

const login = async (userData:IAuthLogin):Promise<IAuthResponse> => {
    
    const routeName = "auth/login"
    
    try {
        const {data} = await api().post(routeName, userData);

        return {
            success: true,
            message: "Login efetuado com sucesso",
            data
        }

    } catch (error:any) {

        return {
            success: false,
            message: error.response ? error.response.data.message : "Erro no servidor",
            data: null
        }
    }
}


export const AuthService = {
    register,
    login
}
