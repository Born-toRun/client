"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { setCookie } from "cookies-next";

import { ACCESS_TOKEN } from "@/constants/common";
import { pageRoutes } from "@/constants/route";

export default function LoginRequestPage() {
  const router = useRouter();
  const params = useSearchParams();
  const accessToken = params.get("accessToken");
  const isMember = params.get("isMember") === "true";

  useEffect(
    function redirectUrl() {
      if (typeof window === "undefined") return; // SSR 방지
      if (!accessToken) {
        // 토큰이 오지 못할 경우 - 로그인 에러
        return;
      }

      if (accessToken) {
        // 1. 쿠키 토큰 저장
        setCookie(ACCESS_TOKEN, accessToken);
        if (isMember) {
          router.replace(pageRoutes.feeds.list);
        } else {
          // 회원가입 리디렉션
          router.replace(pageRoutes.auth.signup);
        }
      }
    },
    [isMember]
  );

  return <>Loading....</>;
}
