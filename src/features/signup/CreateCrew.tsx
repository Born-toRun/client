"use client";
import Input from "@/components/Input";
import Header from "@/components/header/Header";
import { pageRoutes } from "@/constants/route";
import ChevronBackIcon from "@/icons/chevron-back-icon.svg";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useCreateCrewMutation } from "./hooks";
import { CrewCreateFormData } from "./types";

export default function CreateCrew() {
  const router = useRouter();
  const { register, handleSubmit } = useForm<CrewCreateFormData>({
    defaultValues: {
      name: "",
      contents: "",
      region: "",
      sns: "",
      imageId: undefined,
      logoId: undefined,
    },
  });

  const { mutateAsync: createCrew, isPending } = useCreateCrewMutation();

  const onSubmit = async (data: CrewCreateFormData) => {
    // 필수 필드 검증
    if (!data.name.trim()) {
      alert("크루명을 입력해주세요");
      return;
    }
    if (!data.contents.trim()) {
      alert("크루 설명을 입력해주세요");
      return;
    }
    if (!data.region.trim()) {
      alert("활동 지역을 입력해주세요");
      return;
    }

    try {
      const response = await createCrew({
        name: data.name.trim(),
        contents: data.contents.trim(),
        region: data.region.trim(),
        sns: data.sns?.trim() || undefined,
        imageId: data.imageId,
        logoId: data.logoId,
      });

      // 성공 시 회원가입 페이지로 이동하면서 생성된 크루 ID 전달
      router.push(`${pageRoutes.auth.signup}?newCrewId=${response.id}`);
    } catch (error) {
      console.error("크루 생성 실패:", error);
      alert("크루 생성에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <main className="pt-14">
      <Header
        left={
          <button
            className="flex items-center justify-center w-[40px] h-[40px] cursor-pointer hover:bg-n-30 rounded-full"
            onClick={() => router.back()}
          >
            <ChevronBackIcon />
          </button>
        }
        title="크루 등록"
      />
      <section className="px-4 pb-[168px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="py-4 mb-6 title-xl text-n-900">
            새로운 크루를 등록해주세요
          </div>

          <div className="flex flex-col gap-6 mb-6">
            <Input
              label="크루명"
              variants="default"
              inputSize="lg"
              placeholder="크루 이름을 입력해주세요"
              isRequired
              {...register("name", { required: true })}
            />

            <div className="flex flex-col gap-2">
              <label className="flex items-center">
                <p className="text-n-200 mr-1">크루 설명</p>
                <span className="text-system-r-400">*</span>
              </label>
              <textarea
                placeholder="크루에 대해 설명해주세요"
                className="flex-1 py-[12px] px-[16px] placeholder:text-n-60 placeholder:body-lg text-black title-md caret-rg-400 focus:border-rg-400 border border-n-40 bg-n-10 hover:border-n-60 outline-0 round-xs min-h-[120px] resize-y"
                {...register("contents", { required: true })}
              />
            </div>

            <Input
              label="활동 지역"
              variants="default"
              inputSize="lg"
              placeholder="예: 서울 강남구"
              isRequired
              {...register("region", { required: true })}
            />

            <Input
              label="SNS 링크"
              variants="default"
              inputSize="lg"
              placeholder="크루 SNS 주소를 입력해주세요"
              isOptional
              {...register("sns")}
            />
          </div>

          <div className="mb-6 p-4 bg-n-10 round-xs">
            <p className="body-md text-n-200">
              대표 이미지와 로고는 크루 생성 후 크루 설정에서 추가할 수
              있습니다.
            </p>
          </div>

          <button
            type="submit"
            className="fixed left-4 right-4 bottom-4 h-[56px] bg-rg-400 text-white font-bold label-lg round-sm max-w-[754px] mx-auto cursor-pointer disabled:bg-n-60 disabled:cursor-not-allowed"
            disabled={isPending}
          >
            {isPending ? "등록 중..." : "크루 등록"}
          </button>
        </form>
      </section>
    </main>
  );
}
