import { Button } from "@/components/ui/button";
import { Title } from "../title/title";
import Link from "next/link";

interface CTASectionProps {
  title: string;
  description: string;
  primaryAction: string;
  secondaryAction: string;
}

export const CTASection = ({
  title,
  description,
  primaryAction,
  secondaryAction,
}: CTASectionProps) => {
  return (
    <section id="contact" className="flex flex-col items-center gap-10 py-24">
      <div className="flex flex-col lg:max-w-1/2 gap-4 items-center">
        <Title>{title}</Title>
        <p className="text-gray-500 text-center">{description}</p>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline">{secondaryAction}</Button>
        <Link href="/auth/signup">
          <Button className="bg-blue-600 hover:bg-blue-800">
            {primaryAction}
          </Button>
        </Link>
      </div>
    </section>
  );
};
