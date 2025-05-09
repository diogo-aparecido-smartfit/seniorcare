import { AccordionList } from "@/components/accordion-list/accordion-list";
import { CTASection } from "@/components/cta-section/cta-section";
import { FeatureList } from "@/components/feature-list/feature-list";
import { HeroImage } from "@/components/hero-image/hero-image";
import { StatsSection } from "@/components/stats-section/stats-section";
import { Title } from "@/components/title/title";
import { Button } from "@/components/ui/button";
import { stats, accordionItems, features } from "@/utils/constants";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col max-w-[1440px] p-4 w-full cursor-default">
      <section className="flex flex-col items-center gap-4 py-24">
        <div className="flex flex-col lg:max-w-1/2 gap-4">
          <Title>
            Cuidar de quem cuida. <br /> Gerencie o cuidado com idosos de forma
            simples e eficiente.
          </Title>
          <p className="text-gray-500 text-center">
            Plataforma completa para organizações, cuidadores e familiares
            acompanharem a saúde dos idosos.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/auth/signup">
            <Button className="bg-blue-600 hover:bg-blue-800">
              Comece agora
            </Button>
          </Link>
          <Button variant="outline">Saiba mais</Button>
        </div>
        <HeroImage src="/images/hero-image.jpg" alt="Hero Image" />
      </section>

      <section className="flex flex-col items-center gap-4 py-24">
        <div className="flex flex-col lg:max-w-1/2 gap-4 items-center mb-12">
          <div className="px-2.5 py-1 border-[1px] rounded-xl">
            <p className="text-xs text-black font-semibold">
              Nossos Diferenciais
            </p>
          </div>
          <Title>Nossos números falam por nós</Title>
          <p className="text-gray-500 text-center">
            Resultados concretos, confiança de quem usa e uma plataforma feita
            para cuidar com excelência.
          </p>
        </div>
        <FeatureList features={features} />
      </section>

      <StatsSection stats={stats} />

      <section className="flex flex-col items-center gap-10 py-24">
        <div className="flex flex-col lg:max-w-1/2 gap-4 items-center">
          <div className="px-2.5 py-1 border-[1px] rounded-xl">
            <p className="text-xs text-black font-semibold">
              Perguntas frequentes
            </p>
          </div>
          <Title>Tire suas dúvidas rapidamente</Title>
          <p className="text-gray-500 text-center">
            Respostas diretas sobre o uso do sistema, cuidados com idosos e
            funcionalidades essenciais.
          </p>
        </div>
        <ul className="flex flex-col lg:flex-row lg:gap-8 w-full">
          <div className="flex-1">
            <AccordionList items={accordionItems.slice(0, 6)} />
          </div>
          <div className="flex-1">
            <AccordionList isLast items={accordionItems.slice(5, 11)} />
          </div>
        </ul>
      </section>

      <CTASection
        title="Pronto para transformar o cuidado com idosos?"
        description="Oferecemos tecnologia, simplicidade e confiança para você focar no que realmente importa: o bem-estar de quem mais precisa."
        primaryAction="Comece agora"
        secondaryAction="Fale com vendas"
      />
    </div>
  );
}
