"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { redirect } from "next/navigation";

export default function NotFound() {
  const handleBackHome = () => {
    redirect("/");
  };

  return (
    <div className="flex flex-row gap-6 items-center justify-center w-full h-screen ">
      <div className="flex flex-col gap-6 p-10">
        <div className="flex flex-col gap-2 max-w-2/3">
          <p className="text-base font-semibold text-gray-500">404</p>
          <h2 className="text-3xl font-bold text-black">
            Página não encontrada
          </h2>
          <p className="text-base font-normal text-gray-500">
            Se você digitou a URL diretamente, certifique-se de que a grafia
            esteja correta.
          </p>
        </div>
        <div className="flex flex-col w-full lg:flex-row gap-2 items-center">
          <Button
            onClick={handleBackHome}
            className="bg-blue-600 hover:bg-blue-800 items-center w-full lg:w-fit"
          >
            Voltar para o Início
          </Button>
          <Button className="w-full lg:w-fit" variant="outline">
            Contate o Suporte
          </Button>
        </div>
      </div>
      <Image
        alt="Image"
        src="/images/notfound-image.svg"
        objectFit="cover"
        className="hidden lg:flex"
        width={460}
        height={64}
        sizes="100vw"
      />
    </div>
  );
}
