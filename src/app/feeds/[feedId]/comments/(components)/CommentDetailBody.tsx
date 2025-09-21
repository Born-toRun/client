interface CommentDetailBodyProps {
  contents: string;
}

export default function CommentDetailBody({
  contents,
}: CommentDetailBodyProps) {
  return (
    <div className="px-4">
      <div className="text-base leading-relaxed whitespace-pre-wrap">
        {contents}
      </div>
    </div>
  );
}
