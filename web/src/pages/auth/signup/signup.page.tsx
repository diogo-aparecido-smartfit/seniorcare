"use client";

import SideImageLayout from "@/components/side-image-layout/side-image-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import api from "@/services/api";

export default function SignUpPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    organizationName: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("As senhas não coincidem");
      return;
    }

    if (formData.password.length < 6) {
      toast.error("A senha deve ter pelo menos 6 caracteres");
      return;
    }

    try {
      setLoading(true);

      const orgResponse = await api.post("/api/organizations", {
        name: formData.organizationName,
      });

      const organizationId = orgResponse.data.id;

      await api.post("/api/auth/signup", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        organizationId: organizationId,
        role: "ADMIN",
      });

      toast.success("Conta criada com sucesso!");
      router.push("/auth/signin");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Erro ao criar conta:", error);
      toast.error(
        error.response?.data?.message || "Erro ao criar conta. Tente novamente."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SideImageLayout imageAlt="Image" imageSrc="/images/signup-image.jpg">
      <div className="flex flex-col">
        <h1 className="text-xl font-bold ">Crie sua conta</h1>
        <p className="text-sm font-normal text-gray-500">
          Comece a usar o SeniorCare hoje mesmo.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
        <div className="flex flex-col gap-2">
          <Label htmlFor="name">Nome completo</Label>
          <Input
            type="text"
            id="name"
            placeholder="Seu nome"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="organizationName">Nome da Instituição</Label>
          <Input
            type="text"
            id="organizationName"
            placeholder="Nome da sua instituição"
            value={formData.organizationName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            placeholder="usuario@seniorcare.com"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="password">Senha</Label>
          <Input
            type="password"
            id="password"
            placeholder="••••••••••"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <p className="text-sm font-normal text-gray-500">
            Deve ter pelo menos 6 caracteres.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="confirmPassword">Confirme a senha</Label>
          <Input
            type="password"
            id="confirmPassword"
            placeholder="••••••••••"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-800"
          disabled={loading}
        >
          {loading ? "Criando conta..." : "Criar conta"}
        </Button>
      </form>

      <Separator />

      <p className="text-sm font-normal text-center text-gray-500">
        Já tem uma conta?
      </p>

      <Link href="/auth/signin" className="flex w-full">
        <Button variant="outline" className="w-full">
          Fazer login
        </Button>
      </Link>
    </SideImageLayout>
  );
}
