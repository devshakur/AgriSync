"use client";

import { useState } from "react";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { AvailableDrivers } from "@/widgets/request-driver/available-drviers";
import { DeliveryTracking } from "@/widgets/request-driver/delivery-tracking";
import { DriverChat } from "@/widgets/request-driver/driverschat";
import { DriverDetails } from "@/widgets/request-driver/driver-details";
import { initialMessages, initialRequest, drivers } from "@/features/farmers/constant";
import { RequestDriverStepper } from "@/widgets/request-driver/request-stepper";
import { RequestForm } from "@/widgets/request-driver/requestform";
import { TransactionCompleted } from "@/widgets/request-driver/transaction-completed";
import type { ChatMessage, DeliveryStatus, Driver, RequestStage, RequestValues } from "./types";

const RequestDriver = () => {
  const [stage, setStage] = useState<RequestStage>("request");
  const [request, setRequest] = useState<RequestValues>(initialRequest);
  const [selectedDriver, setSelectedDriver] = useState<Driver>(drivers[0]);
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [deliveryStatus, setDeliveryStatus] = useState<DeliveryStatus>("Requested");

  const updateRequest = (field: keyof RequestValues, value: string) => {
    setRequest((current) => ({ ...current, [field]: value }));
  };

  const goHome = () => setStage("request");

  return (
    <div className="mx-auto max-w-5xl space-y-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            {stage !== "request" && <button type="button" onClick={goHome} aria-label="Start a new request" className="text-muted-foreground hover:text-primary"><ArrowLeft className="h-4 w-4" /></button>}
            <h1 className="font-heading text-xl font-bold tracking-tight text-muted-foreground sm:text-2xl">Request a Driver</h1>
          </div>
          <p className="mt-1 text-xs text-muted-foreground sm:text-sm">Move fresh produce safely and on time with a trusted nearby driver.</p>
        </div>
        <div className="hidden items-center gap-2 rounded-lg bg-[#E3F2E7] px-3 py-2 text-[10px] font-medium text-primary sm:flex"><ShieldCheck className="h-3.5 w-3.5" /> Safe and secure</div>
      </div>

      <div className="rounded-xl border border-black/[0.07] bg-white px-3 py-2 shadow-sm sm:px-6"><RequestDriverStepper stage={stage} /></div>

      {stage === "request" && (
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1.5fr)_300px]">
          <RequestForm values={request} onChange={updateRequest} onSubmit={() => setStage("drivers")} />
          <aside className="hidden h-fit rounded-xl border border-black/[0.07] bg-white p-5 shadow-sm lg:block"><h2 className="font-heading text-sm font-semibold text-muted-foreground">Need help?</h2><p className="mt-2 text-xs leading-5 text-muted-foreground">We match your request with verified drivers nearby, so you can compare price, vehicle and arrival time before choosing.</p><div className="mt-5 space-y-3 text-xs text-muted-foreground"><p><span className="mr-2 text-primary">✓</span>Verified drivers</p><p><span className="mr-2 text-primary">✓</span>Real-time tracking</p><p><span className="mr-2 text-primary">✓</span>Safe and secure</p></div></aside>
        </div>
      )}
      {stage === "drivers" && <AvailableDrivers request={request} drivers={drivers} onBack={() => setStage("request")} onSelect={(driver) => { setSelectedDriver(driver); setStage("selected"); }} />}
      {stage === "selected" && <DriverDetails driver={selectedDriver} request={request} onBack={() => setStage("drivers")} onProceed={() => { setDeliveryStatus("Driver Accepted"); setStage("chat"); }} />}
      {stage === "chat" && <DriverChat driver={selectedDriver} messages={messages} onMessagesChange={setMessages} onBack={() => setStage("selected")} onContinue={() => { setDeliveryStatus("Driver Arrived"); setStage("tracking"); }} />}
      {stage === "tracking" && <DeliveryTracking driver={selectedDriver} request={request} status={deliveryStatus} onStatusChange={setDeliveryStatus} onBack={() => setStage("chat")} onComplete={() => { setDeliveryStatus("Delivered"); setStage("completed"); }} />}
      {stage === "completed" && <TransactionCompleted driver={selectedDriver} request={request} onBackHome={goHome} />}
    </div>
  );
};

export { RequestDriver };
