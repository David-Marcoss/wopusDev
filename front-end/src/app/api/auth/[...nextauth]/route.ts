import { api } from "@/shared/services/api/ApiConfig";
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { cookies } from "next/headers";

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
                    const { data } = await api().post("auth/login", {
                        email: credentials.email,
                        password: credentials.password
                    });

                    (await cookies()).set("authToken", data.authToken)

                    return {
                        id: data.userId,
                        email: data.email,
                        name: data.name,
                    }

                } catch (error: any) {
                    console.log("aqui")
                    console.log(error.response.data)

                    return null
                }
            }
        })
    ]
})

export { handler as GET, handler as POST };
