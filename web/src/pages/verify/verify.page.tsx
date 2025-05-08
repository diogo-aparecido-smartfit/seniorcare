"use client";

import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@/components/ui/input-otp";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function VerifyPage() {
  const router = useRouter();

  return (
    <section className="flex flex-col gap-2 w-full min-h-screen h-full bg-gray-100 items-center justify-center p-10">
      <div className="flex flex-col border-[1px] rounded-md w-full lg:max-w-1/3 bg-white">
        <div className="p-4 ">
          <p className="font-bold text-sm text-black text-center">
            Verificação em duas etapas
          </p>
        </div>
        <Separator />
        <div className="flex flex-col p-4 items-center">
          <p className="font-medium text-sm text-black">
            Etapa 4: Digite o código de 6 dígitos
          </p>
          <p className="font-normal text-sm text-gray-500 mb-4">
            Digite o código de verificação de 6 dígitos gerado pelo aplicativo
            Google Authenticator:
          </p>
          <InputOTP maxLength={6}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>
        <Separator />
        <div className="flex flex-row items-center justify-between p-4">
          <Button onClick={() => router.back()} variant="outline">
            Cancelar
          </Button>
          <Link href="/dashboard/overview">
            <Button className="bg-blue-600 hover:bg-blue-800">Verificar</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
