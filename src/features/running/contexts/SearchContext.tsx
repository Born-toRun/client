"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface SearchContextValue {
  searchKeyword: string;
  setSearchKeyword: (keyword: string) => void;
  clearSearch: () => void;
}

const SearchContext = createContext<SearchContextValue | undefined>(undefined);

/**
 * 러닝 페이지 검색 상태 관리를 위한 Context Provider
 * Marathon과 Meeting 탭 간 검색어를 공유하고 관리
 */
export function SearchProvider({ children }: { children: ReactNode }) {
  const [searchKeyword, setSearchKeyword] = useState("");

  const clearSearch = () => setSearchKeyword("");

  return (
    <SearchContext.Provider
      value={{
        searchKeyword,
        setSearchKeyword,
        clearSearch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

/**
 * 검색 컨텍스트 훅
 * 러닝 페이지 내에서 검색 상태를 공유하고 관리
 */
export function useSearchContext() {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error("useSearchContext must be used within SearchProvider");
  }
  return context;
}
