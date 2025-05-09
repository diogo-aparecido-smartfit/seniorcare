import { Payment, columns } from "@/components/elderly-table/columns";
import { DataTable } from "@/components/elderly-table/data-table";

async function getData(): Promise<Payment[]> {
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
  ];
}

export default async function ElderlyPage() {
  const data = await getData();

  return (
    <section className="flex flex-col w-full h-full p-12 gap-8">
      <h1 className=" text-4xl font-bold text-black">Idosos</h1>
      <DataTable columns={columns} data={data} />
    </section>
  );
}
