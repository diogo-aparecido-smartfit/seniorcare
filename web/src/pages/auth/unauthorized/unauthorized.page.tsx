import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { GoLock, GoUnlock } from "react-icons/go";

export default function UnauthorizedPage() {
  return (
    <section className="flex w-full h-screen flex-col justify-center items-center">
      <div className="flex flex-col lg:max-w-1/3 gap-6 p-10">
        <div className="flex flex-col items-center lg:flex-row lg:items-start gap-4 ">
          <div className="p-2 rounded-full bg-gray-100 border-gray-200 border-[1px]">
            <GoLock size={20} />
          </div>
          <div className="flex flex-col gap-1">
            <h1 className="text-sm font-medium text-black">
              Você não tem permissão para acessar esta página.
            </h1>
            <p className="text-sm font-normal text-gray-500">
              Entre em contato com seu administrador para obter mais informações
              ou volte ao painel.
            </p>
          </div>
        </div>
        <Textarea />
        <Button variant="outline">
          <GoUnlock />
          Enviar solicitação
        </Button>
      </div>
    </section>
  );
}
