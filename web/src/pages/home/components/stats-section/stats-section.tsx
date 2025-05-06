interface StatsSectionProps {
  stats: { value: string; label: string }[];
}

export const StatsSection = ({ stats }: StatsSectionProps) => {
  return (
    <section className="flex flex-col items-center gap-4 py-24">
      <div className="flex xl:w-full flex-col xl:flex-row">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`flex flex-col items-center gap-2 justify-center border-b-[1px] xl:border-b-0 ${
              index < stats.length - 1 ? "xl:border-r-[1px]" : ""
            } xl:w-full py-8 xl:py-0`}
          >
            <h2 className="text-black font-extralight text-5xl">
              {stat.value}
            </h2>
            <p className="text-gray-500 font-normal text-base">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
