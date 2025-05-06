import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";
import { AppNavbar } from "@/components/app-navbar/app-navbar";
import { AppFooter } from "@/components/app-footer/app-footer";
import LenisWrapper from "@/components/lenis/lenis";

const interSans = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SeniorCare – Plataforma de Gestão de Cuidado com Idosos",
  description:
    "Sistema completo para cuidadores, clínicas e familiares gerenciarem a saúde, rotina e bem-estar de idosos com eficiência, segurança e simplicidade.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <LenisWrapper>
        <body
          className={`${interSans.variable} ${robotoMono.variable} antialiased`}
        >
          <AppNavbar />
          <main className="flex w-full items-center justify-center scroll-smooth">
            {children}
          </main>
          <AppFooter />
        </body>
      </LenisWrapper>
    </html>
  );
}
