import { HTMLAttributes } from "react";
interface Props extends HTMLAttributes<HTMLElement> {
  left?: React.ReactNode;
  title?: string;
  right?: React.ReactNode;
}

export default function Header({ title, left, right }: Props) {
  return (
    <header className="relative left-1/2 -translate-x-1/2 bg-white flex items-center justify-between h-[56px] p-2 w-full max-w-[786px]">
      {left ? <div>{left}</div> : <div />}

      <h1 className="title-lg text-black absolute left-1/2 transform -translate-x-1/2">
        {title}
      </h1>

      {right ? <div>{right}</div> : <div />}
    </header>
  );
}
