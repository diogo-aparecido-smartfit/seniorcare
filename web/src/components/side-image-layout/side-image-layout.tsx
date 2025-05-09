import Image from "next/image";
import { ReactNode } from "react";

interface SideImageLayoutProps {
  children: ReactNode;
  imageSrc: string;
  imageAlt: string;
}

export const SideImageLayout = ({
  children,
  imageSrc,
  imageAlt,
}: SideImageLayoutProps) => {
  return (
    <div className="flex items-center w-full min-h-screen h-full justify-between">
      <section className="flex flex-col items-center justify-center h-full w-full">
        <div className="flex flex-col justify-center p-4 h-full w-full lg:w-1/2 gap-4">
          {children}
        </div>
      </section>
      <div className="hidden lg:flex p-4 relative rounded-md max-h-screen h-screen w-full overflow-hidden">
        <Image
          alt={imageAlt}
          src={imageSrc}
          className="rounded-md object-cover h-full w-full relative"
          objectFit="cover"
          width={0}
          height={0}
          sizes="100vw"
        />
      </div>
    </div>
  );
};

export default SideImageLayout;
