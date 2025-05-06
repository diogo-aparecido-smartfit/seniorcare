import { IoIosArrowRoundForward } from "react-icons/io";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

export default function SignUpPage() {
  return (
    <div className="flex items-center w-full h-screen justify-between">
      <section className="flex flex-col items-center justify-center h-full w-full">
        <div className="flex flex-col justify-center p-4 h-full w-full lg:w-1/2  gap-4">
          <div className="flex flex-col">
            <h1 className="text-xl font-bold text-black">Crie sua conta</h1>
            <p className="text-sm font-normal text-gray-500">
              Comece a usar o SeniorCare hoje mesmo.
            </p>
          </div>
          <div className="flex flex-col gap-4 w-full">
            <div className="flex flex-col gap-2 ">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                placeholder="usuario@seniorcare.com"
              />
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
            <Button className="bg-blue-600 hover:bg-blue-800 items-center">
              Criar conta <IoIosArrowRoundForward />
            </Button>
          </div>
          <Button className="mr-auto p-0" variant="link">
            Já tem uma conta? Entre agora mesmo
          </Button>
          <Separator />
          <p className="text-sm font-normal text-gray-500">© 2025 SeniorCare</p>
        </div>
      </section>
      <div className="hidden lg:flex p-4 relative rounded-md max-h-screen h-screen w-full overflow-hidden">
        <Image
          alt="Image"
          src="/images/signup-image.jpg"
          className="rounded-md object-cover h-full w-full relative"
          objectFit="cover"
          width={0}
          height={0}
          sizes="100vw"
        />
      </div>
    </div>
  );
}
