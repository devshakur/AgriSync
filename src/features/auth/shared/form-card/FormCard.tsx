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
      sm:max-w-[70vw]
       md:max-w-[60vw]
       lg:max-w-[50vw]
       xl:max-w-[40vw]
       2xl:max-w-[30vw]
        rounded-[28px]
       bg-white
        px-5
        py-7
        shadow-sm
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