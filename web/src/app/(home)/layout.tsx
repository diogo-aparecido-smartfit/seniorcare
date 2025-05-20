import AppNavbar from "@/components/app-navbar/app-navbar";
import AppFooter from "@/components/app-footer/app-footer";
import { LenisProvider } from "@/contexts/Lenis";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <LenisProvider>
        <AppNavbar />
        <main className="flex w-full items-center justify-center">
          {children}
        </main>
        <AppFooter />
      </LenisProvider>
    </section>
  );
}
