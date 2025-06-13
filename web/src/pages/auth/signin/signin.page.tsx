"use client";

import { useState } from "react";
import SideImageLayout from "@/components/side-image-layout/side-image-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, loading, error } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
    } catch (err) {
      console.log(err);
      // The error will be handled by the AuthContext
    }
  };

  // Show toast for error
  if (error) {
    toast.error(error);
  }

  return (
    <SideImageLayout imageAlt="Image" imageSrc="/images/signin-image.jpg">
      <div className="flex flex-col">
        <h1 className="text-xl font-bold">Login</h1>
        <p className="text-sm font-normal text-gray-500">
          Insira seus dados abaixo para fazer login
        </p>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
        <div className="flex flex-col gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            placeholder="usuario@seniorcare.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="password">Senha</Label>
          <Input
            type="password"
            id="password"
            placeholder="••••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-800"
          disabled={loading}
        >
          {loading ? "Entrando..." : "Entrar"}
        </Button>
      </form>

      <Link href="/auth/recovery" className="flex w-full">
        <Button variant="link" className="w-full">
          Esqueceu sua senha?
        </Button>
      </Link>

      <Separator />

      <p className="text-sm font-normal text-center text-gray-500">
        Ainda não tem uma conta?
      </p>

      <Link href="/auth/signup" className="flex w-full">
        <Button variant="outline" className="w-full">
          Criar conta
        </Button>
      </Link>
    </SideImageLayout>
  );
}
