import { Check, type LucideIcon } from "lucide-react";

type FormSubheadProps = {
  role?: string;
  title: string;
  description: string;
  icon: LucideIcon;


  currentStep?: 1 | 2;
  firstStepLabel?: string;
  secondStepLabel?: string;
};

const FormSubhead = ({
  role,
  title,
  description,
  icon: Icon,
  currentStep = 2,
  firstStepLabel = "ROLE",
  secondStepLabel = "DETAILS",
}: FormSubheadProps) => {
  const isFirstStepComplete = currentStep >= 2;

  return (
    <div className="flex w-full flex-col gap-4 items-center text-center">
      {/* Progress Steps */}
      <div className="flex items-center gap-3 font-mono text-xs tracking-[0.12em]">
        {/* Step 1 */}
        <div className="flex items-center gap-2">
          <div
            className={`flex h-8 w-8 items-center justify-center rounded-full ${
              isFirstStepComplete
                ? "bg-[#1B5A3B] text-white"
                : "border-2 border-[#B35B25] text-[#B35B25]"
            }`}
          >
            {isFirstStepComplete ? (
              <Check className="h-4 w-4" strokeWidth={2.5} />
            ) : (
              "1"
            )}
          </div>

          <span
            className={
              isFirstStepComplete
                ? "text-[#7C7A73]"
                : "font-semibold text-[#B35B25]"
            }
          >
            {firstStepLabel}
          </span>
        </div>

        {/* Connector */}
        <div
          className={`h-0.5 w-10 border-t-2 border-dashed sm:w-14 ${
            isFirstStepComplete
              ? "border-[#D7A47E]"
              : "border-[#D9D6CE]"
          }`}
        />

        {/* Step 2 */}
        <div className="flex items-center gap-2">
          <div
            className={`flex h-8 w-8 items-center justify-center rounded-full border-2 font-semibold ${
              currentStep === 2
                ? "border-[#B35B25] text-[#B35B25]"
                : "border-[#D9D6CE] text-[#969284]"
            }`}
          >
            2
          </div>

          <span
            className={
              currentStep === 2
                ? "font-semibold text-[#B35B25]"
                : "text-[#7C7A73]"
            }
          >
            {secondStepLabel}
          </span>
        </div>
      </div>

      {/* Role Badge */}
       {role && (
      <div className="inline-flex items-center gap-3 rounded-full bg-[#E3F2E7] px-4 py-2.5">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-[#1B5A3B]">
          <Icon className="h-3 w-3" strokeWidth={1.8} />
        </span>
      
        <span className="pr-2 text-sm font-semibold text-[#1B5A3B]">
          {role}
        </span>
      </div>
       )}

      {/* Heading */}
      <h1 className=" max-w-3xl text-xl font-semibold leading-[1.1] tracking-[-0.035em] text-[#073D2C]">
        {title}
      </h1>

      {/* Description */}
      <p className=" max-w-3xl text-base leading-relaxed text-[#4B514F]  ">
        {description}
      </p>
    </div>
  );
}

export {FormSubhead};