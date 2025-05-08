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
import { IoFingerPrintOutline } from "react-icons/io5";

export default function TwoFactorPage() {
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
        <div className="flex flex-col p-4">
          <p className="font-medium text-sm text-black">
            Etapa 1: Instalar o Google Authenticator
          </p>
          <p className="font-normal text-sm text-gray-500">
            Baixe o aplicativo Google Authenticator no seu dispositivo móvel na
            <strong> App Store</strong> ou no <strong> Google Play</strong>.
          </p>
        </div>
        <Separator />
        <div className="flex flex-col p-4">
          <p className="font-medium text-sm text-black">
            Etapa 2: Adicione sua conta
          </p>
          <p className="font-normal text-sm text-gray-500">
            Abra o aplicativo Google Authenticator. Toque no botão de adição e
            selecione &quot;Escanear um código QR&quot;.
          </p>
        </div>
        <Separator />
        <div className="flex flex-col p-4">
          <p className="font-medium text-sm text-black">
            Etapa 3: Escaneie o código QR
          </p>
          <p className="font-normal text-sm text-gray-500">
            Use o aplicativo Google Authenticator para escanear o código QR:
          </p>
        </div>
        <Separator />
        <div className="flex flex-col p-4">
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
        <div className="flex flex-col p-4">
          <p className="font-medium text-sm text-black">
            Etapa 5: verificar e habilitar
          </p>
          <p className="font-normal text-sm text-gray-500">
            Clique em &quot;Verificar&quot; para concluir a configuração e
            proteger sua conta.
          </p>
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
      <div className="flex flex-col p-6 border-[1px] rounded-md w-full lg:max-w-1/3 bg-white">
        <div className="flex flex-row gap-4">
          <IoFingerPrintOutline size={48} />
          <div className="flex flex-col">
            <p className="font-medium text-sm text-black">
              Dicas de segurança:
            </p>
            <ul className="list-disc ml-8">
              <li>
                <p className="font-normal text-sm text-gray-500">
                  Mantenha seus códigos de backup seguros.
                </p>
              </li>
              <li>
                <p className="font-normal text-sm text-gray-500">
                  Habilite a autenticação de dois fatores em outros serviços
                  para maior segurança.
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
