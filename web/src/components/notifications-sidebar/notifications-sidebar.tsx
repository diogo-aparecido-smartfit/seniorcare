import { CiCircleAlert } from "react-icons/ci";

export function NotificationsSidebar() {
  return (
    <aside className="hidden md:flex flex-col py-7 px-6 gap-6 min-w-[280px] border-l-[1px] bg-gray-50">
      <div className="flex flex-col gap-4">
        <h4 className="font-semibold text-lg">Notificações</h4>
        <ul className="flex flex-col gap-4">
          <li className="flex flex-row gap-2 ">
            <span className="rounded-md bg-blue-200 p-1 max-w-fit max-h-fit">
              <CiCircleAlert size={24} />
            </span>
            <div className="overflow-hidden">
              <p className="font-normal text-base text-black truncate whitespace-nowrap overflow-hidden text-ellipsis">
                You have a bug that needs to be fixed.
              </p>
              <p className="font-light text-sm text-gray-500">Agora</p>
            </div>
          </li>
          <li className="flex flex-row gap-2 ">
            <span className="rounded-md bg-blue-200 p-1 max-w-fit max-h-fit">
              <CiCircleAlert size={24} />
            </span>
            <div className="overflow-hidden">
              <p className="font-normal text-base text-black truncate whitespace-nowrap overflow-hidden text-ellipsis">
                You have a bug that needs to be fixed.
              </p>
              <p className="font-light text-sm text-gray-500">Agora</p>
            </div>
          </li>
          <li className="flex flex-row gap-2 ">
            <span className="rounded-md bg-blue-200 p-1 max-w-fit max-h-fit">
              <CiCircleAlert size={24} />
            </span>
            <div className="overflow-hidden">
              <p className="font-normal text-base text-black truncate whitespace-nowrap overflow-hidden text-ellipsis">
                You have a bug that needs to be fixed.
              </p>
              <p className="font-light text-sm text-gray-500">Agora</p>
            </div>
          </li>
        </ul>
      </div>
    </aside>
  );
}
