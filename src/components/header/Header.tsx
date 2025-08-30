import { HTMLAttributes } from "react";
interface Props extends HTMLAttributes<HTMLElement> {
  left?: React.ReactNode;
  title?: string;
  right?: React.ReactNode;
}

export default function Header({ title, left, right }: Props) {
  return (
    <header className="fixed top-0 left-0 right-0 z-10 bg-white flex items-center justify-between h-[56px] p-2">
      {left ? <div>{left}</div> : <div />}

      <h1 className="title-lg text-black absolute left-1/2 transform -translate-x-1/2">
        {title}
      </h1>

      {right ? <div>{right}</div> : <div />}
    </header>
  );
}
