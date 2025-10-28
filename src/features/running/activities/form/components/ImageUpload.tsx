"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import {
  useUploadFileMutation,
  useDeleteFileMutation,
} from "@/features/write/hooks";

interface ImageUploadProps {
  value: number[]; // Array of uploaded image IDs
  onChange: (imageIds: number[]) => void;
  error?: string;
}

interface UploadedImage {
  fileId: number;
  fileUri: string;
  isUploading?: boolean;
}

const MAX_IMAGES = 5;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

/**
 * 이미지 업로드 컴포넌트
 * - 최대 5장까지 업로드 가능
 * - 각 이미지는 선택 즉시 서버에 업로드
 * - 이미지 미리보기 및 삭제 기능 제공
 */
export default function ImageUpload({ value, onChange, error }: ImageUploadProps) {
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [uploadError, setUploadError] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // React Query 훅 사용
  const uploadImageFile = useUploadFileMutation();
  const deleteImageFile = useDeleteFileMutation();

  // value 변경 시 uploadedImages 동기화
  // 초기 데이터가 있을 경우 처리 (수정 모드)
  // TODO: 수정 모드에서 기존 이미지 표시 로직 추가 필요

  /**
   * 파일 선택 핸들러
   */
  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0]; // 한 번에 하나씩만 업로드

    // 파일 형식 검증
    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      setUploadError("이미지 파일만 업로드 가능합니다. (JPG, PNG, WEBP)");
      return;
    }

    // 파일 크기 검증
    if (file.size > MAX_FILE_SIZE) {
      setUploadError("파일 크기는 10MB 이하여야 합니다.");
      return;
    }

    // 최대 개수 검증
    if (uploadedImages.length >= MAX_IMAGES) {
      setUploadError(`최대 ${MAX_IMAGES}장까지 업로드 가능합니다.`);
      return;
    }

    setUploadError("");

    // 업로드 중 표시를 위한 임시 항목 추가
    const tempId = Date.now();
    const tempImage: UploadedImage = {
      fileId: tempId,
      fileUri: URL.createObjectURL(file),
      isUploading: true,
    };
    setUploadedImages((prev) => [...prev, tempImage]);

    try {
      // 파일 업로드 - React Query mutation 사용
      const response = await uploadImageFile.mutateAsync({
        bucket: "ACTIVITY",
        file,
      });

      // 업로드 성공: 임시 항목을 실제 데이터로 교체
      setUploadedImages((prev) =>
        prev.map((img) =>
          img.fileId === tempId
            ? { fileId: response.fileId, fileUri: response.fileUri, isUploading: false }
            : img
        )
      );

      // 부모 컴포넌트에 업데이트된 이미지 ID 배열 전달
      const newImageIds = [...value, response.fileId];
      onChange(newImageIds);
    } catch (error) {
      console.error("이미지 업로드 실패:", error);
      setUploadError("이미지 업로드에 실패했습니다. 다시 시도해주세요.");

      // 업로드 실패: 임시 항목 제거
      setUploadedImages((prev) => prev.filter((img) => img.fileId !== tempId));
    }

    // 파일 입력 초기화 (동일한 파일을 다시 선택할 수 있도록)
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  /**
   * 이미지 삭제 핸들러
   */
  const handleRemoveImage = async (fileId: number) => {
    try {
      // 백엔드에서 이미지 삭제 - React Query mutation 사용
      await deleteImageFile.mutateAsync({
        bucket: "ACTIVITY",
        fileId,
      });

      // 상태에서 이미지 제거
      setUploadedImages((prev) => prev.filter((img) => img.fileId !== fileId));

      // 부모 컴포넌트에 업데이트된 이미지 ID 배열 전달
      const newImageIds = value.filter((id) => id !== fileId);
      onChange(newImageIds);

      setUploadError("");
    } catch (error) {
      console.error("이미지 삭제 실패:", error);
      setUploadError("이미지 삭제에 실패했습니다. 다시 시도해주세요.");
    }
  };

  /**
   * 파일 선택 버튼 클릭 핸들러
   */
  const handleAddImageClick = () => {
    if (uploadedImages.length >= MAX_IMAGES) {
      setUploadError(`최대 ${MAX_IMAGES}장까지 업로드 가능합니다.`);
      return;
    }
    fileInputRef.current?.click();
  };

  // 업로드 중인 이미지가 있는지 확인
  const isUploading = uploadedImages.some((img) => img.isUploading);

  return (
    <div className="flex flex-col gap-2">
      <label className="label-md text-black">
        이미지 (선택)
      </label>

      {/* 이미지 미리보기 그리드 */}
      <div className="flex gap-2 flex-wrap">
        {/* 업로드된 이미지들 */}
        {uploadedImages.map((image) => (
          <div
            key={image.fileId}
            className="relative w-20 h-20 rounded-lg overflow-hidden border border-n-40"
          >
            <Image
              src={image.fileUri}
              alt="Uploaded image"
              fill
              className="object-cover"
            />
            {image.isUploading && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
              </div>
            )}
            {!image.isUploading && (
              <button
                type="button"
                onClick={() => handleRemoveImage(image.fileId)}
                className="absolute top-1 right-1 w-5 h-5 bg-black bg-opacity-70 rounded-full flex items-center justify-center text-white hover:bg-opacity-90"
                aria-label="이미지 삭제"
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 3L3 9M3 3L9 9"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            )}
          </div>
        ))}

        {/* 이미지 추가 버튼 */}
        {uploadedImages.length < MAX_IMAGES && (
          <button
            type="button"
            onClick={handleAddImageClick}
            disabled={isUploading}
            className="w-20 h-20 rounded-lg border-2 border-dashed border-n-100 flex flex-col items-center justify-center gap-1 hover:border-rg-400 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="이미지 추가"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 5V19M5 12H19"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-n-200"
              />
            </svg>
            <span className="text-xs text-n-200">
              {uploadedImages.length}/{MAX_IMAGES}
            </span>
          </button>
        )}

        {/* 숨겨진 파일 입력 */}
        <input
          ref={fileInputRef}
          type="file"
          accept={ACCEPTED_IMAGE_TYPES.join(",")}
          onChange={handleFileSelect}
          className="hidden"
          aria-label="이미지 파일 선택"
        />
      </div>

      {/* 안내 메시지 */}
      <p className="text-n-200 text-sm">
        최대 {MAX_IMAGES}장까지 업로드 가능 (JPG, PNG, WEBP / 10MB 이하)
      </p>

      {/* 에러 메시지 */}
      {(uploadError || error) && (
        <p className="text-system-r-400 text-sm">
          {uploadError || error}
        </p>
      )}

      {/* 업로드 중 안내 */}
      {isUploading && (
        <p className="text-rg-400 text-sm">
          이미지를 업로드하는 중입니다...
        </p>
      )}
    </div>
  );
}
