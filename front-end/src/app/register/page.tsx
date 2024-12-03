"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { AuthService } from "@/shared/services/api/auth/AuthService";
import { toast } from "react-toastify";

import { redirect, useRouter } from "next/navigation";
import { getSession } from "next-auth/react";

type RegisterFormInputs = {
  name: string;
  email: string;
  password: string;
};

export default function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInputs>();

  const router = useRouter();

  // Verificar se o usuário já está logado
  useEffect(() => {
    getSession().then((session) => {
      console.log(session)
      if (session) {
        redirect("/")
      }
    })
  }, [])

  const onSubmit = async (data: RegisterFormInputs) => {
    setIsLoading(true);
    try {
      const response = await AuthService.register(data);

      if (response.success) {
        toast.success("Conta criada com sucesso!");
        router.push("/login");

      } else {
        toast.error(response.message || "Erro ao criar conta.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Ocorreu um erro inesperado. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center m-0">
      <Card className="flex w-full max-w-lg h-[500px] flex-col justify-center space-y-6 px-6 sm:w-[600px] border border-gray-400 rounded-sm">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl">Criar conta</CardTitle>
          <CardDescription>
            Preencha os dados abaixo para criar sua conta
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Nome */}
            <div className="space-y-2">
              <Input
                type="text"
                placeholder="Digite seu nome"
                className={`w-full bg-[#FFFCE1] ${errors.name ? "border-red-500" : ""
                  }`}
                {...register("name", { required: "O nome é obrigatório" })}
              />
              {errors.name && (
                <span className="text-sm text-red-500">
                  {errors.name.message}
                </span>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Input
                type="email"
                placeholder="Digite seu email"
                className={`w-full bg-[#FFFCE1] ${errors.email ? "border-red-500" : ""
                  }`}
                {...register("email", {
                  required: "O email é obrigatório",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Digite um email válido",
                  },
                })}
              />
              {errors.email && (
                <span className="text-sm text-red-500">
                  {errors.email.message}
                </span>
              )}
            </div>

            {/* Senha */}
            <div className="space-y-2">
              <Input
                type="password"
                placeholder="Digite sua senha"
                className={`w-full bg-[#FFFCE1] ${errors.password ? "border-red-500" : ""
                  }`}
                {...register("password", {
                  required: "A senha é obrigatória",
                  minLength: {
                    value: 6,
                    message: "A senha deve ter no mínimo 6 caracteres",
                  },
                })}
              />
              {errors.password && (
                <span className="text-sm text-red-500">
                  {errors.password.message}
                </span>
              )}
            </div>

            {/* Botão de Criar Conta */}
            <Button
              className="w-full bg-[#14161A] hover:bg-[#14161A]/90"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="loader"></span> Criando conta...
                </span>
              ) : (
                "Criar conta"
              )}
            </Button>

            {/* Link para login */}
            <div className="text-center text-sm">
              Já possui uma conta?{" "}
              <Link href="/login" className="text-blue-600 hover:underline">
                Faça login
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
