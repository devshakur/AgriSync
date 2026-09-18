"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const FILTER_TABS = ["Nearby", "Route", "All"] as const;
type FilterTab = (typeof FILTER_TABS)[number];

const FROM_OPTIONS = ["Kano", "Kaduna", "Jos", "Abuja"];
const TO_OPTIONS = ["Kaduna", "Kano", "Jos", "Lagos"];
const RADIUS_OPTIONS = ["10 km", "25 km", "50 km", "100 km"];

type FilterFieldProps = {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
};

const FilterField = ({ label, value, options, onChange }: FilterFieldProps) => (
  <label className="block">
    <span className="text-xs font-medium text-muted-foreground">{label}</span>
    <div className="relative mt-1.5">
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-11 w-full appearance-none rounded-xl border border-black/8 bg-white px-3 pr-9 text-sm text-gray-900 outline-none transition focus:border-[#1B5A3B]"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
    </div>
  </label>
);

const QuickFilters = () => {
  const [tab, setTab] = useState<FilterTab>("Nearby");
  const [from, setFrom] = useState("Kano");
  const [to, setTo] = useState("Kaduna");
  const [radius, setRadius] = useState("50 km");

  const handleClear = () => {
    setTab("Nearby");
    setFrom("Kano");
    setTo("Kaduna");
    setRadius("50 km");
  };

  return (
    <section className="flex flex-col rounded-2xl border border-black/6 bg-white p-4 shadow-sm sm:p-5">
      <h2 className="font-heading text-sm font-semibold text-gray-900 sm:text-base">Quick Filters</h2>

      <div className="mt-4 flex items-center gap-5 border-b border-black/6">
        {FILTER_TABS.map((item) => {
          const active = item === tab;
          return (
            <button
              key={item}
              type="button"
              onClick={() => setTab(item)}
              className={`-mb-px pb-2 text-sm font-medium transition ${
                active ? "border-b-2 border-gray-900 text-gray-900" : "text-muted-foreground"
              }`}
            >
              {item}
            </button>
          );
        })}
      </div>

      <div className="mt-4 flex flex-col gap-3">
        <FilterField label="From" value={from} options={FROM_OPTIONS} onChange={setFrom} />
        <FilterField label="To" value={to} options={TO_OPTIONS} onChange={setTo} />
        <FilterField label="Radius" value={radius} options={RADIUS_OPTIONS} onChange={setRadius} />
      </div>

      <button
        type="button"
        className="mt-5 inline-flex h-11 w-full items-center justify-center rounded-xl bg-[#1B5A3B] text-sm font-semibold text-white transition hover:brightness-110"
      >
        Apply Filter
      </button>
      <button
        type="button"
        onClick={handleClear}
        className="mt-2 text-center text-xs font-medium text-muted-foreground transition hover:text-gray-800"
      >
        Clear
      </button>
    </section>
  );
};

export { QuickFilters };
