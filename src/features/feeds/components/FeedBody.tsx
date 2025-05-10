import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface Props {
  imageUrl?: string[];
  contents?: string;
}

export default function FeedBody({ contents, imageUrl }: Props) {
  const isImageUrl = imageUrl && imageUrl.length > 0;

  const [isExpanded, setIsExpanded] = useState(false);
  const [isTruncated, setIsTruncated] = useState(false);

  const paragraphRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = paragraphRef.current;
    if (el && el.scrollHeight > el.clientHeight + 1) {
      setIsTruncated(true);
    }
  }, [contents]);

  const handleExpand = () => setIsExpanded(true);

  return (
    <div>
      {isImageUrl && (
        <ul>
          {imageUrl.map((img, index) => (
            <li key={index} className="relative w-full h-[340px]">
              <Image src={img} fill alt="content-image" />
            </li>
          ))}
        </ul>
      )}

      <p
        ref={paragraphRef}
        className={`body-md text-black whitespace-pre-wrap break-all ${
          !isExpanded ? "line-clamp-2" : ""
        }`}
      >
        {contents}
      </p>

      {!isExpanded && isTruncated && (
        <button
          type="button"
          onClick={handleExpand}
          className="label-sm text-green-500 inline-flex mt-[4px]"
        >
          더보기
        </button>
      )}
    </div>
  );
}
