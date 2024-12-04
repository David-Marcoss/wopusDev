"use client";

import { Button } from "@/components/ui/button";
import { AuthService } from "@/shared/services/api/auth/AuthService";
import Link from "next/link";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { use, useEffect, useState } from "react";
import { toast } from "react-toastify";

import { getSession, signIn } from "next-auth/react";

type LoginFormInputs = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false); // Estado de carregamento
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  // Verificar se o usuário já está logado
  useEffect(() => {
    getSession().then((session) => {
      console.log(session)
      if (session) {
        redirect("/")
      }
      if (error) {
        toast.error("Credenciais inválidas");
      }
    });
  }, [])


  const onSubmit = async (data: LoginFormInputs) => {
    setIsLoading(true); // Ativar carregamento
    signIn(
      "credentials",
      {
        ...data,
        callbackUrl: "/",
      },
    ).then((response) => {
      setIsLoading(false);
    }).catch((error) => {
      setIsLoading(false);
    });

  };

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center m-0">
      <div className="flex w-full max-w-lg h-[500px] flex-col justify-center space-y-6 px-6 sm:w-[600px] border border-gray-400 rounded-sm">
        <div className="flex flex-col space-y-2 text-center gap-4">
          <h1 className="text-2xl font-semibold tracking-tight">
            Bem vindo de volta!
          </h1>
          <p className="text-sm text-muted-foreground">
            Faça login para acessar a sua conta.
          </p>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex flex-col space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Digite seu email"
              className={`w-full px-4 py-2 border rounded-sm focus:outline-none ${errors.email ? "border-red-500" : "border-gray-300"
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

          <div className="flex flex-col space-y-2">
            <label htmlFor="password" className="text-sm font-medium">
              Senha
            </label>
            <input
              id="password"
              type="password"
              placeholder="Digite sua senha"
              className={`w-full px-4 py-2 border rounded-sm focus:outline-none ${errors.password ? "border-red-500" : "border-gray-300"
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

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="loader"></span> Enviando...
              </span>
            ) : (
              "Entrar"
            )}
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground">
          <Link
            href="/register"
            className="hover:text-brand underline underline-offset-4"
          >
            Não possui uma conta? Registre-se
          </Link>
        </p>
      </div>
    </div>
  );
}