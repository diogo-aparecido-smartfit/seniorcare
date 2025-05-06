import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
import { IoIosArrowRoundBack } from "react-icons/io";

export default function RecoveryPage() {
  return (
    <div className="flex items-center w-full h-screen justify-between">
      <section className="flex flex-col items-center justify-center h-full w-full">
        <div className="flex flex-col justify-center p-4 h-full w-full lg:w-1/2  gap-4">
          <div className="flex flex-col">
            <h1 className="text-xl font-bold text-black">
              Defina uma nova senha
            </h1>
            <p className="text-sm font-normal text-gray-500">
              Digite sua nova senha e confirme-a para definir uma nova senha.
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
            </div>
            <div className="flex flex-col gap-2 ">
              <Label htmlFor="confirm-password">Confirme sua senha</Label>
              <Input
                type="confirm-password"
                id="confirm-password"
                placeholder="••••••••••"
              />
            </div>
            <Link href="/auth/two-factor">
              <Button className="bg-blue-600 hover:bg-blue-800 w-full">
                Definir nova senha
              </Button>
            </Link>
          </div>
          <Link href="/auth/signin">
            <Button className="mr-auto p-0 items-center" variant="link">
              <IoIosArrowRoundBack />
              Voltar ao Login
            </Button>
          </Link>
          <Separator />
          <p className="text-sm font-normal text-gray-500">© 2025 SeniorCare</p>
        </div>
      </section>
      <div className="hidden lg:flex p-4 relative rounded-md max-h-screen h-screen w-full overflow-hidden">
        <Image
          alt="Image"
          src="/images/recovery-image.jpg"
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
