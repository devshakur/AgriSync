"use client";

import { ArrowLeft, MoreVertical, Phone, Send } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import type { ChatMessage, Driver } from "../../../features/farmers/request-driver/types";

type DriverChatProps = {
  driver: Driver;
  messages: ChatMessage[];
  onMessagesChange: (messages: ChatMessage[]) => void;
  onBack: () => void;
  onContinue: () => void;
};

const DriverChat = ({ driver, messages, onMessagesChange, onBack, onContinue }: DriverChatProps) => {
  const [draft, setDraft] = useState("");
  const sendMessage = () => {
    const text = draft.trim();
    if (!text) return;
    onMessagesChange([...messages, { id: `message-${messages.length + 1}`, sender: "farmer", text, time: "Now" }]);
    setDraft("");
  };

  return (
    <section className="mx-auto flex min-h-[min(620px,calc(100vh-150px))] max-w-2xl flex-col overflow-hidden rounded-xl border border-black/[0.07] bg-white shadow-sm">
      <div className="flex items-center gap-3 border-b border-black/[0.07] px-4 py-3 sm:px-5"><button type="button" onClick={onBack} aria-label="Back to driver details" className="text-muted-foreground"><ArrowLeft className="h-4 w-4" /></button><div className="relative h-9 w-9 overflow-hidden rounded-full"><Image src={driver.image} alt={driver.name} fill sizes="36px" className="object-cover" /></div><div className="min-w-0 flex-1"><p className="text-sm font-semibold text-muted-foreground">{driver.name}</p><p className="text-[10px] text-primary">Online · Verified driver</p></div><button type="button" aria-label="Call driver" className="text-primary"><Phone className="h-4 w-4" /></button><button type="button" aria-label="More chat options" className="text-muted-foreground"><MoreVertical className="h-4 w-4" /></button></div>
      <div className="flex-1 space-y-3 overflow-y-auto bg-[#FAF7EF] p-4 sm:p-5">{messages.map((message) => <div key={message.id} className={`flex ${message.sender === "farmer" ? "justify-end" : "justify-start"}`}><div className={`max-w-[82%] rounded-xl px-3 py-2.5 text-xs ${message.sender === "farmer" ? "rounded-br-sm bg-[#DFF0E4] text-muted-foreground" : "rounded-bl-sm bg-white text-muted-foreground shadow-sm"}`}><p>{message.text}</p><p className="mt-1 text-[9px] text-muted-foreground">{message.time}</p></div></div>)}</div>
      <div className="border-t border-black/[0.07] bg-white p-3"><div className="flex items-center gap-2"><input value={draft} onChange={(event) => setDraft(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") sendMessage(); }} placeholder="Type a message..." aria-label="Message driver" className="h-10 min-w-0 flex-1 rounded-lg border border-black/10 bg-[#FAF7EF] px-3 text-xs text-muted-foreground outline-none focus:border-primary" /><button type="button" onClick={sendMessage} aria-label="Send message" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-white"><Send className="h-4 w-4" /></button></div><button type="button" onClick={onContinue} className="mt-3 w-full text-center text-[10px] font-semibold text-primary">Continue to delivery tracking</button></div>
    </section>
  );
};

export { DriverChat };
