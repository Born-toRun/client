import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Swiper CSS
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

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

  const handleExpand = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setIsExpanded(true);
  };

  return (
    <div>
      {isImageUrl && (
        <div className="w-full mb-4">
          <Swiper
            modules={[Pagination]}
            spaceBetween={0}
            slidesPerView={1}
            pagination={{ clickable: true }}
            className="w-full"
          >
            {imageUrl.map((img, index) => (
              <SwiperSlide key={index}>
                <div className="relative w-full aspect-square">
                  <Image
                    src={img}
                    fill
                    alt="content-image"
                    className="object-cover"
                    unoptimized
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = `https://placehold.co/400x400?text=no+image`;
                    }}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
      <p
        ref={paragraphRef}
        className={`body-md text-black whitespace-pre-wrap break-all ${
          !isExpanded ? "line-clamp-5" : ""
        }`}
      >
        {contents}
      </p>
      {!isExpanded && isTruncated && (
        <button
          type="button"
          onClick={handleExpand}
          className="label-sm text-green-500 inline-flex mt-[4px] cursor-pointer"
        >
          더보기
        </button>
      )}
    </div>
  );
}
