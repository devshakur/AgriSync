"use client";

import { createContext, useContext, useEffect, useState, type Dispatch, type ReactNode, type SetStateAction } from "react";
import { drivers, initialMessages } from "@/features/farmers/constant";
import { emptyRequestValues } from "../types";
import type { ChatMessage, DeliveryStatus, Driver, RequestStage, RequestValues } from "../types";

const STORAGE_KEY = "requestDriverState";

type StoredState = {
  stage: RequestStage;
  request: RequestValues;
  selectedDriver: Driver;
  messages: ChatMessage[];
  deliveryStatus: DeliveryStatus;
  activeRequestId: string | null;
};

const readStoredState = (): StoredState | null => {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as StoredState) : null;
  } catch {
    return null;
  }
};

type RequestDriverContextValue = {
  stage: RequestStage;
  setStage: Dispatch<SetStateAction<RequestStage>>;
  request: RequestValues;
  setRequest: Dispatch<SetStateAction<RequestValues>>;
  selectedDriver: Driver;
  setSelectedDriver: Dispatch<SetStateAction<Driver>>;
  messages: ChatMessage[];
  setMessages: Dispatch<SetStateAction<ChatMessage[]>>;
  deliveryStatus: DeliveryStatus;
  setDeliveryStatus: Dispatch<SetStateAction<DeliveryStatus>>;
  activeRequestId: string | null;
  setActiveRequestId: Dispatch<SetStateAction<string | null>>;
  reset: () => void;
};

const RequestDriverContext = createContext<RequestDriverContextValue | undefined>(undefined);

/**
 * Mounted in the farmer layout and backed by sessionStorage, so the
 * request-driver flow resumes at the same step after navigating away
 * (or refreshing the tab) instead of restarting from step one.
 */
export function RequestDriverProvider({ children }: { children: ReactNode }) {
  const [stage, setStage] = useState<RequestStage>("request");
  const [request, setRequest] = useState<RequestValues>(emptyRequestValues);
  const [selectedDriver, setSelectedDriver] = useState<Driver>(drivers[0]);
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [deliveryStatus, setDeliveryStatus] = useState<DeliveryStatus>("Requested");
  const [activeRequestId, setActiveRequestId] = useState<string | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  // Hydrate from sessionStorage once on mount (client only, avoids SSR mismatch).
  useEffect(() => {
    const stored = readStoredState();
    if (stored) {
      setStage(stored.stage);
      setRequest(stored.request);
      setSelectedDriver(stored.selectedDriver);
      setMessages(stored.messages);
      setDeliveryStatus(stored.deliveryStatus);
      setActiveRequestId(stored.activeRequestId);
    }
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated || typeof window === "undefined") return;

    const stored: StoredState = { stage, request, selectedDriver, messages, deliveryStatus, activeRequestId };
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
  }, [isHydrated, stage, request, selectedDriver, messages, deliveryStatus, activeRequestId]);

  const reset = () => {
    setStage("request");
    setRequest(emptyRequestValues);
    setSelectedDriver(drivers[0]);
    setMessages(initialMessages);
    setDeliveryStatus("Requested");
    setActiveRequestId(null);

    if (typeof window !== "undefined") {
      window.sessionStorage.removeItem(STORAGE_KEY);
    }
  };

  return (
    <RequestDriverContext.Provider
      value={{
        stage,
        setStage,
        request,
        setRequest,
        selectedDriver,
        setSelectedDriver,
        messages,
        setMessages,
        deliveryStatus,
        setDeliveryStatus,
        activeRequestId,
        setActiveRequestId,
        reset,
      }}
    >
      {children}
    </RequestDriverContext.Provider>
  );
}

export function useRequestDriverState(): RequestDriverContextValue {
  const context = useContext(RequestDriverContext);
  if (!context) {
    throw new Error("useRequestDriverState must be used within a RequestDriverProvider");
  }
  return context;
}

