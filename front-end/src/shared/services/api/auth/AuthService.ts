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

        return data

    } catch (error:any) {

        if(!error.response.data){
            return {
                success: false,
                message: "Falha ao cadastrar usuario",
                data: null
            }
        }

        return error.response.data
    }
}

const login = async (userData:IAuthLogin):Promise<IAuthResponse> => {
    
    const routeName = "auth/login"
    
    try {
        const {data} = await api().post(routeName, userData);

        return data

    } catch (error:any) {

        if(!error.response.data){
            return {
                success: false,
                message: "Erro no Login",
                data: null
            }
        }

        return error.response.data
    }
}


export const AuthService = {
    register,
    login
}
