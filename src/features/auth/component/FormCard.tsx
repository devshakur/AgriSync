import { ReactNode } from "react";

type FormCardProps = {
  children: ReactNode;
  className?: string;
};

const FormCard = ({ children, className = "" }: FormCardProps) => {
  return (
    <div
      className={`
        mx-auto
        w-full
       max-w-full
       md:max-w-[80vw]
       lg:max-w-[60vw]
       xl:max-w-[50vw]
        rounded-[28px]
        bg-white
        px-5
        py-7
        shadow-md
        sm:rounded-[22px]
        sm:px-8
        sm:py-9
        lg:px-10
        lg:py-10
        ${className}
      `}
    >
      {children}
    </div>
  );
}

export { FormCard, type FormCardProps };