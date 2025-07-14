import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Image
        src="/images/not-found.png"
        alt="not-found"
        width={328}
        height={100}
        quality={100}
      />
      <h2 className="text-xl mb-4">페이지를 찾을 수 없습니다</h2>
      <p className="text-gray-600 mb-8">
        요청하신 페이지가 존재하지 않거나 이동되었습니다.
      </p>
      <Link
        href="/"
        className="px-4 py-2 bg-rg-400 text-white rounded-lg md:hover:bg-rg-500"
      >
        홈으로 돌아가기
      </Link>
    </div>
  );
}
