"use client";

import { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function RadioButton({ label, ...rest }: Props) {
  return (
    <label>
      <input type="radio" {...rest} className="" />
    </label>
  );
}
