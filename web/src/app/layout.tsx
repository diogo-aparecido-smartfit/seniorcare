import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";

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
      <body
        className={`${interSans.variable} ${robotoMono.variable} antialiased`}
      >
        <main>{children}</main>
      </body>
    </html>
  );
}
