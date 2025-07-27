"use client";
import Input from "@/components/Input";
import Select from "@/components/Select";
import { pageRoutes } from "@/constants/route";
import ChevronBackIcon from "@/icons/chevron-back-icon.svg";
import UnnamedIcon from "@/icons/unnamed-icon.svg";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useGetCrewListQuery, useSignupMutation } from "./hooks";
import { SignupFormData } from "./types";
import Header from "@/components/header/Header";

export default function Signup() {
  const router = useRouter();
  const { register, handleSubmit } = useForm<SignupFormData>({
    defaultValues: {
      userName: "",
      crewId: null,
      instagramId: "",
    },
  });
  const [selectedCrew, setSelectedCrew] = useState<number | null>(null);
  const { data: crewList } = useGetCrewListQuery();
  const crewListOptions = crewList?.details.map((crew) => ({
    value: crew.id,
    label: crew.crewName,
  }));
  const { mutateAsync: signup, isPending } = useSignupMutation();

  const signupClickHandler = async (data: SignupFormData) => {
    if (!selectedCrew) {
      alert("크루를 선택해주세요");
      return;
    }

    if (!data.userName) {
      alert("이름을 입력해주세요");
      return;
    }

    if (!data.instagramId) {
      alert("인스타그램 ID를 입력해주세요");
      return;
    }

    try {
      const response = await signup({
        userName: data.userName,
        crewId: selectedCrew,
        instagramId: data.instagramId,
      });
      console.log(response);
      router.push(pageRoutes.feeds.list);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSelectCrew = (value: number) => {
    setSelectedCrew(value);
  };

  return (
    <main>
      <Header
        left={
          <button
            className="flex items-center justify-center w-[40px] h-[40px] cursor-pointer hover:bg-n-30 rounded-full"
            onClick={() => router.back()}
          >
            <ChevronBackIcon />
          </button>
        }
        title="글쓰기"
        right={
          <button className="flex items-center justify-center w-[40px] h-[40px] cursor-pointer hover:bg-n-30 rounded-full">
            <UnnamedIcon />
          </button>
        }
      />
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
            disabled={isPending}
          >
            가입 완료
          </button>
        </form>
      </section>
    </main>
  );
}
