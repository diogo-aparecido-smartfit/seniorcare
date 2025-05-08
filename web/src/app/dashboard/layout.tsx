import { DashboardCommand } from "@/components/dashboard-command/dashboard-command";
import { DashboardNavbar } from "@/components/dashboard-navbar/dashboard-navbar";
import { DashboardSidebar } from "@/components/dashboard-sidebar/dashboard-sidebar";
import { NotificationsSidebar } from "@/components/notifications-sidebar/notifications-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { SidebarProvider as NotificationsSidebarProvider } from "@/components/ui/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full h-full">
      <DashboardCommand />
      <NotificationsSidebarProvider>
        <SidebarProvider>
          <DashboardSidebar />
          <section className="w-full h-full">
            <DashboardNavbar />
            {children}
          </section>
          <NotificationsSidebar />
        </SidebarProvider>
      </NotificationsSidebarProvider>
    </div>
  );
}
