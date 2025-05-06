interface FeatureCardProps {
  children: React.ReactNode;
  title: string;
  label: string;
}

export const FeatureCard = ({ children, label, title }: FeatureCardProps) => {
  return (
    <div className="flex items-center justify-center h-full w-full flex-col border-[1px] rounded-md p-8 gap-2 hover:bg-neutral-50 transition-all">
      {children}
      <h2 className="text-2xl text-black font-bold text-center">{title}</h2>
      <p className="text-sm text-gray-500 font-normal text-center">{label}</p>
    </div>
  );
};
