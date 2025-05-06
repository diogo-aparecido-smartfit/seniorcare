import { FiClock, FiTarget, FiUsers } from "react-icons/fi";
import { BiSignal3 } from "react-icons/bi";
import { IoFlashOutline } from "react-icons/io5";
import { LuFiles } from "react-icons/lu";
import { FeatureCard } from "../feature-card/feature-card";
import Image from "next/image";

const icons = {
  FiClock,
  FiTarget,
  FiUsers,
  BiSignal3,
  IoFlashOutline,
  LuFiles,
};

interface FeatureListProps {
  features: { title: string; label: string; icon: string; color: string }[];
}

export const FeatureList = ({ features }: FeatureListProps) => {
  return (
    <div className="flex flex-row gap-8">
      <div className="hidden lg:flex p-4 relative rounded-md border-[1px]  min-h-full w-full">
        <Image
          alt="Features image"
          src="/images/features-image.jpg"
          className="rounded-md object-cover h-full w-full relative "
          objectFit="cover"
          width={0}
          height={0}
          sizes="100vw"
        />
      </div>
      <ul className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-w-fit w-full">
        {features.map((feature, index) => {
          const Icon = icons[feature.icon as keyof typeof icons];
          return (
            <li key={index}>
              <FeatureCard title={feature.title} label={feature.label}>
                <Icon size={32} className={feature.color} />
              </FeatureCard>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
