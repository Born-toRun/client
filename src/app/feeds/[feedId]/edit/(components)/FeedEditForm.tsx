"use client";

import CheckBox from "@/components/CheckBox";
import { feedCategoryLabel } from "@/features/feeds/constants";
import { FeedDetailResponse } from "@/features/feeds/list/types";
import CategorySelectModal from "@/features/write/CategorySelectModal";
import { CATEGORY_OPTIONS } from "@/features/write/constants";
import {
  useDeleteFileMutation,
  useUploadFileMutation,
} from "@/features/write/hooks";
import ArrowDownIcon from "@/icons/arrow-down-icon.svg";
import ImageDeleteIcon from "@/icons/image-delete-icon.svg";
import ImageIcon from "@/icons/image-icon.svg";
import Image from "next/image";
import { useRef, useState } from "react";

interface FeedEditFormProps {
  feed: FeedDetailResponse;
  contents: string;
  onContentsChange: (contents: string) => void;
}

export default function FeedEditForm({
  feed,
  contents,
  onContentsChange,
}: FeedEditFormProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [seeOnlyMyCrew, setSeeOnlyMyCrew] = useState(
    feed.accessLevel === "IN_CREW"
  );
  const [isCategorySelectOpen, setIsCategorySelectOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(feed.category);
  const uploadImageFile = useUploadFileMutation();
  const deleteImageFile = useDeleteFileMutation();

  // 기존 이미지들을 selectedImages 형태로 변환
  const [selectedImages, setSelectedImages] = useState<
    {
      fileId: number;
      fileUri: string;
      isExisting: boolean; // 기존 이미지인지 새로 추가된 이미지인지 구분
    }[]
  >(
    feed.images?.map((img) => ({
      fileId: img.imageId,
      fileUri: img.imageUri,
      isExisting: true,
    })) || []
  );

  const categorySelectClickHandler = () => {
    setIsCategorySelectOpen((prev) => !prev);
  };

  const categorySelectHandler = (value: string) => {
    setSelectedCategory(value);
  };

  const categorySelectModalOpenChangeHandler = (isOpen: boolean) => {
    setIsCategorySelectOpen(isOpen);
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
            fileId: result.fileId,
            fileUri: result.fileUri,
            isExisting: false,
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
      // 새로 추가된 이미지인 경우에만 서버에서 파일 삭제
      if (!imageToRemove.isExisting) {
        await deleteImageFile.mutateAsync({
          bucket: "FEED",
          fileId: imageToRemove.fileId,
        });
      }

      // 로컬 상태에서 제거
      setSelectedImages((prev) => prev.filter((_, i) => i !== index));
    } catch (error) {
      console.error("이미지 삭제 실패:", error);
      alert("이미지 삭제에 실패했습니다.");
    }
  };

  return (
    <div className="flex flex-col h-full">
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
        onChange={(e) => onContentsChange(e.target.value)}
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
    </div>
  );
}
