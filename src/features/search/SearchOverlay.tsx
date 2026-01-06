"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CustomDialog from "@/components/CustomDialog";
import Button from "@/components/Button";
import { useModal } from "@/features/hooks/useModal";
import SearchHeader from "./components/SearchHeader";
import SearchHistoryList from "./components/SearchHistoryList";
import {
  useSearchHistoryQuery,
  useRegisterSearchKeywordMutation,
  useDeleteSearchKeywordMutation,
  useDeleteAllSearchKeywordsMutation,
} from "./hooks/queries";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onSearch: (keyword: string) => void;
}

/**
 * 검색 오버레이 메인 컴포넌트
 * 전체 화면을 덮는 검색 인터페이스
 */
export default function SearchOverlay({
  isOpen,
  onClose,
  onSearch,
}: SearchOverlayProps) {
  const [searchValue, setSearchValue] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const deleteConfirmModal = useModal();

  // 검색 기록 조회
  const { data: historyData, isLoading: isLoadingHistory } =
    useSearchHistoryQuery(isOpen);

  // 검색어 등록 mutation
  const registerMutation = useRegisterSearchKeywordMutation();

  // 검색어 삭제 mutation
  const deleteMutation = useDeleteSearchKeywordMutation();

  // 전체 삭제 mutation
  const deleteAllMutation = useDeleteAllSearchKeywordsMutation();

  // ESC 키로 닫기
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  // 오버레이가 닫힐 때 검색어 초기화
  useEffect(() => {
    if (!isOpen) {
      setSearchValue("");
      setIsSearching(false);
    }
  }, [isOpen]);

  /**
   * 검색 실행 핸들러
   */
  const handleSearch = async () => {
    const trimmedValue = searchValue.trim();
    if (!trimmedValue || isSearching) return;

    setIsSearching(true);

    try {
      // 검색어 등록
      await registerMutation.mutateAsync({ keyword: trimmedValue });

      // 검색 실행
      onSearch(trimmedValue);

      // 오버레이 닫기
      onClose();
    } catch (error) {
      console.error("검색 중 오류 발생:", error);
    } finally {
      setIsSearching(false);
    }
  };

  /**
   * 검색 기록 클릭 핸들러
   */
  const handleKeywordClick = async (keyword: string) => {
    if (isSearching) return;

    setIsSearching(true);

    try {
      // 검색어 등록 (최근 검색어 목록 최신화)
      await registerMutation.mutateAsync({ keyword });

      // 검색 실행
      onSearch(keyword);

      // 오버레이 닫기
      onClose();
    } catch (error) {
      console.error("검색 중 오류 발생:", error);
    } finally {
      setIsSearching(false);
    }
  };

  /**
   * 개별 검색어 삭제 핸들러
   */
  const handleKeywordDelete = (keyword: string) => {
    deleteMutation.mutate({ keyword });
  };

  /**
   * 전체 삭제 확인 다이얼로그 열기
   */
  const handleClearAllClick = () => {
    deleteConfirmModal.open();
  };

  /**
   * 전체 삭제 확정
   */
  const handleConfirmClearAll = () => {
    deleteAllMutation.mutate();
    deleteConfirmModal.close();
  };

  const keywords = historyData?.searchKeywords ?? [];

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-white"
          >
            <div className="h-full flex flex-col max-w-[786px] mx-auto">
              <SearchHeader
                value={searchValue}
                onChange={setSearchValue}
                onSearch={handleSearch}
                onClose={onClose}
                isLoading={isSearching}
              />
              <div className="flex-1 overflow-y-auto">
                {isLoadingHistory ? (
                  <div className="flex items-center justify-center py-[80px]">
                    <p className="body-lg text-n-200">로딩 중...</p>
                  </div>
                ) : (
                  <SearchHistoryList
                    keywords={keywords}
                    onKeywordClick={handleKeywordClick}
                    onKeywordDelete={handleKeywordDelete}
                    onClearAll={handleClearAllClick}
                  />
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 전체 삭제 확인 다이얼로그 */}
      <CustomDialog
        open={deleteConfirmModal.isActive}
        onOpenChange={deleteConfirmModal.close}
        contents={{
          title: "최근 검색어 전체 삭제",
          description: "모든 최근 검색어를 삭제하시겠습니까?",
        }}
        footer={
          <div className="flex w-full justify-between gap-[8px]">
            <Button
              onClick={deleteConfirmModal.close}
              variants="text"
              text="취소"
              size="lg"
              tone="gray"
            />
            <Button
              onClick={handleConfirmClearAll}
              variants="text"
              text="삭제"
              size="lg"
              tone="green"
            />
          </div>
        }
      />
    </>
  );
}
