"use client";
import CheckBox from "@/components/CheckBox";
import Header from "@/components/header/Header";
import CloseIcon from "@/icons/close-icon.svg";
import ArrowDownIcon from "@/icons/arrow-down-icon.svg";
import { useRouter } from "next/navigation";
import { useState, useRef } from "react";
import CategorySelectModal from "./CategorySelectModal";
import { feedCategoryLabel } from "../feeds/constants";
import ImageIcon from "@/icons/image-icon.svg";
import ImageDeleteIcon from "@/icons/image-delete-icon.svg";

export default function WriteContainer() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [seeOnlyMyCrew, setSeeOnlyMyCrew] = useState(false); // IN_CREW or ALL
  const [contents, setContents] = useState("");
  const [isCategorySelectOpen, setIsCategorySelectOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>(
    feedCategoryLabel.COMMUNITY
  );
  const [selectedImages, setSelectedImages] = useState<File[]>([]);

  const categorySelectClickHandler = () => {
    setIsCategorySelectOpen((prev) => !prev);
  };

  const handleCategorySelect = (value: string) => {
    setSelectedCategory(value);
  };

  const categorySelectModalOpenChangeHandler = (isOpen: boolean) => {
    setIsCategorySelectOpen(isOpen);
  };

  const postingClickHandler = () => {
    const isInCrew = seeOnlyMyCrew ? "IN_CREW" : "ALL";
    console.log(selectedCategory, contents, isInCrew, selectedImages);
  };

  const handleImageSelect = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));

    if (selectedImages.length + imageFiles.length > 5) {
      alert("이미지는 최대 5개까지 선택할 수 있습니다.");
      return;
    }

    setSelectedImages((prev) => [...prev, ...imageFiles]);
  };

  const removeImage = (index: number) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
  };

  const CATEGORY_OPTIONS = [
    {
      value: feedCategoryLabel.COMMUNITY,
      label: "커뮤니티",
    },
    {
      value: feedCategoryLabel.MARKET,
      label: "마켓",
    },
  ];

  return (
    <main>
      <Header
        left={
          <button
            className="flex items-center justify-center w-[40px] h-[40px] cursor-pointer hover:bg-n-30 rounded-full"
            onClick={() => router.back()}
          >
            <CloseIcon />
          </button>
        }
        title="글쓰기"
        right={
          <button
            className="px-4 py-[11.5px] bg-rg-400 rounded-[8px] disabled:bg-n-40 cursor-pointer"
            disabled={!contents}
            onClick={postingClickHandler}
          >
            <p className="text-white title-md leading-[17px]">게시</p>
          </button>
        }
      />
      <div className="h-16 px-4 flex items-center justify-between border-t border-n-30">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={categorySelectClickHandler}
        >
          <p className="label-md">
            {selectedCategory === feedCategoryLabel.COMMUNITY
              ? "커뮤니티"
              : "마켓"}
          </p>
          {isCategorySelectOpen ? (
            <ArrowDownIcon className="rotate-180" />
          ) : (
            <ArrowDownIcon />
          )}
        </div>
        <div>
          <CheckBox
            text="크루만 공개하기"
            onChange={() => setSeeOnlyMyCrew((prev) => !prev)}
            checked={seeOnlyMyCrew}
          />
        </div>
      </div>

      {/* 이미지 업로드 영역 */}
      <div className="px-4 py-3 border-t border-n-30">
        <div className="flex items-center gap-2 mb-3">
          <div
            className="w-[64px] h-[64px] bg-n-30 rounded-[8px] flex flex-col items-center justify-center cursor-pointer hover:bg-n-40 transition-colors"
            onClick={handleImageSelect}
          >
            <div className="w-6 h-6 rounded-full flex items-center justify-center mb-1">
              <ImageIcon className="w-6 h-6" />
            </div>
            <span className="text-n-200 text-xs">
              {selectedImages.length}/5
            </span>
          </div>
          {selectedImages.length === 0 && (
            <div
              className="text-n-200 text-label-sm font-bold"
              onClick={handleImageSelect}
            >
              이미지 추가
            </div>
          )}
          {/* 선택된 이미지들 표시 */}
          {selectedImages.length > 0 && (
            <div className="flex gap-2 overflow-x-auto">
              {selectedImages.map((image, index) => (
                <div
                  key={index}
                  className="relative flex-shrink-0"
                >
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`선택된 이미지 ${index + 1}`}
                    className="w-[64px] h-[64px] rounded-[8px] object-cover"
                  />
                  <button
                    onClick={() => removeImage(index)}
                    className="absolute top-[-3px] right-[-3px] w-5 h-5 rounded-full flex items-center justify-center"
                  >
                    <ImageDeleteIcon className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 숨겨진 파일 입력 */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
      />

      <textarea
        value={contents}
        onChange={(e) => setContents(e.target.value)}
        className="w-full h-[calc(100dvh-216px)] px-4 py-3 border-t border-n-30"
        placeholder="러닝 후기를 공유해 보세요!"
      />
      <CategorySelectModal
        open={isCategorySelectOpen}
        onOpenChange={categorySelectModalOpenChangeHandler}
        options={CATEGORY_OPTIONS}
        value={selectedCategory}
        onChange={handleCategorySelect}
      />
    </main>
  );
}

// 56 + 64 + 96 = 216
