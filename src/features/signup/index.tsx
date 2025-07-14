"use client";
import Input from "@/components/Input";
import Select from "@/components/Select";
import ChevronBackIcon from "@/icons/chevron-back-icon.svg";
import UnnamedIcon from "@/icons/unnamed-icon.svg";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useGetCrewListQuery } from "./hooks";

interface SignupFormData {
  userName: string;
  crewId: number;
  instagramId?: string;
  crewName?: string;
  crewLocation?: string;
}

export default function Signup() {
  const router = useRouter();
  const { register, handleSubmit } = useForm<SignupFormData>();
  const [selectedCrew, setSelectedCrew] = useState<number | null>(null);
  const { data: crewList } = useGetCrewListQuery();
  const crewListOptions = crewList?.details.map((crew) => ({
    value: crew.id,
    label: crew.crewName,
  }));

  const signupClickHandler = (data: SignupFormData) => {
    console.log(data);
    console.log(selectedCrew);
  };

  const handleSelectCrew = (value: number) => {
    setSelectedCrew(value);
  };

  return (
    <main>
      <header className="flex items-center justify-between h-[56px] p-2">
        <button
          className="flex items-center justify-center w-[40px] h-[40px] cursor-pointer hover:bg-n-30 rounded-full"
          onClick={() => router.back()}
        >
          <ChevronBackIcon />
        </button>
        <h1></h1>
        <button className="flex items-center justify-center w-[40px] h-[40px] cursor-pointer hover:bg-n-30 rounded-full">
          <UnnamedIcon />
        </button>
      </header>
      <section className="px-4 pb-[168px]">
        <form onSubmit={handleSubmit(signupClickHandler)}>
          <div className="py-4 mb-6 title-xl text-n-900">
            이름과 크루를 알려주세요
          </div>
          <div className="flex flex-col gap-6 mb-10">
            <p className="title-lg text-n-900">개인정보</p>
            <Input
              label="이름"
              variants="default"
              inputSize="lg"
              autoComplete="name"
              placeholder="실명을 입력해주세요"
              isRequired
              {...register("userName")}
            />
            <Input
              label="인스타그램 ID"
              variants="default"
              inputSize="lg"
              autoComplete="off"
              placeholder="ID를 입력해주세요"
              isOptional
              {...register("instagramId")}
            />
          </div>
          <p className="mb-2 title-lg text-n-900">크루 정보</p>
          <p className="mb-6 body-lg text-n-200">
            소속된 크루를 선택해주세요. 혹시 크루가 없다면, 크루 신규 생성이
            필요해요.
          </p>
          <Select
            label="크루 선택"
            value={selectedCrew}
            options={crewListOptions ?? []}
            variants="default"
            inputSize="lg"
            onChange={handleSelectCrew}
          />
          <button
            type="submit"
            className="fixed left-4 right-4 bottom-4 h-[56px] bg-rg-400 text-white font-bold label-lg round-sm max-w-[754px] mx-auto cursor-pointer"
          >
            가입 완료
          </button>
        </form>
      </section>
    </main>
  );
}
