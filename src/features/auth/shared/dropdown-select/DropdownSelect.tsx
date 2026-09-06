"use client";

import { Check, ChevronDown } from "lucide-react";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type ComponentType,
} from "react";

type SelectOption = {
  label: string;
  value: string;
};

type DropdownSelectProps = {
  id?: string;
  label: string;
  value?: string;
  name?: string;
  placeholder?: string;
  icon?: ComponentType<{ className?: string; strokeWidth?: number }>;
  options: SelectOption[];
  onChange?: (event: ChangeEvent<HTMLSelectElement>) => void;
  disabled?: boolean;
  error?: boolean;
  triggerClassName?: string;
  menuClassName?: string;
};

export function DropdownSelect({
  id,
  label,
  value,
  name,
  placeholder = "Select an option",
  icon: Icon,
  options,
  onChange,
  disabled,
  error,
  triggerClassName = "",
  menuClassName = "",
}: DropdownSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [internalValue, setInternalValue] = useState(value ?? "");
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const selectedValue = value !== undefined ? value : internalValue;

  const selectedOption = useMemo(
    () => options.find((option) => option.value === selectedValue),
    [options, selectedValue],
  );

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (!dropdownRef.current) return;
      const target = event.target as Node;
      if (!dropdownRef.current.contains(target)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  const handleSelect = (nextValue: string) => {
    setInternalValue(nextValue);
    setIsOpen(false);

    if (onChange) {
      onChange({
        target: {
          value: nextValue,
          name,
        },
      } as ChangeEvent<HTMLSelectElement>);
    }
  };

  return (
    <div ref={dropdownRef} className="relative w-full">
      <button
        id={id}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={label}
        onClick={() => !disabled && setIsOpen((current) => !current)}
        disabled={disabled}
        className={[
          "relative flex w-full items-center justify-between rounded-xl bg-[#FAF8F2] px-4 py-3 text-left transition-colors duration-200",
          error ? "border border-red-400" : "border border-transparent",
          disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer",
          triggerClassName,
        ].join(" ")}
      >
        {Icon && <Icon className="h-5 w-5 text-[#969284]" strokeWidth={1.8} />}
        <span
          className={[
            "flex-1 truncate text-BASE",
            selectedOption ? "text-[#111]" : "text-[#716F68]",
            Icon ? "pl-3" : "pl-0",
          ].join(" ")}
        >
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown className="h-5 w-5 text-[#66635A]" strokeWidth={2} />
      </button>

      {isOpen && (
        <div className={`absolute left-0 right-0 top-[calc(100%+8px)] z-20 overflow-hidden rounded-xl border border-[#E8E2D8] bg-[#FAF7EF] shadow-[0_18px_40px_rgba(15,26,19,0.12)] ${menuClassName}`}>
          <div className="max-h-64 overflow-y-auto p-2">
            {options.map((option) => {
              const isSelected = option.value === selectedValue;

              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleSelect(option.value)}
                  className={[
                    "flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left transition-colors duration-150",
                    isSelected ? "bg-[#EAF4EE] text-[#0F1A13]" : "text-[#1D1B18] hover:bg-[#F3F8F5]",
                  ].join(" ")}
                >
                  <span className="text-sm font-medium">{option.label}</span>
                  {isSelected && <Check className="h-4 w-4 text-[#1B5A3B]" strokeWidth={2.5} />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
