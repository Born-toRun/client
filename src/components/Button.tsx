"use client";

import { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

type Variants = "primary" | "danger" | "secondary" | "text";
type Tone = "green" | "red" | "gray";
type Size = "lg" | "md" | "sm";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  variants: Variants;
  size: Size;
  loading?: boolean;
  tone: Tone;
}

export default function Button({
  text,
  size,
  loading,
  variants,
  tone,
  ...rest
}: Props) {
  const styleMap: Record<Variants, Record<Tone, string>> = {
    primary: {
      green:
        "bg-rg-400 text-white hover:bg-rg-300 active:bg-rg-500 disabled:bg-n-40 disabled:text-white border-0",
      gray: "",
      red: "",
    },
    danger: {
      red: "border-0 text-white bg-system-r-400 hover:bg-system-r-300 active:bg-system-r-500 disabled:bg-n-40",
      green: "",
      gray: "",
    },
    secondary: {
      green:
        "border-[1px] bg-transparent text-rg-400 border-rg-400  hover:text-rg-300 hover:bg-rg-300 hover:border-rg-300 active:text-rg-500 active:border-rg-500 active:bg-n-30 disabled:border-n-40 disabled:text-n-40",
      gray: "bg-transparent border border-n-40 text-black hover:bg-n-10 hover:border-n-60 active:bg-n-30 active:border-n-90 disabled:border-n-40 disabled:text-n-40",
      red: "bg-transparent border border-system-r-400 text-system-r-400  hover:border-system-r-300 hover:text-system-r-300 active:bg-n-30 active:border-system-r-500 active:text-system-r-500 disabled:border-n-40 disabled:text-n-40",
    },
    text: {
      green:
        "bg-transparent border-0 text-rg-400 hover:bg-n-10 hover:text-rg-400 active:bg-n-30 active:text-rg-500 disabled:text-n-40",
      gray: "bg-transparent border-0 text-black hover:bg-n-10 active-bg-n-30 disabled:text-n-40",
      red: "bg-transparent border-0 text-system-r-400 hover:bg-n-10 hover:text-system-r-300 active:bg-n-30 active:text-system-r-500 disabled:text-n-40",
    },
  };

  const loadingMap: Record<Variants, Record<Tone, string>> = {
    primary: {
      green: "bg-rg-400 text-white",
      red: "",
      gray: "",
    },
    danger: {
      red: "bg-system-r-400 text-white",
      green: "",
      gray: "",
    },
    secondary: {
      green: "border-rg-400 text-rg-400",
      red: "border-system-r-400 text-system-r-400",
      gray: "border-n-40 text-n-40",
    },
    text: {
      green: "text-rg-400",
      red: "text-system-r-400",
      gray: "text-n-40",
    },
  };

  const sizeMap: Record<Size, string> = {
    lg: "py-[17px] label-lg",
    md: "py-[14px] label-md",
    sm: "py-[11.5px] label-sm",
  };

  return (
    <button
      disabled={loading || rest.disabled}
      className={clsx(
        loading ? loadingMap[variants][tone] : styleMap[variants][tone],
        sizeMap[size],
        "h-[56px] round-xs w-full flex items-center justify-center"
      )}
      {...rest}
    >
      {text}
    </button>
  );
}
