import { DataTable } from "@/components/elderly-table/data-table";
import { DataType, columns } from "@/mock/data.columns";

async function getData(): Promise<DataType[]> {
  return [
    {
      id: "728ed52f",
      full_name: "Jerome Bell",
      birthdate: "10/10/1960",
      address: "Rua X, Bairro Y, Cidade Z",
      responsible_caregiver: "Maria",
      emergency_contact: "(205) 555-0100",
      status: "pending",
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
