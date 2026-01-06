import { Metadata } from "next";
import IntroductionClient from "./IntroductionClient";

export const metadata: Metadata = {
  title: "Born to Run - 함께 달리는 즐거움",
  description:
    "러닝을 통해 건강한 습관을 만들고, 같은 목표를 가진 사람들과 함께 성장하세요. GPS 기반 출석 인증, 마라톤 챌린지, 실시간 러닝 기록으로 당신의 러닝 라이프를 응원합니다.",
  keywords: [
    "러닝",
    "마라톤",
    "러닝 크루",
    "GPS 출석",
    "운동 습관",
    "달리기",
    "건강",
    "챌린지",
  ],
  openGraph: {
    title: "Born to Run - 함께 달리는 즐거움",
    description:
      "러닝을 통해 건강한 습관을 만들고, 같은 목표를 가진 사람들과 함께 성장하세요.",
    type: "website",
    url: "https://b2r.kro.kr/introduction",
    images: [
      {
        url: "https://b2r.kro.kr/og-image.png",
        width: 1200,
        height: 630,
        alt: "Born to Run",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Born to Run - 함께 달리는 즐거움",
    description:
      "러닝을 통해 건강한 습관을 만들고, 같은 목표를 가진 사람들과 함께 성장하세요.",
  },
};

export default function IntroductionPage() {
  return <IntroductionClient />;
}
