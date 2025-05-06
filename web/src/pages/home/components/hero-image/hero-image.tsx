import Image from "next/image";

interface HeroImageProps {
  src: string;
  alt: string;
}

export const HeroImage = ({ src, alt }: HeroImageProps) => {
  return (
    <div className="hidden lg:flex p-4 relative rounded-md  h-[500px] w-full overflow-hidden">
      <Image
        alt={alt}
        src={src}
        className="rounded-md object-cover h-full w-full relative"
        objectFit="cover"
        width={0}
        height={0}
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white pointer-events-none" />
    </div>
  );
};
