import Input from "@/components/Input";
import ChevronBackIcon from "@/icons/chevron-back-icon.svg";

export default function Signup() {
  return (
    <main>
      <header className="flex items-center justify-between h-[56px] p-2">
        <button>
          <ChevronBackIcon />
        </button>
        <h1></h1>
        <button></button>
      </header>
      <section className="px-4">
        <div className="py-4 mb-6 title-xl text-secondary-900">
          이름과 크루를 알려주세요
        </div>
        <div className="flex flex-col gap-6 mb-10">
          <p className="title-lg text-secondary-900">개인정보</p>
          <Input label="이름" variants="default" inputSize="md" />
          <Input
            label="인스타그램 ID (선택)"
            variants="default"
            inputSize="md"
          />
        </div>
        <div>
          <p className="mb-2 title-lg text-secondary-900">크루 정보</p>
          <p className="mb-6 body-lg text-secondary-200">
            소속된 크루를 선택해주세요. 혹시 크루가 없다면, 크루 신규 생성이
            필요해요.
          </p>
          <div className="flex flex-col gap-6">
            <Input label="크루 이름" variants="default" inputSize="md" />
            <Input label="크루 활동 지역" variants="default" inputSize="md" />
          </div>
        </div>
      </section>
    </main>
  );
}
