import { AppNavbar } from "@/components/app-navbar/app-navbar";
import { AppFooter } from "@/components/app-footer/app-footer";
import LenisWrapper from "@/components/lenis/lenis";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <LenisWrapper>
        <AppNavbar />
        <main className="flex w-full items-center justify-center scroll-smooth">
          {children}
        </main>
        <AppFooter />
      </LenisWrapper>
    </section>
  );
}
