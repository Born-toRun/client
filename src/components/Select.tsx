import BackIcon from "@/icons/back-icon.svg";
import DropDownIcon from "@/icons/drop-down-icon.svg";
import clsx from "clsx";
import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "./Sheet";

type InputVariants = "default" | "error";

export interface Option {
  value: string;
  label: string;
}

interface Props {
  label: string;
  value?: string;
  options: Option[];
  variants: InputVariants;
  inputSize: "lg" | "md";
  isRequired?: boolean;
  isOptional?: boolean;
  placeholder?: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export default function SelectModalTrigger({
  label,
  value,
  options,
  variants,
  inputSize,
  onChange,
  ...rest
}: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const disabled = rest.disabled;
  const inputSizeStyleMap = {
    lg: "h-[48px]",
    md: "h-[40px]",
  };
  const inputVariantStyleMap: Record<InputVariants, string> = {
    default: "border-n-40 bg-n-10 hover:border-n-60",
    error: "border-system-r-400 caret-system-r-400 bg-white",
  };

  const handleSelect = (value: string) => {
    onChange(value);
  };

  return (
    <>
      <button
        type="button"
        className={clsx(
          "w-full py-[12px] px-[16px] text-black title-md border outline-0 round-xs",
          "flex items-center justify-between",
          "bg-n-10 border-n-40 hover:border-n-60",
          !value && "text-n-60",
          inputSizeStyleMap[inputSize],
          inputVariantStyleMap[variants],
          disabled && "bg-n-40 text-n-60 border-0"
        )}
        onClick={() => setIsOpen(true)}
      >
        <span>{options.find((o) => o.value === value)?.label || label}</span>
        <DropDownIcon />
      </button>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent side="bottom">
          <div className="">
            <SheetHeader>
              <div className="flex items-center justify-between bg-white rounded-t-lg pt-4 px-4">
                <BackIcon />
                <SheetTitle className="title-lg text-black">
                  크루 선택
                </SheetTitle>
                <span className="h-8 w-6" />
              </div>
            </SheetHeader>
            <ul className="flex flex-col items-center gap-8 max-h-[284px] overflow-y-auto bg-white py-6 px-4">
              {options.map((option) => (
                <li
                  key={option.value}
                  className="h-6 w-full"
                  onClick={() => handleSelect(option.value)}
                >
                  <label className="flex items-center gap-2 cursor-pointer w-full">
                    {/* 숨겨진 라디오 input */}
                    <input
                      type="radio"
                      name="select-radio"
                      value={option.value}
                      checked={value === option.value}
                      onChange={() => handleSelect(option.value)}
                      className="sr-only"
                    />
                    {/* 커스텀 라디오 */}
                    <span
                      className={clsx(
                        "w-6 h-6 rounded-full border transition-all flex items-center justify-center",
                        value === option.value
                          ? "border-rg-400 bg-rg-400"
                          : "border-n-40 bg-white"
                      )}
                    >
                      {value === option.value && (
                        <span className="block w-[8px] h-[8px] rounded-full bg-white" />
                      )}
                    </span>
                    <span className="title-md text-black">{option.label}</span>
                  </label>
                </li>
              ))}
            </ul>
            <div className="bg-white px-4 pb-4">
              <button
                className="w-full h-[56px] bg-rg-400 rounded-lg text-white title-medium"
                onClick={() => setIsOpen(false)}
              >
                선택 완료
              </button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
