import clsx from "clsx";
import { InputHTMLAttributes } from "react";
import RequiredIcon from "@/icons/required-icon.svg";

type InputVariants = "default" | "error";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  variants: InputVariants;
  inputSize: "lg" | "md";
  isRequired?: boolean;
  isOptional?: boolean;
}

export default function Input({
  label,
  inputSize,
  variants,
  isRequired,
  isOptional,
  ...rest
}: Props) {
  const disabled = rest.disabled;
  const inputSizeStyleMap = {
    lg: "h-[48px]",
    md: "h-[40px]",
  };
  const inputVariantStyleMap: Record<InputVariants, string> = {
    default: "border-n-40 bg-n-10 hover:border-n-60",

    error: "border-system-r-400 caret-system-r-400 bg-white",
  };

  return (
    <label className="flex flex-col md:flex-row md:items-center gap-2">
      <span className="flex items-center">
        <p className="text-n-200 mr-1">{label}</p>
        {isRequired && <RequiredIcon />}
        {isOptional && <span className="text-n-60"> (선택)</span>}
      </span>
      <input
        {...rest}
        className={clsx(
          "py-[12px] px-[16px] placeholder:text-n-60 placeholder:body-lg text-black title-md caret-rg-400 focus:border-rg-400 not-placeholder-shown:bg-n-10 not-placeholder-shown:border-n-40 border outline-0 round-xs",
          inputSizeStyleMap[inputSize],
          inputVariantStyleMap[variants],
          disabled && "bg-n-40 text-n-60 border-0"
        )}
      />
    </label>
  );
}
