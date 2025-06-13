"use client";

import { useAuth } from "@/contexts/AuthContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { FiUser, FiUserPlus, FiCalendar, FiAlertCircle } from "react-icons/fi";
import { useElderlyList } from "@/hooks/useElderlyList";
import { useCaregiverList } from "@/hooks/useCaregiverList";

export default function DashboardOverviewPage() {
  const { user } = useAuth();

  const { data: elderly = [], isLoading: elderlyLoading } = useElderlyList();
  const { data: caregivers = [], isLoading: caregiversLoading } =
    useCaregiverList();

  const isLoading = elderlyLoading || caregiversLoading;

  if (isLoading) {
    return (
      <section className="flex flex-col p-7 gap-7">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i}>
              <CardHeader className="pb-2">
                <Skeleton className="h-4 w-32" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-10 w-20" />
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <Skeleton className="h-5 w-40" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-[200px] w-full" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Skeleton className="h-5 w-40" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-[200px] w-full" />
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section className="flex flex-col p-7 gap-7">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="text-sm text-gray-500">
          Bem-vindo, {user?.name || "Usuário"}!
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total de Idosos
            </CardTitle>
            <FiUser className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{elderly.length}</div>
            <p className="text-xs text-muted-foreground">
              Cadastrados e monitorados
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cuidadores</CardTitle>
            <FiUserPlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{caregivers.length}</div>
            <p className="text-xs text-muted-foreground">
              Disponíveis para atendimento
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Próximos Agendamentos
            </CardTitle>
            <FiCalendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">
              Para as próximas 24h
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Alertas</CardTitle>
            <FiAlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">Requerem atenção</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Idosos Recentes</CardTitle>
            <CardDescription>
              Últimos idosos cadastrados no sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            {elderly.length > 0 ? (
              <ul className="space-y-4">
                {elderly.slice(0, 5).map((elder) => (
                  <li key={elder.id} className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                      <FiUser className="text-blue-600" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">{elder.name}</span>
                      <span className="text-xs text-gray-500">
                        {elder.address}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500">
                Nenhum idoso cadastrado ainda.
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Cuidadores Disponíveis</CardTitle>
            <CardDescription>Cuidadores ativos no sistema</CardDescription>
          </CardHeader>
          <CardContent>
            {caregivers.length > 0 ? (
              <ul className="space-y-4">
                {caregivers.slice(0, 5).map((caregiver) => (
                  <li key={caregiver.id} className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                      <FiUserPlus className="text-green-600" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">
                        {caregiver.user.name}
                      </span>
                      <span className="text-xs text-gray-500">
                        {caregiver.specialty}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500">
                Nenhum cuidador cadastrado ainda.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
