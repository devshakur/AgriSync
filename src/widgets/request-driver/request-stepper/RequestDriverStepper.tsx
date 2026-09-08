import { Check } from "lucide-react";
import type { RequestStage } from "../../../features/farmers/request-driver/types";

type RequestDriverStepperProps = {
  stage: RequestStage;
};

const steps = [
  { key: "request", label: "Request" },
  { key: "drivers", label: "Drivers" },
  { key: "selected", label: "Select" },
  { key: "chat", label: "Chat" },
  { key: "tracking", label: "Track" },
] as const;

const stageIndex = (stage: RequestStage) => {
  if (stage === "completed") return steps.length;
  return steps.findIndex((step) => step.key === stage);
};

const RequestDriverStepper = ({ stage }: RequestDriverStepperProps) => {
  const activeIndex = stageIndex(stage);

  return (
    <div className="flex w-full items-start justify-between gap-1 py-2">
      {steps.map((step, index) => {
        const complete = index < activeIndex;
        const active = index === activeIndex;

        return (
          <div key={step.key} className="flex min-w-0 flex-1 items-start">
            <div className="flex min-w-0 flex-1 flex-col items-center gap-2">
              <div
                className={`flex h-7 w-7 items-center justify-center rounded-full border text-[10px] font-semibold transition sm:h-8 sm:w-8 ${
                  complete
                    ? "border-primary bg-primary text-white"
                    : active
                      ? "border-primary bg-[#E3F2E7] text-primary"
                      : "border-black/10 bg-background text-muted-foreground"
                }`}
              >
                {complete ? <Check className="h-3.5 w-3.5" /> : index + 1}
              </div>
              <span className={`truncate text-[9px] font-medium sm:text-[10px] ${active ? "text-primary" : "text-muted-foreground"}`}>
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <span className={`mt-3 h-px flex-1 ${index < activeIndex ? "bg-primary" : "bg-black/10"}`} />
            )}
          </div>
        );
      })}
    </div>
  );
};

export { RequestDriverStepper };
