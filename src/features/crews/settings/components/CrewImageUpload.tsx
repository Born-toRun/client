"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { Camera, X } from "lucide-react";
import {
  useUploadFileMutation,
  useDeleteFileMutation,
} from "@/features/write/hooks";

interface CrewImageUploadProps {
  value: string; // 이미지 URI
  onChange: (imageUri: string) => void;
  label: string;
  aspectRatio?: "16/9" | "1/1"; // 추천 비율
  error?: string;
}

const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

/**
 * 크루 이미지 업로드 컴포넌트
 * 단일 이미지 업로드를 지원하며, 대표이미지와 로고이미지에 사용됩니다.
 */
export default function CrewImageUpload({
  value,
  onChange,
  label,
  aspectRatio = "16/9",
  error,
}: CrewImageUploadProps) {
  const [uploadError, setUploadError] = useState<string>("");
  const [isUploading, setIsUploading] = useState(false);
  const [previewUri, setPreviewUri] = useState<string>(value);
  const [currentFileId, setCurrentFileId] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // React Query 훅 사용
  const uploadImageFile = useUploadFileMutation();
  const deleteImageFile = useDeleteFileMutation();

  // value 변경 시 미리보기 동기화
  useEffect(() => {
    setPreviewUri(value);
  }, [value]);

  /**
   * 파일 선택 핸들러
   */
  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];

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

    setUploadError("");
    setIsUploading(true);

    // 로컬 미리보기 표시
    const localPreviewUri = URL.createObjectURL(file);
    setPreviewUri(localPreviewUri);

    try {
      // 기존 이미지가 있으면 삭제
      if (currentFileId) {
        try {
          await deleteImageFile.mutateAsync({
            bucket: "CREW",
            fileId: currentFileId,
          });
        } catch (deleteError) {
          console.error("기존 이미지 삭제 실패:", deleteError);
        }
      }

      // 새 이미지 업로드
      const response = await uploadImageFile.mutateAsync({
        bucket: "CREW",
        file,
      });

      // 업로드 성공
      setPreviewUri(response.fileUri);
      setCurrentFileId(response.fileId);
      onChange(response.fileUri);
    } catch (uploadError) {
      console.error("이미지 업로드 실패:", uploadError);
      setUploadError("이미지 업로드에 실패했습니다. 다시 시도해주세요.");
      // 업로드 실패 시 미리보기 초기화
      setPreviewUri(value);
    } finally {
      setIsUploading(false);
    }

    // 파일 입력 초기화
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  /**
   * 이미지 삭제 핸들러
   */
  const handleRemoveImage = async () => {
    if (!currentFileId) {
      // fileId가 없으면 단순히 미리보기만 제거
      setPreviewUri("");
      onChange("");
      return;
    }

    try {
      await deleteImageFile.mutateAsync({
        bucket: "CREW",
        fileId: currentFileId,
      });

      setPreviewUri("");
      setCurrentFileId(null);
      onChange("");
      setUploadError("");
    } catch (deleteError) {
      console.error("이미지 삭제 실패:", deleteError);
      setUploadError("이미지 삭제에 실패했습니다. 다시 시도해주세요.");
    }
  };

  /**
   * 파일 선택 버튼 클릭 핸들러
   */
  const handleAddImageClick = () => {
    fileInputRef.current?.click();
  };

  const aspectRatioClass = aspectRatio === "16/9" ? "aspect-video" : "aspect-square";

  return (
    <div className="flex flex-col gap-2">
      <label className="label-md text-black">
        {label} <span className="text-n-200">(선택)</span>
      </label>

      {/* 이미지 미리보기 및 업로드 영역 */}
      <div className={`relative w-full ${aspectRatioClass} rounded-lg overflow-hidden border border-n-40 bg-n-10`}>
        {previewUri ? (
          <>
            {/* 업로드된 이미지 */}
            <Image
              src={previewUri}
              alt={label}
              fill
              className="object-cover"
              sizes="100vw"
            />
            {/* 업로드 중 오버레이 */}
            {isUploading && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin" />
              </div>
            )}
            {/* 삭제 버튼 */}
            {!isUploading && (
              <button
                type="button"
                onClick={handleRemoveImage}
                className="absolute top-2 right-2 w-8 h-8 bg-black bg-opacity-70 rounded-full flex items-center justify-center text-white hover:bg-opacity-90 transition-colors"
                aria-label="이미지 삭제"
              >
                <X size={20} />
              </button>
            )}
          </>
        ) : (
          <>
            {/* 이미지 업로드 버튼 */}
            <button
              type="button"
              onClick={handleAddImageClick}
              disabled={isUploading}
              className="absolute inset-0 flex flex-col items-center justify-center gap-2 hover:bg-n-20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label={`${label} 추가`}
            >
              <Camera size={32} className="text-n-200" />
              <span className="body-md text-n-300">
                {aspectRatio === "16/9" ? "16:9 비율 권장" : "1:1 비율 권장"}
              </span>
            </button>
          </>
        )}

        {/* 숨겨진 파일 입력 */}
        <input
          ref={fileInputRef}
          type="file"
          accept={ACCEPTED_IMAGE_TYPES.join(",")}
          onChange={handleFileSelect}
          className="hidden"
          aria-label={`${label} 파일 선택`}
        />
      </div>

      {/* 안내 메시지 */}
      <p className="text-n-200 text-sm">
        JPG, PNG, WEBP 형식 / 10MB 이하
      </p>

      {/* 에러 메시지 */}
      {(uploadError || error) && (
        <p className="text-system-r-400 text-sm">
          {uploadError || error}
        </p>
      )}
    </div>
  );
}
