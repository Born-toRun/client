"use client";
import CheckBox from "@/components/CheckBox";
import Header from "@/components/header/Header";
import ArrowDownIcon from "@/icons/arrow-down-icon.svg";
import CloseIcon from "@/icons/close-icon.svg";
import ImageDeleteIcon from "@/icons/image-delete-icon.svg";
import ImageIcon from "@/icons/image-icon.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { feedCategoryLabel } from "../feeds/constants";
import CategorySelectModal from "./CategorySelectModal";
import { CATEGORY_OPTIONS } from "./constants";
import {
  useCreateFeedMutation,
  useDeleteFileMutation,
  useUploadFileMutation,
} from "./hooks";

export default function WriteContainer() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [seeOnlyMyCrew, setSeeOnlyMyCrew] = useState(false); // IN_CREW or ALL
  const [contents, setContents] = useState("");
  const [isCategorySelectOpen, setIsCategorySelectOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>(
    feedCategoryLabel.COMMUNITY
  );
  const uploadImageFile = useUploadFileMutation();
  const deleteImageFile = useDeleteFileMutation();
  const createFeed = useCreateFeedMutation();

  // selectedImages 타입 변경
  const [selectedImages, setSelectedImages] = useState<
    {
      file: File;
      fileId: number;
      fileUri: string;
    }[]
  >([]);

  const categorySelectClickHandler = () => {
    setIsCategorySelectOpen((prev) => !prev);
  };

  const categorySelectHandler = (value: string) => {
    setSelectedCategory(value);
  };

  const categorySelectModalOpenChangeHandler = (isOpen: boolean) => {
    setIsCategorySelectOpen(isOpen);
  };

  const postingClickHandler = async () => {
    const isInCrew = seeOnlyMyCrew ? "IN_CREW" : "ALL";

    try {
      await createFeed.mutateAsync({
        category: selectedCategory,
        contents,
        accessLevel: isInCrew,
        imageIds: selectedImages.map((image) => image.fileId),
      });

      router.push("/");
    } catch (error) {
      console.error("피드 등록 실패:", error);
      alert("피드 등록에 실패했습니다.");
    }
  };

  const imageSelectHandler = () => {
    fileInputRef.current?.click();
  };

  const imageChangeHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));

    // 파일 크기 제한 (10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    const validFiles = imageFiles.filter((file) => file.size <= maxSize);

    if (validFiles.length !== imageFiles.length) {
      alert("10MB 이하의 이미지만 업로드 가능합니다.");
    }

    if (selectedImages.length + validFiles.length > 5) {
      alert("이미지는 최대 5개까지 선택할 수 있습니다.");
      return;
    }

    // 각 이미지 파일을 업로드하고 fileId와 fileUri를 받아옴
    for (const file of validFiles) {
      try {
        const result = await uploadImageFile.mutateAsync({
          bucket: "FEED",
          file,
        });
        setSelectedImages((prev) => [
          ...prev,
          {
            file,
            fileId: result.fileId,
            fileUri: result.fileUri,
          },
        ]);
      } catch (error) {
        console.error("이미지 업로드 실패:", error);
        alert("이미지 업로드에 실패했습니다.");
      }
    }
  };

  const removeImage = async (index: number) => {
    const imageToRemove = selectedImages[index];

    try {
      // 서버에서 파일 삭제
      await deleteImageFile.mutateAsync({
        bucket: "FEED",
        fileId: imageToRemove.fileId,
      });

      // 로컬 상태에서 제거
      setSelectedImages((prev) => prev.filter((_, i) => i !== index));
    } catch (error) {
      console.error("이미지 삭제 실패:", error);
      alert("이미지 삭제에 실패했습니다.");
    }
  };

  return (
    <>
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[786px] h-[56px] bg-white z-50">
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
      </div>
      <main className="flex flex-col h-screen pt-14">
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
              onClick={imageSelectHandler}
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
                className="text-n-200 text-label-sm font-bold cursor-pointer"
                onClick={imageSelectHandler}
              >
                이미지 추가
              </div>
            )}
            {/* 선택된 이미지들 표시 */}
            {selectedImages.length > 0 && (
              <div className="flex gap-2">
                {selectedImages.map((image, index) => (
                  <div key={index} className="relative flex-shrink-0">
                    <Image
                      src={image.fileUri}
                      alt={`선택된 이미지 ${index + 1}`}
                      width={64}
                      height={64}
                      className="w-[64px] h-[64px] rounded-[8px] object-cover"
                    />
                    <button
                      onClick={() => removeImage(index)}
                      className="absolute top-[-3px] right-[-3px] w-5 h-5 rounded-full flex items-center justify-center cursor-pointer"
                    >
                      <ImageDeleteIcon className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          {/* 안내 메시지 */}
          <div className="flex items-start gap-2 px-1">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="flex-shrink-0 mt-0.5"
            >
              <circle cx="8" cy="8" r="7" stroke="#9CA3AF" strokeWidth="1.5" />
              <path
                d="M8 7V11M8 5V5.5"
                stroke="#9CA3AF"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
            <p className="text-n-200 text-xs">
              최대 5장, 각 10MB 이하 (이미지 형식만 가능)
            </p>
          </div>
        </div>
        {/* 숨겨진 파일 입력 */}
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={imageChangeHandler}
          className="hidden"
        />
        <textarea
          value={contents}
          onChange={(e) => setContents(e.target.value)}
          className="w-full flex-1 px-4 py-3 border-t border-n-30 resize-none"
          placeholder="러닝 후기를 공유해 보세요!"
        />
        <CategorySelectModal
          open={isCategorySelectOpen}
          onOpenChange={categorySelectModalOpenChangeHandler}
          options={CATEGORY_OPTIONS}
          value={selectedCategory}
          onChange={categorySelectHandler}
        />
      </main>
    </>
  );
}
