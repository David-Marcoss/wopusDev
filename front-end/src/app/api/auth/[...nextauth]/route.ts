
import { api } from "@/shared/services/api/ApiConfig";
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { cookies } from "next/headers";

import axios from "axios";

const handler = NextAuth({
    pages: {
        signIn: '/login',
    },
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                if (!credentials) return null

                try {
                    let response;

                    if(process.env.NEXT_PUBLIC_APP_ENV === "docker") {
                        
                        // no docker compose quando uma aplicação esta rodando como back-end e tenta acessar 
                        // outra, ela deve usar o nome do serviço no lugar do endereço IP.
                        // O nome do serviço é o nome do serviço no arquivo docker-compose.yml.
                        // No caso do docker-compose.yml acima, o nome do serviço é backend-api. Portanto,
                        //  a aplicação web deve acessar a API em http://backend-api:3333.

                        response = await axios.post(`${process.env.NEXT_PUBLIC_DOCKER_API_URL}auth/login`, credentials);

                    }else{
                        response = await api().post("/auth/login", credentials);
                    }
                    
                    const data = response.data;

                    (await cookies()).set("authToken", data.authToken)
                    
                    if (!data) return null

                    return {
                        id: data.userId,
                        email: data.email,
                        name: data.name,
                    }

                } catch (error: any) {
                    console.log("aqui")
                    console.log(error)

                    return null
                }
            }
        })
    ]
})

export { handler as GET, handler as POST };
