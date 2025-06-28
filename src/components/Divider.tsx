interface Props {
  size: 1 | 4 | 8;
}

export default function Divider({ size }: Props) {
  return <div style={{ height: size }} className="w-full bg-n-30" />;
}
