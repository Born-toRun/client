import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/Sheet";
import CloseIcon from "@/icons/close-icon.svg";
import clsx from "clsx";
import { useState } from "react";

interface Option<T = string> {
  value: T;
  label: string;
}

interface Props {
  open: boolean;
  onOpenChange: (isOpen: boolean) => void;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
}

export default function CategorySelectModal({
  open,
  onOpenChange,
  options,
  value,
  onChange,
}: Props) {
  const [selectedValue, setSelectedValue] = useState<string>(value);

  const handleSelect = (value: string) => {
    setSelectedValue(value);
  };

  const handleClose = () => {
    if (selectedValue) {
      onChange(selectedValue);
    }
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="max-w-[768px] mx-auto">
        <div className="w-full">
          <SheetHeader>
            <div className="flex items-center justify-between bg-white rounded-t-lg pt-4 px-4">
              <span className="h-8 w-6" />
              <SheetTitle className="title-lg text-black">
                게시판 선택
              </SheetTitle>
              <button className="w-6 h-8 cursor-pointer" onClick={handleClose}>
                <CloseIcon />
              </button>
            </div>
          </SheetHeader>
          <ul className="flex flex-col items-center gap-8 max-h-[284px] overflow-y-auto bg-white py-6 px-4">
            {options.map((option) => (
              <li
                key={String(option.value)}
                className="h-6 w-full"
                onClick={() => handleSelect(option.value)}
              >
                <label className="flex items-center gap-2 cursor-pointer w-full">
                  <input
                    type="radio"
                    name="select-radio"
                    value={String(option.value)}
                    checked={selectedValue === option.value}
                    onChange={() => handleSelect(option.value)}
                    className="sr-only"
                  />
                  <span
                    className={clsx(
                      "w-6 h-6 rounded-full border transition-all flex items-center justify-center",
                      selectedValue === option.value
                        ? "border-rg-400 bg-rg-400"
                        : "border-n-40 bg-white"
                    )}
                  >
                    {selectedValue === option.value && (
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
              className="w-full h-[56px] bg-rg-400 rounded-lg text-white title-medium cursor-pointer"
              onClick={handleClose}
            >
              선택 완료
            </button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
