import SideImageLayout from "@/components/side-image-layout/side-image-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default function SignInPage() {
  return (
    <SideImageLayout imageAlt="Image" imageSrc="/images/signin-image.jpg">
      <div className="flex flex-col">
        <h1 className="text-xl font-bold text-black">Login</h1>
        <p className="text-sm font-normal text-gray-500">
          Insira seus dados abaixo para fazer login
        </p>
      </div>
      <div className="flex flex-col gap-4 w-full">
        <div className="flex flex-col gap-2 ">
          <Label htmlFor="email">Email</Label>
          <Input type="email" id="email" placeholder="usuario@seniorcare.com" />
        </div>
        <div className="flex flex-col gap-2 ">
          <Label htmlFor="password">Password</Label>
          <Input type="password" id="password" placeholder="••••••••••" />
        </div>
        <Link className="flex w-full" href="/auth/two-factor">
          <Button className="w-full bg-blue-600 hover:bg-blue-800">
            Continuar
          </Button>
        </Link>
      </div>
      <Link href="/auth/recovery">
        <Button className="mr-auto p-0" variant="link">
          Esqueceu sua senha?
        </Button>
      </Link>
      <Separator />
      <p className="text-sm font-normal text-gray-500">© 2025 SeniorCare</p>
    </SideImageLayout>
  );
}
