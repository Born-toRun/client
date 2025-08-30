import Image from "next/image";
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
  return (
    <div>
      {imageUrl && (
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
      <p className={`px-4 body-md text-black whitespace-pre-wrap break-all`}>
        {contents}
      </p>
    </div>
  );
}
