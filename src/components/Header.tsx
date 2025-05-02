interface Props {
  left?: React.ReactNode;
  title?: string;
  right?: React.ReactNode;
}

export default function Header({ title, left, right }: Props) {
  return (
    <header className="flex items-center justify-between relative">
      {left ? <div>{left}</div> : <div />}

      <h1 className="title-lg text-black absolute left-1/2 transform -translate-x-1/2">{title}</h1>

      {right ? <div>{right}</div> : <div />}
    </header>
  );
}
