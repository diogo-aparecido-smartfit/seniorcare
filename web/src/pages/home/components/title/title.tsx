interface TitleProps {
  children: React.ReactNode;
  align?: "left" | "center" | "right";
  className?: string;
}

export const Title = ({
  children,
  align = "center",
  className = "",
}: TitleProps) => {
  return (
    <h1 className={`font-bold text-2xl lg:text-4xl text-${align} ${className}`}>
      {children}
    </h1>
  );
};
