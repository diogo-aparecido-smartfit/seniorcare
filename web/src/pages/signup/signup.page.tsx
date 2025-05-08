import { IoIosArrowRoundForward } from "react-icons/io";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import SideImageLayout from "@/components/side-image-layout/side-image-layout";

export default function SignUpPage() {
  return (
    <SideImageLayout imageAlt="Image" imageSrc="/images/signup-image.jpg">
      <div className="flex flex-col">
        <h1 className="text-xl font-bold text-black">Crie sua conta</h1>
        <p className="text-sm font-normal text-gray-500">
          Comece a usar o SeniorCare hoje mesmo.
        </p>
      </div>
      <div className="flex flex-col gap-4 w-full">
        <div className="flex flex-col gap-2 ">
          <Label htmlFor="email">Email</Label>
          <Input type="email" id="email" placeholder="usuario@seniorcare.com" />
        </div>
        <div className="flex flex-col gap-2 ">
          <Label htmlFor="password">Senha</Label>
          <Input type="password" id="password" placeholder="••••••••••" />
          <p className="text-sm font-normal text-gray-500">
            Deve ter pelo menos 6 caracteres.
          </p>
        </div>
        <div className="flex flex-col gap-2 ">
          <Label htmlFor="confirm-password">Confirme sua senha</Label>
          <Input
            type="confirm-password"
            id="confirm-password"
            placeholder="••••••••••"
          />
        </div>
        <Link href="/dashboard/overview">
          <Button className="w-full bg-blue-600 hover:bg-blue-800 items-center">
            Criar conta <IoIosArrowRoundForward />
          </Button>
        </Link>
      </div>
      <Link href="/auth/signin">
        <Button className="mr-auto p-0" variant="link">
          Já tem uma conta? Entre agora mesmo
        </Button>
      </Link>
      <Separator />
      <p className="text-sm font-normal text-gray-500">© 2025 SeniorCare</p>
    </SideImageLayout>
  );
}
