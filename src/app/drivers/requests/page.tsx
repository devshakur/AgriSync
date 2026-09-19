"use client";

import { useState } from "react";
import { AvailableRequestsPanel } from "@/features/drivers/requests/AvailableRequestsPanel";
import { RequestInspectPanel } from "@/features/drivers/requests/RequestInspectPanel";

export default function DriversRequestsPage() {
  const [selectedRequestId, setSelectedRequestId] = useState<string | null>(null);
  const [rejectedIds, setRejectedIds] = useState<string[]>([]);

  const handleRejected = (id: string) => {
    setRejectedIds((ids) => (ids.includes(id) ? ids : [...ids, id]));
    setSelectedRequestId((current) => (current === id ? null : current));
  };

  return (
    <div className="p-3">
      <div className="grid grid-cols-1 items-start gap-2.5 lg:grid-cols-[minmax(0,2fr)_400px]">
        <AvailableRequestsPanel
          selectedId={selectedRequestId}
          rejectedIds={rejectedIds}
          onSelect={setSelectedRequestId}
          onRejected={handleRejected}
        />
        <aside className="min-w-0 lg:sticky lg:top-3">
          <RequestInspectPanel requestId={selectedRequestId} onRejected={handleRejected} />
        </aside>
      </div>
    </div>
  );
}
