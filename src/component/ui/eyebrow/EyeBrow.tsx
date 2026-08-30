interface EyeBrowProps {
  children: React.ReactNode;
  className?: string;
}

 const EyeBrow = ({ children, className = "" }: EyeBrowProps) => {
  return (
    <span
      className={`inline-block font-mono text-[14px] font-medium tracking-[0.09em] uppercase text-primary  text-center bg-emerald-100/80 px-4 py-3 rounded-full  ${className}`}
    >
      {children}
    </span>
  );
}

export { EyeBrow };