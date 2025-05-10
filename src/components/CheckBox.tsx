"use client";

import { InputHTMLAttributes } from "react";

import clsx from "clsx";

import CheckedWhiteIcon from "@/icons/checked-white-icon.svg";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  text: string;
}

export default function CheckBox({ text, ...rest }: Props) {
  const disabled = rest.disabled;
  const checked = rest.checked;

  const defaultState = !disabled && !checked;
  const checkedAndDisabled = disabled && checked;

  return (
    <label className="flex items-center gap-[8px] h-full">
      <div
        className={clsx(
          "relative size-[16px] round-xs flex border items-center justify-center",
          disabled && "border-secondary-40 bg-secondary-40 ",
          checked &&
            "border-0 bg-primary-400 hover:bg-primary-300 active:bg-primary-500",
          checkedAndDisabled &&
            "border-0 bg-secondary-40 hover:bg-secondary-40 active:bg-secondary-40",
          defaultState &&
            "border-secondary-40 hover:bg-secondary-10 hover:border-secondary-60 active:bg-secondary-30 active:border-secondary-90"
        )}
      >
        <input
          type="checkbox"
          {...rest}
          className="absolute opacity-0 w-0 h-0"
        />
        {checked && <CheckedWhiteIcon />}
      </div>
      {text && <p className="title-sm">{text}</p>}
    </label>
  );
}
