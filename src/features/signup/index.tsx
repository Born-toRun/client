"use client";
import { useState } from "react";
import Input from "@/components/Input";
import ChevronBackIcon from "@/icons/chevron-back-icon.svg";
import UnnamedIcon from "@/icons/unnamed-icon.svg";
import clsx from "clsx";

export default function Signup() {
  const [hasCrew, setHasCrew] = useState(false);

  const handleHasCrew = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setHasCrew(!hasCrew);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(e.target);
  };

  return (
    <main>
      <header className="flex items-center justify-between h-[56px] p-2">
        <button className="flex items-center justify-center w-[40px] h-[40px] cursor-pointer hover:bg-n-30 rounded-full">
          <ChevronBackIcon />
        </button>
        <h1></h1>
        <button className="flex items-center justify-center w-[40px] h-[40px] cursor-pointer hover:bg-n-30 rounded-full">
          <UnnamedIcon />
        </button>
      </header>
      <section className="px-4 pb-[168px]">
        <form onSubmit={handleSubmit}>
          <div className="py-4 mb-6 title-xl text-n-900">
            이름과 크루를 알려주세요
          </div>
          <div className="flex flex-col gap-6 mb-10">
            <p className="title-lg text-n-900">개인정보</p>
            <Input
              label="이름"
              variants="default"
              inputSize="lg"
              name="name"
              autoComplete="name"
              isRequired
            />
            <Input
              label="인스타그램 ID"
              variants="default"
              inputSize="lg"
              name="instagramId"
              autoComplete="off"
              isOptional
            />
          </div>
          <div>
            <p className="mb-2 title-lg text-n-900">크루 정보</p>
            <p className="mb-6 body-lg text-n-200">
              소속된 크루를 선택해주세요. 혹시 크루가 없다면, 크루 신규 생성이
              필요해요.
            </p>
            <div className="flex gap-2 mb-6">
              <button
                type="button"
                className={clsx(
                  "px-4 h-[40px] round-full border border-n-40 text-n-900 font-bold label-sm",
                  hasCrew && "border-rg-400 text-rg-400"
                )}
                onClick={handleHasCrew}
              >
                크루 있음
              </button>
              <button
                type="button"
                className={clsx(
                  "px-4 h-[40px] round-full border border-n-40 text-n-900 font-bold label-sm",
                  !hasCrew && "border-rg-400 text-rg-400"
                )}
                onClick={handleHasCrew}
              >
                크루 없음
              </button>
            </div>
            {hasCrew && (
              <Input
                label="크루 이름"
                variants="default"
                inputSize="lg"
                name="crewName"
                autoComplete="off"
                isRequired
              />
            )}
            {!hasCrew && (
              <div className="flex flex-col gap-6">
                <Input
                  label="크루 이름"
                  variants="default"
                  inputSize="lg"
                  name="crewName"
                  autoComplete="off"
                  isRequired
                />
                <Input
                  label="크루 활동 지역"
                  variants="default"
                  inputSize="lg"
                  name="crewLocation"
                  autoComplete="off"
                  isRequired
                />
              </div>
            )}
          </div>
          <button
            type="submit"
            className="fixed left-4 right-4 bottom-4 h-[56px] bg-rg-400 text-white font-bold label-lg round-sm max-w-[754px] mx-auto"
          >
            가입 완료
          </button>
        </form>
      </section>
    </main>
  );
}
