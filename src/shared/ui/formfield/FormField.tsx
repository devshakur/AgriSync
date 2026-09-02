"use client";

import {
  Eye,
  EyeOff,
  type LucideIcon,
} from "lucide-react";
import {
  useId,
  useState,
  type ChangeEvent,
} from "react";
import { DropdownSelect } from "@/features/auth/shared/dropdown-select";

type SelectOption = {
  label: string;
  value: string;
};

type BaseProps = {
  label: string;
  icon?: LucideIcon;
  width?: "full" | "half";
  helperText?: string;
  error?: string;
  required?: boolean;
  className?: string;
};

type InputFieldProps = BaseProps & {
  type?: "text" | "email" | "tel" | "password" | "number" | "url";
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  name?: string;
  autoComplete?: string;
  inputMode?: React.InputHTMLAttributes<HTMLInputElement>["inputMode"];
  disabled?: boolean;
};

type SelectFieldProps = BaseProps & {
  type: "select";
  value?: string;
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
  options: SelectOption[];
  placeholder?: string;
  name?: string;
  disabled?: boolean;
};

type TextareaFieldProps = BaseProps & {
  type: "textarea";
  value?: string;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  name?: string;
  rows?: number;
  disabled?: boolean;
};

type FormFieldProps =
  | InputFieldProps
  | SelectFieldProps
  | TextareaFieldProps;

const FormField = (props: FormFieldProps) => {
  const {
    label,
    icon: Icon,
    width = "full",
    helperText,
    error,
    required = false,
    className = "",
  } = props;

  const id = useId();
  const [showPassword, setShowPassword] = useState(false);

  const widthClass =
    width === "half" ? "w-full md:w-1/2" : "w-full";

  const borderClass = error
    ? "border-red-400 focus-within:border-red-500"
    : "border-transparent";

  return (
    <div className={`${widthClass} ${className}`}>
      {/* Label */}
      <label
        htmlFor={id}
        className=" block text-base py-1 font-semibold text-[#111]"
      >
        {label}

        {required && (
          <span className="ml-1 text-[#B35B25]">*</span>
        )}
      </label>

      {/* Input */}
      {props.type === "select" ? (
        <DropdownSelect
          id={id}
          label={props.label}
          value={props.value}
          placeholder={props.placeholder ?? "Select an option"}
          icon={Icon}
          options={props.options}
          onChange={props.onChange}
          disabled={props.disabled}
          error={Boolean(error)}
        />
      ) : props.type === "textarea" ? (
        <div
          className={`relative rounded-xl bg-[#FAF8F2] px-4 py-3 transition-colors duration-200 ${borderClass}`}
        >
          {Icon && (
            <Icon
              className="absolute left-5 top-5 h-5 w-5 text-[#969284]"
              strokeWidth={1.8}
            />
          )}

          <textarea
            id={id}
            name={props.name}
            value={props.value}
            onChange={props.onChange}
            placeholder={props.placeholder}
            rows={props.rows ?? 4}
            disabled={props.disabled}
            style={{ WebkitAppearance: "none", appearance: "none", boxShadow: "none" }}
            className={`w-full resize-none appearance-none border-0 bg-transparent text-base text-[#111] shadow-none outline-none ring-0 focus:border-0 focus:outline-none focus:ring-0 focus-visible:outline-none placeholder:text-[#7C7A73] disabled:cursor-not-allowed disabled:opacity-50 ${
              Icon ? "pl-10 pr-5" : "px-5"
            }`}
          />
        </div>
      ) : (
        <div
          className={`relative flex items-center rounded-xl bg-[#FAF8F2] px-4 py-3 shadow-none transition-colors duration-200 ${borderClass}`}
        >
          {Icon && (
            <Icon
              className="absolute left-5 h-5 w-5 text-[#969284]"
              strokeWidth={1.8}
            />
          )}

          <input
            id={id}
            name={props.name}
            type={
              props.type === "password"
                ? showPassword
                  ? "text"
                  : "password"
                : props.type ?? "text"
            }
            value={props.value}
            onChange={props.onChange}
            placeholder={props.placeholder}
            autoComplete={props.autoComplete}
            inputMode={props.inputMode}
            disabled={props.disabled}
            style={{ WebkitAppearance: "none", appearance: "none", boxShadow: "none" }}
            className={`w-full appearance-none border-0 bg-transparent py-0 text-base text-[#111] shadow-none placeholder:text-[#77756E] outline-none ring-0 focus:border-0 focus:outline-none focus:ring-0 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 ${
              Icon ? "pl-10" : "pl-5"
            } ${
              props.type === "password"
                ? "pr-14"
                : "pr-5"
            }`}
          />

          {/* Password toggle */}
          {props.type === "password" && (
            <button
              type="button"
              onClick={() =>
                setShowPassword((current) => !current)
              }
              className="absolute right-4 flex h-10 w-10 items-center justify-center rounded-full text-[#969284] transition hover:bg-black/5 hover:text-[#1B5A3B]"
              aria-label={
                showPassword
                  ? "Hide password"
                  : "Show password"
              }
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          )}
        </div>
      )}

      {/* Helper / Error */}
      {(helperText || error) && (
        <p
          className={`mt-2 text-sm ${
            error ? "text-red-500" : "text-[#77756E]"
          }`}
        >
          {error ?? helperText}
        </p>
      )}
    </div>
  );
}

export { FormField, type FormFieldProps };