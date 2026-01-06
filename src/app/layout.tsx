import QueryProvider from "@/provider/QueryProvider";
import { LoginBottomSheetProvider } from "@/contexts/LoginBottomSheetContext";
import { Toaster } from "sonner";
import "@radix-ui/themes/styles.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

// 개발 환경에서만 디버깅 도구 로드
if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
  import("@/utils/authDebug");
}

export const metadata: Metadata = {
  title: "본투런 (Born to Run) - 러닝 크루와 함께하는 마라톤 챌린지",
  description:
    "4자리 출석 코드 인증과 마라톤 챌린지로 러닝 크루와 함께 성장하세요. 본투런에서 함께 달리는 즐거움을 경험하세요.",
  keywords: [
    "러닝",
    "마라톤",
    "러닝크루",
    "출석인증",
    "챌린지",
    "본투런",
    "달리기",
    "운동",
  ],
  authors: [{ name: "Born to Run Team" }],
  creator: "Born to Run",
  publisher: "Born to Run",
  openGraph: {
    title: "본투런 (Born to Run)",
    description:
      "4자리 출석 코드 인증과 마라톤 챌린지로 러닝 크루와 함께 성장하세요.",
    type: "website",
    locale: "ko_KR",
    siteName: "본투런",
  },
  twitter: {
    card: "summary_large_image",
    title: "본투런 (Born to Run)",
    description:
      "4자리 출석 코드 인증과 마라톤 챌린지로 러닝 크루와 함께 성장하세요.",
  },
  robots: {
    index: true,
    follow: true,
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
};

const pretendard = localFont({
  src: "../fonts/PretendardVariable.woff2",
  display: "swap",
  variable: "--font-pretendard",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
      </head>
        <QueryProvider>
          <LoginBottomSheetProvider>
          <body className={`${pretendard.className} bg-[#fcfcfc]`}>
            <Toaster position="top-center" richColors />
            <div
              id="app-container"
              className="w-full max-w-[786px] mx-auto min-h-screen bg-white"
            >
              {children}
            </div>
          </body>
          </LoginBottomSheetProvider>
        </QueryProvider>
    </html>
  );
}
