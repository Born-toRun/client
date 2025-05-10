import clsx from "clsx";
import { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLElement> {
  left?: React.ReactNode;
  title?: string;
  right?: React.ReactNode;
}

export default function Header({ title, left, right, ...rest }: Props) {
  return (
    <header
      className={clsx(
        "flex items-center justify-between relative py-[14px] px-[8px]"
      )}
    >
      {left ? <div>{left}</div> : <div />}

      <h1 className="title-lg text-black absolute left-1/2 transform -translate-x-1/2">
        {title}
      </h1>

      {right ? <div>{right}</div> : <div />}
    </header>
  );
}
