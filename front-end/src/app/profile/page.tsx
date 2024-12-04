"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IUserData, UserService } from "@/shared/services/api/user/UserService";
import { toast } from "react-toastify";

export default function ProfilePage() {
  const [userData, setUserData] = useState<IUserData>({ id: "", name: "", email: "" });

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { isDirty, errors },
  } = useForm<IUserData>({
    defaultValues: userData,
  });

  useEffect(() => {
    UserService.find().then((userData) => {
      if (userData instanceof Error) {
        console.error(userData);
      } else {
        const data = userData.data || { id: "", name: "", email: "" };
        setUserData(data);
        reset(data); // Atualiza os campos do formulário
      }
    });
  }, [reset]);

  useEffect(() => {
    // Atualiza os valores do formulário quando userData é alterado
    setValue("name", userData.name);
    setValue("email", userData.email);
  }, [userData, setValue]);

  const onSubmit = (data: IUserData) => {
    UserService.update({
      name: data.name,
      email: data.email,
    }).then((response) => {

      if (response instanceof Error) {
        toast.error(response.message);
      } else {
        toast.success("Usuário atualizado com sucesso");
        setUserData(data);
      }
    });

  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="w-[600px] h-[600px]">
        <Card className="max-w-2xl mx-auto">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Avatar className="h-24 w-24">
                <AvatarImage src="/placeholder.svg" alt="Profile picture" />
                <AvatarFallback>
                  <User className="h-12 w-12" />
                </AvatarFallback>
              </Avatar>
            </div>
            <CardTitle className="text-2xl">Perfil do Usuário</CardTitle>
            <CardDescription>Gerencie suas informações pessoais</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome</Label>
                <Input
                  id="name"
                  className="bg-[#FFFCE1]"
                  {...register("name", { required: "O nome é obrigatório" })}
                />
                {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  className="bg-[#FFFCE1]"
                  {...register("email", {
                    required: "O email é obrigatório",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Formato de email inválido",
                    },
                  })}
                />
                {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
              </div>
              <div className="flex gap-4">
            
                  <Button
                    type="submit"
                    className="flex-1"
                  >
                    Salvar
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={() => {
                      reset(userData);
                    }}
                  >
                    Cancelar
                  </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
